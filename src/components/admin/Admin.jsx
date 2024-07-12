import React from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

const Admin = () => {
  return (
    <div className="container-fluid">
      <TopNav />
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Admin <span style={{ color: 'green' }}>Dashboard</span></h1>
          </div>
          <p>Welcome to the admin dashboard. Use the sidebar to navigate between different sections.</p>
        </main>
      </div>
    </div>
  );
};

export default Admin;
