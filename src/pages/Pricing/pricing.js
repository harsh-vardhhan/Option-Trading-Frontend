import React, {Component} from 'react';
import {Button, Typography, Card, Row, Col, Layout} from 'antd';
import styled from 'styled-components';
import {getOrderId, generateSignature, getUserProfile, validateCustomerToken} from '../../api/login';
import {Link} from 'react-router-dom';

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
const {Header} = Layout;

export class Pricing extends Component {
    state = {
        orderId: 0,
        user_name: '',
        user_full_name: '',
        days_to_expiry: 0
    }

    async componentDidMount() {

        if (localStorage.getItem('googleid') === null || 
            localStorage.getItem('customertoken') === null) {
            window.location = window.origin;
        }
        async function validateCustomer() {
            try {
                await validateCustomerToken();
            } catch (error) {
                window.location = window.origin;
            }
        }
        validateCustomer();
        const profile = await getUserProfile(localStorage.getItem('googleid'));
        this.setState({
            user_full_name: profile.user_full_name,
            user_email: profile.user_email,
            days_to_expiry: profile.days_to_expiry
        });
        const orderVal = await getOrderId();
        this.setState({orderId: orderVal.orderId});
    }

    openCheckout = () => {
        const orderIdVal = this.state.orderId;
        const options = {
            key: 'rzp_test_XG4tR3C21DwLwE',
            order_id: orderIdVal,
            amount: 80000,
            name: 'TrakBit',
            description: 'Trakbit Premium',
            image: 'https://user-images.githubusercontent.com/3825401/72406715-31903800-3783-11ea-876a-c3ccef5ad44f.jpg',
            handler: async(response) => {
                const signature = await generateSignature(
                    response.razorpay_payment_id,
                    orderIdVal,
                    response.razorpay_signature,
                    localStorage.getItem('googleid'));
                window.location = window.origin + signature.data.url
            },
            theme: {
                color: '#1890ff'
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    render() {
        return (
            <Container>
                <Header style={{background: '#f2f6f5'}}>
                    <div className='logo'>
                        <Link to={'/'}>
                            <Logo/>
                        </Link>
                    </div>
                    <Title>{'TrakBit'}</Title>
                </Header>
                <div style={{width: '100%', paddingTop: 30}}>
                    <Row>
                        <Col
                            span={6}
                            push={18}
                        >
                            <Card
                                size='small'
                                title='Account'
                                style={{width: 300}}
                            >
                                <Text strong>{this.state.user_full_name}</Text>
                                <br/>
                                <Text strong>{this.state.user_email}</Text>
                                <br/>
                                <Text strong>{'Expires in '}{this.state.days_to_expiry}{' days'}</Text>
                            </Card>
                        </Col>
                        <Col
                            span={18}
                            pull={6}
                        >
                            <PricingContainer style={{width: '100%'}}>
                                <PricingContainer style={{width: '80%'}}>
                                    <Title>
                                        <p style={{textAlign: 'center'}}>
                                            {'Pricing'}
                                        </p>
                                    </Title>
                                    <Card
                                        title='Premium'
                                        style={{textAlign: 'center', width: 300}}
                                    >
                                        <Title>{'800 ₹/ Month'}</Title>
                                        <Text strong>{'Enhanced Option Chain'}</Text>
                                        <br/>
                                        <Text strong>{'Strategy Builder'}</Text>
                                        <br/>
                                        <Text strong>{'Risk Reward Ratio'}</Text>
                                        <br/>
                                        <Text strong>{'Quick Graph'}</Text>
                                        <div style={{paddingTop: 35}}>
                                            <Button
                                                type='primary'
                                                block={true}
                                                onClick={this.openCheckout}
                                            >
                                                {'Pay Now'}
                                            </Button>
                                        </div>
                                    </Card>
                                </PricingContainer>
                            </PricingContainer>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

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