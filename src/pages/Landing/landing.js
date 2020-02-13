import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import {Row, Col, Typography, Layout, Button, Card, Alert, PageHeader} from 'antd';
import {GoogleLogin} from 'react-google-login';
import {validateProfile} from '../../api/login';

const {Header, Footer} = Layout;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.section`
  display: flex;
  margin: 0;
  flex-direction: column;
  text-align: center;
`;

const HeaderContainer = styled.section`
  display: flex;
  text-align: center;
  align-items: center;
  margin: 0 0 0 37%;
`;


const PricingContainer = styled(FlexCol)`
  padding: 0rem 5rem 0rem 5rem;
  align-items: center;
  justify-content: space-between;
`;

const {Title, Text} = Typography;

export function Landing() {
    const [urlPath, setUrl] = useState('');
    const handleLogin = async (googleUser) => {
        const status = await validateProfile(
            googleUser.getAuthResponse().id_token,
            googleUser.profileObj);

        setUrl(status.data.url);
        localStorage.setItem('customertoken', status.data.customertoken);
        localStorage.setItem('googleid', status.data.googleid);
    };
    useEffect(() => {
        if (urlPath !== '') {
            window.location.replace(`${urlPath}`);
        }
    }, [urlPath]);
    return (
        <Container>
            <Header style={{background: '#33334f'}}>
                <HeaderContainer>
                        <Notification/>
                        <h3 style={{color: '#FFFFFF'}}>{'START YOUR 7 DAYS FREE TRIAL'}</h3>
                </HeaderContainer>
            </Header>
            <Header style={{background: '#fff'}}>
                <div className='logo'><Logo/></div><Title >{'TrakBit'}</Title>
            </Header>
            <div>
                <Row>
                    <Col
                        span={12}
                        style={{paddingTop: '15%', paddingBottom: '15%', alignItems:'center'}}
                    >
                        <Title>{'Options Analytics Tool'}</Title>
                        <h2>{'For trading NIFTY and BANKNIFTY index options'}</h2>
                        <GoogleLogin
                            clientId='639182935981-99okgdgro1iv85g6uorcldr87rrenrmn.apps.googleusercontent.com'
                            onSuccess={handleLogin}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <Button
                                    type='primary'
                                    icon='google'
                                    onClick={renderProps.onClick}
                                >
                                    {'Google'}
                                </Button>
                            )}
                        />
                    </Col>
                    <Col span={12}><Chart/></Col>
                </Row>

                <Row style={{paddingLeft: '5%', paddingTop: '2%', paddingBottom: '10%', backgroundColor: '#f2f6f5'}}>
                    <Col
                        span={8}
                        style={{paddingTop: '5%', textAlign: 'center'}}
                    >
                        <div style={{paddingLeft: '20%'}}>
                            <OIGraph/>
                        </div>
                        <div style={{paddingTop: '16%'}}>
                            <Title level={2}>{'Open Interest Graph'}</Title>
                            <h2>{'See the support and resistance of an option in the option chain'}</h2>
                        </div>
                    </Col>
                    <Col
                        span={8}
                        style={{paddingTop: '5%'}}
                    >
                        <div style={{paddingLeft: '16%'}}>
                            <Clock/>
                        </div>
                        <div style={{paddingTop: '21%'}}>
                            <Title level={2}>{'Real Time'}</Title>
                            <h2>{'Get updated feed every 10 seconds'}</h2>
                        </div>
                    </Col>
                    <Col
                        span={8}
                        style={{paddingTop: '9%'}}
                    >
                        <div style={{paddingLeft: '35%', paddingTop: '-1%'}}>
                            <Greeks/>
                        </div>
                        <div style={{paddingTop: '22%'}}>
                            <Title level={2}>{'Greeks and IV'}</Title>
                            <h2>{'High quality indicators for'}<br/>{'option analysis'}</h2>
                        </div>
                    </Col>
                </Row>

                <Row style={{paddingTop: '5%', paddingBottom: '5%'}}>
                    <Col span={12}>
                        <div style={{paddingLeft: '1%'}}>
                            <Card>
                                <img
                                    style={{
                                        width: '100%',
                                        borderImageWidth: '2px',
                                        borderColor: '#00000'
                                    }}
                                    src={require('../Images/build.png')}
                                />
                            </Card>
                        </div>
                    </Col>
                    <Col
                        span={12}
                        style={{paddingTop: '10%'}}
                    >
                        <Title>{'Strategy Builder'}</Title>
                        <h2>{'Build Strategies on top of your option chain'}</h2>
                    </Col>
                </Row>

                <Row style={{paddingLeft: '5%', paddingTop: '2%', paddingBottom: '10%', backgroundColor: '#f2f6f5'}}>
                    <Col span={8}>
                        <div style={{paddingLeft: '15%'}}>
                            <BullBear/>
                        </div>
                        <div style={{paddingTop: '10%'}}>
                            <Title level={2}>{'Put Call Ratio'}</Title>
                            <h2>{'Know if the market is bearish or bullish'}</h2>
                        </div>
                    </Col>
                    <Col
                        span={8}
                        style={{paddingTop: '7%'}}
                    >
                        <div style={{paddingLeft: '35%'}}>
                            <Liquid/>
                        </div>
                        <div style={{paddingTop: '23%'}}>
                            <Title level={2}>{'Liquidity filter'}</Title>
                            <h2>{'Pre Screened stock and index '}<br/>{'options for liquidity'}</h2>
                        </div>
                    </Col>
                    <Col
                        span={8}
                        style={{paddingTop: '5.5%'}}
                    >
                        <div style={{paddingLeft: '33%'}}>
                            <Money/>
                        </div>
                        <div style={{paddingTop: '25%'}}>
                            <Title level={2}>{'Option Price'}</Title>
                            <h2>{'Predict chang in price of option'}<br/>{'respect to underlying instrument price'}</h2>
                        </div>
                    </Col>
                </Row>

                <Row style={{paddingTop: '5%', paddingBottom: '12%'}}>
                    <Col
                        span={12}
                        style={{paddingTop: '8%'}}
                    >
                        <Title>{'Strategy Calculator'}</Title>
                        <h2>{'See Maximum profit, loss and premium'}
                            <br/>{'to be paid as you build your strategy'}</h2>
                    </Col>
                    <Col span={12}>
                        <div style={{paddingTop: '15%'}}>
                            <Card>
                                <img
                                    style={{
                                        height: '40%',
                                        width: '100%',
                                        borderImageWidth: '2px',
                                        borderColor: '#00000'
                                    }}
                                    src={require('../Images/stats.png')}
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row style={{paddingTop: '5%', paddingBottom: '5%', backgroundColor: '#f2f6f5'}}>
                    <Col
                        span={12}
                        style={{paddingLeft: '1%'}}
                    >
                        <Card
                            style={{
                            }}
                        >
                            <img
                                style={{
                                    height: '70%',
                                    width: '100%',
                                    borderImageWidth: '2px',
                                    borderColor: '#00000'
                                }}
                                src={require('../Images/chart.png')}
                            />
                        </Card>
                    </Col>
                    <Col
                        span={12}
                        style={{paddingTop: '10%'}}
                    >
                        <Title>{'Analysis Chart'}</Title>
                        <h2>{'Check the returns of your strategy'}
                            <br/>{'on every strike'}</h2>
                    </Col>
                </Row>
                <Row style={{paddingTop: '5%', paddingBottom: '5%', alignContent: 'center'}}>
                    <PricingContainer >
                        <Title>
                            <p style={{textAlign: 'center'}}>
                                {'Pricing'}
                            </p>
                        </Title>
                        <Card
                            title='Premium'
                            style={{width: 300}}
                        >
                            <Title>{'800 ₹/ Month'}</Title>
                            <Text strong>{'Enhanced Option Chain'}</Text>
                            <br/>
                            <Text strong>{'Strategy Builder'}</Text>
                            <br/>
                            <Text strong>{'Risk Reward Ratio'}</Text>
                            <br/>
                            <Text strong>{'Quick Graph'}</Text>
                        </Card>
                    </PricingContainer>
                </Row>
            </div>
            <Footer style={{textAlign: 'center', backgroundColor: '#33334f'}}>
                <h2 style={{color: '#FFFFFF'}}>{'TrakBit TechSolutions LLP'}</h2>
            </Footer>
        </Container>
    );
}

