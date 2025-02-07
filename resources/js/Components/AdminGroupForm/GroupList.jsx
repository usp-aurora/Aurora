import styled from 'styled-components';
import Group from './Group';
import GroupDiscipline from './GroupDiscipline';
import { useRef, useState } from 'react';

const Container = styled.div`
  display: flex;
  height: wrap-content;
  width: auto;
  flex-direction: column;

  border: none;

  align-items: left;
  justify-content: center;
  background-color: none;
`;

const GroupWrap = styled.div`
  display: flex;
  height: wrap-content;
  width: 100%;
  flex-direction: column;

  border: none;

  align-items: left;
  justify-content: center;
  background-color: none;
`;

const Add = styled.button`
  height: wrap-content;
  width: 50%;

  padding: 0.4em;

  border: none;
  font-size: 100%;  
  text-align: left;

  align-items: start;
  justify-content: start;
  background: white;
`;

const AddWrap = styled.div`
  display: flex;
  height: wrap-content;
  width: 100%;
  flex-direction: row;

  border: none;

  gap: .6em;

  align-items: left;
  justify-content: center;
  background-color: none;
`;

const Remove = styled.button`
  height: fit-content;
  width: fit-content;

  font-size: .9em;

  padding: 0.2em;

  border: none;

  align-items: center;
  justify-content: center;
  background: none;
`;

const Wrapper = styled.div`
  display: flex;
  height: wrap-content;
  width: wrap-content;
  flex-direction: column;

  border: none;

  align-items: left;
  justify-content: left;
  background-color: none;
`;

function getColor(colorState) {
  if (colorState) {
    return 'lightgrey';
  }
  return 'white';
}

export default function GroupList({ components, colorState }) {
  const children = useRef(components);
  const [counter, setCounter] = useState(0);
  const [target, setTarget] = useState(-7);

  function remove(id) {
    setTarget(id);
  }

  function getRemainingChildren() {
    let survivors;
    if (target !== -7) {
      /*
        O processo de remoção de elementos ocorre aqui na filtragem.
        setTarget define o id do alvo a ser removido e essa função é chamada
        na re-renderização, eliminando o alvo
      */
      survivors = children.current.filter((child) => child.key != target);
      children.current = survivors;
    }
    return children;
  }

  function addGroupChild() {
    let copy = children.current.slice();
    copy.push(
      <Group key={counter} removalHandler={() => remove(counter)} config={{name: "", obr: "obrigatorio"}} colorState={colorState} />
    );
    children.current = copy;
    console.log(children.current);
    setCounter(counter + 1);
  }

  function addDiscipline() {
    let copy = children.current.slice();
    copy.push(
      <Wrapper key={counter}>
        <Remove onClick={() => remove(counter)}>Remover</Remove>
        <GroupDiscipline />
      </Wrapper>
    );
    children.current = copy;
    setCounter(counter + 1);
  }

  return <Container>
    <GroupWrap>
      {
        // Por conta do modo como os elementos são renderizados usando essa Groupa,
        // não funciona se devolver .current direto do getRemainingChildren()
        getRemainingChildren().current 
      }

    </GroupWrap>
    <AddWrap>
      <Add onClick={ () => addGroupChild() } style={{backgroundColor: getColor(colorState)}}> +  Criar sub-grupo </Add>
      <Add onClick={ () => addDiscipline() } style={{backgroundColor: getColor(colorState)}}> +  Adicionar disciplina </Add>
    </AddWrap>

  </Container>
}