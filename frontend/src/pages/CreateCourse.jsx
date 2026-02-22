import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleCreateCourse = async () => {
    try {
      await axios.post('/admin/course', 
        { title, description, price },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/my-courses');
    } catch (error) {
      console.error('Course creation failed:', error);
    }
  };

  return (
    <div>
      <h2>Create Course</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button onClick={handleCreateCourse}>Create Course</button>
    </div>
  );
};

export default CreateCourse;
