import React, { PropTypes } from 'react';


const Dashboard = ({ secretData }) => (
  <div className="container">
    {"You should get access to this page only after authentication."}
    {secretData}
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
