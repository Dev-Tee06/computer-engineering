import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Members from './pages/Members';
import StudentProfile from './pages/StudentProfile';
import AssignmentDetail from './pages/AssignmentDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                    element={<Home />} />
        <Route path="/members"             element={<Members />} />
        <Route path="/members/:id"         element={<StudentProfile />} />
        <Route path="/animations/:id"      element={<AssignmentDetail />} />
        <Route path="/about"               element={<About />} />
        <Route path="/404"                 element={<NotFound />} />
        <Route path="*"                    element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
