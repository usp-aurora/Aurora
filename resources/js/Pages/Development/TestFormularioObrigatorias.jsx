import Course from '../../Components/AdminFormObrigatoriasOptativas/Course/Course';

export default function App() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      justifyContent: 'center', 
      alignItems: 'center', 
      opacity: 0.75, 
      background: 'var(--color-escala-de-cinza-cinza-3, #212121)', 
      backgroundColor: 'lightblue',
    }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Course components={[]} />
      </div>
    </div>
  );
}

