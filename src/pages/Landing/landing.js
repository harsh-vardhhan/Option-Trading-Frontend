import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import {Row, Col, Typography, Layout, Button, Card, Alert} from 'antd';
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
            <Alert message="We are still in Pre-Alpha stage. Please do not use this product for the final decision for placing trade" banner/>
            <Header style={{background: '#fff'}}>
                <div className='logo'><Logo/></div><Title>{'TrakBit'}</Title>
            </Header>
            <div>
                <Row>
                    <Col
                        span={12}
                        style={{paddingTop: '15%', paddingBottom: '15%'}}
                    >
                        <Title>{'User Friendly Options Trading'}</Title>
                        <h2>{'Simple trading solution for index and stock options from NSE'}</h2>
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
                        style={{paddingTop: '2%'}}
                    >
                        <div style={{paddingLeft: '2%'}}>
                            <Greeks/>
                        </div>
                        <div style={{paddingTop: '3%'}}>
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
                        style={{paddingTop: '5%'}}
                    >
                        <div style={{paddingLeft: '25%'}}>
                            <Money/>
                        </div>
                        <div style={{paddingTop: '13%'}}>
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
            <Footer style={{textAlign: 'center', backgroundColor: '#FFFFFF'}}>
                <h2>{'TrakBit TechSolutions LLP'}</h2>
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
    <div style={{paddingLeft: '20%', width: '60%', height: '60%'}}>
        <svg
            viewBox='0 0 380 380'
            fillRule='evenodd'
            clipRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit={1.414}
            {...props}
        >
            <g
                fill='#40a9ff'
                fillRule='nonzero'
            >
                <path d='M190 0C85.233 0 0 85.233 0 190s85.233 190 190 190 190-85.233 190-190S294.767 0 190 0zm0 340c-82.71 0-150-67.29-150-150S107.29 40 190 40s150 67.29 150 150-67.29 150-150 150z'/>
                <path d='M291.993 184.132h-74.197A32.827 32.827 0 0 0 207 173.336V84.139c0-9.389-7.611-17-17-17s-17 7.611-17 17v89.197c-9.345 5.737-15.593 16.05-15.593 27.796 0 17.972 14.622 32.593 32.593 32.593 11.746 0 22.059-6.248 27.796-15.593h74.197c9.389 0 17-7.611 17-17s-7.611-17-17-17z'/>
            </g>
        </svg>
    </div>
);

