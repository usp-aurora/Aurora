import { DragOverlay } from "@dnd-kit/core";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
import Card from "../Atomsold/Card";
import CardContentCourse from "../Atomsold/CardContentCourse";

function DragOverlayComponent({ course }) {
  return (
    <DragOverlay modifiers={[snapCenterToCursor, restrictToWindowEdges]}>
      {course ? (
        <Card colors={course.colors}>
          <CardContentCourse
            pokeball={course.pokeball}
            courseCode={course.code}
            courseTitle={course.title}
            pokemonURL="/pokemons/ditto.png"
          />
        </Card>
      ) : null}
    </DragOverlay>
  );
}

export default DragOverlayComponent;
