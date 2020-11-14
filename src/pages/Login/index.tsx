import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface LoginFormData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { login } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().email('Invalid e-mail').required('E-mail is required'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await login({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          title: 'Login failed',
          type: 'error',
          description: 'Please check your credentials',
        });
      }
    },
    [login, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Please Log in</h1>

          <Input name="email" placeholder="E-mail" icon={FiMail} />
          <Input name="password" type="password" placeholder="Password" icon={FiLock} />
          <Button type="submit">LogIn</Button>

          <a href="forgot">Forgot my password</a>
        </Form>

        <a href="signup">
          <FiLogIn />
          Sign Up
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
