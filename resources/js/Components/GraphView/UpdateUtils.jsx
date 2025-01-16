import { applyRadialForce, applyLinkForce, applyLayerForce } from "./ForceUtils"

function getVelocities(positions, nodes, links, layers, vertical, forceStyle) {
	const velocities = new Map(
		Array.from(nodes, ([key,node],id) => [key,{x:0, y:0}])
	)

	applyRadialForce(positions, velocities, forceStyle)
	applyLinkForce(positions, velocities, links, vertical, forceStyle)
	applyLayerForce(positions, velocities, layers, vertical, forceStyle)

	return velocities
}

function getNewPositions(mouseDown, alphaNode, deltaSeconds, positions, velocities) {
	return new Map(Array.from(positions, ([key,position],_) => {
		if(mouseDown.current && key == alphaNode.current) {
			return [key, {x:position.x, y:position.y}]
		}
		const velocity = velocities.get(key)
		return [key, {
			x: position.x + velocity.x*deltaSeconds,
			y: position.y + velocity.y*deltaSeconds
		}]
	}))
}

function getUpdate (
	setPositions,
	animationRequest,
	animationTime,
	nodes,
	links,
	layers,
	mouseDown,
	alphaNode,
	vertical = false,
	forceStyle = {}
) {
	const update = () => {
		const currentTime = Date.now()
		const deltaSeconds = Math.min(1,(currentTime-animationTime.current)/1000)
		animationTime.current = currentTime

		setPositions(positions => {
			const velocities = getVelocities(positions, nodes, links, layers, vertical, forceStyle)
			return getNewPositions(mouseDown, alphaNode, deltaSeconds, positions, velocities)
		})
		animationRequest.current = requestAnimationFrame(update)
	}
	return update
}

export default getUpdate
