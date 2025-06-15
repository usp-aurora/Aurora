function IslandView(contour, fill = "green", radius = 100, doRound = false, noise, treshhold) {
	this.el = document.createElementNS("http://www.w3.org/2000/svg", "path")
	this.el.setAttribute("stroke", "none")
	this.el.setAttribute("fill", fill)
	const sradius = scale(1)

	function scale(value) {
		return doRound ? Math.round(value*radius*100)/100 : value*radius
	}

	function round(value) {
		return doRound ? Math.round(value*radius) : value*radius
	}

	function getBorderPosition(positionA, positionB) {
		const positionD = positionB.sub(positionA)
		const borderPosition = positionA.sum(positionD.scale(positionA[2]/(positionA[2]-positionB[2])))
		return borderPosition.normalize()
	}

	function getAngle(position) {
		return position[1] < 0 ? Math.acos(-position[0]) : Math.acos(position[0]) + Math.PI
	}

	function createInnerIslandPathString(island) {
		const last = island[island.length-1]
		return `M${round(last[0])} ${round(last[1])} ` + island.map(
			position => `L${round(position[0])} ${round(position[1])}`
		).join("")
	}
	
	function createBorderIslandPathString(island, startPosition, endPosition, nextPosition) {
		const endAngle = getAngle(endPosition)
		const nextAngle = getAngle(nextPosition)
		let deltaAngle = nextAngle - endAngle
		if(deltaAngle < 0)
			deltaAngle += 2*Math.PI
		const large = Math.PI < deltaAngle ? 1 : 0
		return island.map(position => `L${round(position[0])} ${round(position[1])}`).join("")  +
			`L${scale(endPosition[0])} ${scale(endPosition[1])}` +
			`A${sradius} ${sradius} 0 ${large} 1 ${scale(nextPosition[0])} ${scale(nextPosition[1])}`
	}

	this.draw = function(rotation, borderVertex) {
		const islands = rotation
			? contour.map(island => island.map(position => rotation.multiply(position)))
			: contour
		const innerIslands = []
		const borderIslands = []
		const extremes = []
		const events = []
		// define innerIslands and borderIslands
		for(const island of islands) {
			let origin = undefined
			for(let i = 0; i < island.length; ++i) {
				if(island[i][2] < 0) {
					origin = i
					break
				}
			}
			if(origin == undefined)
				innerIslands.push(island)
			else {
				let currentIsland = undefined
				let preStart = origin
				for(let j = 1; j <= island.length; ++j) {
					const i = (origin+j)%island.length
					if(island[i][2] < 0) {
						if(currentIsland != undefined) {
							const startPosition = getBorderPosition(island[preStart], currentIsland[0])
							const endPosition = getBorderPosition(currentIsland[currentIsland.length-1], island[i])
							extremes.push([startPosition, endPosition])
							events.push([getAngle(startPosition), 0, borderIslands.length])
							events.push([getAngle(endPosition), 1, borderIslands.length])
							borderIslands.push(currentIsland)
							currentIsland = undefined
						}
						preStart = i
					}
					else {
						if(currentIsland == undefined)
							currentIsland = []
						currentIsland.push(island[i])
					}
				}
			}
		}
		const pathPieces = []
		for(const island of innerIslands)
			pathPieces.push(createInnerIslandPathString(island))
		if(borderIslands.length != 0) {
			const visited = borderIslands.map(() => false)
			const next = []
			next.length = borderIslands.length
			events.sort()
			// define, for each border island, the next one
			// the next island may be the island itself
			// it can be proven that the events alternate between entrance (0) and exit (1)
			// the loop should start in an exit event
			for(let i = (events[0][1] == 1 ? 0 : 1); i < events.length; i += 2)
				next[events[i][2]] = events[(i+1)%events.length][2]
			// dfs trough the islands to draw them
			for(let i = 0; i < borderIslands.length; ++i) {
				let islandIdx = i
				if(!visited[islandIdx]) {
					const startPosition = extremes[islandIdx][0]
					pathPieces.push(`M${scale(startPosition[0])} ${scale(startPosition[1],)}`)
				}
				while(!visited[islandIdx]) {
					visited[islandIdx] = true
					pathPieces.push(createBorderIslandPathString(
						borderIslands[islandIdx],
						...extremes[islandIdx],
						extremes[next[islandIdx]][0],
						radius,
					))
					islandIdx = next[islandIdx]
				}
			}
		}
		else {
			if(noise[borderVertex] > treshhold) {
				pathPieces.push(`M${sradius} 0`)
				pathPieces.push(`A${sradius} ${sradius} 0 1 1 ${-sradius} 0`)
				pathPieces.push(`A${sradius} ${sradius} 0 1 1 ${sradius} 0`)
			}
		}
		this.el.setAttribute("d", pathPieces.join(""))
	}
}

export default IslandView
