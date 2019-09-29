/* * *
 * ArtefactHandler :: ReactJS Component
 * Button and Modal with Form to facilitate creation of an Artefact.
 */

import React from "react";
import { Modal, Button } from "antd";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import { createObj, editObj} from "../../store/Actions/userActions"
import { ARTEFACTS, EVENTS, PEOPLE } from "../../store/objectTypes"
import ArtefactForm from "./ArtefactForm.js";
import CreateEvent from "./CreateEvent.js";
import CreatePerson from "./CreatePerson.js";


class ArtefactHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: this.props.type,
            title: this.props.type === "create" ? "Create an Artefact" : "Edit an Artefact",
            handleSubmit: this.props.type === "create" ? this.handleCreateSubmit : this.handleEditSubmit,
            docId: this.props.docId ? this.props.docId : null
        };
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

    handleCreateSubmit = (artefact) => {
        this.props.createObj(ARTEFACTS, artefact)
        setTimeout(() => {
            this.setState({ visible: false });
          }, 1000);
          
    }

    handleEditSubmit = (artefact) => {
        this.props.editObj(ARTEFACTS, this.props.docId, artefact)
        setTimeout(() => {
            this.setState({ visible: false });
        }, 1000);
    }


    render() {
        return (
            <React.Fragment>
                <Button type="primary" onClick={this.showModal}>{this.state.title}</Button>
                <Modal
                    visible={this.state.visible}
                    title={this.state.title}
                    onOk={this.state.handleSubmit}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" type="default" onClick={this.handleCancel}>Cancel</Button>,
                    ]}
                >
                {this.state.type === "create"? 
                <React.Fragment>
                    <CreatePerson/> 
                    <CreateEvent/> 
                </React.Fragment>
                : null}
                    <ArtefactForm 
                        handleSubmit={this.state.handleSubmit} 
                        type={this.state.type}
                        docId={this.state.docId}
                        />
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      events: state.firestore.data.Events,
      people: state.firestore.data.People,
    }
  }
  
  const mapDispatchToProps = (dispatch)=> {
    return {
      createObj: (objType, artefact) => dispatch(createObj(objType, artefact)),
      editObj: (objType, id, artefact) => dispatch(editObj(objType, id, artefact))
    }
  }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {collection: PEOPLE},
        {collection: EVENTS},
    ])
)(ArtefactHandler)