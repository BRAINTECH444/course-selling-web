import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/user';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { role } = useRecoilValue(userState);

  useEffect(() => {
    const fetchCourses = async () => {
      const url = role === 'admin' ? '/admin/courses' : '/user/purchasedCourses';
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCourses(response.data.courses || response.data.purchasedCourses || []);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, [role]);

  return (
    <div>
      <h2>My Courses</h2>
      {role === 'admin' && <button onClick={() => navigate('/create-course')}>Create New Course</button>}
      <div>
        {courses.map(course => (
          <div key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Price: {course.price}</p>
            {role === 'admin' && (
              <button onClick={() => navigate(`/update-course/${course._id}`)}>Update</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
