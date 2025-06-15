/******************************************************************************************\
 
 Tetrahedral Graph Methods
 Generates a tetrahedral graph with surface subdivisions
 Not currently used
 
\******************************************************************************************/

function createIndices(power = 10) {
	const qr = 1<<power
	const faceIndices = []
	let currentIndex = 0
	for(let i=0; i<3; ++i) {
		faceIndices.push([])
		for(let j=0; j<qr; ++j) {
			faceIndices[i].push([])
			for(let k=0; k<qr-j; ++k) {
				faceIndices[i][j].push(currentIndex)
				++currentIndex;
			}
		}
	}
	const topIndex = currentIndex
	++currentIndex
	for(let i=0; i<3; ++i)
		faceIndices[i][qr] = [topIndex]
	for(let i=0; i<3; ++i)
		for(let j=0; j<qr; ++j)
			faceIndices[i][j].push(faceIndices[(i+1)%3][j][0])
	faceIndices[3] = [faceIndices[0][0].slice()]
	for(let i=1; i<=qr; ++i)
		faceIndices[3][i] = [faceIndices[2][0][qr-i]]
	for(let i=1; i<qr-1; ++i) {
		for(let j=1; j<qr-i; ++j) {
			faceIndices[3][i].push(currentIndex)
			++currentIndex
		}
	}
	for(let i=1; i<qr; ++i)
		faceIndices[3][i].push(faceIndices[1][0][i])
	return [currentIndex, faceIndices]
}

function setFacePositions(vertexA, vertexB, vertexC, faceIndices, positions) {
	const topVector = vertexC.sub(vertexA)
	const rightVector = vertexB.sub(vertexA)
	const scale = 1/(faceIndices.length-1)
	for(const i in faceIndices)
		for(const j in faceIndices[i])
			positions[faceIndices[i][j]] = topVector
				.scale(i)
				.sum(rightVector.scale(j))
				.scale(scale)
				.sum(vertexA)
}

function createTetrahedralGraph(power = 10) {
	const [total, faceIndices] = createIndices(power)
	const sin = Math.sin(1/6*Math.PI)
	const cos = Math.cos(1/6*Math.PI)
	const vertices = [
		new Vector(0,cos,-sin),
		new Vector(cos,-sin,-sin),
		new Vector(-cos,-sin,-sin),
		new Vector(0,0,1),
	]
	const positions = []
	positions.length = total
	setFacePositions(vertices[0],vertices[1],vertices[3],faceIndices[0],positions)
	setFacePositions(vertices[1],vertices[2],vertices[3],faceIndices[1],positions)
	setFacePositions(vertices[2],vertices[0],vertices[3],faceIndices[2],positions)
	setFacePositions(vertices[0],vertices[1],vertices[2],faceIndices[3],positions)
	const edges = []
	for(const face of faceIndices.slice(0,3)) {
		for(let i=0; i<face.length-1; ++i) {
			edges.push([face[i][0],face[i+1][0]])
			edges.push([face[0][i],face[0][i+1]])
		}
	}
	for(const face of faceIndices) {
		for(const row of face.slice(1))
			for(let i=0; i<row.length-1; ++i)
				edges.push([row[i],row[i+1]])
		for(let i=0; i<face.length-1; ++i) {
			for(let j=1; j<face[i].length-1; ++j) {
				edges.push([face[i][j],face[i+1][j-1]])
				edges.push([face[i][j],face[i+1][j]])
			}
		}
	}
	return [positions,edges]
}

export { createTetrahedralGraph }
