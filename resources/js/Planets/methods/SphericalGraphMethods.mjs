import { Vector } from "./LinearMethods.mjs"

function getMidOctave(a, b) {
	const midOctave = a.map((coordinateA,i) => {
		const coordinateB = b[i]
		const midCoordinate = []
		let posA = 0
		let posB = 0
		while(posA < coordinateA.length && posB < coordinateB.length) {
			const [idxA, factorA] = coordinateA[posA]
			const [idxB, factorB] = coordinateB[posB]
			if(idxA == idxB) {
				midCoordinate.push([idxA, (factorA+factorB)/2])
				++posA
				++posB
			}
			else if(idxA < idxB) {
				midCoordinate.push([idxA, 0])
				++posA
			}
			else {
				midCoordinate.push([idxB, 0])
				++posB
			}
		}
		while(posA < coordinateA.length) {
			const [idxA, factorA] = coordinateA[posA]
			midCoordinate.push([idxA, 0])
			++posA
		}
		while(posB < coordinateB.length) {
			const [idxB, factorB] = coordinateB[posB]
			midCoordinate.push([idxB, 0])
			++posB
		}
		return midCoordinate
	})
	return midOctave
}

function getMidPositionNorm(a, b) {
	return a.sum(b.sub(a).scale(1/2)).normalize()
}

function subdivide(positions, faces, adjacency, octaves, octaveLengths) {
	const midPositionsIdx = faces.map(() => Array(3))
	const newFaces = Array(4*faces.length)
	const newAdjacency = Array(4*faces.length)
	const newOctaves = octaves.map(
		(coordinate, i) => coordinate.map(
			components => components.map(
				([j,factor]) => [j,factor*2+1]
			)
		).concat([[[i,1]]])
	)
	octaveLengths.push(octaves.length)
	for(let a = 0; a < faces.length; ++a) {
		// create mid positions and mid octaves
		for(let i = 0; i < 3; ++i) {
			const [b,j] = adjacency[a][i]
			midPositionsIdx[a][i] = midPositionsIdx[b][j]
			if(midPositionsIdx[a][i] == undefined) {
				const idxU = faces[a][i]
				const idxV = faces[a][(i+1)%3]
				midPositionsIdx[a][i] = positions.length
				positions.push(getMidPositionNorm(positions[idxU],positions[idxV]))
				newOctaves.push(getMidOctave(newOctaves[idxU],newOctaves[idxV]))
			}
		}
		// create new faces
		for(let j = 0; j < 3; ++j)
			newFaces[4*a+j] = [faces[a][j],midPositionsIdx[a][j],midPositionsIdx[a][(j+2)%3]]
		newFaces[4*a+3] = [midPositionsIdx[a][2],midPositionsIdx[a][0],midPositionsIdx[a][1]]
		// create new adjacency
		for(let j = 0; j < 3; ++j) {
			newAdjacency[4*a+j] = [
				[4*adjacency[a][j][0] + (adjacency[a][j][1] + 1)%3, 2],
				[4*a+3, j],
				[4*adjacency[a][(j+2)%3][0] + adjacency[a][(j+2)%3][1], 0],
			]
		}
		newAdjacency[4*a+3] = [[4*a+0,1],[4*a+1,1],[4*a+2,1]]
	}
	return [positions, newFaces, newAdjacency, newOctaves, octaveLengths]
}

function powerSubdivide(positions, faces, adjacency, octaves, octaveLengths, power) {
	let state = [positions, faces, adjacency, octaves, octaveLengths]
	for(let i = 0; i < power; ++i)
		state = subdivide(...state)
	return state
}

function createTetrahedralSphere(power) {
	const sin = Math.sin(1/6*Math.PI)
	const cos = Math.cos(1/6*Math.PI)
	const positions = [
		new Vector(0,cos,-sin),                 // 0 - top
		new Vector(cos,-sin,-sin).normalize(),  // 1 - right
		new Vector(-cos,-sin,-sin).normalize(), // 2 - left
		new Vector(0,0,1),                      // 3 - front
	]
	const faces = [
		[0,1,2], // 0 - back
		[3,1,0], // 1 - right
		[3,2,1], // 2 - bottom
		[3,0,2], // 3 - left
	]
	const adjacency = [
		[[1,1],[2,1],[3,1]],
		[[2,2],[0,0],[3,0]],
		[[3,2],[0,1],[1,0]],
		[[1,2],[0,2],[2,0]],
	]
	const octaves = [[],[],[],[]]
	const octaveLengths = []
	return powerSubdivide(positions, faces, adjacency, octaves, octaveLengths, power)
}

function createIcosahedralSphere(power) {
	const phi = (1 + Math.sqrt(5)) / 2 // golden ratio
	const norm = Math.sqrt((5+Math.sqrt(5))/2) // norm of (1, phi, 0)
	const nPhi = phi/norm
	const nOne = 1/norm
	const positions = [
		new Vector(-nOne, nPhi, 0),
		new Vector(nOne, nPhi, 0),
		new Vector(-nOne, -nPhi, 0),
		new Vector(nOne, -nPhi, 0),
		new Vector(0, -nOne, nPhi),
		new Vector(0, nOne, nPhi),
		new Vector(0, -nOne, -nPhi),
		new Vector(0, nOne, -nPhi),
		new Vector(nPhi, 0, -nOne),
		new Vector(nPhi, 0, nOne),
		new Vector(-nPhi, 0, -nOne),
		new Vector(-nPhi, 0, nOne),
	]
	const faces = [
		[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
		[1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
		[3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
		[4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
	]
	const adjacency = [
		[[4,2],[6,0],[1,0]], [[0,2],[5,0],[2,0]], [[1,2],[9,0],[3,0]], [[2,2],[8,0],[4,0]],
		[[3,2],[7,0],[0,0]], [[1,1],[15,1],[19,2]], [[0,1],[16,1],[15,2]], [[4,1],[17,1],[16,2]],
		[[3,1],[18,1],[17,2]], [[2,1],[19,1],[18,2]], [[14,2],[15,0],[11,0]], [[10,2],[16,0],[12,0]],
		[[11,2],[17,0],[13,0]], [[12,2],[18,0],[14,0]], [[13,2],[19,0],[10,0]], [[10,1],[5,1],[6,2]],
		[[11,1],[6,1],[7,2]], [[12,1],[7,1],[8,2]], [[13,1],[8,1],[9,2]], [[14,1],[9,1],[5,2]],
	]
	const octaves = [[],[],[],[],[],[],[],[],[],[],[],[]]
	const octaveLengths = []
	return powerSubdivide(positions, faces, adjacency, octaves, octaveLengths, power)
}

function getEdges(faces, adjacency) {
	const edges = []
	const faceProcessed = faces.map(() => false)
	for(let a = 0; a < faces.length; ++a) {
		for(let i = 0; i < 3; ++i) {
			const [b,j] = adjacency[a][i]
			if(!faceProcessed[b])
				edges.push([faces[a][i],faces[a][(i+1)%3]])
		}
		faceProcessed[a] = true
	}
	return edges
}

export { createTetrahedralSphere, createIcosahedralSphere, getEdges }
