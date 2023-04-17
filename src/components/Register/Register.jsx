import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../../firebase/firebase.config';

const auth = getAuth(app);

const Register = () => {
    const [isShow, setIsShow] = useState(false);
    const inputType = useRef();
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('We will never share your email with anyone else.');
    const [passwordError, setPasswordError] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        setNameError('');
        setEmailError('');
        setPasswordError('');

        if (name === '') {
            setNameError('Please give your Name');
            return;
        }
        if (!/(?=.*[A-Z])/.test(password)){
            setPasswordError('Password should be contain at least one uppercase and spacial character')
            return;
        }
        if(password.length < 6){
            setPasswordError('Password should be minimum 6 characters')
            return;
        }
            createUserWithEmailAndPassword(auth, email, password)
                .then(result => {
                    event.target.reset();
                    const user = result.user;
                    user.displayName = name;
                    emailValidation(user)
                    console.log(user);
                })
                .catch(error => {
                    if(error.message === 'Firebase: Error (auth/email-already-in-use).'){
                        setEmailError('Email already in used')
                    }
                })
    }
    const emailValidation = (user) => {
        sendEmailVerification(user)
        .then((result) => {
            alert('Please verify your email address');
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    const handleShow = () => {
        inputType.current.type = 'text';
        setIsShow(true);
    }
    const handleHide = () => {
        inputType.current.type = 'password';
        setIsShow(false);
    }
    return (
        <div className='mt-5 w-50 mx-auto'>
            <h2>Please Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 text-start" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Your Name" />
                    <Form.Text className="text-danger">
                        {nameError}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" />
                    <Form.Text className={`${emailError === 'Email already in used' ? 'text-danger': 'text-mute'}`}>
                        {emailError}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={inputType} name="password" type="password" placeholder="Password" />
                    <Form.Text className="text-danger">
                        {passwordError}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <div className='mt-3'>
                {
                    !isShow ? <button onClick={handleShow}>Show</button> : <button onClick={handleHide}>Hide</button>
                }

            </div>
        </div>
    );
};

export default Register;