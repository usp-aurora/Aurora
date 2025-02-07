import styled from 'styled-components';
import GroupCriteria from './GroupCriteria';
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

const FormWrap = styled.div`
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
  width: 100%;

  padding: 0.4em;

  border: none;
  font-size: 100%;  
  text-align: left;

  align-items: start;
  justify-content: start;
  background: white;
`;

const Sacrifice = styled.button`
  height: fit-content;
  width: fit-content;

  font-size: .9em;

  padding: .2em .6em 0 .8em;

  border: none;

  align-items: center;
  justify-content: center;
  background: none;
`;

const Wrapper = styled.div`
  display: flex;
  height: wrap-content;
  width: wrap-content;
  flex-direction: row;

  border: none;
  margin: .2em;

  align-items: left;
  justify-content: left;
  background-color: none;
`;

export default function GroupCriteriaList() {
    const children = useRef([]);
    const [counter, setCounter] = useState(0);
    const [target, setTarget] = useState(-7);

    function remove(id) {
      setTarget(id);
    }

    function getRemainingChildren() {
      if (target !== -7) {
        let survivors = children.current.filter((child) => child.key != target);
        // console.log(children.current);
        // console.log(survivors);
        // console.log(target)
        children.current = survivors;
      }
      return children;
    }

    function addCriteria() {
      let copy = children.current.slice();
      copy.push(
        <Wrapper key={counter}>
          <GroupCriteria />
          <Sacrifice onClick={() => remove(counter)}>x</Sacrifice>
        </Wrapper>
      );
      children.current = copy;
      setCounter(counter + 1);
    }

    // Mudar a lista de config para lista de componentes

    return <Container>
      <FormWrap>
       {getRemainingChildren().current}

      </FormWrap>
      <Add onClick={ () => addCriteria() } > + Adicionar Critério </Add>

    </Container>
}