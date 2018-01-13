import React, { PropTypes } from 'react';
import { Image, Loader, Dimmer } from 'semantic-ui-react';
import intl from '../utils/intl';

const dimmerStyle = {
    backgroundColor: 'rgba(80,80,80,0.8)'
};

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '', 
      isUploading: false
    };

    this._handleImageChange = (e) => {
        e.preventDefault();        

        const formData = new FormData();
        const file = e.target.files[0];
        if (!file) return;

        formData.append('image', file);

        this.setState({ isUploading: true });
        require('../utils/imageUploadHelper')(formData)        
        .then((response) => {
            const imagePreviewUrl = response.data;
            this.setState({ 
                isUploading: false, 
                imagePreviewUrl: imagePreviewUrl 
            });
            this.props.onChange({ target: { name: this.props.name, value: imagePreviewUrl } });
        })
        .catch(() => {
            this.setState({ isUploading: false });
        });
    };
  }

  render() {
    return (
      <div>
        { /* provide name for disabling semantic ui waring */}        
        <input name="chooseFile" type="file" onChange={this._handleImageChange} accept="image/*"/>
        <div>{intl.FILE_SIZE_UNDER_1MB_RECOMMANDED}</div>
        {this.state.imagePreviewUrl ? <Image size="large" src={this.state.imagePreviewUrl}/> : null}        
        {this.props.imgUrl && !this.state.imagePreviewUrl ? <Image size="large" src={this.props.imgUrl}/> : null}
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

ImageUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string
};

export default ImageUpload;