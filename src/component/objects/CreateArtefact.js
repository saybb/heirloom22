import React from "react";
import { Modal, Button } from "antd";
import CreateArtefactForm from "./CreateArtefactForm.js";
import { connect } from 'react-redux'
import { createArtefact } from "../../store/Actions/artefactActions"

class CreateArtefact extends React.Component {
    state = {
        visible: false
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    handleSubmit = (artefact) => {
        this.props.createArtefact(artefact)
        setTimeout(() => {
            this.setState({ visible: false });
          }, 3000);
    }

    render() {
        return (
            <React.Fragment>
                <Button type="primary" onClick={this.showModal}>Create an Artefact</Button>
                <Modal
                    visible={this.state.visible}
                    title="Create a new Artefact"
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" type="default" onClick={this.handleCancel}>Cancel</Button>,
                    ]}
                >
                    <CreateArtefactForm handleSubmit={this.handleSubmit}/>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
    }
  }
  
  const mapDispatchToProps = (dispatch)=> {
    return {
      createArtefact: (artefact) => dispatch(createArtefact(artefact))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CreateArtefact);