const Chart = props => (
    <div style={{width: '90%'}}>
        <svg
            viewBox='0 0 1772 1772'
            fillRule='evenodd'
            clipRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit={1.414}
            {...props}
        >
            <path d='M615.903 586.568h22.271v771.906h-22.27zM780.087 421.45h22.271v665.214h-22.27z'/>
            <path
                fill='#c8dad3'
                d='M260.714 305.496h22.271v1183.666h-22.27z'
            />
            <path
                fill='#c8dad3'
                d='M1530.51 1468.67l.039 18.561-1254.888 1.852-.04-18.56z'
            />
            <path d='M936.242 754.474h22.271v600.513h-22.27zM1107.228 647.238h22.271v600.513h-22.27zM1411.343 518.467h22.271v600.513h-22.27z'/>
            <path
                fill='#009975'
                d='M584.282 717.424h87.884v455.53h-87.884z'
            />
            <path d='M439.708 657.471h22.271v771.906h-22.27z'/>
            <path
                fill='#009975'
                d='M408.088 788.328h87.884v455.53h-87.884zM746.743 531.995h87.883v455.529h-87.883zM1073.731 713.854h87.884v455.529h-87.884zM1376.37 576.476h87.883v455.529h-87.884z'
            />
            <path
                fill='#f76262'
                d='M903.476 834.26h87.884v455.529h-87.884z'
            />
            <path d='M1255.102 836.181h22.271v600.513h-22.27z'/>
            <path
                fill='#f76262'
                d='M1222.336 915.967h87.884v455.529h-87.884z'
            />
        </svg>
    </div>
);

