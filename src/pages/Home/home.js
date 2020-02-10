import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Header} from '../../components';
import {validateCustomerToken, getAccessToken} from '../../api/login';

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled(FlexCol)`
  padding: 1rem;
  align-items: start;
  padding: 1rem;
  justify-content: space-between;
`;

//create coustom hooks to get scroll values
const StickyHeader = styled.div`
  display: flex;
`;

const ContainerSection = styled(FlexCol)`
  margin-top: 3rem;
  > h4 {
    font-size: 18px;
    font-weight: 300;
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.6);
    font-family: 'IBM Plex Sans', sans-serif;
  }
`;

const CardWrapper = styled(FlexCol)`
  min-width: 2rem;
  border-radius: 4px;
  margin-top: 1rem;
  border: 1px solid #e2e2e2;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-0.9em);
    box-shadow: 0 0.5em 1.5em 0 rgba(0, 0, 0, 0.1);
    color: #1890ff;
  }
`;

const CardText = styled.div`
  padding: 2rem;
  font-size: 1rem;
  font-weight: 200;
`;
const Home = ({location: {search = ''}}) => {
    useEffect(() => {
        async function validateCustomer() {
            try {
                await validateCustomerToken();
            } catch (error) {
                window.location = window.origin;
            }
        }
        validateCustomer();
        if (window.location.search.length > 0) {
            const code = window.location.search.split('?code=').filter(s => s !== '')[0];
            getAccessToken(code).then((res) => localStorage.setItem('accessToken', res.data.accessToken));
        }
    }, []);
    return (
        <>
            <Header header={'Home'}/>
            <Container>
                <ContainerSection>
                    <h4>{'Options Trading Tools'}</h4>
                </ContainerSection>
                <Link to={'/optionchain'}>
                    <OptionChainCard/>
                </Link>
            </Container>
        </>
    );
};

const OptionChainCard = () => (
    <CardWrapper>
        <CardText>{'Option Chain'}</CardText>
    </CardWrapper>
);

export {Home};
