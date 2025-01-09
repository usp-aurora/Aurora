function getAdjacencyLists(nodes,links) {
	const inLists = new Map(Array.from(nodes.keys(), key => [key,[]]))
	const outLists = new Map(Array.from(nodes.keys(), key => [key,[]]))
	for(const [key,link] of links) {
		outLists.get(link.a).push(link.b)
		inLists.get(link.b).push(link.a)
	}
	return [inLists,outLists]
}

// assumes a directed acyclic graph
function getLayers(inLists, outLists, root) {
	const counters = new Map(Array.from(inLists.keys(), key => [key,0]))
	const layers = new Map()

	// BFS
	let stack = [[root,false],[root,true]]
	while(stack.length > 0) {
		const newStack = []
		while(stack.length > 0) {
			const [node,foward] = stack.pop()
			const list = (foward ? outLists : inLists).get(node)
			for(const otherNode of list) {
				const counter = counters.get(otherNode)
				if(counter == 0) {
					newStack.push([otherNode,foward])
				}
				counters.set(otherNode,counter+1)
			}
		}
		stack = newStack
	}

	// topological sorting
	layers.set(root,0)
	stack = [[root,false],[root,true]]
	while(stack.length > 0) {
		const newStack = []
		while(stack.length > 0) {
			const [node,foward] = stack.pop()
			const list = (foward ? outLists : inLists).get(node)
			for(const otherNode of list) {
				const counter = counters.get(otherNode)
				if(counter == 1) {
					layers.set(otherNode,layers.get(node)+(foward ? 1 : -1))
					newStack.push([otherNode,foward])
				}
				counters.set(otherNode,counter-1)
			}
		}
		stack = newStack
	}

	return layers
}

export { getAdjacencyLists, getLayers }
