import React, { PropTypes } from 'react';
import WorkView from '../components/WorkView';
import axios from 'axios';
import {API_SRV_ORIGIN} from '../constants/envConfig';
import * as actions from '../actions/loginActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import intl from '../utils/intl';

class WorkViewPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
        workDesc: {},
        downloadInstruction: {},
        title: '',
        workImgUrl: ''
    };

    this.onEdit = ()=>{
      this.context.router.replace(`/work_edit/${this.props.params.id}`);
    };   
  }

  componentDidMount() {   
    axios.get(`${API_SRV_ORIGIN}/api/work/${this.props.params.id}`).then((response) => {
      this.setState({ 
          workDesc: response.data.workDesc,
          downloadInstruction: response.data.downloadInstruction,
          title: response.data.title,
          workImgUrl: response.data.workImgUrl
        });
    }).then(()=>{
      //document.title = `${this.state.title} - ${intl.PRINT_SHEETS}`;
    });
  }
  
  render() {
    return (
        <WorkView 
            title={this.state.title}
            workDesc={this.state.workDesc}
            downloadInstruction={this.state.downloadInstruction}
            workImgUrl={this.state.workImgUrl}
            isAdmin={this.props.loggedInUser.isAdmin == 'true'}
            onEdit={this.onEdit}
        />
    );
  }

}

WorkViewPage.propTypes = {
    params: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired,
    loggedInUser: PropTypes.object.isRequired
}

WorkViewPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
      loggedInUser: state.loggedInUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkViewPage);
