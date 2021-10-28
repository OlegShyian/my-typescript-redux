import './App.css';
import NavBar from './components/NavBar';
import MainContent from './pages/MainContent';

const App: React.FC = () => {
  
  return (
    <div className="App">
      <NavBar />
      <MainContent/>
    </div>
  );
}

export default App;