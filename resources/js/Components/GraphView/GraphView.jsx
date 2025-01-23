import { useState, useEffect, useRef, useMemo } from "react"
import styled from 'styled-components';

import NodeView from "./NodeView"
import LinkView from "./LinkView"
import { getAdjacencyLists, getLayers } from "./TraversalUtils"
import {
	getHandleResize, getHandleMouseDown, getHandleMouseMove, getHandleMouseLeave, getHandleMouseUp,
	getHandleMouseDownNode, handleTouch
} from "./EventUtils"
import {getStartUpdate, stopUpdate, getInitialStablePositions} from "./UpdateUtils"

const GraphBodyView = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	cursor: grab;
	touch-action: none;
`

const LinkContainerView = styled.svg`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`

const GraphBackgroundView = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #112;
`

const NodeContainerView = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`

function GraphView({ nodes, links, root, interactive = false, vertical = false, forceStyle = {} }) {

	const [inLists, outLists] = useMemo(() => getAdjacencyLists(nodes,links), [nodes, links])
	const layers = useMemo(() => getLayers(inLists, outLists, root), [inLists, outLists, root])
	const initialStablePositions = useMemo(
		() => getInitialStablePositions(links,layers,vertical,forceStyle),
		[links,layers]
	)

	const [positions, setPositions] = useState(initialStablePositions)
	const [origin, setOrigin] = useState({ x: 0, y: 0 })
	const [size, setSize] = useState({ width: 0, height: 0})

	const animationRequest = useRef()
	const animationTime = useRef()

	const resizeListener = useRef()
	const mouseMoveListener = useRef()
	const mouseUpListener = useRef()
	const mouseLeaveListener = useRef()
	const touchMoveListener = useRef()
	const touchEndListener = useRef()

	const mouseDown = useRef(false)
	const dragStart = useRef()

	const alphaNode = useRef()
	const alphaStart = useRef()

	const outerDiv = useRef(null)

	const NodeViews = Array.from(nodes, ([key,node], idx) => {
		const pos = positions.get(key)
		const x = pos.x-origin.x + size.width/2
		const y = pos.y-origin.y + size.height/2
		const handleMouseDownNode = interactive
			? getHandleMouseDownNode(alphaNode, alphaStart, key, pos)
			: undefined
		return (
			<NodeView key={key} x={x} y={y} onMouseDown={handleMouseDownNode} >
				{node.content}
			</NodeView>
		)
	})

	const LinkViews = Array.from(links, ([key,link],idx) => {
		const pos1 = positions.get(link.a)
		const pos2 = positions.get(link.b)
		const x1 = pos1.x-origin.x + size.width/2
		const y1 = pos1.y-origin.y + size.height/2
		const x2 = pos2.x-origin.x + size.width/2
		const y2 = pos2.y-origin.y + size.height/2
		return (
			<LinkView key={key} x1={x1} y1={y1} x2={x2} y2={y2} r={90} />
		)
	})

	useEffect(() => {
		const startUpdate = getStartUpdate(
			setPositions, animationRequest, animationTime,
			links, layers,
			mouseDown, alphaNode, vertical,
			forceStyle
		)
		startUpdate()

		const handleResize = getHandleResize(setSize, outerDiv)
		resizeListener.current = addEventListener("resize", handleResize)
		handleResize()

		mouseMoveListener.current = addEventListener("mousemove", getHandleMouseMove(
			setOrigin, setPositions, startUpdate,
			mouseDown, alphaNode, dragStart, alphaStart
		))
		mouseUpListener.current = addEventListener("mouseup", getHandleMouseUp(
			mouseDown,alphaNode
		))
		mouseLeaveListener.current = addEventListener("mouseleave", getHandleMouseLeave(
			mouseDown,alphaNode
		))

		touchMoveListener.current = addEventListener("touchmove", handleTouch)
		touchEndListener.current = addEventListener("touchmove", handleTouch)

		return () => {
			stopUpdate(animationRequest)

			removeEventListener("mousemove",mouseMoveListener.current)
			removeEventListener("mouseup",mouseUpListener.current)
			removeEventListener("mouseleave",mouseLeaveListener.current)

			removeEventListener("touchmove",touchMoveListener.current)
			removeEventListener("touchend",touchEndListener.current)
		}
	}, [])

	return (
		<GraphBodyView
			onMouseDown={getHandleMouseDown(mouseDown,dragStart,origin)}
			onTouchStart={handleTouch}
			ref={outerDiv}
		>
			<GraphBackgroundView />
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
	)
}

export default GraphView
