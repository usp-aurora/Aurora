import styled from 'styled-components';

const Body = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: wrap-content;
`;

export default function GroupDiscipline() {
    return (
    <Body>
        <div style={{"width": "18em"}}>
            Materia
        </div>
    </Body>
    );
}