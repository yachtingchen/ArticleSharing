import React, { PropTypes } from 'react';
import Gallery from '../components/Gallery';
import * as actions from '../actions/loginActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class GalleryPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    
    const link = "https://lh3.googleusercontent.com/WA5MwJrlkRA5WNo54mslcogMP-wZA5OPR_ZtK-G5cAhzSjF_a8KUHTrPZ2x4mEHzlsWnhdHTTkKFJKOxAg8iX1Are7PLi9H9kfNst2eMT9ws3X_4wrDhKSookbFB52Ph1eyESQvkAiUrbcLuMVE22EKMOcdMY7YI3ljJacL-WDV0groqiLo_k4Je6N1uUQDBJg65DbkMOsv1s8yg0rGpSYyhiYmoBBwtjBZ7QivLYdyXYyl_armdXxPTWHxFBxYLajPrdpyI1QSK9dYHEVUwsEXGM0KKQ99d9G-XVz-3mbJcwVZ2IKeHAHe2--PzzzjZI5F1FtuhpVU6Nkqmpg_NtjO_ZldxUfY1_Nyzb3l7T6YoH_mPUxXx2f8xfuIqehPfX4jLXF94nhEwlhcxd4liUf3mp7wcwPk30C92Iwv8_uQh2BTk77AuJGvTV5QYtPv33VLg1Q_isSY5zzMx505F7LaE6n6XKJmC-nUMLw06FN17mOTUMOgs65mxUFQUbwT8yP8ecEpv4eWEK5IBpbdsPtsEffNLWeNeQdY_LbWFhbmm7PKUnus2qdrGtKg4HScejGFxDgVFI1IhNIXLc9H5VFb16VLKibpxGZPNy9G2peK0SXPJdGsJ=w1286-h964-no";

    this.state = {
        elements: [
            // { src: "https://assets.entrepreneur.com/content/3x2/1300/20160606172427-business-people-meeting-office-briefing-coworkers-colleagues.jpeg" },
            // // { src: "https://www.wired.com/wp-content/uploads/2017/02/fn_times_applenewsopener-1200x630-e1486514109682.jpg" },
            // { src: "https://cdn.arstechnica.net/wp-content/uploads/2015/07/3D_XPoint_Wafer_Close-Up-640x427.jpg" },
            { src: link }, { src: link }, { src: link }, { src: link }, { src: link }, { src: link }, { src: link }, { src: link }
        ]
    };
  }


  render() {
    return (
      <Gallery
        elements={this.state.elements}
      />
    );
  }

}

GalleryPage.propTypes = {
  actions: PropTypes.object.isRequired
};

GalleryPage.contextTypes = {
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
)(GalleryPage);
