function addDragOverlay() {
	if(document.getElementById("drag-overlay") == null) {
		const dragOverlay = document.createElement("div");
		dragOverlay.id = "drag-overlay";
		dragOverlay.style = `
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 9999;
			background-color: transparent;
			cursor: grabbing;
		`;
		document.body.appendChild(dragOverlay);
	}
}

function removeDragOverlay() {
	const dragOverlay = document.getElementById("drag-overlay");
	if(dragOverlay != null)
		dragOverlay.remove();
}

function getHandleResize(setSize, outerDiv) {
	return function(e) {
		const width = (outerDiv.current ? outerDiv.current.clientWidth : 0);
		const height = (outerDiv.current ? outerDiv.current.clientHeight : 0);
		setSize({width, height});
	}
}

function getHandleMouseDown(mouseDown, dragStart, origin) {
	return function(e) {
		mouseDown.current = true;
		dragStart.current = { x: origin.x+e.clientX, y: origin.y+e.clientY };
		addDragOverlay();
	}
}

function getHandleMouseMove(
	setOrigin,
	setPositions,
	startUpdate,
	mouseDown,
	alphaNode,
	dragStart,
	alphaStart,
) {
	return function(e) {
		e.preventDefault();
		if(mouseDown.current) {
			const alpha = alphaNode.current; // alphaNode.current can become undefined
			if(alpha == undefined) {
				setOrigin({ x: dragStart.current.x-e.clientX, y: dragStart.current.y-e.clientY });
			}
			else {
				setPositions(positions => {
					const newPositions = new Map(positions);
					const alphaX = alphaStart.current.x+e.clientX;
					const alphaY = alphaStart.current.y+e.clientY;
					newPositions.set(alpha,{x:alphaX,y:alphaY});
					return newPositions;
				});
				startUpdate();
			}
		}
	};
}

function getHandleMouseLeave(mouseDown, alphaNode) {
	return function(e) {
		mouseDown.current = false;
		alphaNode.current = undefined;
		removeDragOverlay();
	};
}

function getHandleMouseUp(mouseDown, alphaNode) {
	return function(e) {
		mouseDown.current = false;
		alphaNode.current = undefined;
		removeDragOverlay();
	};
}

function getHandleMouseDownNode(alphaNode, alphaStart, key, pos) {
	return function(e) {
		e.preventDefault();
		alphaNode.current = key;
		alphaStart.current = { x: pos.x-e.clientX, y: pos.y-e.clientY };
	};
}

function handleTouch(e) {
	const touches = e.changedTouches;
	const first = touches[0];

	const type = (
		e.type == "touchstart" ? "mousedown" :
		e.type == "touchmove" ? "mousemove" :
		"mouseup"
	);

	const simulatedEvent = document.createEvent("MouseEvent");
	simulatedEvent.initMouseEvent(
		type, true, true, window, 1,
		first.screenX, first.screenY,
		first.clientX, first.clientY, false,
		false, false, false, 0, null,
	);

	first.target.dispatchEvent(simulatedEvent);
}

export {
	getHandleResize,
	getHandleMouseDown,
	getHandleMouseMove,
	getHandleMouseLeave,
	getHandleMouseUp,
	getHandleMouseDownNode,
	handleTouch,
};
