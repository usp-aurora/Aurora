function NodeView({x=0,y=0,onMouseDown,children}) {
	return (
		<div
			className = "node"
			style = {{ transform: `translate(${x}px,${y}px) translate(-50%,-50%)` }}
			onMouseDown={onMouseDown}
		>
			{children}
		</div>	
	)
}

export default NodeView
