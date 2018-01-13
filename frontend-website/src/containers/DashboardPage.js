import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard';
import {API_SRV_ORIGIN} from '../constants/envConfig';
import TinyEditor from '../components/TinyEditor';


class DashboardPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

  }

  /**
   * Render the component.
   */
  render() {
    return (
      <TinyEditor/>
    )
  }

}

export default DashboardPage;
