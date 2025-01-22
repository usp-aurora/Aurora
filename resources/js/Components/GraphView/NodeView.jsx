import styled from 'styled-components';

const NodeContainerView = styled.div`
	position: absolute;
    transform: ${({ xTranslation, yTranslation }) => `translate(${xTranslation}px, ${yTranslation}px) translate(-50%, -50%)`};
`

function NodeView({x=0,y=0,onMouseDown,children}) {
	return (
		<NodeContainerView
			xTranslation={x}
			yTranslation={y}
			onMouseDown={onMouseDown}
		>
			{children}
		</NodeContainerView>
	)
}

export default NodeView

