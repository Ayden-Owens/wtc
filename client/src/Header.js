import "./Header.css";
import "./Footer.css";
import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
        <nav className="home-navbar">
        <label className="title">WhatToCook</label>
            <ul className='home-list'>
                <Link className="section-right" to="/home">
                    Home
                </Link>
                <Link className="section-right" to="/RecipeGenerator">
                    Recipe Generator
                </Link>
                <Link className="section-right" to="/PriceComparer">
                    Price Comparer
                </Link>
                <Link className="section-right"to="/dietary">
                    Dietary Restrictions
                </Link>
                <Link className="section-right" to="/profile">
                    Profile
                </Link>
            </ul>
        </nav> 
);}

export default Header;
