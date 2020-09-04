import React, {useState } from "react";
import { connect } from 'react-redux'

import loginImg from "../../logo.svg"
import { addLogin } from './actions'
import "./style.scss";



function Login(props) {
    const [loginUsername, setUsername] = useState('');
    const [loginPassword, setPassword] = useState('');
  
    function usernameChange(e) {
      setUsername(e.target.value);
    }

    function passwordChange(e) {
        setPassword(e.target.value);
      }

    function handleSubmit(e) {
        if(loginUsername !== '') {
          props.addLogin(loginUsername,loginPassword);
          setUsername('');
          setPassword('');
          console.log("1->",props.addLogin(loginUsername,loginPassword))
        }
        e.preventDefault();
      }

// export class Login extends React.Component {

    // constructor(props)  {
    //     super(props);
    // }

    // render() {
        return (
            <form onSubmit={handleSubmit}>
            <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} />
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" 
                                name="username" 
                                placeholder="username"
                                onChange={usernameChange}
                                value={loginUsername} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" 
                                name="password" 
                                placeholder="password"
                                onChange={passwordChange}
                                value={loginPassword} />
                        </div>
                    </div> 
                </div>
                <div className="footer">
                    <button type="submit" className="btn">
                        Login
                    </button>
                </div>
            </div>
            </form>
        );
    }
// }

const mapDipatchToProps = {
    addLogin
  }

export default connect(null, mapDipatchToProps)(Login)