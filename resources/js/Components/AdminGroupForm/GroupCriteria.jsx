import styled from 'styled-components';

const Body = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: wrap-content;
`;

const QuantSelector = styled.select`
    width: 8em;
`;

const TypeSelector = styled.select`
    width: 100%;
`;

export default function GroupCriteria() {
    const quantidades = [["todos", "Todos"], ["minimo", "Mínimo"]];
    const tipos = [["modulos", "Módulos"], ["creditos", "Créditos"]];

    return (
    <Body>
        <div style={{"width": "18em"}}>
            Critério de conclusão: &nbsp;
        </div>
        <QuantSelector>
        {
            quantidades.map((quant) => (<option value={quant[0]}>{quant[1]}</option>))
        }
        </QuantSelector>
        &nbsp;
        <TypeSelector>
        {
            tipos.map((tipo) => (<option value={tipo[0]}>{tipo[1]}</option>))
        }
        </TypeSelector>
    </Body>
    );
}