import React from 'react';
import Sidebar from '../components/sidebar';
import UserTable from '../components/Dashboard/UserManagement'
import TopBar from '../components/topbar'
const Dashboard = () => {
  return (
    <>
      <div className=' h-screen'>
        <TopBar /> {/* Top navbar */}
        <Sidebar />
        <div className='w-full md:pl-60 md:pt-20 md:pr-8 p-3 bg-gray-100 h-full '>
            <UserTable />
        </div>
      </div>
    </>
  );
}

export default Dashboard;