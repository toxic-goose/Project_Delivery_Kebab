import React, { useState } from "react";

import { useNavigate } from "react-router";


import  UserValidator  from "../../../../entities/User.validator";
import  UserApi  from "../../../../entities/UserApi";

const INITIAL_INPUTS_DATA = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export default function SignUpForm({ setUser }) {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { isValid, error } = UserValidator.validate(inputs);

    if (!isValid) return alert(error);

    try {
      const {
        statusCode,
        data,
        error: responseError,
      } = await UserApi.register(inputs);

      if (responseError) {
        alert(responseError);
        return;
      }

      if (statusCode === 201) {
        setUser(data.user);
        setInputs(INITIAL_INPUTS_DATA);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const { username, email, password, repeatPassword } = inputs;

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        name="username"
        placeholder="Имя пользователя"
        autoFocus
        onChange={onChangeHandler}
        value={username}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={onChangeHandler}
        value={email}
      />

      <input
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangeHandler}
        value={password}
      />

      <input
        type="password"
        name="repeatPassword"
        placeholder="Повторите пароль"
        onChange={onChangeHandler}
        value={repeatPassword}
      />

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
