function getHandleResize(setSize, outerDiv) {
    return function (e) {
        const width = outerDiv.current ? outerDiv.current.clientWidth : 0;
        const height = outerDiv.current ? outerDiv.current.clientHeight : 0;
        setSize({ width, height });
    };
}

function getHandleDrag(
    mouseDown,
    alphaNode,
    zoom,
    dragStart,
    setIsDraggingBackground,
    graphOrigin,
    setGraphOrigin
) {
    return function ({ pinching, cancel, movement: [mx, my], first }) {
        if (pinching) return cancel();

        if (first) {
            mouseDown.current = true;
            setIsDraggingBackground(true);
            dragStart.current = {
                x: graphOrigin.x - mx / zoom,
                y: graphOrigin.y - my / zoom,
            };
        }

        if (mouseDown.current && !alphaNode.current) {
            setGraphOrigin({
                x: dragStart.current.x - mx / zoom,
                y: dragStart.current.y - my / zoom,
            });
        }
    };
}

function getHandleDragEnd(mouseDown, setIsDraggingBackground) {
    return function () {
        mouseDown.current = false;
        setIsDraggingBackground(false);
    };
}

function getHandleWheel(
    outerDiv,
    outerDivSize,
    zoom,
    setZoom,
    calculateNewZoom,
    graphOrigin,
    setGraphOrigin
) {
    return function ({ event, delta: [, deltaY] }) {
        const zoomSpeed = 0.0005;
        const deltaZoom = -deltaY * zoomSpeed;
        const newZoom = calculateNewZoom(zoom + deltaZoom);

        if (Math.abs(newZoom - zoom) < 0.001) return;

        const rect = outerDiv.current?.getBoundingClientRect();
        if (!rect) return;

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const screenX = mouseX - outerDivSize.width / 2;
        const screenY = mouseY - outerDivSize.height / 2;

        const worldX = screenX / zoom + graphOrigin.x;
        const worldY = screenY / zoom + graphOrigin.y;

        const newOriginX = worldX - screenX / newZoom;
        const newOriginY = worldY - screenY / newZoom;

        setZoom(newZoom);
        setGraphOrigin({ x: newOriginX, y: newOriginY });
    };
}

function getHandlePinch(
    outerDiv,
    outerDivSize,
    zoom,
    setZoom,
    calculateNewZoom,
    graphOrigin,
    setGraphOrigin
) {
    return function ({ offset: [scale], origin: [ox, oy], first, memo }) {
        if (first) {
            const rect = outerDiv.current?.getBoundingClientRect();
            if (!rect) return {};

            const newMemo = {
                initialZoom: zoom,
                centerX: ox - rect.left,
                centerY: oy - rect.top,
                initialOrigin: { ...graphOrigin },
            };

            return newMemo;
        }

        if (!memo) {
            return {};
        }

        const newZoom = calculateNewZoom(scale);

        const screenX = memo.centerX - outerDivSize.width / 2;
        const screenY = memo.centerY - outerDivSize.height / 2;

        const worldX = screenX / memo.initialZoom + memo.initialOrigin.x;
        const worldY = screenY / memo.initialZoom + memo.initialOrigin.y;

        const newOriginX = worldX - screenX / newZoom;
        const newOriginY = worldY - screenY / newZoom;
        const newOrigin = { x: newOriginX, y: newOriginY };

        setZoom(newZoom);
        setGraphOrigin(newOrigin);

        return memo;
    };
}

function getHandleDragNode(
    interactive,
    alphaNode,
    alphaStart,
    nodeKey,
    nodePos,
    setIsDraggingNode,
    zoom,
    startUpdate,
    setPositions
) {
    return function ({ pinching, cancel, movement: [mx, my], first, active }) {
        if (pinching) return cancel();

        if (!interactive) return;

        if (first) {
            alphaNode.current = nodeKey;
            setIsDraggingNode(true);
            alphaStart.current = {
                x: nodePos.x - mx / zoom,
                y: nodePos.y - my / zoom,
            };
        }

        if (active && alphaNode.current === nodeKey) {
            setPositions((positions) => {
                const newPositions = new Map(positions);
                newPositions.set(nodeKey, {
                    x: alphaStart.current.x + mx / zoom,
                    y: alphaStart.current.y + my / zoom,
                });
                return newPositions;
            });
            startUpdate();
        }

        if (!active) {
            alphaNode.current = undefined;
            setIsDraggingNode(false);
        }
    };
}

export { getHandleResize, getHandleDrag, getHandleDragEnd, getHandleWheel, getHandlePinch, getHandleDragNode };
