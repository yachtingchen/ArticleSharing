/*import React, { PropTypes } from 'react';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import CustomImageSideButton from './CustomImageSideButton';

// if using webpack
// import 'medium-draft/lib/index.css';

import { Editor, createEditorState } from 'medium-draft';

class MediumEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(), // for empty content
      hideWorkaround: false
    };

    // this.state = {
    //   editorState: createEditorState(data), // with content
    // };

    this.handleEditorChange = (editorState) => {
      this.setState({ editorState });
      const renderedHTML = mediumDraftExporter(editorState.getCurrentContent());
      renderedHTML.replace(`"md-block-image"}`, `"md-block-image"`); //bug
      this.props.onChange({ target: { name: this.props.name, value: renderedHTML } });
    };

    this.sideButtons = [{
      title: 'Image',
      component: CustomImageSideButton,
    }];

  }

  componentDidMount() {
    this.refs.editor.focus();
    // ===== workaround code start ===== 
    setTimeout(() =>  this.refs.workaround.focus(), 50);
    setTimeout(() =>  this.refs.editor.focus(), 100); //for https://github.com/brijeshb42/medium-draft/issues/38
    setTimeout(() =>  this.setState({hideWorkaround: true}), 70);
    // ===== workaround code end ===== 
  }

  render() {
    const { editorState } = this.state;
    //provide name for disabling semantic ui waring
    return (
      <div>        
        <input name="workaround" hidden={this.state.hideWorkaround} ref="workaround" />
        <Editor
          ref="editor"
          editorState={editorState}
          sideButtons={this.sideButtons}
          onChange={this.handleEditorChange} />
      </div>
    );
  }
}

MediumEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default MediumEditor;*/