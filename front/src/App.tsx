import './App.css'
import { Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { ActiveDisasters } from './pages/ActiveDisasters';
import { UnderConstruction } from './pages/UnderConstruction';
import { ResourceOptimization } from './pages/ResourceOptimization';

function App() {
  const { resourceOptimizationModule, preparednessResources, activeDisasters } = useFlags();
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {activeDisasters && <Route path="/disasters" element={<ActiveDisasters />} />}
        {preparednessResources && <Route path="/preparedness" element={<UnderConstruction />} />}
        {resourceOptimizationModule && <Route path="/resources" element={<ResourceOptimization />} />}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
