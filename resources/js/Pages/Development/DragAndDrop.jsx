import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  min-height: 200px;
  border: 2px dashed #ccc;
  margin: 20px;
  padding: 10px;
  display: inline-block;
  vertical-align: top;
`;

const DraggableItem = styled.div`
  padding: 10px;
  margin: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const DragAndDrop = () => {
  const [items, setItems] = useState({
    container1: ['Item 1', 'Item 2'],
    container2: ['Item 3', 'Item 4'],
  });

  const onDragStart = (event, item, fromContainer) => {
    event.dataTransfer.setData('text/plain', item);
    event.dataTransfer.setData('fromContainer', fromContainer);
  };

  const onDrop = (event, toContainer) => {
    const item = event.dataTransfer.getData('text/plain');
    const fromContainer = event.dataTransfer.getData('fromContainer');

    if (fromContainer !== toContainer) {
      setItems((prevItems) => {
        const fromItems = prevItems[fromContainer].filter(i => i !== item);
        const toItems = [...prevItems[toContainer], item];

        return {
          ...prevItems,
          [fromContainer]: fromItems,
          [toContainer]: toItems,
        };
      });
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Container onDrop={(e) => onDrop(e, 'container1')} onDragOver={onDragOver}>
        {items.container1.map(item => (
          <DraggableItem
            key={item}
            draggable
            onDragStart={(e) => onDragStart(e, item, 'container1')}
          >
            {item}
          </DraggableItem>
        ))}
      </Container>
      <Container onDrop={(e) => onDrop(e, 'container2')} onDragOver={onDragOver}>
        {items.container2.map(item => (
          <DraggableItem
            key={item}
            draggable
            onDragStart={(e) => onDragStart(e, item, 'container2')}
          >
            {item}
          </DraggableItem>
        ))}
      </Container>
    </div>
  );
};

export default DragAndDrop;
