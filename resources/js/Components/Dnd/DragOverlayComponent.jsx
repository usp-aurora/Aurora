import { DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import Card from '../Atoms/Card';
import CardContentCourse from '../Atoms/CardContentCourse';

const DragOverlayComponent = ({ dragObject }) => {
    const CourseOverlay = ({course}) => {
        return (  
            <Card colors={course.colors}>
                <CardContentCourse 
                  pokeball={course.pokeball} 
                  courseCode={course.code} 
                  courseTitle={course.title} 
                  pokemonURL="/pokemons/ditto.png"
                />
            </Card> 
        );
    } 
  
    return (
        <DragOverlay modifiers={[restrictToWindowEdges]}>
            {dragObject ? <CourseOverlay course={dragObject.course} /> : null}
        </DragOverlay>
    );
};

export default DragOverlayComponent;
