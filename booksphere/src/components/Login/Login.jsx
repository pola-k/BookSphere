import { Link } from 'react-router-dom'
import './Login.css'

export default function Login()
{
    return (
        <>
            <div className="container">
                <div className="left-container">
                </div>
                <div className="right-container">
                    <div className="right-header">
                        <img src="./src/images/logo.png" alt="Logo" />
                        <h1>Log In to BookSphere</h1>
                    </div>
                    <p>Welcome back! Pick up where you left off, share your thoughts on books, and explore new literary adventures.
                         Enter your credentials to continue.</p>
                    <form className='form'>
                        <input className='input-field' type="email" placeholder="Email" id="email" name='email' required/>
                        <input className='input-field' type="password" placeholder="Password" id="password" name='password' required/>
                        <button className='submit-btn' type="submit">Sign up</button>
                    </form>
                    <p>Are you new to BookSphere? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>

        </>
    )
}