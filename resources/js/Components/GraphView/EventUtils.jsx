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

function getHandleMouseDown(mouseDown, dragStart, origin, zoomRef, sizeRef, outerDiv) {
	return function(e) {
		mouseDown.current = true;
		
		// Get mouse position relative to the container
		const rect = outerDiv?.current?.getBoundingClientRect();
		if (!rect) return;
		
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		
		// Store the initial drag position in screen coordinates relative to center
		dragStart.current = { 
			x: mouseX - sizeRef.current.width / 2, 
			y: mouseY - sizeRef.current.height / 2,
			originX: origin.x,
			originY: origin.y
		};
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
	zoomRef,
	sizeRef,
	originRef,
	outerDiv,
) {
	return function(e) {
		e.preventDefault();
		if(mouseDown.current) {
			const alpha = alphaNode.current;
			if(alpha == undefined) {
				// Screen panning - get current mouse position relative to container
				const rect = outerDiv?.current?.getBoundingClientRect();
				if (!rect) return;
				
				const mouseX = e.clientX - rect.left;
				const mouseY = e.clientY - rect.top;
				
				// Calculate screen coordinates relative to center
				const currentScreenX = mouseX - sizeRef.current.width / 2;
				const currentScreenY = mouseY - sizeRef.current.height / 2;
				
				// Calculate the delta in world coordinates
				const deltaWorldX = (currentScreenX - dragStart.current.x) / zoomRef.current;
				const deltaWorldY = (currentScreenY - dragStart.current.y) / zoomRef.current;
				
				// Update origin by the world delta
				setOrigin({ 
					x: dragStart.current.originX - deltaWorldX, 
					y: dragStart.current.originY - deltaWorldY 
				});
			}
			else {
				if (!outerDiv?.current) return;
				
				const rect = outerDiv.current.getBoundingClientRect();
				if (!rect) return;
				
				const mouseX = e.clientX - rect.left;
				const mouseY = e.clientY - rect.top;
				
				const currentSize = sizeRef.current;
				const currentOrigin = originRef.current;
				
				const worldMouseX = (mouseX - currentSize.width / 2) / zoomRef.current + currentOrigin.x;
				const worldMouseY = (mouseY - currentSize.height / 2) / zoomRef.current + currentOrigin.y;
				
				setPositions(positions => {
					const newPositions = new Map(positions);
					const alphaX = worldMouseX + alphaStart.current.x;
					const alphaY = worldMouseY + alphaStart.current.y;
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

function getHandleMouseDownNode(alphaNode, alphaStart, key, pos, zoomRef, sizeRef, originRef, outerDiv) {
	return function(e) {
		e.preventDefault();
		alphaNode.current = key;
		
		if (!outerDiv?.current) return;
		
		const rect = outerDiv.current.getBoundingClientRect();
		if (!rect) return;
		
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		
		const currentSize = sizeRef.current;
		const currentOrigin = originRef.current;
		
		const worldMouseX = (mouseX - currentSize.width / 2) / zoomRef.current + currentOrigin.x;
		const worldMouseY = (mouseY - currentSize.height / 2) / zoomRef.current + currentOrigin.y;
		
		alphaStart.current = { 
			x: pos.x - worldMouseX, 
			y: pos.y - worldMouseY 
		};
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
