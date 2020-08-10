import React from "react";
import config from "../../../config/config";
import useAxios from "axios-hooks";
import { useDispatch, useSelector } from "react-redux";

import AuthForm from "./../Shared/AuthForm/AuthForm.jsx";

import styles from "./Signup.module.scss";

export default function Signup({ navigate }) {
  const [
    { data: data, loading: loading, error: error },
    executeRequest,
  ] = useAxios(
    {
      url: "Signup Route",
      method: "POST",
    },
    { manual: true }
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (error && error !== null) {
    }
  }, [error]);

  const onSubmit = async (data) => {
    const response = await executeRequest({
      data: {
        UserName,
        Password,
      },
    });

    dispatch({
      type: "SIGNUP_SUCCESS",
      payload: response,
    });

    //navigate("/dashboard");
  };
  return (
    <div className={styles.backDrop}>
      <div className={styles.container}>
        <AuthForm
          styles={styles}
          loading={loading}
          onSubmit={onSubmit}
          values=""
          isLogin={false}
        />
      </div>
    </div>
  );
}
