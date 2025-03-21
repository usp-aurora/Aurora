import { DragOverlay } from "@dnd-kit/core";
import SubjectCard from "../Atoms/Card/SubjectCard";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";

function SubjectOverlay({ subject }) {
  return (
    <DragOverlay modifiers={[snapCenterToCursor, restrictToWindowEdges]}>
      {subject ? (
        <SubjectCard
          subjectCode={subject.code}
        />
      ) : null}
    </DragOverlay>
  );
}

export default SubjectOverlay;