const OIGraph = props => (
    <div style={{width: '70%', height: '20%'}}>
        <svg
            viewBox='0 0 1536 1063'
            fillRule='evenodd'
            clipRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit={1.414}
            {...props}
        >
            <path
                fill='#009975'
                d='M1454.12 43.341l.092 149.313-682.06.42-.091-149.313z'
            />
            <path
                fill='#58b368'
                d='M1453.201 210.123l.092 149.312-501.63.31-.092-149.313z'
            />
            <path
                fill='#f76262'
                d='M191.327 33.795l.092 149.312-88.825.055-.092-149.312zM344.64 196.61l.092 149.312-245.618.152-.092-149.313zM393.04 538.566l.092 149.313-296.433.182-.092-149.312zM534.66 714.019l.091 149.312-431.997.267-.092-149.313z'
            />
            <path
                fill='#e42c64'
                d='M727.611 883.31l.092 149.312-625.01.385-.092-149.312z'
            />
            <path
                fill='#f76262'
                d='M207.841 366.897l.092 149.312-108.802.067-.092-149.312z'
            />
            <path
                fill='#58b368'
                d='M1453.05 380.755l.092 149.313-424.443.261-.092-149.312zM1453.6 552.18l.091 149.313-349.973.216-.092-149.313zM1452.774 720.959l.092 149.312-492.61.304-.091-149.313zM1450.884 886.63l.092 149.312-206.832.127-.092-149.312z'
            />
        </svg>
    </div>
);

