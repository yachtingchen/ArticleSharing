import React, { PropTypes } from 'react';
import WorkEditForm from '../components/WorkEditForm';
import { Modal, Button } from 'semantic-ui-react';
import * as actions from '../actions/loginActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import Auth from '../modules/Auth';
import {API_SRV_ORIGIN} from '../constants/envConfig';
import intl from '../utils/intl';

class WorkEditPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      title: '',
      serial: '',
      workImgUrl: '',
      workDesc: {},
      downloadInstruction: {},
      isVisible: true,
      showInFrontPage: true,
      errors: {},
      isProcessing: false,
      openModal: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.processForm = this.processForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }  

  componentDidMount() {    
    if (!this.props.params.id)
      return;

    axios.get(`${API_SRV_ORIGIN}/api/work/${this.props.params.id}`).then((response) => {
      this.setState({ 
        workImgUrl: response.data.workImgUrl,
        workDesc: response.data.workDesc,
        isVisible: response.data.isVisible,
        showInFrontPage: response.data.showInFrontPage,
        downloadInstruction: response.data.downloadInstruction,
        title: response.data.title,
        serial: response.data.serial,        
        });
    }).then(()=>{
      //document.title = `${this.state.title} - ${intl.PRINT_SHEETS}`;
    });
  }

  closeModal() {    
    this.setState({ openModal: false });

    const from = this.props.location.query.from;
    if (from) {
      this.context.router.replace(`/${from}`);  
      return;
    }

    const workId = this.props.params.id ? this.props.params.id : this.newlyCreatedWorkId;
    this.context.router.replace(`/works/${workId}`);
  }

  handleInputChange(event, semanticData) {    
    const name = semanticData ? semanticData.name : event.target.name;
    let value = semanticData ? semanticData.value : event.target.value;
    console.log(`handleInputChange ${name} : ${value}`);    

    if (value === 'true' || value === 'false') {
      value = (value == 'true');
    }

    this.setState({
        [name]: value
    });
  }

  addOrEditWork({method, url, data}) {
    this.setState({isProcessing: true});

    axios({
      method,
      url,
      data,
      headers: {'Authorization': `bearer ${Auth.getToken()}`}
    }).then((response)=>{
      this.setState({
        isProcessing: false,
        openModal: true,
        errors: {}
      });
      this.newlyCreatedWorkId = response.data.id;
    })
    .catch((axiosErr) => {
      const errors = axiosErr.response.data.errors ? axiosErr.response.data.errors : {};
      errors.summary = axiosErr.response.data.message;
      this.setState({
        isProcessing: false,
        errors
      });
    });
  }

  processForm(event) {
    event.preventDefault();
    console.log(this.state);
    
    let method = 'post';
    let url = `${API_SRV_ORIGIN}/api/work`;
    if (this.props.params.id) {
      method = 'put';
      url += `/${this.props.params.id}`;
    }    

    let data = {
        isVisible: this.state.isVisible,
        showInFrontPage: this.state.showInFrontPage,
        title: this.state.title,
        serial: this.state.serial,
        workImgUrl: this.state.workImgUrl,
        workDesc: this.state.workDesc,
        downloadInstruction: this.state.downloadInstruction,
      };
    
    this.addOrEditWork({method, url, data});

    // testing logic
    // for(let i=1; i<=10; i++) {
    //   data = {
    //     isVisible: i % 2 === 0,
    //     showInFrontPage: i % 2 === 1,
    //     title: `${this.state.title}-${i.toString()}`,
    //     serial: this.state.serial,
    //     workImgUrl: this.state.workImgUrl,
    //     workDesc: this.state.workDesc,
    //     downloadInstruction: this.state.downloadInstruction,
    //   };
    //   this.sendPostReq({method, url, data});
    // }
  }


  render() {
    return (
      <div>
        <WorkEditForm
          onSubmit={this.processForm}
          onChange={this.handleInputChange}
          isVisible={this.state.isVisible}
          status={this.state.status}
          showInFrontPage={this.state.showInFrontPage}
          title={this.state.title}
          serial={this.state.serial}
          errors={this.state.errors}
          workImgUrl={this.state.workImgUrl}
          workDesc={this.state.workDesc}
          downloadInstruction={this.state.downloadInstruction}
          isProcessing={this.state.isProcessing}
        />
        <Modal size="small" open={this.state.openModal}>
          <Modal.Header>
            {`「${this.state.title}」Saved successfully`}
          </Modal.Header>
          <Modal.Actions>
            <Button positive content="OK" onClick={this.closeModal}/>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

}

WorkEditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.shape({
        id: PropTypes.string
    }).isRequired,
  location: PropTypes.object.isRequired,
};

WorkEditPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {
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
)(WorkEditPage);
