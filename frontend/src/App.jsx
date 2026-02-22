import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import CreateCourse from './pages/CreateCourse';
import MyCourses from './pages/MyCourses';
import AllCourses from './pages/AllCourses';
import UpdateCourse from './pages/UpdateCourse';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route path="/update-course/:courseId" element={<UpdateCourse />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;