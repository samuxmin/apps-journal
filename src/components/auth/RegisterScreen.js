import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';

import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { startRegisterWithEmailPassWordName } from '../../actions/auth';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPassWordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError('Passwords are not valid'));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className='auth__title'>Register</h3>
      <form onSubmit={handleRegister} className='animate__animated animate__fadeIn animate__faster'>
        {msgError && <div className='auth__alert-error'>{msgError}</div>}
        <input
          className='auth__input'
          type='text'
          placeholder='Name'
          name='name'
          autoComplete='off'
          onChange={handleInputChange}
          value={name}
        />
        <input
          className='auth__input'
          type='text'
          placeholder='Email'
          name='email'
          autoComplete='off'
          onChange={handleInputChange}
          value={email}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleInputChange}
          value={password}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Confirm password'
          name='password2'
          onChange={handleInputChange}
          value={password2}
        />
        <button className='btn btn-primary btn-block mb-5' type='submit'>
          Register
        </button>
        <Link className='link' to='/auth/login'>
          Already registered?
        </Link>
      </form>
    </>
  );
};
