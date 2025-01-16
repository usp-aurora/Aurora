import { useState, useEffect, useRef, useMemo } from "react"
import styled from 'styled-components';

import NodeView from "./NodeView"
import LinkView from "./LinkView"
import { getAdjacencyLists, getLayers } from "./TraversalUtils"
import {
	getHandleMouseDown, getHandleMouseMove, getHandleMouseLeave, getHandleMouseUp,
	getHandleMouseDownNode, handleTouch
} from "./EventUtils"
import getUpdate from "./UpdateUtils"

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

	const [origin, setOrigin] = useState({ x: 0, y: 0 })
	const [positions, setPositions] = useState(new Map(
		Array.from(nodes.keys(), key => [key,{x:Math.random()*10, y:Math.random()*10}])
	))

	const animationRequest = useRef()
	const animationTime = useRef()

	const mouseDown = useRef(false)
	const dragStart = useRef()

	const alphaNode = useRef()
	const alphaStart = useRef()

	const outerDiv = useRef(null)
	const width = outerDiv.current ? outerDiv.current.clientWidth : 0
	const height = outerDiv.current ? outerDiv.current.clientHeight : 0

	const NodeViews = Array.from(nodes, ([key,node],_) => {
		const pos = positions.get(key)
		const x = pos.x-origin.x+width/2
		const y = pos.y-origin.y+height/2
		const handleMouseDownNode = interactive
			? getHandleMouseDownNode(alphaNode, alphaStart, key, pos, x, y)
			: undefined
		return (
			<NodeView key={key} x={x} y={y} onMouseDown={handleMouseDownNode} >
				{node.content}
			</NodeView>
		)
	})

	const LinkViews = Array.from(links, ([key,link],_) => {
		const pos1 = positions.get(link.a)
		const pos2 = positions.get(link.b)
		const x1 = pos1.x-origin.x+width/2
		const y1 = pos1.y-origin.y+height/2
		const x2 = pos2.x-origin.x+width/2
		const y2 = pos2.y-origin.y+height/2
		return (
			<LinkView key={key} x1={x1} y1={y1} x2={x2} y2={y2} r={90} />
		)
	})

	useEffect(() => {
		animationTime.current = Date.now()
		animationRequest.current = requestAnimationFrame(getUpdate(
			setPositions,
			animationRequest, animationTime,
			nodes, links, layers,
			mouseDown, alphaNode, vertical,
			forceStyle
		))
		return () => {
			cancelAnimationFrame(animationRequest.current)
		}
	}, [])

	return (
		<GraphBodyView
			onMouseDown={getHandleMouseDown(mouseDown,dragStart,origin)}
			onMouseMove={getHandleMouseMove(
				setOrigin, setPositions,
				mouseDown, alphaNode, dragStart, alphaStart
			)}
			onMouseUp={getHandleMouseUp(mouseDown,alphaNode)}
			onMouseLeave={getHandleMouseLeave(mouseDown,alphaNode)}

			onTouchStart={handleTouch}
			onTouchMove={handleTouch}
			onTouchEnd={handleTouch}

			style={mouseDown.current ? {cursor:"grabbing"} : {}}

			ref={outerDiv}
		>
			<LinkContainerView>
				<filter id="glow">
					<feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="white" />
				</filter>
				<rect
					x="0" y="0"
					width={width}
					height={height}
					strokeWidth="0" fill="#112"
				/>
				{LinkViews}
			</LinkContainerView>
			<NodeContainerView>
				{NodeViews}
			</NodeContainerView>
		</GraphBodyView>
	)
}

export default GraphView
