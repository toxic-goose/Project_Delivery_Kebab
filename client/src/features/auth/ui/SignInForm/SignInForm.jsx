import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { setAccessToken } from '../../../../shared/lib/axiosInstance';
import UserApi from '../../../../entities/UserApi';

const INITIAL_INPUTS_DATA = {
  email: '',
  password: '',
};

export default function SignInForm({ setUser }) {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await UserApi.login(inputs);

      if (response.error) return alert(response.error);

      if (response.statusCode === 200) {
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
        setInputs(INITIAL_INPUTS_DATA);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type='email'
        name='email'
        placeholder='Email пользователя'
        value={inputs.email}
        onChange={onChangeHandler}
      />

      <input
        type='password'
        name='password'
        placeholder='Пароль пользователя'
        value={inputs.password}
        onChange={onChangeHandler}
      />
      <button type='submit'>Войти</button>
    </form>
  );
}