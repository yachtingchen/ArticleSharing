import React, { PropTypes } from 'react';
import { Card, Container, Image, Header, Divider, Modal, Button, Icon } from "semantic-ui-react";
import {Link} from 'react-router';
import Config from '../constants/Config';
import WorkView from './WorkView';
import isMobile from '../utils/isMobile';

const defaultFontStyle = {
  fontFamily: Config.DEFAULT_FONT_FAMILIES
};

const overlayContainerStyle = {
  position : 'relative',
  height: '100%',
  width: '100%'
};

//plz refer to: http://stackoverflow.com/a/21457838
const overlayImg = {
  background: `rgba(0,0,0,0.30) url(${require('../images/hover.png')}) 50% 50% no-repeat`,
  position : 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%'
};

class WorkCard extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      showOverlay: false,
      open: false
    };
  }

  handleMouseOver() {
    this.setState({showOverlay: true});
  }

  handleMouseLeave() {
    this.setState({showOverlay: false});
  }

  onEdit = ()=>{
      this.context.router.replace(`/work_edit/${this.props.workId}`);
  }

  show = () => () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  //as={Link} to={`/works/${this.props.workId}`}
  render() {
    const desktopCard = (
      <div>
        <Card onClick={this.show()} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
          <div style={overlayContainerStyle}>
              <Image src={this.props.imgUrl} />
              {this.state.showOverlay ? <div style={overlayImg}>&nbsp;</div> : null}
          </div>      
          <Card.Content>
            <Container textAlign="center">
              <Header style={defaultFontStyle}>
                {this.props.title}
              </Header>
            </Container>
            <Divider/>
            <Card.Description>
              {this.props.desc}
            </Card.Description>
          </Card.Content>
        </Card>
        <Modal size="small" open={this.state.open} onClose={this.close}>
          <WorkView 
            title={this.props.title}
            workDesc={this.props.workDesc}
            downloadInstruction={this.props.downloadInstruction}
            workImgUrl={this.props.imgUrl}
            isAdmin={this.props.isAdmin}
            onEdit={this.onEdit}
        />  
        </Modal>
      </div>      
    );

    const mobileCard = (
      <Card as={Link} to={`/works/${this.props.workId}`} target="_blank" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        <Image src={this.props.imgUrl} />
        <Card.Content>
          <Container textAlign="center">
            <Header style={defaultFontStyle}>
              {this.props.title}
            </Header>
          </Container>
          <Divider/>
          <Card.Description>
            {this.props.desc}
          </Card.Description>
        </Card.Content>
      </Card>
    );


    return isMobile() ? mobileCard : desktopCard;
  }
}

WorkCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  workId: PropTypes.number.isRequired,
  workDesc: PropTypes.object.isRequired,
  downloadInstruction: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired
};
 
WorkCard.contextTypes = {
  router: PropTypes.object.isRequired
};

export default WorkCard;