import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Project from './views/Project';
import ProjectDetail from './views/Project/ProjectDetail';
import WorkSpace from './views/WorkSpace';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project-detail" element={<ProjectDetail />} />
        <Route path="/WorkSpace" element={<WorkSpace />} />
      </Routes>
    </Router>
  );
}
