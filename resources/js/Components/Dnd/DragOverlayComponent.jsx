import { DragOverlay } from "@dnd-kit/core";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
import SubjectCard from "../Atoms/Card/SubjectCard";

function DragOverlayComponent({ subject }) {
  return (
    <DragOverlay modifiers={[snapCenterToCursor, restrictToWindowEdges]}>
      {subject ? (
        <SubjectCard
          courseCode={subject.code}
          courseTitle={subject.name}
          planetURL="/icons/planeta.png"
        />
      ) : null}
    </DragOverlay>
  );
}

export default DragOverlayComponent;
