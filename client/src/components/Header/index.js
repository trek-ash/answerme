import React from 'react';
import './header.css'
export default class Header extends React.Component{
    render()
    {
        return(
            <>
              <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <a className="navbar-brand" href="/" style={{letterSpacing: "1.8px"}}>AnswerMe</a>
                </div>
            </nav>
            
            </>
        )
    }
}