const Clock = props => (
    <div style={{paddingLeft: '25%', width: '50%', height: '50%', paddingTop: '15%'}}>
        <svg
        viewBox="0 0 380 380"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit={1.414}
        {...props}
        >
        <path
            d="M193.165 92.278c-55.14 0-100 44.86-100 100 0 55.141 44.86 100 100 100s100-44.859 100-100c0-55.14-44.86-100-100-100zm0 178.948c-43.532 0-78.948-35.416-78.948-78.948 0-43.531 35.416-78.947 78.948-78.947 43.531 0 78.947 35.416 78.947 78.947 0 43.532-35.416 78.948-78.947 78.948z"
            fill="#40a9ff"
            fillRule="nonzero"
        />
        <path
            d="M246.845 189.19h-39.05a17.277 17.277 0 00-5.683-5.682v-46.946a8.947 8.947 0 00-8.947-8.947 8.947 8.947 0 00-8.948 8.947v46.946c-4.918 3.02-8.207 8.447-8.207 14.63 0 9.458 7.696 17.154 17.155 17.154 6.182 0 11.61-3.289 14.63-8.207h39.05a8.947 8.947 0 008.948-8.948 8.947 8.947 0 00-8.948-8.947z"
            fill="#40a9ff"
            fillRule="nonzero"
        />
        <ellipse
            cx={181.382}
            cy={176.194}
            rx={162.504}
            ry={159.776}
            fill="#40a9ff"
            fillOpacity={0.15}
            transform="matrix(1 0 0 1.01705 12 12.72)"
        />
        </svg>
    </div>
);

const Greeks = props => (
    <div style={{paddingLeft: '2%', width: '33%', height: '18%'}}>
        <svg
        viewBox="0 0 300 300"
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
            fill="#ee200d"
            fillOpacity={0.15}
            transform="matrix(.76921 0 0 .78234 17.288 15.543)"
        />
        <path
            d="M198.56 219.774h-92.912a6.647 6.647 0 01-6.013-3.84 6.678 6.678 0 01.915-7.095l46.231-55.738-46.23-55.732a6.703 6.703 0 01-.916-7.1 6.647 6.647 0 016.013-3.84h92.911c3.664 0 6.638 2.98 6.638 6.666v20.002c0 3.687-2.974 6.668-6.638 6.668-3.662 0-6.636-2.981-6.636-6.668V99.763h-72.106l40.702 49.065a6.696 6.696 0 010 8.54l-40.702 49.071h72.106v-13.335c0-3.687 2.974-6.667 6.636-6.667 3.664 0 6.638 2.98 6.638 6.667v20.002c0 3.687-2.974 6.668-6.638 6.668z"
            fill="#ee200d"
            fillRule="nonzero"
        />
        </svg>
    </div>
);

