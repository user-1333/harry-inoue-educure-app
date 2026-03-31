import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Index from './pages/Index'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin';
import { ThemeProvider } from './components/ui/theme-provider';
import NotFound from './pages/NotFound';
import Home from './pages/home/Home';
import LeaveRequest from './pages/home/LeaveRequest';
import LeaveApproval from './pages/home/LeaveApproval';
import Modification from './pages/home/Modification';
import History from './pages/home/History';
import ProtectedRoute from './components/ProtectedRoute';
import UserControl from './pages/home/UserControl';

export default function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Index />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path='home' element={<Home />} />
              <Route path='leave-request' element={<LeaveRequest />} />
              <Route path='leave-approval' element={<LeaveApproval />} />
              <Route path='modification' element={<Modification />} />
              <Route path='history' element={<History />} />
              <Route path='user-control' element={<UserControl />} />
            </Route>
          </Route>
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/signin' element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

