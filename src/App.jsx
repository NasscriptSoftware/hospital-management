import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './components/Home/LandingPage'
import EmployeePage from './components/Home/EmployeePage'
import HospitalPage from './components/Home/HospitalSections/HospitalPage';
import Layout from './components/Layout';


function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/hospital" element={<HospitalPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
