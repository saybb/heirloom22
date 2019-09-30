import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Upload, Icon, message } from 'antd';
import { uploadFile } from '../../store/Actions/userActions'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
    return;
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('Image must smaller than 5MB!');
    return;
  }
  return isJpgOrPng && isLt5M;
}

class Avatar extends Component {

  state = {
    loading: false,
  };

  handleChange = info => {
    if (!this.props.downloadURL) {
      this.setState({ loading: true });
      return;
    }
    getBase64(info.file.originFileObj, imageUrl =>
      this.setState({
        loading: false,
      }),
    );
  };

  handleUpload = file => {
    this.props.uploadFile('image/'+this.props.auth.uid+ '/' + file.name ,file)
  }

  render() {
    const { downloadURL } = this.props;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    console.log(this.state);
    
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={this.handleUpload}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {downloadURL ? <img src={downloadURL} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}


const mapStateToProps = (state) => {  
  return{
      auth: state.firebase.auth,
      downloadURL: state.objects.downloadURL
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      uploadFile: (path, file) => dispatch(uploadFile(path, file))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar)

// export default Avatar;