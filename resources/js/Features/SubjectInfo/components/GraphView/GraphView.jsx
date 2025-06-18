import { useState, useEffect, useRef, useMemo, useCallback} from "react";
import { styled } from "@mui/material";

import NodeView from "./Components/NodeView";
import LinkView from "./Components/LinkView";
import GraphTools from "./Components/GraphTools";
import Starfield from "../../../Background/Components/Starfield";
import { getAdjacencyLists, getLayers } from "./utils/TraversalUtils";
import {
	getHandleResize, getHandleMouseDown, getHandleMouseMove, getHandleMouseLeave, getHandleMouseUp,
	getHandleMouseDownNode, handleTouch,
} from "./utils/EventUtils";
import { getStartUpdate, stopUpdate, getInitialStablePositions } from "./utils/UpdateUtils";

const GraphBodyView = styled("div")({
	position: "relative",
	width: "100%",
	height: "100%",
	overflow: "hidden",
	cursor: "grab",
	touchAction: "none",
})

const LinkContainerView = styled("svg")({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
});

const GraphBackgroundView = styled(Starfield)({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
})

const NodeContainerView = styled("div")({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
});

function GraphView({ nodes, links, root, interactive = false, vertical = false, forceStyle = {} }) {
	const [inLists, outLists] = useMemo(() => getAdjacencyLists(nodes, links), [nodes, links]);
	const layers = useMemo(() => getLayers(inLists, outLists, root), [inLists, outLists, root]);
	const initialStablePositions = useMemo(
		() => getInitialStablePositions(links, layers, vertical, forceStyle),
		[links, layers, vertical, forceStyle],
	);

	const [positions, setPositions] = useState(initialStablePositions);
	const [origin, setOrigin] = useState({ x: 0, y: 0 });
	const [size, setSize] = useState({ width: 0, height: 0 });

	const animationRequest = useRef();
	const animationTime = useRef();

	const mouseDown = useRef(false);
	const dragStart = useRef();
	const alphaNode = useRef();
	const alphaStart = useRef();
	const outerDiv = useRef(null);

	const centerOn = useCallback((node) => {
		if (!positions.has(node)) return;
		const nodePos = positions.get(node);
		setOrigin({ x: nodePos.x, y: nodePos.y });
	}, [positions]);

	const toggleFullscreen = useCallback(async () => {
		if (!document.fullscreenElement) {
			await outerDiv.current.requestFullscreen();
		} else {
			await document.exitFullscreen();
		}
		getHandleResize(setSize, outerDiv)();
	}, []);
	
	useEffect(() => {

		centerOn(root);
		const startUpdate = getStartUpdate(
			setPositions, animationRequest, animationTime,
			links, layers,
			mouseDown, alphaNode, vertical,
			forceStyle,
		);
		startUpdate();

		const handleResize = getHandleResize(setSize, outerDiv);
		window.addEventListener("resize", handleResize);
		handleResize();

		const handleMouseMove = getHandleMouseMove(
			setOrigin, setPositions, startUpdate,
			mouseDown, alphaNode, dragStart, alphaStart,
		);
		const handleMouseUp = getHandleMouseUp(mouseDown, alphaNode);
		const handleMouseLeave = getHandleMouseLeave(mouseDown, alphaNode);

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("mouseleave", handleMouseLeave);

		window.addEventListener("touchmove", handleTouch);
		window.addEventListener("touchend", handleTouch);

		return function () {
			stopUpdate(animationRequest);

			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mouseleave", handleMouseLeave);
			window.removeEventListener("touchmove", handleTouch);
			window.removeEventListener("touchend", handleTouch);
		};
	}, []);

	const NodeViews = useMemo(() =>
		Array.from(nodes, ([key, node]) => {
			const pos = positions.get(key);
			const x = pos.x - origin.x + size.width / 2;
			const y = pos.y - origin.y + size.height / 2;
			const handleMouseDownNode = (
				interactive ? getHandleMouseDownNode(alphaNode, alphaStart, key, pos) : undefined
			);
			return (
				<NodeView key={key} x={x} y={y} onMouseDown={handleMouseDownNode}>
					{node.content}
				</NodeView>
			);
		}), [nodes, positions, origin, size, interactive]
	);

	const LinkViews = useMemo(() =>
		Array.from(links, ([key, link]) => {
			const pos1 = positions.get(link.a);
			const pos2 = positions.get(link.b);
			const x1 = pos1.x - origin.x + size.width / 2;
			const y1 = pos1.y - origin.y + size.height / 2;
			const x2 = pos2.x - origin.x + size.width / 2;
			const y2 = pos2.y - origin.y + size.height / 2;
			return (
				<LinkView key={key} x1={x1} y1={y1} x2={x2} y2={y2} />
			);
		}), [links, positions, origin, size]
	);


	return (
		<GraphBodyView
			onMouseDown={getHandleMouseDown(mouseDown, dragStart, origin)}
			onTouchStart={handleTouch}
			ref={outerDiv}
		>
			<GraphTools toggleFullscreen={toggleFullscreen} recenter={() => centerOn(root)} />
			<GraphBackgroundView twinkling={false} />
			<LinkContainerView>
				<filter>
					<feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="white" />
				</filter>
				{LinkViews}
			</LinkContainerView>
			<NodeContainerView>
				{NodeViews}
			</NodeContainerView>
		</GraphBodyView>
	);
}

export default GraphView;
