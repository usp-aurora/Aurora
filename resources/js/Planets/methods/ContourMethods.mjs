function getIslandCountours(positions, faces, adjacency, noise, treshhold = 0.5) {
	// if you got to a face, its entrance edge has a high vertex and a low vertex
	// just go to the other edge which has a low vertex and a high vertex
	// this will be the exit edge of this face and the entrance edge of the next
	const visited = faces.map(() => false)
	const stack = faces.map((face, idx) => {
		for(let i=0; i<3; ++i)
			if(treshhold < noise[face[i]] && noise[face[(i+1)%3]] <= treshhold)
				return [idx, i, true]
	}).filter(entry => entry)
	const islands = []
	while(stack.length != 0) {
		const [faceIdx, entranceIdx, isInitial] = stack.pop() 
		const face = faces[faceIdx]
		if(visited[faceIdx])
			continue
		visited[faceIdx] = true
		// adds island vertex to island
		if(isInitial)
			islands.push([])
		const a = entranceIdx
		const b = (entranceIdx+1)%3
		const positionA = positions[face[a]]
		const positionB = positions[face[b]]
		const positionD = positionB.sub(positionA)
		const noiseA = noise[face[a]]
		const noiseB = noise[face[b]]
		const noiseD = noiseB-noiseA
		const noiseT = treshhold-noiseA
		islands[islands.length-1].push(positionA.sum(positionD.scale(noiseT/noiseD)).normalize())
		// adds the exit edge to the queue
		// if a face has an entrance edge, it has exactly one exit edge
		for(let i=0; i<3; ++i) {
			const c = (entranceIdx+i)%3
			const d = (entranceIdx+i+1)%3
			if(noise[face[c]] <= treshhold && treshhold < noise[face[d]]) {
				stack.push([adjacency[faceIdx][c][0], adjacency[faceIdx][c][1], false])	
				break;
			}
		}
	}
	return islands
}

export { getIslandCountours }
