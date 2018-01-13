import React from 'react';
import {Link} from 'react-router';
import '../styles/about-page.css';
import intl from '../utils/intl';

const MemberEditSuccessPage = () => {
  return (
    <div>
      <h2 className="alt-header"></h2>
      <p>
        {intl.EDIT_SUCCESS}
      </p>
      <p>
        <Link to="/">{intl.BACK_2_HOME}</Link>
      </p>
    </div>
  );
};

export default MemberEditSuccessPage;
