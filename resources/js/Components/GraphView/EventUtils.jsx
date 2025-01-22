function getHandleMouseDown(mouseDown, dragStart, origin) {
	return e => {
		mouseDown.current = true
		dragStart.current = { x: origin.x+e.clientX, y: origin.y+e.clientY }
	}
}

function getHandleMouseMove(
	setOrigin,
	setPositions,
	startUpdate,
	mouseDown,
	alphaNode,
	dragStart,
	alphaStart
) {
	return e => {
		e.preventDefault()
		if(mouseDown.current) {
			const alpha = alphaNode.current // alphaNode.current can become undefined
			if(alpha == undefined) {
				setOrigin({ x: dragStart.current.x-e.clientX, y: dragStart.current.y-e.clientY })
			}
			else {
				setPositions(positions => {
					const newPositions = new Map(positions)
					const alphaX = alphaStart.current.x+e.clientX
					const alphaY = alphaStart.current.y+e.clientY
					newPositions.set(alpha,{x:alphaX,y:alphaY})
					return newPositions
				})
				startUpdate()
			}
		}
	}
}

function getHandleMouseLeave(mouseDown, alphaNode) {
	return e => {
		mouseDown.current = false
		alphaNode.current = undefined
	}
}

function getHandleMouseUp(mouseDown, alphaNode) {
	return e => {
		mouseDown.current = false
		alphaNode.current = undefined
	}
}

function getHandleMouseDownNode(alphaNode, alphaStart, key, pos) {
	return e => {
		e.preventDefault()
		alphaNode.current = key
		alphaStart.current = { x: pos.x-e.clientX, y: pos.y-e.clientY }
	}
}

function handleTouch(e) {
	const touches = e.changedTouches
	const first = touches[0]

	const type = (
		e.type == "touchstart" ? "mousedown" :
		e.type == "touchmove" ? "mousemove" :
		"mouseup"
	)

	const simulatedEvent = document.createEvent("MouseEvent")
	simulatedEvent.initMouseEvent(
		type, true, true, window, 1,
		first.screenX, first.screenY,
		first.clientX, first.clientY, false,
		false, false, false, 0/*left*/, null
	)

	first.target.dispatchEvent(simulatedEvent)
}

export {
	getHandleMouseDown,
	getHandleMouseMove,
	getHandleMouseLeave,
	getHandleMouseUp,
	getHandleMouseDownNode,
	handleTouch
}
