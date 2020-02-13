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
  padding: 1rem 2rem 1rem 2rem;
  font-size: 1rem;
  font-weight: 400;
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

const Money = props => (
  <div style={{width: '50%'}}>
      <svg
        viewBox="0 0 380 380"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit={1.414}
        {...props}
      >
        <ellipse
          cx={181.382}
          cy={176.194}
          rx={162.504}
          ry={159.776}
          fill="#00ff30"
          fillOpacity={0.15}
          transform="matrix(1 0 0 1.01705 12 12.72)"
        />
        <path
          d="M210.694 173.33a36.111 36.111 0 00-6.177-5.188c-5.924-3.961-12.811-6.066-19.846-6.066-9.764-.02-19.13 4.032-26.023 11.253l-33.435 34.94c-6.88 7.199-10.748 16.951-10.754 27.121-.013 21.223 16.452 38.438 36.777 38.451 9.748.035 19.107-3.996 25.997-11.198l27.6-28.82c.501-.52.781-1.228.777-1.965-.008-1.516-1.192-2.737-2.644-2.729h-1.051a42.612 42.612 0 01-16.823-3.403 2.548 2.548 0 00-2.865.604l-19.846 20.75c-6.163 6.435-16.154 6.435-22.317 0-6.162-6.435-6.162-16.868 0-23.303l33.568-35.022c6.157-6.422 16.132-6.422 22.29 0 4.15 4.078 10.623 4.078 14.773 0 1.785-1.866 2.868-4.341 3.049-6.972.192-3.144-.919-6.223-3.05-8.454z"
          fill="#17c437"
          fillRule="nonzero"
        />
        <path
          d="M261.4 120.383c-14.372-15.007-37.674-15.007-52.046 0l-27.574 28.765a2.834 2.834 0 00-.552 3.02c.418 1.032 1.397 1.695 2.47 1.674h.973a42.536 42.536 0 0116.797 3.43 2.548 2.548 0 002.865-.603l19.793-20.64c6.163-6.436 16.154-6.436 22.317 0 6.162 6.434 6.162 16.867 0 23.302l-24.656 25.718-.21.247-8.623 8.948c-6.157 6.422-16.132 6.422-22.29 0-4.15-4.078-10.623-4.078-14.773 0-1.796 1.88-2.88 4.376-3.049 7.027-.192 3.144.918 6.223 3.05 8.453a36.518 36.518 0 0010.514 7.686c.552.274 1.104.494 1.656.74.552.248 1.13.44 1.682.66.552.219 1.13.411 1.682.576l1.551.439c1.051.274 2.103.494 3.18.686 1.299.201 2.606.33 3.917.384h1.998l1.577-.192c.578-.027 1.183-.164 1.866-.164h.894l1.814-.275.841-.165 1.524-.329h.29c6.456-1.693 12.352-5.184 17.06-10.1l33.461-34.94c14.373-15.008 14.373-39.34 0-54.347z"
          fill="#17c437"
          fillRule="nonzero"
        />
      </svg>
  </div>
);

const OptionChainCard = () => (
    <CardWrapper>
         <div style={{paddingTop: '10%',paddingLeft: '35%'}}><Money/></div>
        <CardText>
          {'Option Chain'}
        </CardText>
    </CardWrapper>
);

export {Home};
