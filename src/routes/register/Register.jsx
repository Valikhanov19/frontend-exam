import React, { useState } from 'react';
import './Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../utils/Container';
import Logo from '../../assets/images/header/ebay-logo.svg';
import { instance } from '../../api/instance';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { ReactComponent as GoogleIcon } from '../../assets/images/register/google-icon.svg';
import { useDispatch } from 'react-redux';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        avatar: ''
    });

    const createUser = (e) => {
        e.preventDefault();
        instance.post('/users', userData)
            .then(response => {
                if (response.data.email) {
                    dispatch({ email: response.data.email, type: "CREATE_USER" })
                    navigate("/")
                }

            })
            .catch(err => console.error(err))
    }

    const googleProvider = new GoogleAuthProvider();

    const createUserWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result.user)
        } catch (err) {
            console.error(err)
        }

        navigate('/')
    }

    return (
        <main>
            <section>
                <div className='register-header'>
                    <Link to={'/'}><img src={Logo} alt="logo of the site" /></Link>
                    <h5>Already a member? <Link className='sign-in' to={'/sign'}>Sign in</Link></h5>
                </div>
                <Container>
                    <h2 className='register-title'>Create an account</h2>
                    <div className='registration-form-wrapper'>
                        <form onSubmit={createUser} className='registration-form'>
                            <div className='user-fullname__inputs'>
                                <input type="text" placeholder='First name' onChange={(e) => { setUserData({ ...userData, name: e.target.value }) }} />
                                <input type="text" placeholder='Last name' onChange={(e) => { setUserData({ ...userData, surname: e.target.value }) }} />
                            </div>
                            <input className='email-input' required type="email" placeholder='Email' onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }} />
                            <input className='avatar-input' required type="url" placeholder='Enter your avatar url' onChange={(e) => { setUserData({ ...userData, avatar: e.target.value }) }} />
                            <input className='password-input' required maxLength={30} minLength={8} type="password" placeholder='Password' onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }} />
                            <input className='agreement-checkbox' required type="checkbox" name="agree" id='agreement' />
                            <label htmlFor="agreement">By <strong>Creating an account</strong>, you agree to our <a href="https://kun.uz/">User Agreement</a> and acknowledge reading our <a href="https://kun.uz/">User Privacy Notice</a>.</label>
                            <button className='create-btn' type="submit">Create account</button>
                        </form>
                        <span>or</span>
                        <button className='singin-google-btn' onClick={createUserWithGoogle}><GoogleIcon />Sign in with Google</button>
                    </div>
                </Container>
            </section>
        </main>
    )
}

export default Register