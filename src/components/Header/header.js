import React from 'react';
import {PageHeader, Button } from 'antd';
import {Link} from 'react-router-dom';

const logout = () => {
    localStorage.removeItem('googleid');
    localStorage.removeItem('customertoken');
    window.location = window.origin;
};

const Header = ({header}) => (
      <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          title={header}
          extra={[
              <Link to={'/account'}>
                <Button>
                  {'Account'}
                </Button>
              </Link>,
              <Link to={'/home'}>
                <Button>
                  {'Home'}
                </Button>
              </Link>,
              <Button
                  onClick={logout}
              >{'Logout'}
              </Button>
          ]}
      />
);

export {Header};
