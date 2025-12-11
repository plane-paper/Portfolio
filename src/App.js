import Portfolio from './components/portfolio';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Portfolio />
      <Analytics />
    </div>
  );
}

export default App;