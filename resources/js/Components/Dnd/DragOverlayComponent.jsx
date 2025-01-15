import { DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import Card from '../Atoms/Card';
import CardContentCourse from '../Atoms/CardContentCourse';

const DragOverlayComponent = ({ course }) => {
    return (
        <DragOverlay modifiers={[restrictToWindowEdges]}>
            {course ? 
                <Card colors={course.colors}>
                    <CardContentCourse 
                        pokeball={course.pokeball} 
                        courseCode={course.code} 
                        courseTitle={course.title} 
                        pokemonURL="/pokemons/ditto.png"
                    />
                </Card> 
            : null}
        </DragOverlay>
    );
};

export default DragOverlayComponent;
