import React from "react";
import { Modal, Button, Icon } from 'antd';
import {connect} from "react-redux";
import {compose} from "redux";
import {deleteObj} from "../../store/Actions/userActions";

class DelComfirmation extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // when click confirm 
  handleConfirm = async () => {

    await this.props.deleteObj(this.props.objType, this.props.docId);

    this.setState({
        visible: true,
      });

    // redirect to list view 
    this.props.history.push("/feed");
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="danger" onClick={this.showModal}>
            <Icon type="delete"/> Delete
        </Button>
        <Modal
          title="DELETE"
          visible={this.state.visible}
          onOk={this.handleConfirm}
          onCancel={this.hideModal}
          okText="Confirm"
          cancelText="Cancel"
        >
          <p><Icon type="question-circle-o" style={{ color: 'red' }} />  Are you sure you want to delete this?</p>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
       deleteObj: (objType, docId) => dispatch(deleteObj(objType, docId))
    };
 };
 
 export default compose(
    connect(
       null,
       mapDispatchToProps
    )
 )(DelComfirmation);