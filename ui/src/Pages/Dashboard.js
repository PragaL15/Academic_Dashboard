import React from 'react';
import Sidebar from '../components/sidebar';
import UserTable from '../components/Dashboard/UserManagement'
import TopBar from '../components/topbar'
const Dashboard = () => {
  return ( 
    <div style={{ display: 'flex' }}>
        <TopBar/>
      <Sidebar>

        <UserTable/>
      </Sidebar>

    </div>
  );
}

export default Dashboard;
