import styled from 'styled-components';
import { useState } from 'react';
import GroupList from './GroupList';
import GroupCriteriaList from './GroupCriteriaList';
import GroupDescription from './GroupDescription';
import GroupType from './GroupType';

const Container = styled.div`
  display: flex;
  height: fit-content;
  width: auto;
  flex-direction: column;

  padding: .5em;
  margin-bottom: 0.8em;

  border: none;

  align-items: left;
  justify-content: center;
  background-color: white;
`;

const Head = styled.div`
  display: flex;
  height: fit-content;
  width: auto;
  flex-direction: row;

  align-items: center;
  justify-content: left;
  background-color: none;
`;

const Name = styled.input`
  display: flex;
  height: 1em;
  width: 100%;
  flex-direction: row;

  padding: .4em;
  margin-right: 0.6em;

  border: none;

  font-size: 1.2em;

  align-items: center;
  justify-content: left;
  background-color: lightgray;
`;

const Body = styled.div`
  display: flex;
  height: fit-content;
  width: 100%;
  flex-direction: column;

  margin-top: 0.6em;

  align-items: left;
  justify-content: center;
  background-color: white;
`;

const Collapser = styled.button`
  height: 1.4em;
  width: 1.4em;

  font-size: 1.2em;

  margin-left: auto;

  border: none;

  align-items: center;
  justify-content: center;
  background: none;
`;

const BigLine = styled.div`
  height: 1px;
  width: 100%;
  background: gray;
  margin: 1.2em 0 1.2em 0;
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


function getColor(colorState) {
  if (colorState) {
    return 'lightgrey';
  }
  return 'white';
}

export default function Group({ removalHandler, config, colorState }) {
  console.log(config);

  const [isBodyActive, setIsBodyActive] = useState(false);
  const [groupName, setGroupName] = useState(config.name); 

  return (
    <Container style={{backgroundColor: getColor(colorState)}}>
      <Head>
        <Remove onClick={() => removalHandler()}>X</Remove>
        <Name type='text' name='nameInput' value={groupName} style={{backgroundColor: getColor(!colorState)}} disabled={false} onChange={event => setGroupName(event.target.value)}></Name>
        <Collapser onClick={() => setIsBodyActive(!isBodyActive)}>
          {isBodyActive ? (<div>▽</div>) : (<div>◁</div>)}
        </Collapser>
      </Head>
      <Body style={isBodyActive ? {backgroundColor: getColor(colorState)} : {display: 'none'}}>
        <GroupDescription label='Descrição:' />
        <GroupType label='Obrigatoriedade:' options={[{label: 'Obrigatória', value: 'obrigatoria'}]} />
        <GroupCriteriaList />
        <BigLine />
        <GroupList components={[]} colorState={!colorState} />
      </Body>
    </Container>
  );
};