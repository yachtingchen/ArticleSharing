import React, { PropTypes } from 'react';


/*const TestView = ({ quillDelta }) => (
  <div>
    {quillDelta}
  </div>
);*/

const editorContainerStyle  = {
  fontFamily: `Arial, 文泉驛正黑, "WenQuanYi Zen Hei", "儷黑 Pro", "LiHei Pro", 微軟正黑體, "Microsoft JhengHei", 微软雅黑, メイリオ, "맑은 고딕", sans-serif`,
  fontSize: '1.2em'
};

class TestView extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // this.quill = new Quill(this.editorContainer, {
    //     theme: 'snow',
    //     readOnly: true
    //   });
    // console.log(this.props.delta);
    // this.quill.setContents(this.props.delta);
  }

  render() {
    return (
        <div ref={(_) => { this.editorContainer = _; }} style={editorContainerStyle}>
          {this.props.quillDelta}
        </div>
    );
  }

}

TestView.propTypes = {
  quillDelta: PropTypes.string.isRequired
};

export default TestView;
