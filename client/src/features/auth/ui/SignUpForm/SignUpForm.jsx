import React, { useState } from "react";

import { useNavigate } from "react-router";


import  UserValidator  from "../../../../entities/User.validator";
import  UserApi  from "../../../../entities/UserApi";

const INITIAL_INPUTS_DATA = {
  user_name: "",
  email: "",
  phone: "",
  password: "",
};

export default function SignUpForm({ setUser }) {
  const [role, setRole] = useState('buyer'); 
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
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

  const { user_name, email, phone, password } = inputs;

  return (

    <form onSubmit={onSubmitHandler}>
      <label>
      Выберите роль:
      <select value={role} onChange={handleRoleChange}>
        <option value="buyer">Покупатель</option>
        <option value="courier">Курьер</option>
      </select>
      </label>
      <input
        type="text"
        name="user_name"
        placeholder="Введите имя пользователя:"
        autoFocus
        onChange={onChangeHandler}
        value={user_name}
      />

      <input
        type="email"
        name="email"
        placeholder="Введите email:"
        onChange={onChangeHandler}
        value={email}
      />

        <input
        type="tel"
        name="phone"
        placeholder="Введите номер телефона:"
        onChange={onChangeHandler}
        value={phone}
      />

      <input
        type="password"
        name="password"
        placeholder="Введите пароль:"
        onChange={onChangeHandler}
        value={password}
      />


      <button type="submit">Зарегистрироваться</button>
    </form>

  );
}
