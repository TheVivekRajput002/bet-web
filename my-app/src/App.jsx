import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import PanelChart from './Pages/PanelChart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/panel-chart/:cardId" element={<PanelChart />} />
    </Routes>
  );
}

export default App;