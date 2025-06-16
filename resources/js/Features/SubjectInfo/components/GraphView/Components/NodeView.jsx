import { styled } from "@mui/material";

const NodeContainerView = styled("div")({
	position: "absolute",
});

function NodeView({x=0,y=0,onMouseDown,children,scale=1}) {
	return (
		<NodeContainerView
			style={{
				transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`,
			}}
			onMouseDown={onMouseDown}
		>
			{children}
		</NodeContainerView>
	);
}

export default NodeView;