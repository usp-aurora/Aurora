import Criteria from '../Criteria/Criteria';
import Subject from '../Subject/Subject';

export default function Details({ tipo, onChangeCriteria, onChangeSubjects }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Criteria tipo={tipo} onChange={onChangeCriteria} />
            <Subject tipo={tipo} onChange={onChangeSubjects} />
        </div>
    );
}
