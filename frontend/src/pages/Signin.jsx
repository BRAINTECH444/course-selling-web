import { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atoms/user';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleSignin = async () => {
    const url = role === 'admin' ? '/admin/signin' : '/user/signin';
    try {
      const response = await axios.post(url, { email, password });
      localStorage.setItem('token', response.data.token);
      setUser({ user: email, role: role, loggedIn: true });
      if (role === 'admin') {
        navigate('/my-courses');
      } else {
        navigate('/all-courses');
      }
    } catch (error) {
      console.error('Signin failed:', error);
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignin}>Signin</button>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
};

export default Signin;
