import React, {useEffect, useState, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      return {
        value: action.payload,
        isValid: action.payload.includes('@')
      };
    }
    if (action.type === 'INPUT_BLUR') {
      return {
        value: state.value,
        isValid: state.value.includes('@'),
      };
    }
  };

  const initialStateForEmail = {
    value: '',
    isValid: null,
  };
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initialStateForEmail,
  );

  console.log(emailState);

  // useEffect cleanUp => Burda amac aslinda her yazi yazdigimzda use effectin tekrar calismasini engellemek. Basit bir projede sorun olmasada databaseden veri cekmek gibi cesitli islemler yapildiginda gereksiz bir pveri trafigine sebep olabilir. Burda inputa girilen her harfte validation check islemi yapilmasina gerek yok o yuzden inputa girilen deger tamamlandiginda bu islemi sadce bir defa yapmak yeterli olcaktir. Iste bu sebeple clean islemi uygulamamiz lazim.

  // useEffect(() => {
  //   console.log('Checikng for validty'); //temizleme islemi yapilmassa inputa girilen her harfte console`a yazdirdigimiz sey gorunecektir yani aslinda bizim gormedigimiz setFormIsValid tekrar tekrar calisacakti bunun icin setTimeout ile cleanUp islemi yapabiliriz.

  //   const identifier = setTimeout(() => {
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6,
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CleanUp');
  //     clearTimeout(identifier);
  //   }; //bu anonim fonksiyona cleanUp function deniliyor.
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', payload: event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6,
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'BLUR_EMAIL'});
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
