import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background, AnimationContent } from './styles';

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
  const history = useHistory();

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

        history.push('/dashboard');
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
    [login, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContent>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Please Log in</h1>

            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input name="password" type="password" placeholder="Password" icon={FiLock} />
            <Button type="submit">LogIn</Button>

            <Link to="forgot">Forgot my password</Link>
          </Form>

          <Link to="signup">
            <FiLogIn />
            Sign Up
          </Link>
        </AnimationContent>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
