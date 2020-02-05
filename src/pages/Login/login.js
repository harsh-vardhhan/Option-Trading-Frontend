import {Button} from 'antd';
import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import {getRedirectPath} from '../../api/login';

const Container = styled.section`
  display: flex;
  margin: 0;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 10rem;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  > h1 {
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 400;
  }
  > h2 {
    font-size: 1rem;
  }
`;

const LoginButton = styled(Button).attrs({
    size: 'large',
    type: 'primary'
})`
  height: 2rem;
  width: 30rem;
  color: #ff5000;
  margin-top: 2rem;
`;
export function Login() {
    const [urlPath, setUrl] = useState('');
    function handleLogin() {
        getRedirectPath().then(res => {
            setUrl(res.data.url);
        });
    }
    useEffect(() => {
        //localStorage.removeItem('accessToken');
        if (urlPath !== '') {
            window.location.replace(`${urlPath}`);
        }
    }, [urlPath]);
    return (
        <Container>
            <Wrapper>
                <h1>{'Trakbit'}</h1>
                <h2>
                    {'Options Trading Platform'}
                </h2>
                <LoginButton onClick={handleLogin}>{'Admin Login'}</LoginButton>
            </Wrapper>
        </Container>
    );
}
