import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import withTokenExpirationCheck from "./withTokenExpirationCheck";
import video from './TutorialHolder.mp4';
import "./Tutorial.css";
import img from './TutorialHolderPic.png';

function Tutorial() {
    const imageUrl = './TutorialHolderPic.png';

  return (
    <div style={{backgroundColor: 'tan'}}>
    <Header />
    <div>
        <div className='TutHeader'>
            <h1> Tutorial </h1>
            <h2> Below are two types of step by step tutorials: Video and Pictures.</h2>
            <h2>Choose the type that works best for you.<br />
            Follow along to get a better understanding of how to use WhatToCook.</h2>
        </div>
            <div className="Video">
                <h2>Video Tutorial</h2><div className="VideoPlay">
                    <video src={video} controls style={{ width: '100%', height: 'auto' }}/>
                </div>
            </div>
            <div className='Pictures'>
                <h2> Picture Tutorial</h2>
                <div className='imageList'>
                    <img src={img} controls style={{ width: '48%', height: 'auto' }}/>
                    <img src={img} controls style={{ width: '48%', height: 'auto' }}/>
                </div>
                <div className='imageList'>
                    <img src={img} controls style={{ width: '48%', height: 'auto' }}/>
                    <img src={img} controls style={{ width: '48%', height: 'auto' }}/>
                </div>
            </div>
    </div>
    <Footer />
    </div>
  );
};

export default withTokenExpirationCheck(Tutorial);