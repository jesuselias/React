import React from "react";
import { useForm } from "react-hook-form";

import styled from "styled-components"
import "./style.scss";

import loginImg from "../../logo.svg"

const Button = styled.button`
    background: white;
    color: #70ccdb;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #70ccdb;
    border-radius: 3px;
    display: block;
`;

const Input = styled.input`
    background-color:#d5d5f4;
    margin-top: 6px;
    min-width: 18em;
    height: 37px;
    padding: 0px 10px;
    font-size: 16px;
    font-family: "Open sans", sans-serif;
    border: 0;
    border-radius: 4px;
    margin-bottom: 15px;
    transition: all 250ms ease-in-out;
    &:focus {
        outline: none;
        box-shadow: opx opx 12px 0.8px blue;
    }
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #56afc4;
`;

const LoginHook = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="base-container">
    <Title>Login</Title>
    <div className="content">
        <div className="image">
            <img src={loginImg} />
        </div>
        <div className="form">
            <div className="form-group">
            <Input
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
           {  errors.username  && <text style={{color: '#f07171'}}>{ errors.username.message }</text>}
            </div>
            <div className="form-group">
            <Input
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
            {errors.password && <text style={{color: '#f07171'}}>{ errors.password.message }</text>}
            </div>
            <div className="footer">
            <Button>Normal</Button>
            </div>
        </div>
    </div>
    </div>
    </form>
  );
};

export default LoginHook