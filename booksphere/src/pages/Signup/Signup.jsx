import { Link } from 'react-router-dom'
import './Signup.css'

export default function Signup()
{
    return (
        <>
            <div className="signup-container">
                <div className="container">
                    <div className="left-container">
                    </div>
                    <div className="right-container">
                        <div className="right-header">
                            <img src="/images/logo.png" alt="Logo" />
                            <h1>Join BookSphere</h1>
                        </div>
                        <p>Discover, discuss, and share your favorite reads with a community of book lovers. Dive into reviews, explore summaries, 
                            and build your personal bookshelf. Sign up and start your literary journey today!</p>
                        <form className='form'>
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
    )
}