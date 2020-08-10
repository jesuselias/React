import React from "react";

import internal from "./input.module.scss";

const Input = ({
  styles,
  register,
  isRequired,
  type,
  value,
  name,
  placeholder,
  errors,
  image,
  onFocus,
  onChange,
  onBlur,
}) => {
  return (
    <div
      className={
        errors && errors[name] ? `${styles} ${internal.error}` : styles
      }
    >
      <input
        ref={register({ required: isRequired })}
        id={name}
        name={name}
        defaultValue={value ? value : ""}
        type={type}
        onChange={(e) => {
          if (!!onChange && typeof onChange === "function") {
            onChange(e.target.value);
          }
        }}
        onFocus={() => {
          if (!!onFocus && typeof onFocus === "function") {
            onFocus(true);
          }
        }}
        onBlur={(e) => {
          e.stopPropagation();
          if (!!onBlur && typeof onBlur === "function") {
            let timeOut = setTimeout(() => {
              onBlur();
              clearTimeout(timeOut);
            }, 200);
          }
        }}
        aria-invalid="true"
        aria-invalid={errors && errors[name] ? true : false}
        aria-describedby={`${placeholder}_error`}
        aria-labelledby={`${placeholder}_error`}
        aria-label={placeholder}
        placeholder={placeholder}
      />
      <br />
      {image && image.length > 0 && (
        <img className={internal.inputImage} src={image} alt={placeholder} />
      )}
      <span
        className={[errors && errors[name] ? internal.show : internal.hide]}
        id={`${placeholder}_error`}
        role="alert"
      >
        {placeholder} is required.
      </span>
    </div>
  );
};

export default React.memo(Input);
