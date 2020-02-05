import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Container = styled.section`
  padding: 0 100px;
  border-bottom: 1px solid rgb(233, 233, 233);
`;
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  > a {
    text-decoration: none;
  }
  > ul {
    > li {
      &: hover {
        color: #1890ff;
        cursor: pointer;
      }
      display: inline-block;
      margin-left: 5px;
      font-size: 1rem;
      font-weight: 600;
      padding: 0.6rem;
    }
    flex: 2;
    text-align: center;
  }
`;

const logout = () => {
    localStorage.removeItem('googleid');
    localStorage.removeItem('customertoken');
};

const Header = () => (
    <Container style={{background: '#FFFFFF'}}>
        <HeaderContent>
            <ul>
                <li><Link to={'/home'}>{'Home'}</Link></li>
                <li >
                    <Link
                        onClick={logout}
                        to={'/'}
                    >{'Logout'}
                    </Link>
                </li>
            </ul>
        </HeaderContent>
    </Container>
);

export {Header};
