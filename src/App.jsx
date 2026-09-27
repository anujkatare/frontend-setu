import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import NewProject from './pages/NewProject'
import ProjectDetail from './pages/ProjectDetail'
import Questionnaire from './pages/Questionnaire'
import RiskOverview from './pages/RiskOverview'
import Alerts from './pages/Alerts'
import Assistant from './pages/Assistant'

function P({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<P><Dashboard /></P>} />
      <Route path="/projects" element={<P><Projects /></P>} />
      <Route path="/projects/new" element={<P><NewProject /></P>} />
      <Route path="/projects/:id" element={<P><ProjectDetail /></P>} />
      <Route path="/projects/:id/questionnaire" element={<P><Questionnaire /></P>} />
      <Route path="/risk" element={<P><RiskOverview /></P>} />
      <Route path="/alerts" element={<P><Alerts /></P>} />
      <Route path="/assistant" element={<P><Assistant /></P>} />
    </Routes>
  )
}