const Greeks = props => (
    <div style={{paddingLeft: '5%', width: '100%', height: '75%'}}>
        <svg
            viewBox='0 0 1772 1182'
            fillRule='evenodd'
            clipRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit={1.414}
            {...props}
        >
            <path
                d='M633.382 505.507l-349.487 1.678c-9.592.046-18.527-5.596-23.608-14.908-5.083-9.312-5.588-20.966-1.333-30.794L431.783 62.13c4.64-10.72 14.175-17.52 24.638-17.57 10.464-.05 20.065 6.658 24.807 17.333l176.656 397.674c4.348 9.787 3.954 21.444-1.038 30.805-4.992 9.36-13.873 15.088-23.464 15.134zm-304.977-61.81l259.86-1.247-131.353-295.688-128.507 296.935z'
                fill='#009975'
                fillRule='nonzero'
            />
            <path
                d='M1289.168 107.283c-34.033-46.055-80.6-71.42-131.119-71.42-50.523 0-97.09 25.365-131.122 71.42-31.295 42.347-48.529 98.07-48.529 156.903 0 58.835 17.234 114.559 48.529 156.905 34.033 46.056 80.6 71.42 131.122 71.42 50.521 0 97.088-25.364 131.12-71.42 31.296-42.346 48.53-98.07 48.53-156.905-.002-58.834-17.236-114.556-48.53-156.903zm-131.119-8.871c53.309 0 99.319 58.98 109.485 134.5h-218.971c10.166-75.52 56.176-134.5 109.486-134.5zm0 331.55c-53.31 0-99.32-58.981-109.485-134.501h218.97c-10.166 75.518-56.176 134.5-109.485 134.5zM284.603 683.511l3.9.04 147.099 344.341c4.333 10.146 13.887 16.712 24.472 16.821 10.585.11 20.272-6.256 24.815-16.31L639.085 687.18l3.901.04c14.992.155 27.278-12.49 27.44-28.246.164-15.756-11.857-28.653-26.85-28.808l-62.433-.647c-14.992-.155-27.278 12.49-27.44 28.246-.16 15.317 11.205 27.895 25.61 28.73L461.076 948.15 348.278 684.105c14.42-.537 26.042-12.878 26.2-28.194.164-15.755-11.857-28.653-26.849-28.808l-62.434-.646c-14.992-.156-27.277 12.49-27.44 28.246-.164 15.755 11.856 28.653 26.848 28.808z'
                fill='#f76262'
                fillRule='nonzero'
            />
            <path
                d='M1298.348 675.86c14.904-3.128 25.99-14.787 25.99-28.728 0-16.338-15.206-29.582-33.965-29.582h-37.391c-18.76 0-33.966 13.244-33.966 29.582 0 7.27 3.023 13.916 8.016 19.066l-60.956 97.448-60.957-97.448c4.995-5.15 8.016-11.797 8.016-19.066 0-16.338-15.206-29.582-33.965-29.582h-37.39c-18.759 0-33.965 13.244-33.965 29.582 0 13.941 11.086 25.598 25.99 28.728l98.303 157.153v169.036h-7.78c-18.759 0-33.965 13.243-33.965 29.581s15.206 29.582 33.966 29.582h83.492c18.76 0 33.966-13.244 33.966-29.582s-15.207-29.581-33.966-29.581h-7.781v-169.03l98.308-157.16z'
                fill='#009975'
                fillRule='nonzero'
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
            viewBox='0 0 439 439'
            fillRule='evenodd'
            clipRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit={1.414}
            {...props}
        >
            <path
                d='M417.698 376.865L274.08 150.467V36.545h18.274c4.948 0 9.236-1.812 12.847-5.428 3.621-3.614 5.428-7.898 5.428-12.847s-1.807-9.231-5.428-12.847C301.591 1.807 297.303 0 292.354 0H146.177c-4.952 0-9.234 1.807-12.85 5.424-3.617 3.615-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.847c3.619 3.616 7.902 5.428 12.85 5.428h18.271v113.918L20.838 376.862c-10.656 16.946-12.703 31.463-6.136 43.543 6.567 12.087 19.939 18.131 40.113 18.131h328.911c20.17 0 33.54-6.044 40.104-18.131 6.571-12.08 4.524-26.593-6.132-43.54zm-300.071-84.51l77.658-122.481 5.709-8.853V36.542h36.541v124.479l5.708 8.853 77.662 122.481H117.627z'
                fill='#40a9ff'
                fillRule='nonzero'
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
    <div style={{paddingLeft: '5%', paddingTop: '0.5%', width: '55%'}}>
        <svg
            viewBox='0 0 512 512'
            fillRule='evenodd'
            clipRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit={1.414}
            {...props}
        >
            <path
                d='M423.536 400.403L58.118 441.769c-10.049 1.138-19.28-5.51-20.515-14.774l-24.68-185.267c-1.235-9.264 5.978-17.774 16.027-18.911l365.419-41.367c10.049-1.138 19.28 5.511 20.514 14.774l24.682 185.268c1.233 9.263-5.98 17.773-16.029 18.91z'
                fill='#0e9347'
                fillRule='nonzero'
            />
            <path
                d='M368.884 338.204c-21.012 2.378-38.962 13.813-47.905 30.212-9.696-3.175-20.194-5.407-32.07-4.062-31.974 3.62-55.55 28.514-56.304 57.663l190.931-21.614c9.136-1.034 15.659-7.756 16.364-16.385-7.58-29.06-38.128-49.537-71.016-45.814z'
                fill='#0d8944'
                fillRule='nonzero'
            />
            <path
                d='M384.751 387.697L92.416 420.79c-2.468-18.527-20.93-31.823-41.029-29.548L35.681 273.345c20.098-2.276 34.522-19.295 32.054-37.822L360.07 202.43c2.468 18.527 20.931 31.823 41.03 29.548l15.705 117.897c-20.098 2.276-34.522 19.295-32.054 37.822z'
                fill='#3bb54a'
                fillRule='nonzero'
            />
            <path
                d='M368.884 338.203c-21.012 2.38-38.962 13.814-47.905 30.213-9.696-3.176-20.194-5.407-32.07-4.062-25.58 2.895-45.71 18.851-53.066 40.2l148.908-16.857c-2.468-18.527 11.155-34.601 31.141-37.718-13.223-8.762-29.65-13.74-47.008-11.776z'
                fill='#0e9347'
                fillRule='nonzero'
            />
            <ellipse
                cx={256}
                cy={174.545}
                rx={93.091}
                ry={104.727}
                fill='#0e9347'
                transform='matrix(.78508 -.08887 .09641 .7237 8.435 208.043)'
            />
            <circle
                cx={116.364}
                cy={174.545}
                r={23.273}
                fill='#0e9347'
                transform='matrix(.78508 -.08887 .09641 .7237 8.435 208.043)'
            />
            <circle
                cx={395.636}
                cy={174.545}
                r={23.273}
                fill='#0e9347'
                transform='matrix(.78508 -.08887 .09641 .7237 8.435 208.043)'
            />
            <path
                d='M259.715 282.736c-.555-.375-1.22-.518-1.994-.43l-14.189 1.606c-1.47-3.869-3.7-7.119-6.69-9.746l19.334-2.189c.776-.088 1.382-.375 1.823-.862.438-.486.614-1.066.524-1.737l-.976-7.33a2.158 2.158 0 0 0-.964-1.569c-.557-.374-1.221-.518-1.997-.43l-69.038 7.815c-.775.088-1.381.376-1.822.862-.44.488-.616 1.067-.527 1.738l1.274 9.556c.083.623.417 1.132 1.003 1.528a2.824 2.824 0 0 0 1.958.47l12.032-1.361c11.672-1.321 19.445.545 23.32 5.602l-34.27 3.88c-.775.087-1.383.374-1.823.862-.44.488-.616 1.066-.526 1.737l.976 7.33c.09.67.412 1.193.967 1.567.555.375 1.22.518 1.994.43l35.434-4.01c-.694 4.066-3.13 7.38-7.31 9.945-4.18 2.564-9.919 4.26-17.221 5.086l-9.294 1.052c-.72.082-1.311.38-1.776.894-.465.515-.656 1.084-.573 1.706l1.216 9.127c.083.623.402 1.122.957 1.496 11.923 8.57 27.52 20.686 46.79 36.352.574.519 1.304.728 2.19.627l16.18-1.831c1.162-.132 1.908-.653 2.234-1.567.438-.925.221-1.727-.658-2.405-18.436-15.322-32.843-26.723-43.217-34.204 9.276-2.022 16.56-5.522 21.85-10.496 5.289-4.975 8.11-10.984 8.464-18.027l13.94-1.578c.774-.087 1.382-.374 1.822-.862.44-.486.617-1.066.527-1.736l-.976-7.33a2.153 2.153 0 0 0-.968-1.568z'
                fill='#89c763'
                fillRule='nonzero'
            />
            <path
                d='M441.59 290.88H73.427c-10.125 0-18.409-7.636-18.409-16.97V87.253c0-9.333 8.284-16.97 18.409-16.97H441.59c10.124 0 18.408 7.637 18.408 16.97V273.91c0 9.333-8.285 16.969-18.41 16.969z'
                fill='#0e9347'
                fillRule='nonzero'
            />
            <path
                d='M395.57 223.004c-21.17 0-40.499 9.333-51.544 24.604-9.204-4.24-19.328-7.635-31.293-7.635-32.214 0-58.907 22.06-63.509 50.907H441.59c9.204 0 16.567-5.939 18.408-14.424-3.682-29.695-31.294-53.452-64.429-53.452z'
                fill='#0d8944'
                fillRule='nonzero'
            />
            <path
                d='M404.774 273.91H110.243c0-18.665-16.567-33.937-36.816-33.937V121.19c20.249 0 36.816-15.272 36.816-33.938h294.53c0 18.666 16.568 33.938 36.817 33.938v118.783c-20.25 0-36.816 15.272-36.816 33.938z'
                fill='#3bb54a'
                fillRule='nonzero'
            />
            <path
                d='M395.57 223.004c-21.17 0-40.499 9.333-51.544 24.604-9.204-4.24-19.328-7.635-31.293-7.635-25.772 0-47.862 13.575-57.986 33.938h150.027c0-18.666 15.647-33.09 35.896-33.938-11.966-10.182-27.612-16.97-45.1-16.97z'
                fill='#0e9347'
                fillRule='nonzero'
            />
            <ellipse
                cx={256}
                cy={174.545}
                rx={93.091}
                ry={104.727}
                fill='#0e9347'
                transform='matrix(.79098 0 0 .72914 55.018 53.314)'
            />
            <g transform='matrix(.79098 0 0 .72914 55.018 53.314)'>
                <circle
                    cx={116.364}
                    cy={174.545}
                    r={23.273}
                    fill='#0e9347'
                />
            </g>
            <g transform='matrix(.79098 0 0 .72914 55.018 53.314)'>
                <circle
                    cx={395.636}
                    cy={174.545}
                    r={23.273}
                    fill='#0e9347'
                />
            </g>
            <g>
                <path
                    d='M294.549 155.684c-.501-.434-1.143-.651-1.922-.651H278.33c-.948-4.005-2.732-7.48-5.35-10.425h19.478c.781 0 1.42-.217 1.923-.65.5-.434.75-.99.75-1.665v-7.386c0-.676-.25-1.231-.75-1.666-.503-.433-1.142-.651-1.924-.651h-69.557c-.78 0-1.42.218-1.923.651-.5.435-.752.99-.752 1.665v9.629c0 .627.265 1.17.794 1.629a2.78 2.78 0 0 0 1.881.687h12.123c11.76 0 19.228 2.726 22.404 8.18h-34.527c-.78 0-1.422.217-1.923.652-.5.435-.752.989-.752 1.665v7.385c0 .675.25 1.23.752 1.664.502.435 1.144.651 1.923.651h35.7c-1.227 3.959-4.084 6.975-8.57 9.05-4.488 2.076-10.409 3.114-17.766 3.114H222.9c-.724 0-1.351.23-1.88.688-.53.458-.795 1.001-.795 1.628v9.195c0 .629.25 1.16.752 1.593 10.7 9.846 24.58 23.624 41.634 41.338.502.58 1.199.87 2.09.87h16.303c1.171 0 1.98-.434 2.424-1.304.558-.87.449-1.69-.334-2.462-16.273-17.279-29.065-30.214-38.373-38.804 9.475-.965 17.167-3.62 23.075-7.963 5.907-4.344 9.502-9.992 10.785-16.941h14.045c.78 0 1.42-.217 1.922-.652.502-.433.753-.988.753-1.664v-7.384c0-.677-.251-1.231-.753-1.666z'
                    fill='#89c763'
                    fillRule='nonzero'
                />
            </g>
        </svg>
    </div>
);