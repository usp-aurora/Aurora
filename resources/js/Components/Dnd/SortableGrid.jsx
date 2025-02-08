import React from 'react';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

function SortableGrid ({ items, children, ...props }) {
  return (
   <SortableContext items={items} strategy={rectSortingStrategy} {...props}>
      {children}
   </SortableContext>
  );
};

export default SortableGrid;
