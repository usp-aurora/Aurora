/******************************************************************************************\
 
 Relaxation Methods
 Iteratively relaxes a set of points on the surface of a unit sphere
 Not currently used
 
\******************************************************************************************/

function getNormalized(positions) {
	return positions.map(position => position.normalize())
}

function getEdgeAverageNorm(positions, edges) {
	const sum = edges.reduce((current, [a,b]) => current + positions[a].sub(positions[b]).norm(), 0)
	return edges.length == 0 ? 0 : sum / edges.length
}

function getRelaxedStep(positions, adjacency, delta) {
	const velocities = positions.map(() => new Vector(0,0,0))
	for(let a = 0; a < adjacency.length; ++a) {
		for(let b of adjacency[a]) {
			const force = positions[b].sub(positions[a])
			velocities[a] = velocities[a].sum(force)
			velocities[b] = velocities[b].sub(force)
		}
	}
	return getNormalized(positions.map((position, idx) => position.sum(velocities[idx].scale(delta))))
}

function getRelaxed(positions, adjacency, steps = 100, delta = 0.1) {
	let relaxedPositions = getNormalized(positions)
	for(let i = 0; i < steps; ++i)
		relaxedPositions = getRelaxedStep(relaxedPositions, adjacency, delta)
	return relaxedPositions
}

export { getRelaxed }
