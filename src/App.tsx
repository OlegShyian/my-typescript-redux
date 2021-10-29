import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import AppRouter from './components/AppRouter';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;