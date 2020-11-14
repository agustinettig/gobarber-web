import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

export const Login: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form>
          <h1>Please Log in</h1>

          <Input name="email" placeholder="E-mail" icon={FiMail} />
          <Input name="password" type="password" placeholder="Password" icon={FiLock} />
          <Button type="submit">LogIn</Button>

          <a href="forgot">Forgot my password</a>
        </form>

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
