import styled from 'styled-components';

const NodeContainerView = styled.div`
	position: absolute;
`

function NodeView({x=0,y=0,onMouseDown,children}) {
	return (
		<NodeContainerView
			style={{
				transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
			}}
			onMouseDown={onMouseDown}
		>
			{children}
		</NodeContainerView>
	)
}

export default NodeView

