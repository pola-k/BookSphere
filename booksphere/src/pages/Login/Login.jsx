import { Link } from 'react-router-dom'
import './Login.css'

export default function Login()
{
    return (
        <>
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
                        <form className='login-form'>
                            <input className='login-input-field' type="email" placeholder="Email" id="email" name='email' required/>
                            <input className='login-input-field' type="password" placeholder="Password" id="password" name='password' required/>
                            <button className='login-submit-btn' type="submit">Login</button>
                        </form>
                        <p>Are you new to BookSphere? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}