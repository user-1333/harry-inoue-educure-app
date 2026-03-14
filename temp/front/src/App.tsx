import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Signin from './pages/auth/signin';
import { ThemeProvider } from './components/theme-provider';
import Home from './pages/dashboard/Home';
import NotFound from './pages/NotFound';

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" children={undefined}>
        
      </ThemeProvider>
      <Router>
        <Routes>
          < Route path="/auth/login" element={<Login />} />
          < Route path="/auth/signin" element={<Signin />} />
          < Route path="/dashboard" element={<Home />} />
          < Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
