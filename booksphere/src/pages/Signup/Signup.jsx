import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import { useState } from 'react';

export default function Signup() {
  const navigate = useNavigate();  
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    try {
      const res = await axios.post("http://localhost:5001/api/auth/signup", {
        name,
        username,
        email,
        password
      }, {
        withCredentials: true // Required to accept HTTP-only cookie
      });

      sessionStorage.setItem('user_id', res.data.user_id);
      setIsError(false);
      setMessage('✅ Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/explore');
      }, 1500);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setIsError(true);
      setMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="container">
          <div className="left-container"></div>
          <div className="right-container">
            <div className="right-header">
              <img src="/images/logo.png" alt="Logo" />
              <h1>Join BookSphere</h1>
            </div>
            <p>Discover, discuss, and share your favorite reads with a community of book lovers. Dive into reviews, explore summaries, 
              and build your personal bookshelf. Sign up and start your literary journey today!</p>

            {/* Notification Bar */}
            {message && (
              <div className={`notification-bar ${isError ? 'error' : 'success'}`}>
                {message}
              </div>
            )}

            <form className='form' onSubmit={handleSignup} >
              <input className='input-field' type="text" placeholder="Name" id="name" name='name' required/>
              <input className='input-field' type="text" placeholder="Username" id="username" name='username' required/>
              <input className='input-field' type="email" placeholder="Email" id="email" name='email' required/>
              <input className='input-field' type="password" placeholder="Password" id="password" name='password' required/>
              <button className='submit-btn' type="submit">Sign up</button>
            </form>
            <p>Already have an Account? <Link to="/login">Login Now</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}
