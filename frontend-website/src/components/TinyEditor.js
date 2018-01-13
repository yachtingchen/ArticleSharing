/*import React from 'react';
import TinyMCE from 'react-tinymce';


class TinyEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleEditorChange(e) {
    console.log(e.target.getContent());
  }

  render() {
    return (
      <TinyMCE
        content="<p>This is the initial content of the editor</p>"
        config={{
          plugins: 'autolink link image media lists print preview',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright mybutton mybutton2',
          language_url: 'http://localhost:8080/zh_TW.js',
          //menubar: false,
          setup: function (editor) {
            editor.addButton('mybutton', {
              text: 'My button',
              icon: false,
              onclick: function () {
                //editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
                editor.insertContent(`<p><img src="https://cdn.arstechnica.net/wp-content/uploads/2015/07/3D_XPoint_Wafer_Close-Up-640x427.jpg" alt="" /></p>`);
              }
            });
            editor.addButton('mybutton2', {
              text: 'My button2',
              icon: false,
              onclick: function () {
                //editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
                editor.insertContent(`<p><iframe src="//www.youtube.com/embed/QHH3iSeDBLo" width="560" height="314" allowfullscreen="allowfullscreen"></iframe></p>`);
              }
            });
          },
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default TinyEditor;*/