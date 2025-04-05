import { applyRadialForce, applyLinkForce, applyLayerForce } from "./ForceUtils";

function getVelocities(positions, links, layers, vertical, forceStyle = {}) {
	const velocities = new Map(
		Array.from(layers.keys(), key => [key,{x:0, y:0}]),
	);

	applyRadialForce(positions, velocities, forceStyle);
	applyLinkForce(positions, velocities, links, vertical, forceStyle);
	applyLayerForce(positions, velocities, layers, vertical, forceStyle);

	return velocities;
}

function getNewPositions(
	positions,
	velocities,
	deltaSeconds = 1,
	mouseDown = {current: false},
	alphaNode = {current: undefined},
) {
	return new Map(Array.from(positions, ([key,position], idx) => {
		if(mouseDown.current && key == alphaNode.current) {
			return [key, {x:position.x, y:position.y}];
		}
		const velocity = velocities.get(key);
		return [key, {
			x: position.x + velocity.x*deltaSeconds,
			y: position.y + velocity.y*deltaSeconds,
		}];
	}));
}

function getMax(values) {
	return Math.max.apply(null, Array.from(values.values(), ({x,y}) => Math.max(
		Math.abs(x),
		Math.abs(y),
	)));
}

function getStablePositions(
	positions,
	links,
	layers,
	vertical,
	forceStyle,
	deltaSeconds = 0.08,
	maxIterations = 500,
) {
	for(let i=0, maxVelocity=1; i<maxIterations && 1<=maxVelocity; ++i) {
		const velocities = getVelocities(positions, links, layers, vertical, forceStyle);
		positions = getNewPositions(positions, velocities, deltaSeconds);
		maxVelocity = getMax(velocities);
	}
	return positions;
}

function getInitialStablePositions(
	links,
	layers,
	vertical,
	forceStyle,
	deltaSeconds,
	maxIterations,
) {
	const positions = new Map(Array.from(layers.keys(), key => [key, {
		x: Math.random() * window.innerWidth,
		y: Math.random() * window.innerHeight,
	}]));
	return getStablePositions(positions,links,layers,vertical,forceStyle,deltaSeconds,maxIterations);
}

function getStartUpdate (
	setPositions,
	animationRequest,
	animationTime,
	links,
	layers,
	mouseDown,
	alphaNode,
	vertical,
	forceStyle,
) {
	function update() {
		const currentTime = Date.now();
		const deltaSeconds = Math.min(1,(currentTime-animationTime.current)/1000);
		animationTime.current = currentTime;

		setPositions(positions => {
			const velocities = getVelocities(positions, links, layers, vertical, forceStyle);
			const maxVelocity = getMax(velocities);
			if(maxVelocity < 1)
				stopUpdate(animationRequest);
			else
				animationRequest.current = requestAnimationFrame(update);
			return getNewPositions(positions, velocities, deltaSeconds, mouseDown, alphaNode);
		});
	}
	return function() {
		if(animationRequest.current == undefined) {
			animationTime.current = Date.now();
			animationRequest.current = requestAnimationFrame(update);
		}
	};
}

function stopUpdate(animationRequest) {
	cancelAnimationFrame(animationRequest.current);
	animationRequest.current = undefined;
}

export {getStartUpdate, stopUpdate, getInitialStablePositions};
