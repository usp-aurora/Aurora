import { DragOverlay } from "@dnd-kit/core";
import SubjectCard from "../Atoms/Card/SubjectCard";

function DragOverlayComponent({ subject }) {
  return (
    <DragOverlay>
      {subject ? (
        <SubjectCard
          subjectCode={subject.code}
          subjectName={subject.name}
          planetURL="/icons/planeta.png"
        />
      ) : null}
    </DragOverlay>
  );
}

export default DragOverlayComponent;
