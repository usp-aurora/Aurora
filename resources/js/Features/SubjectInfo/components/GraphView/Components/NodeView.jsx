import { styled } from "@mui/material";

const NodeContainerView = styled("div")({
	position: "absolute",
	touchAction: "none",
});

function NodeView({x=0,y=0,children,scale=1,isDragging=false, ...props}) {
	return (
		<NodeContainerView
			style={{
				transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`,
				cursor: `${isDragging ? "grabbing" : "grab"}`,
			}}
			{...props}
		>
			{children}
		</NodeContainerView>
	);
}

export default NodeView;