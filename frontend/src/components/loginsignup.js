import React, { Component } from 'react'

export default class LoginSignup extends Component {
    
    render() {
        return (
            <div style={containerStyles}>
                <h1>LoginSignup </h1>
                <div className="loginsignup">
                <input type="text" name="fullname" placeholder="Full Name"/>
                <input type="email" name="email" placeholder="Enter Email"/>
                <input type="password" name="password" placeholder="Enter Password"/>
                </div>
            </div>
        )
    }
}

const containerStyles = {
    fontSize:24,
    color:'red'
}