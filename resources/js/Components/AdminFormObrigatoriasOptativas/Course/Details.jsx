/* Details is the component that combines both the Criteria and the Subject of a group */


import Criteria from '../Criteria/Criteria';
import Subject from '../Subject/Subject';


/* Details component */
const Details = ({ onChangeCriteria, onChangeSubjects }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Criteria onChange={onChangeCriteria} />
            <Subject onChange={onChangeSubjects} />
        </div>
    );
};

export default Details;
