import React from "react";
import { useForm } from "react-hook-form";
import "./style.scss";

import loginImg from "../../logo.svg"

const LoginHook = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="base-container">
    <div className="header">Login</div>
    <div className="content">
        <div className="image">
            <img src={loginImg} />
        </div>
        <div className="form">
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
            type="text"
            name="username"
            placeholder="username"
            ref={register({
                required: "Required", 
                pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid user name"
                }
            })}
            />
            {errors.username && errors.username.message}
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
            type="password"
            name="password"
            placeholder="password"
            ref={register({
                required: "Required", 
                pattern: {
                message: "invalid password"
                }
            })}
            />
            {errors.password && errors.password.message}
            </div>
            <div className="footer">
                <button type="submit" className="btn">
                    Login
                </button>
            </div>
        </div>
    </div>
    </div>
    </form>
  );
};

export default LoginHook