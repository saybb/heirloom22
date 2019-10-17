import React from "react";
import {Modal, Icon} from "antd";
import {connect} from "react-redux";
import {compose} from "redux";
import {deleteObj} from "../../store/Actions/userActions";

/**
 * Handles the deletion of an item
 *
 * Props:
 *    - objType: the firebase collection
 *    - docId:   the document id
 *    - visible: modal state
 *    - showModal: visible to true
 *    - hideModal: visible to false
 *
 * Workflow:
 *    1. show confirmation modal
 *    2. click confirm
 *    3. await for deletion
 *    4. modal disappears
 *
 * @class DelComfirmation
 * @extends {React.Component}
 */
class GeneralDelComfirmation extends React.Component {
   // when click confirm
   handleConfirm = async () => {
      await this.props.deleteObj(this.props.objType, this.props.docId);

      this.props.hideModal();
   };

   render() {
      return (
         <div>
            <Modal
               title='DELETE'
               visible={this.props.visible}
               onOk={this.handleConfirm}
               onCancel={this.props.hideModal}
               okText='Confirm'
               cancelText='Cancel'
            >
               <p>
                  <Icon type='question-circle-o' style={{color: "red"}} /> Are
                  you sure you want to delete this?
               </p>
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
)(GeneralDelComfirmation);
