import React from 'react';
import Sidebar from '../components/sidebar';
import UserTable from '../components/UserManagement'
const Dashboard = () => {
  return ( 
    <div style={{ display: 'flex' }}>
      <Sidebar>
        <UserTable/>
      </Sidebar>

    </div>
  );
}

export default Dashboard;
