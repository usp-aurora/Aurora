import { DragOverlay } from "@dnd-kit/core";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
import SubjectCard from "../../ui/Card/SubjectCard";

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
