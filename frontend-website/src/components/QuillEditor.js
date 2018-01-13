import React, { PropTypes } from 'react';
import Quill from 'quill';
import { Dimmer, Loader } from 'semantic-ui-react';
import intl from '../utils/intl';

const hiddenStyle = {
  display: 'none'
};

const editorContainerStyle  = {
  height: '600px',
  fontFamily: `Arial, 文泉驛正黑, "WenQuanYi Zen Hei", "儷黑 Pro", "LiHei Pro", 微軟正黑體, "Microsoft JhengHei", 微软雅黑, メイリオ, "맑은 고딕", sans-serif`,
  fontSize: '1.2em'

};

const dimmerStyle = {
    backgroundColor: 'rgba(80,80,80,0.8)'
};

class QuillEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.isInitialized = false;
    this.state = { isUploading: false };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.imageHandler = this.imageHandler.bind(this);
    this.videoHandler = this.videoHandler.bind(this);
  }

  componentDidMount() {
    let toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],    // toggled buttons
        [{ 'header': 1 }, { 'header': 2 }],                         // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],                   // outdent/indent
        [{ 'direction': 'rtl' }],                                   // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],            // custom dropdown
        [{ 'color': [] }, { 'background': [] }],                    // dropdown with defaults from theme
        //[{ 'font': [] }],
        [{ 'align': [] }],
        ['image', 'video', 'clean']
    ];
    
    this.quill = new Quill(this.editorContainer, {
        theme: 'snow',
        modules: { 
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: this.imageHandler,
              video: this.videoHandler
            }
          }
        }
    });

    this.quill.on('text-change', () => {      
      console.log(JSON.stringify(this.quill.getContents(), null, 4));
      this.props.onChange({ target: { name: this.props.name, value: this.quill.getContents() } });  
    });    
  }

  componentDidUpdate() {
    if (!this.isInitialized) {
      console.log('setContents');
      this.quill.setContents(this.props.value, 'silent');
      this.isInitialized = true;
    }
  }

  getIFrameSrcFromHtml(htmlString) {
    let m,
    urls = [],
    str = htmlString,
    rex =  /<iframe.*?src="([^">]*\/([^">]*?))".*?>/g;

    while (m = rex.exec(str)) { //eslint-disable-line no-cond-assign
        urls.push(m[1]);
    }
    return urls;
  }

  getVideoUrl(text) {
    const youtube1 = `https://www.youtube.com/watch?v=`; //Normal Url: https://www.youtube.com/watch?v=QHH3iSeDBLo&t=2s
    const youtube2 = `https://youtu.be/`; //Shared Url: https://youtu.be/QHH3iSeDBLo
    const youtubeEmbedded = `https://www.youtube.com/embed/`; //Embedded Url: https://www.youtube.com/embed/QHH3iSeDBLo

    if (text.startsWith(youtube1)){
      //eliminate time (ex: &t=2s)
      const timePos = text.indexOf('&');
      if (timePos !== -1)
        text = text.substring(0, timePos);
      text = youtubeEmbedded + text.replace(youtube1, '');
    } else if (text.startsWith(youtube2)){
      text = youtubeEmbedded + text.replace(youtube2, '');
    } else if (text.startsWith(`<iframe`)) { //facebook
      text = this.getIFrameSrcFromHtml(text)[0];
    }

    return text;
  }

  getVideoOps(index, url){
    let result = [];
    if (index !== 0)
      result.push({ retain: index });
    
    result.push({
      attributes: {
        align: "center",
        height: "392",
        width: "712"
      },
      insert: {
        video: url
      }
    });

    return result;
  }

  videoHandler() {
    const userInput = prompt(intl.PLZ_PASTE_YOUTUBE_VIDEO_URL_OR_VIDEO_EMBEDDED_INFO);
    if (!userInput) return;
    const url = this.getVideoUrl(userInput);
    const range = this.quill.getSelection();
    //this.quill.insertEmbed(range.index, 'video', url, Quill.sources.USER);
    this.quill.updateContents({
      ops: this.getVideoOps(range.index, url)
    });
  }

  imageHandler() {
    document.getElementById(`imgUploadInput${this.props.name}`).click();
  }

  handleImageChange(e) {
    e.preventDefault();        
    const formData = new FormData();

    const file = e.target.files[0];
    if (!file) return;
    formData.append('image', file);

    this.setState({ isUploading: true });
    require('../utils/imageUploadHelper')(formData)        
    .then((response) => {
        const imgUrl = response.data;
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, 'image', imgUrl, Quill.sources.USER);
        this.setState({ isUploading: false });
    })
    .catch(() => {
        this.setState({ isUploading: false });
    });
  }

  render() {
    return (
        <div>
          <div ref={(_) => { this.editorContainer = _; }} style={editorContainerStyle}/>
          <input id={`imgUploadInput${this.props.name}`} type="file" style={hiddenStyle} 
            onChange={this.handleImageChange} accept="image/*"/>
          <Dimmer style={dimmerStyle}
            active={this.state.isUploading}
            page
          >
            <Loader indeterminate size="massive">{intl.UPLOADING_PLZ_WIAT}</Loader>
          </Dimmer>
        </div>
    );
  }

}

QuillEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired
};

export default QuillEditor;