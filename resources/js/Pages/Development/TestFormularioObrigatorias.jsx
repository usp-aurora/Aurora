import Criteria from '../../Components/AdminFormObrigatoriasOptativas/Course/Details';
import Header from '../../Components/Header/Header';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'lightblue' }}>
      <div>
        <Header />
      </div>
      <Criteria components={[]} />
    </div>
  );
}