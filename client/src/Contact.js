import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import withTokenExpirationCheck from "./withTokenExpirationCheck";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const API = 'https://whattocookapp-ed9fe9a2a3d4.herokuapp.com/'
  // const API = "http://localhost:3000"

  const submitForm = async () => {
    try {
      await fetch(API+'contactus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name,
          email,
          subject,
          text,
        }),
      });

      alert('Sent successfully!');
    } catch (error) {
      console.error('Error Sending:', error);
      alert('Error Sending. Please try again later.');
    }
    setName('');
    setEmail('');
    setSubject('');
    setText('');
  };

  return (
    <div style={{backgroundColor: 'tan'}}>
    <Header />
    <div className='contact'>
    <h1> Contact Us!</h1>
        <form>
            <input type="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Name"/>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email"/>
            <input type="sub" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="Subject"/>
          <div className='wider'>
            <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} rows="5" required placeholder="Type your message here..." style={{width:'73%'}} ></textarea>
            <h2 style={{justifyContent:'center'}}>
              <button type="button" onClick={submitForm}>
                Submit
              </button>
            </h2>
          </div>
        </form>
      </div>
    <Footer />
    </div>
  );
};

// function Contact() {
//     return(
//         <div style={{textAlign:'center', font:'cursive'}}> 
//         <Header/>
//             <h1 style={{fontSize:'35px'}}> Let's Talk</h1>
//             <h2>Email us at </h2>
//             <h2 style={{fontSize:'30px'}}> <Link to="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwCsBHCNkLDWHFHhbgzTLvtCxtfnMlMKnbPhsGbRqxLTMDqqgDMvGjjHrPPtcwgrkpSGKn"> systembreakersusc@gmail.com</Link></h2>
//         <Footer/>
//         </div>
//     );
// }

export default withTokenExpirationCheck(Contact);