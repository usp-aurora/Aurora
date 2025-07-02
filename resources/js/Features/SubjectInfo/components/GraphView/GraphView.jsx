import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { styled } from "@mui/material";
import { useDrag, useGesture } from '@use-gesture/react'

import NodeView from "./Components/NodeView";
import LinkView from "./Components/LinkView";
import GraphTools from "./Components/GraphTools";
import Starfield from "../../../Background/Components/Starfield";
import { getAdjacencyLists, getLayers } from "./utils/TraversalUtils";
import {
	getHandleResize,
	getHandleDrag,
	getHandleDragEnd,
	getHandleWheel,
	getHandlePinch,
	getHandleDragNode,
} from "./utils/EventUtils";
import { getStartUpdate, stopUpdate, getInitialStablePositions } from "./utils/UpdateUtils";


const GraphBodyView = styled("div")({
	position: "relative",
	width: "100%",
	height: "100%",
	overflow: "hidden",
	touchAction: "none",
	userSelect: "none",
});

const LinkContainerView = styled("svg")({
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: 2,
	width: "100%",
	height: "100%",
});

const GraphBackgroundView = styled(Starfield)({
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: 1,
	width: "100%",
	height: "100%",
})

const NodeContainerView = styled("div")({
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: 2,
	width: "100%",
	height: "100%"
});

function GraphView({ nodes, links, root, interactive = false, vertical = false, forceStyle = {} }) {
	const [inLists, outLists] = useMemo(() => getAdjacencyLists(nodes, links), [nodes, links]);
	const layers = useMemo(() => getLayers(inLists, outLists, root), [inLists, outLists, root]);
	const initialStablePositions = useMemo(
		() => getInitialStablePositions(links, layers, vertical, forceStyle),
		[links, layers, vertical, forceStyle],
	);

	const [positions, setPositions] = useState(initialStablePositions);
	const [graphOrigin, setGraphOrigin] = useState({ x: 0, y: 0 });
	const [outerDivSize, setOuterDivSize] = useState({ width: 0, height: 0 });
	const [zoom, setZoom] = useState(1);
	const [isDraggingBackground, setIsDraggingBackground] = useState(false);
	const [isDraggingNode, setIsDraggingNode] = useState(false);

	const animationRequest = useRef();
	const animationTime = useRef();

	const mouseDown = useRef(false);
	const dragStart = useRef();
	const alphaNode = useRef();
	const alphaStart = useRef();
	const outerDiv = useRef(null);

	const calculateNewZoom = useCallback((zoom) => {
		const minZoom = 0.1;
		const maxZoom = 5;
		return Math.max(minZoom, Math.min(maxZoom, zoom));
	}, []);

	const centerOn = useCallback((node) => {
		if (!positions.has(node)) return;
		const nodePos = positions.get(node);
		setGraphOrigin({ x: nodePos.x, y: nodePos.y });
	}, [positions]);

	const toggleFullscreen = useCallback(async () => {
		if (!document.fullscreenElement) {
			await outerDiv.current.requestFullscreen();
		} else {
			await document.exitFullscreen();
		}
		getHandleResize(setOuterDivSize, outerDiv)();
	}, []);

	const startUpdate = getStartUpdate(
		setPositions, animationRequest, animationTime,
		links, layers,
		mouseDown, alphaNode, vertical,
		forceStyle,
	);

	const handleDrag = getHandleDrag(mouseDown, alphaNode, zoom, dragStart, setIsDraggingBackground, graphOrigin, setGraphOrigin);
	const handleDragEnd = getHandleDragEnd(mouseDown, setIsDraggingBackground);
	const handleWheel = getHandleWheel(
		outerDiv, outerDivSize, zoom, setZoom, calculateNewZoom,
		graphOrigin, setGraphOrigin);
	const handlePinch = getHandlePinch(
		outerDiv, outerDivSize, zoom, setZoom, calculateNewZoom,
		graphOrigin, setGraphOrigin,
	);

	useGesture({
		onDrag: handleDrag,
		onDragEnd: handleDragEnd,
		onWheel: handleWheel,
		onPinch: handlePinch,
	}, {
		target: outerDiv,
		drag: {
			filterTaps: true
		},
		pinch: {
			scaleBounds: { min: 0.1, max: 2 },
			rubberband: true,
		}
	});

	const getNodeDragHandler = useCallback((nodeKey, nodePos) => {
		const handleDragNode = getHandleDragNode(interactive,
			alphaNode,
			alphaStart,
			nodeKey,
			nodePos,
			setIsDraggingNode,
			zoom,
			startUpdate,
			setPositions);

		return useDrag(handleDragNode,
			{
				disabled: !interactive,
			});
	}, [setPositions, startUpdate, zoom, interactive]);

	useEffect(() => {
		centerOn(root);
		startUpdate();

		const handleResize = getHandleResize(setOuterDivSize, outerDiv);
		window.addEventListener("resize", handleResize);
		handleResize();

		return function () {
			stopUpdate(animationRequest);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const NodeViews = Array.from(nodes, ([key, node]) => {
		const pos = positions.get(key);
		const x = (pos.x - graphOrigin.x) * zoom + outerDivSize.width / 2;
		const y = (pos.y - graphOrigin.y) * zoom + outerDivSize.height / 2;

		const bindDragNode = getNodeDragHandler(key, pos);
		const isCurrentlyDragging = isDraggingNode && alphaNode.current === key;

		return (
			<NodeView
				key={key}
				x={x}
				y={y}
				scale={zoom}
				isDragging={isCurrentlyDragging}
				{...bindDragNode()}
			>
				{node.content}
			</NodeView>
		);
	})

	const LinkViews = useMemo(() =>
		Array.from(links, ([key, link]) => {
			const pos1 = positions.get(link.a);
			const pos2 = positions.get(link.b);
			const x1 = (pos1.x - graphOrigin.x) * zoom + outerDivSize.width / 2;
			const y1 = (pos1.y - graphOrigin.y) * zoom + outerDivSize.height / 2;
			const x2 = (pos2.x - graphOrigin.x) * zoom + outerDivSize.width / 2;
			const y2 = (pos2.y - graphOrigin.y) * zoom + outerDivSize.height / 2;
			return (
				<LinkView key={key} x1={x1} y1={y1} x2={x2} y2={y2} scale={zoom} />
			);
		}), [links, positions, graphOrigin, outerDivSize, zoom]
	);

	return (
		<GraphBodyView
			ref={outerDiv}
			style={{ cursor: isDraggingBackground ? "grabbing" : "grab" }}
		>
			<GraphTools toggleFullscreen={toggleFullscreen} recenter={() => centerOn(root)} />
			<GraphBackgroundView twinkling={false} />
			<LinkContainerView>
				<filter id="link-shadow">
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
