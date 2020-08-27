import React from 'react';
import '../assets/styles/pages/Error404.scss';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <>
      <div className='App'>
        <canvas id='universe' />
        <div className='Hero'>
          <div className='Hero-container'>
            <div className='Hero-head'>
              <div className='Hero-logo'>
                <h3>Itil-Support</h3>
              </div>
              <div className='Hero-nav'>
                <ul>
                  <li>Usuario</li>
                </ul>
              </div>
            </div>
            <div className='Hero-content'>
              <div className='Hero-title'>
                <h1>404</h1>
                <h2>Lost in Space</h2>
                <h3>It seems you are lost in space</h3>
                <Link to='/' className='btn'>Back to home</Link>
              </div>
              <div className='Hero-image'>
                <figure>
                  <img src='https://arepa.s3.amazonaws.com/astro1.png' alt='404' />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
