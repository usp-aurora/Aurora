import Mandatory from '../../Components/AdminFormObrigatoriasOptativas/Course/Mandatory';
import Header from '../../Components/Header/Header';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'lightblue' }}>
      <div>
        <Header />
      </div>
      <Mandatory components={[]} />
    </div>
  );
}