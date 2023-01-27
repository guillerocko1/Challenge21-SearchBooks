// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
//import { useMutation } from '@apollo/client';
import { loginUser } from '../utils/mutations';
import Auth from '../utils/auth';
//import useMutation from '@apollo/client';


const LoginForm = () => {
  //const [loginUser, { error }] = useMutation(login);
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  //console.log(userFormData.email);
  //const loginvariables = userFormData.json();
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // check if form has everything (as per react-bootstrap docs)
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    
    try {
      console.log("Got here1!!");
      //console.log("Data: " + { ...userFormData } + {...userFormData.email.json()})
      //const [response, {loading, error}] = useMutation(loginUser);
      //const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);


      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response  = await loginUser({ variables: { ...userFormData }, });
      console.log(response);
      //const response = await loginUser();
      //console.log("response: " + response);
       //console.log("response: " + JSON.stringify(response));
      //const response = await loginUser({ variables: { ...userFormData }, });
      
      //console.log(response.json());
      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

       //const { token, user } = await response.json();
      // //Auth.login(response.data.loginUser.token);
      //  console.log(user);
      console.log("token: ",response.data.loginUser.token);
      Auth.login(response.data.loginUser.token);
       //Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