const BullBear = props => (
    <svg
        viewBox='0 0 1772 1182'
        fillRule='evenodd'
        clipRule='evenodd'
        strokeLinejoin='round'
        strokeMiterlimit={1.414}
        {...props}
    >
        <path
            d='M296.072 730.638l-11.297 58.047 45.189 48.373 11.296 29.023h56.487l-11.297-29.023-45.19-58.047 33.892-38.697-79.08-9.676z'
            fill='#009975'
            fillRule='nonzero'
        />
        <path
            d='M716.332 585.334l-4.518-18.967 51.969-8.899 19.996-25.694 18.795 10.737-22.595 29.024c-1.66 2.13-4.248 3.61-7.183 4.11l-56.464 9.689z'
            fill='#9196a9'
            fillRule='nonzero'
        />
        <path
            d='M149.207 866.081h56.487l-11.298-29.023v-48.373l33.892-19.348 33.892-38.699 90.379 19.35 56.485-9.674 56.487 9.674 45.189 77.396v19.348l11.297 19.35h45.19l-11.299-29.024-11.296-58.047 22.595-29.023 79.08-29.024 45.189-87.07 33.892 19.35 33.892-19.35-22.595-48.371V537.15l-33.892-29.023-45.189 9.675-33.892 19.348-56.485 9.675-33.892 19.349-158.163 9.674L262.18 604.87l-67.784 38.699-11.297 58.045-45.188 58.047 11.296 77.396v29.023z'
            fill='#58b368'
            fillRule='nonzero'
        />
        <path
            d='M671.143 556.31l-4.517-18.966 51.968-8.9 19.996-25.693 18.794 10.737-22.594 29.023c-1.661 2.131-4.247 3.61-7.183 4.111l-56.464 9.689z'
            fill='#bec3d1'
            fillRule='nonzero'
        />
        <path
            d='M753.06 299.976l-29.088 12.452 36.253 10.34-164.174 70.286c-2.19.936-3.966 2.457-5.064 4.332L540.33 484.15 404.18 403.433c-2.637-1.565-5.918-2.092-9.035-1.46-3.123.633-5.775 2.371-7.315 4.78l-66.084 103.755-188.882 80.82 10.1 17.318 192.054-82.233c2.063-.887 3.762-2.29 4.87-4.025l61.76-96.975 136.539 80.947c2.692 1.597 6.062 2.117 9.24 1.418 3.17-.695 5.836-2.538 7.298-5.045l54.791-93.845 160.805-68.811-12.087 31.026 29.093-12.453 17.122-44.011-51.388-14.663z'
            fill='#2cb357'
            fillRule='nonzero'
        />
        <path
            d='M1060.587 660.981l-51.214 101.956-20.487 64.882 51.216 46.343 20.485-18.536-10.243-27.807 61.458-74.15-51.215-92.688z'
            fill='#e42c64'
            fillRule='nonzero'
        />
        <path
            d='M1439.578 753.67v74.149l40.972 18.538v27.805h-71.702l-71.7-101.956h-184.373l10.241 55.613 30.73 18.538 10.243 27.805h-81.944l-102.43-148.3V621.783l44.983-49.987 77.934-12.771 112.672 27.805 112.673 9.27 71.7 27.806 81.944 37.075 30.73 46.344 30.729 27.806-20.486 27.806-51.216-9.268-30.728 9.268-40.972-9.268z'
            fill='#f76262'
            fillRule='nonzero'
        />
        <path
            d='M1511.278 716.594c-2.725.022-5.346-.946-7.277-2.688-1.925-1.743-2.996-4.115-2.966-6.581a8.496 8.496 0 0 1 .815-3.521 10.63 10.63 0 0 1 2.157-3.06c2.46-2.177 5.945-3.11 9.317-2.503.645.1 1.265.29 1.846.557.65.2 1.27.48 1.84.833l1.54 1.114a9.49 9.49 0 0 1 2.15 3.059 8.542 8.542 0 0 1 .821 3.52c-.04 2.454-1.1 4.802-2.97 6.582-.491.398-1 .769-1.541 1.112-.57.35-1.19.63-1.84.833a6.979 6.979 0 0 1-1.846.557c-.676.104-1.36.162-2.046.186z'
            fill='#354468'
            fillRule='nonzero'
        />
        <path
            d='M1577.693 572.475l-26.378-11.938 10.963 29.733-125.531-56.79-49.675-80.915c-2.57-4.177-8.222-5.906-13.063-3.987l-154.666 61.175-47.039-93.616c-.97-1.933-2.64-3.508-4.74-4.458l-174.132-78.785-9.157 16.592 170.884 77.31 49.75 98.99c2.326 4.604 8.302 6.668 13.43 4.635l155.344-61.5 46.7 76.051c1.004 1.629 2.53 2.951 4.37 3.792l128.368 58.09-32.87 9.906 26.373 11.93 46.599-14.053-15.53-42.162z'
            fill='#f76262'
            fillRule='nonzero'
        />
    </svg>
);

