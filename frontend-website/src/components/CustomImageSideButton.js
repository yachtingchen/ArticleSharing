// import {
//   ImageSideButton,
//   Block,
//   addNewBlock,
// } from 'medium-draft';

// class CustomImageSideButton extends ImageSideButton {

//   onChange(e) {
//     const file = e.target.files[0];
//     if (file.type.indexOf('image/') !== 0) {
//         this.props.close();
//         return;
//     }

//     const formData = new FormData();
//     formData.append('image', file);

//     require('../utils/imageUploadHelper')(formData)
//     .then((response) => {
//         this.props.setEditorState(addNewBlock(
//             this.props.getEditorState(),
//             Block.IMAGE, {
//                 src: response.data,
//             }
//         ));
//     });

//     this.props.close();
//   }

// }

// export default CustomImageSideButton;