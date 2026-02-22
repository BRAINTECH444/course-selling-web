import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCourse = () => {
  const { courseId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/course/${courseId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const { title, description, price } = response.data.course;
        setTitle(title);
        setDescription(description);
        setPrice(price);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleUpdateCourse = async () => {
    try {
      await axios.put('/admin/course', 
        { courseId, title, description, price },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/my-courses');
    } catch (error) {
      console.error('Course update failed:', error);
    }
  };

  return (
    <div>
      <h2>Update Course</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button onClick={handleUpdateCourse}>Update Course</button>
    </div>
  );
};

export default UpdateCourse;
