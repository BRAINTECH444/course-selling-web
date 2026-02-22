import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Course Selling Website</h1>
      <div>
        <h2>Are you an Admin or a User?</h2>
        <button onClick={() => navigate('/signin')}>Admin</button>
        <button onClick={() => navigate('/signin')}>User</button>
      </div>
    </div>
  );
};

export default Landing;
