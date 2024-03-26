import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const carousel = document.querySelector('.carousel');
      const carouselItems = document.querySelectorAll('.carousel-item');
      const carouselButtons = document.querySelectorAll('.carousel_button');

      let currentIndex = 0;

      function showItem(index) {
        carouselItems.forEach((item, i) => {
          item.style.display = i === index ? 'block' : 'none';
        });
      }

      function updateCarousel() {
        carouselButtons.forEach((button, i) => {
          button.addEventListener('click', () => {
            currentIndex = i;
            showItem(currentIndex);
            updateButtonStyles();
          });
        });
      }

      function updateButtonStyles() {
        carouselButtons.forEach((button, i) => {
          button.classList.toggle('carousel_button--selected', i === currentIndex);
        });
      }

      function startCarousel() {
        setInterval(() => {
          currentIndex = (currentIndex + 1) % carouselItems.length;
          showItem(currentIndex);
          updateButtonStyles();
        }, 3000); // Adjust the interval for the desired speed (in milliseconds)
      }

      showItem(currentIndex);
      updateCarousel();
      startCarousel();
    }
  }, []);

  const handleRegistration = async () => {
    const API = 'http://localhost:3000';

    try {
      const response = await Axios.post(
        `${API}/users/register`,
        {
          username: usernameReg,
          password: passwordReg,
          email: emailReg,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError(error.response?.data.error || 'Registration failed. Please try again.');
    }
  }

  const handleLogin = async () => {
    navigate("/");
  }

    return (
      <div className='body'>
        <div className='login_container'>
          <div className='carousel'>
            <div className='carousel-item'>
              <img src="/images/login/login1.png" alt=""/>
              <div className="carousel-text">Enter your ingredients</div>
            </div>
            <div className='carousel-item'>
              <img src="/images/login/login2.png" alt=""/>
              <div className="carousel-text">Find a recipe and start cooking</div>
            </div>
            <div className='carousel-item'>
              <img src="/images/login/login3.png" alt=""/>
              <div className="carousel-text">Then start eating your delicious meal</div>
            </div>
            <div className='carousel_nav'>
              <span className='carousel_button'></span>
              <span className='carousel_button'></span>
              <span className='carousel_button'></span>
            </div>            
          </div>
          <div className="login">
            <h1 className="register-title">Registration</h1>
            <label htmlFor="username" className="r-username-label">Username</label>
              <input 
                id='r-username'
                type="text"
                onChange={(e)=> {
                  setUsernameReg(e.target.value)
                }}
              />
            <label htmlFor="password" className="r-password-label">Password</label>
              <input
                id="r-password"
                type="password" 
                onChange={(e)=> {
                  setPasswordReg(e.target.value)
                }}
              />
            <label htmlFor="email" className="r-email-label">Email</label>
              <input
                id="r-email"
                type="text" 
                onChange={(e)=> {
                  setEmailReg(e.target.value)
                }}
              />
            <div className="register-button-container"> 
              <button className="login-button" onClick={handleRegistration}>Register</button>      
              <button className="signup-button" onClick={handleLogin}>Login</button>                
            </div>
            {error && <p className='error-message'>{error}</p>}
          </div>
        </div>
      </div>
    )
}

export default Register;