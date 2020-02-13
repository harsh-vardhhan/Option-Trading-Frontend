import React, {Component} from 'react';
import {Button, Typography, Card, Row, Col} from 'antd';
import styled from 'styled-components';
import {getOrderId, generateSignature, getUserProfile, validateCustomerToken} from '../../api/login';
import {Header} from '../../components';

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

const UserContainer = styled(FlexCol)`
  padding: 0rem 2rem 0rem 2rem;
  align-items: center;
  justify-content: space-between;
`;

const {Title, Text} = Typography;
//const {Header} = Layout;

export class Account extends Component {
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
            <>
                <Header header={'Account'}/>
                <Container>     
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
                                    <UserContainer>
                                        <Money/>              
                                    </UserContainer>
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
            </>
        );
    }
}


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
            fill="#40a9ff"
            fillOpacity={0.15}
            transform="matrix(1 0 0 1.01705 12 12.72)"
        />
        <path
            d="M223.443 124.866c16.19 15.485 16.19 40.593 0 56.078-16.188 15.485-42.436 15.485-58.625 0-16.19-15.485-16.19-40.593 0-56.078 16.189-15.485 42.437-15.485 58.625 0M257.72 221.136c-37.792-24.424-89.388-24.424-127.18 0-5.606 3.621-8.956 9.74-8.956 16.37v34.358h145.092v-34.357c0-6.631-3.35-12.75-8.957-16.37z"
            fill="#40a9ff"
            fillRule="nonzero"
        />
        </svg>
    </div>
  );
  