const Liquid = props => (
    <div style={{paddingLeft: '5%', width: '40%', height: '25%'}}>
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
            fill="#40a9ff"
            fillOpacity={0.15}
            transform="matrix(1 0 0 1.01705 12 12.72)"
        />
        <path
            d="M260.13 247.173l-48.438-78.856v-39.68h6.163c1.669 0 3.115-.63 4.333-1.89 1.221-1.259 1.83-2.75 1.83-4.474 0-1.724-.609-3.216-1.83-4.475-1.218-1.26-2.664-1.889-4.333-1.889h-49.3c-1.67 0-3.114.63-4.334 1.89-1.22 1.258-1.83 2.75-1.83 4.474 0 1.724.61 3.216 1.83 4.475 1.22 1.259 2.665 1.89 4.334 1.89h6.162v39.678l-48.434 78.856c-3.594 5.902-4.284 10.959-2.07 15.166 2.215 4.21 6.725 6.315 13.53 6.315h110.929c6.802 0 11.311-2.105 13.525-6.315 2.216-4.207 1.526-9.262-2.068-15.165zm-101.204-29.435l26.191-42.661 1.926-3.084V128.637h12.324v43.356l1.925 3.084 26.192 42.66h-68.558z"
            fill="#40a9ff"
            fillRule="nonzero"
        />
        </svg>
    </div>
);

const Logo = props => (
    <div style={{paddingLeft: '5%', paddingTop: '0.5%', width: '10%', height: 20}}>
        <svg
            viewBox='0 0 439 439'
            fillRule='evenodd'
            clipRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit={1.414}
            {...props}
        >
            <ellipse
                cx={214.551}
                cy={198.285}
                rx={176.242}
                ry={178.261}
                fill='#40a9ff'
                transform='matrix(1.19515 0 0 1.20122 -38.814 -19.593)'
            />
            <path
                fill='#fff'
                d='M195.747 123.486h39.483v263.949h-39.483z'
            />
            <path
                fill='#fff'
                d='M76.291 96.734h279.061v38.582H76.291z'
            />
        </svg>
    </div>
);

const Money = props => (
    <div style={{paddingLeft: '5%', paddingTop: '6%', width: '37%'}}>
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
            d="M247.89 141.142h-11.84c-1.611-7.603-5.178-14.47-9.927-20.439h21.767c5.93 0 10.744-4.578 10.744-10.219 0-5.64-4.813-10.219-10.744-10.219H140.453c-5.93 0-10.743 4.578-10.743 10.22 0 5.64 4.813 10.218 10.743 10.218h42.975c13.988 0 25.806 8.564 30.254 20.439h-73.229c-5.93 0-10.743 4.578-10.743 10.219 0 5.64 4.813 10.219 10.743 10.219h73.23c-4.449 11.875-16.267 20.438-30.255 20.438h-42.975c-1.396 0-2.793.266-4.104.777-2.621 1.042-4.727 3.025-5.823 5.539a9.682 9.682 0 000 7.807 9.725 9.725 0 002.342 3.332l85.928 81.732c2.106 2.003 4.856 3.005 7.607 3.005 2.75 0 5.5-1.002 7.606-2.984 4.19-3.986 4.19-10.465 0-14.45l-67.62-64.32h17.039c25.957 0 47.637-17.576 52.623-40.876h11.84c5.93 0 10.743-4.578 10.743-10.22 0-5.64-4.813-10.218-10.744-10.218z"
            fill="#17c437"
            fillRule="nonzero"
        />
        </svg>
    </div>
);


const Notification = () => {
    
    return (
        <div style={{paddingTop: '1.4%',height: '4%',width: '4%'}}>
            <svg
            viewBox="0 0 4 4"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit={1.414}
            >
            <ellipse
                cx={19.18}
                cy={17.436}
                rx={6.133}
                ry={5.62}
                fill="#00ff30"
                fillOpacity={0.29}
                transform="matrix(.23456 0 0 .24839 -2.499 -2.33)"
            />
            <ellipse
                cx={18.402}
                cy={17.939}
                rx={4.317}
                ry={4.361}
                fill="#00ff30"
                transform="matrix(.15057 0 0 .14905 -.777 -.63)"
            />
            </svg>
        </div>
    )
}