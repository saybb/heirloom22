import React from "react";
import {Upload, Icon, Modal, message} from "antd";

function getBase64(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
   });
}

// file restriction.
function beforeUpload(file) {
   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
   if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return;
   }
   const isLt5M = file.size / 1024 / 1024 < 5;
   if (!isLt5M) {
      message.error("Image must smaller than 5MB!");
      return;
   }
   return isJpgOrPng && isLt5M;
}

/**
 * Props
 *    - handleFile function
 *       . that takes in a file and return it using setState
 *       . file object
 */
class ImageUpload extends React.Component {
   state = {
      previewVisible: false,
      previewImage: "",
      fileList: []
   };

   handleCancel = () => this.setState({previewVisible: false});

   handlePreview = async file => {
      if (!file.preview) {
         file.preview = await getBase64(file.originFileObj);
      }

      this.setState({
         previewImage: file.preview,
         previewVisible: true
      });
   };

   handleChange = ({fileList}) => {
      this.setState({fileList});
   };

   handleUpload = file => {
      this.props.handleFile(file);
   };

   render() {
      const {previewVisible, previewImage, fileList} = this.state;
      const uploadButton = (
         <div>
            <Icon type='plus' />
            <div className='ant-upload-text'>Upload</div>
         </div>
      );
      return (
         <div className='clearfix'>
            <Upload
               action={this.handleUpload}
               listType='picture-card'
               fileList={fileList}
               onPreview={this.handlePreview}
               onChange={this.handleChange}
               beforeUpload={beforeUpload}
            >
               {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
               visible={previewVisible}
               footer={null}
               onCancel={this.handleCancel}
            >
               <img alt='example' style={{width: "100%"}} src={previewImage} />
            </Modal>
         </div>
      );
   }
}

export default ImageUpload;
