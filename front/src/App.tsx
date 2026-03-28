import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin';
import { ThemeProvider } from './components/ui/theme-provider';
import NotFound from './pages/NotFound';

export default function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/signin' element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

