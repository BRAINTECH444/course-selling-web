import { useEffect, useState } from 'react';
import axios from 'axios';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/course/all', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handlePurchase = async (courseId) => {
    try {
      await axios.post('/course/purchase', 
        { courseId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Course purchased successfully!');
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <div>
      <h2>All Courses</h2>
      <div>
        {courses.map(course => (
          <div key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Price: {course.price}</p>
            <button onClick={() => handlePurchase(course._id)}>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
