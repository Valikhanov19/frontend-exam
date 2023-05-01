import React, { useRef, useState } from 'react';
import './Sign.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/header/ebay-logo.svg';
import Container from '../../utils/Container';
import Google from '../../assets/images/register/google-icon.svg';
import { instance } from '../../api/instance';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const Sign = () => {
  const [email, setEmail] = useState({ email: '' });
  const emailInput = useRef();
  const navigate = useNavigate();

  const checkEmail = (e) => {
    e.preventDefault();
    instance.post('/users/is-available', email)
      .then(response => {
        if (response.data.isAvailable) {
          navigate('/')
        } else {
          navigate('/register')
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
      <section className='signin-section'>
        <div className='signin-header'>
          <Link to={'/'}><Logo /></Link>
          <a href='https://mail.google.com'>Tell us what you think</a>
        </div>
        <Container>
          <h2>Hello</h2>
          <p>Sign in to eBay or <Link to={'/register'}>create an account</Link></p>
          <form onSubmit={checkEmail}>
            <input ref={emailInput} onInput={(e) => { setEmail({ email: e.target.value }) }} className='email-input' type="text" placeholder='Email' />
            <p>Created your account with a mobile number?
              <br />
              <span>Sign in with mobile</span>
            </p>
            <button className='continue-btn'>Continue</button>
            <div className='or'><span></span>or<span></span></div>
            <button className='continue-google-btn' onClick={createUserWithGoogle}><img src={Google} alt="google icon" />Continue with Google</button>
            <div className='form-footer'>
              <label htmlFor="stay-in"><input id='stay-in' type="checkbox" required /> Stay signed in</label>
              <p>Using a public or shared device?
                <br />
                Uncheck to protect your account.
              </p>
              <a href="https://www.wikipedia.org">Learn more</a>
            </div>
          </form>
        </Container>
      </section>
    </main>
  )
}

export default Sign