import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "@reach/router";

import Input from "./../../../Shared/Input/Input.jsx";

function AuthForm({ styles, loading, onSubmit, isLogin = false }) {
  const { register, handleSubmit, errors } = useForm();
  React.useEffect(() => {
    return () => {};
  }, []);

  const placeholders = {
    UserName: "Username or Email",
    Password: "Password",
  };

  const composeSubmit = (extra) => {
    const { KidSelected, Motive, Amount } = extra;
    onSubmit({ ...extra });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(composeSubmit)}>
      <Input
        styles={styles.input}
        register={register}
        isRequired={true}
        errors={errors}
        type="text"
        name="UserName"
        placeholder={placeholders.UserName}
      />
      <Input
        styles={styles.input}
        register={register}
        isRequired={true}
        errors={errors}
        type="text"
        name="Password"
        placeholder={placeholders.Password}
      />

      <button
        type="submit"
        className={[loading ? styles.btnLoginDisabled : styles.btnLogin]}
      >
        {isLogin ? "Login" : "Signup"}
      </button>
    </form>
  );
}
export default React.memo(AuthForm);
