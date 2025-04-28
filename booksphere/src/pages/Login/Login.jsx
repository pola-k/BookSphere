import { Link,useNavigate } from 'react-router-dom'
import './Login.css'
import {useState} from "react";
import axios from "axios";
export default function Login()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      try {
        
        // Send login request to backend
        const response = await axios.post('http://localhost:5001/api/auth/login', {
          email,
          password
        });
        console.log('Response:', response.data); 
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Redirect to dashboard or home page
        navigate('/explore');
        
      } catch (err) {
        setError(err.response?.data?.message || 'Login Karna mushkil e babu bhaya.');
      }
    };

    return (
            <div className="login-container">
                <div className="main-container">
                    <div className="login-left-container">
                    </div>
                    <div className="login-right-container">
                        <div className="login-right-header">
                            <img src="/images/logo.png" alt="Logo" />
                            <h1 className>Login to BookSphere</h1>
                        </div>
                        <p>Welcome back! Pick up where you left off, share your thoughts on books, and explore new literary adventures.
                         Enter your credentials to continue.</p>
                        
                        {error && <div className="error-message">{error}</div>}

                        <form className='login-form'  onSubmit={handleSubmit}>
                            <input 
                              className='login-input-field' 
                              type="email" 
                              placeholder="Email" 
                              id="email" 
                              name='email' 
                              value = {email}
                              onChange={(e) => setEmail(e.target.value)}
                            required/>

                            <input 
                              className='login-input-field' 
                              type="password" 
                              placeholder="Password" 
                              id="password" 
                              name='password' 
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            required/>
                            <button className='login-submit-btn' type="submit">Login</button>
                        </form>
                        <p>Are you new to BookSphere? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
    )
}
