import Header from './components/layout/Header';
import Home from './pages/Home';
import Providers from './Providers';
import './App.css';

function App() {
  return (
    <Providers>
      <Header />
      <Home />
    </Providers>
  );
}

export default App;
