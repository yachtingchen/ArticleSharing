import React, { PropTypes } from 'react';
import Gallery from '../components/Gallery';
import * as actions from '../actions/loginActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {API_SRV_ORIGIN} from '../constants/envConfig';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router';

function getTextFromDelta(delta, length) {
  if (!delta.ops) return null;

  let textLength = 0;
  let textList = [];

  for (let op of delta.ops) {
    if (typeof op.insert === 'string') {
      if (op.insert === '\n') continue;
      textList.push(op.insert);
      textLength += op.insert.length;
      if (textLength > length) break;
    }
  }
  
  return textList.join().substring(0, length);
}

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);
    
    // const link = "https://cdn.arstechnica.net/wp-content/uploads/2015/07/3D_XPoint_Wafer_Close-Up-640x427.jpg";
    // const link2 = "https://www.wired.com/wp-content/uploads/2017/02/fn_times_applenewsopener-1200x630-e1486514109682.jpg";
    // const link3 = "https://assets.entrepreneur.com/content/3x2/1300/20160606172427-business-people-meeting-office-briefing-coworkers-colleagues.jpeg";
    this.state = {
      elements: []
    };
  }

  componentDidMount() {
      axios.get(`${API_SRV_ORIGIN}/api/works`).then((response) => {        
        const elements = response.data.map((_) => {                    
          return {
            imgUrl: _.workImgUrl,
            title: _.title,
            desc: getTextFromDelta(_.workDesc, 90),
            workDesc: _.workDesc,
            downloadInstruction: _.downloadInstruction,
            workId: _.id
          };
        });//end map
        this.setState({ elements });
      });//end then
  }

  render() {
    return (
      <div>
        {
          this.props.loggedInUser.isAdmin ? null :
          <div>
            <span>&nbsp;&nbsp;</span>
            <Button as={Link} to='login'> Click Here </Button>
            <span> to login with default admin user to create / edit / update / delete belowing cards.</span>
          </div>
        }        
        <Gallery
          elements={this.state.elements}
          isAdmin={this.props.loggedInUser.isAdmin == 'true'}
        />
      </div>
    );
  }

}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired
};

HomePage.contextTypes = {
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
)(HomePage);
