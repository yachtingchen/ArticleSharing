import React, { PropTypes } from 'react';
import Quill from 'quill';

const editorContainerStyle  = {
  fontFamily: `Arial, 文泉驛正黑, "WenQuanYi Zen Hei", "儷黑 Pro", "LiHei Pro", 微軟正黑體, "Microsoft JhengHei", 微软雅黑, メイリオ, "맑은 고딕", sans-serif`,
  fontSize: '1.2em',
  borderStyle: 'hidden'
};

class QuillView extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.quill = new Quill(this.editorContainer, {
      theme: 'snow',
      readOnly: true,
      modules: { 
          toolbar: false
        }
    });    
  }

  componentDidUpdate() {    
    this.quill.setContents(this.props.delta);
  }

  render() {
    return (
        <div ref={(_) => { this.editorContainer = _; }} style={editorContainerStyle}/>
    );
  }

}

QuillView.propTypes = {
  delta: PropTypes.object.isRequired
};

export default QuillView;