import React from 'react';
import { Avatar, PageHeader, Button } from 'antd';

const logout = () => {
    localStorage.removeItem('googleid');
    localStorage.removeItem('customertoken');
    window.location = window.origin;
};

const Header = () => (
      <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          title="Home"
          extra={[
              <Button
                  onClick={logout}
              >{'Logout'}
              </Button>,
              <Avatar icon="user" />
          ]}
      />
);

export {Header};
