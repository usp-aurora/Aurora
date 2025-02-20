import Criteria from '../Criteria/Criteria';
import Subject from '../Subject/Subject';

export default function Details() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 0.75}}>
            <Criteria />
            <Subject />
        </div>
    );
}