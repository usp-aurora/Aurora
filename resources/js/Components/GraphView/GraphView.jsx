import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { styled } from "@mui/material";

import NodeView from "./NodeView";
import LinkView from "./LinkView";
import { getAdjacencyLists, getLayers } from "./TraversalUtils";
import {
	getHandleResize, getHandleMouseDown, getHandleMouseMove, getHandleMouseLeave, getHandleMouseUp,
	getHandleMouseDownNode, handleTouch,
} from "./EventUtils";
import { getStartUpdate, stopUpdate, getInitialStablePositions } from "./UpdateUtils";

const GraphBodyView = styled("div")({
	position: "relative",
	width: "100%",
	height: "100%",
	overflow: "hidden",
	cursor: "grab",
	touchAction: "none",
	"&:active": {
		cursor: "grabbing",
	},
	"&:hover": {
		cursor: "grab",
	},
})

const LinkContainerView = styled("svg")({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
});

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
		[links, layers, nodes, root]
	);
	const [positions, setPositions] = useState(initialStablePositions);

	const [origin, setOrigin] = useState({ x: 0, y: 0 });
	const [size, setSize] = useState({ width: 0, height: 0 });
	const [zoom, setZoom] = useState(1);

	const sizeRef = useRef({ width: 0, height: 0 });
	const originRef = useRef({ x: 0, y: 0 });
	const zoomRef = useRef(1);

	sizeRef.current = size;
	originRef.current = origin;
	zoomRef.current = zoom;

	const animationRequest = useRef();
	const animationTime = useRef();

	const resizeListener = useRef();
	const mouseMoveListener = useRef();
	const mouseUpListener = useRef();
	const mouseLeaveListener = useRef();
	const touchMoveListener = useRef();
	const touchEndListener = useRef();

	const mouseDown = useRef(false);
	const dragStart = useRef();

	const alphaNode = useRef();
	const alphaStart = useRef();

	const outerDiv = useRef(null);

	const NodeViews = Array.from(nodes, ([key, node], idx) => {
		const pos = positions.get(key);
		const x = (pos.x - origin.x) * zoom + size.width / 2;
		const y = (pos.y - origin.y) * zoom + size.height / 2;
		const handleMouseDownNode = (
			interactive ?
				getHandleMouseDownNode(alphaNode, alphaStart, key, pos, zoomRef, sizeRef, originRef, outerDiv) :
				undefined
		);
		return (
			<NodeView key={key} x={x} y={y} scale={zoom} onMouseDown={handleMouseDownNode} >
				{node.content}
			</NodeView>
		);
	});

	const LinkViews = Array.from(links, ([key, link]) => {
		const pos1 = positions.get(link.a);
		const pos2 = positions.get(link.b);
		const x1 = (pos1.x - origin.x) * zoom + size.width / 2;
		const y1 = (pos1.y - origin.y) * zoom + size.height / 2;
		const x2 = (pos2.x - origin.x) * zoom + size.width / 2;
		const y2 = (pos2.y - origin.y) * zoom + size.height / 2;
		return (
			<LinkView key={key} x1={x1} y1={y1} x2={x2} y2={y2} scale={zoom} />
		);
	});

	function centerOn(node) {
		if (!positions.has(node)) return;
		const nodePos = positions.get(node);
		setOrigin({ x: nodePos.x, y: nodePos.y });
	};

	function calculateNewZoom(currentZoom, deltaZoom){
		const minZoom = 0.1;
		const maxZoom = 5;
		return Math.max(minZoom, Math.min(maxZoom, currentZoom + deltaZoom));
	}

	const handleWheel = useCallback((e) => {
		e.preventDefault();
		
		const zoomSpeed = 0.0005;
		const deltaZoom = -e.deltaY * zoomSpeed;
		setZoom(currentZoom => {
			const newZoom = calculateNewZoom(currentZoom, deltaZoom);
			
			if (Math.abs(newZoom - currentZoom) < 0.001) return currentZoom;
			
			const rect = outerDiv.current?.getBoundingClientRect();
			if (!rect) return currentZoom;
			
			const mouseX = e.clientX - rect.left;
			const mouseY = e.clientY - rect.top;
			
			setOrigin(currentOrigin => {
				const screenX = mouseX - size.width / 2;
				const screenY = mouseY - size.height / 2;
				
				const worldX = screenX / currentZoom + currentOrigin.x;
				const worldY = screenY / currentZoom + currentOrigin.y;
				
				const newOriginX = worldX - screenX / newZoom;
				const newOriginY = worldY - screenY / newZoom;
				
				return { x: newOriginX, y: newOriginY };
			});
			
			return newZoom;
		});
	}, [size.width, size.height]);

	const handleTouchStart = useCallback((e) => {
		if (e.touches.length === 2) {
			e.preventDefault();
			const touch1 = e.touches[0];
			const touch2 = e.touches[1];
			const distance = Math.sqrt(
				Math.pow(touch2.clientX - touch1.clientX, 2) + 
				Math.pow(touch2.clientY - touch1.clientY, 2)
			);
			if (outerDiv.current) {
				outerDiv.current.dataset.initialPinchDistance = distance;
				outerDiv.current.dataset.initialZoom = zoom;
			}
		} else {
			handleTouch(e);
		}
	}, [zoom]);

	const handleTouchMove = useCallback((e) => {
		if (e.touches.length === 2) {
			e.preventDefault();
			const touch1 = e.touches[0];
			const touch2 = e.touches[1];
			const distance = Math.sqrt(
				Math.pow(touch2.clientX - touch1.clientX, 2) + 
				Math.pow(touch2.clientY - touch1.clientY, 2)
			);
			
			const initialDistance = parseFloat(outerDiv.current?.dataset.initialPinchDistance || '0');
			const initialZoom = parseFloat(outerDiv.current?.dataset.initialZoom || '1');
			
			if (initialDistance && initialZoom) {
				const scale = distance / initialDistance;
				const minZoom = 0.1;
				const maxZoom = 5;
				
				setZoom(currentZoom => {
					const newZoom = Math.max(minZoom, Math.min(maxZoom, initialZoom * scale));
					
					if (Math.abs(newZoom - currentZoom) < 0.001) return currentZoom;
					
					const rect = outerDiv.current?.getBoundingClientRect();
					if (!rect) return currentZoom;
					
					const centerX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
					const centerY = (touch1.clientY + touch2.clientY) / 2 - rect.top;
					
					setOrigin(currentOrigin => {
						const screenX = centerX - size.width / 2;
						const screenY = centerY - size.height / 2;
						
						const worldX = screenX / currentZoom + currentOrigin.x;
						const worldY = screenY / currentZoom + currentOrigin.y;
						
						const newOriginX = worldX - screenX / newZoom;
						const newOriginY = worldY - screenY / newZoom;
						
						return { x: newOriginX, y: newOriginY };
					});
					
					return newZoom;
				});
			}
		} else {
			handleTouch(e);
		}
	}, [size.width, size.height]);

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
		resizeListener.current = addEventListener("resize", handleResize);
		handleResize();

		const mouseMoveHandler = getHandleMouseMove(
			setOrigin, setPositions, startUpdate,
			mouseDown, alphaNode, dragStart, alphaStart, zoomRef, sizeRef, originRef, outerDiv,
		);
		mouseMoveListener.current = addEventListener("mousemove", mouseMoveHandler);
		mouseUpListener.current = addEventListener("mouseup", getHandleMouseUp(
			mouseDown, alphaNode,
		));
		mouseLeaveListener.current = addEventListener("mouseleave", getHandleMouseLeave(
			mouseDown, alphaNode,
		));

		touchMoveListener.current = addEventListener("touchmove", handleTouchMove);
		touchEndListener.current = addEventListener("touchend", handleTouch); 

		return function () {
			stopUpdate(animationRequest);

			removeEventListener("mousemove", mouseMoveListener.current);
			removeEventListener("mouseup", mouseUpListener.current);
			removeEventListener("mouseleave", mouseLeaveListener.current);

			removeEventListener("touchmove", touchMoveListener.current);
			removeEventListener("touchend", touchEndListener.current);
		};
	}, [handleTouchMove]);

	return (
		<GraphBodyView
			onMouseDown={getHandleMouseDown(mouseDown, dragStart, origin, zoomRef, sizeRef, outerDiv)}
			onTouchStart={handleTouchStart}
			onWheel={handleWheel}
			ref={outerDiv}
		>
			<LinkContainerView
				viewBox={`0 0 ${size.width} ${size.height}`}
				preserveAspectRatio="xMidYMid meet"
			>
				<defs>
					<filter id="glow">
						<feDropShadow dx="0" dy="0" stdDeviation={2} floodColor="white" />
					</filter>
				</defs>
				{LinkViews}
			</LinkContainerView>
			<NodeContainerView>
				{NodeViews}
			</NodeContainerView>
		</GraphBodyView>
	);
}

export default GraphView;
