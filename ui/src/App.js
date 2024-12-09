import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import RoutesComponent from './routes'; 
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 


function App() {
  return (
    <PrimeReactProvider>
      <RoutesComponent /> 
    </PrimeReactProvider>
  );
}

export default App;
