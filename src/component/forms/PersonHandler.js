/* * *
 * CreatePerson :: ReactJS Component
 * Button and Modal with Form to facilitate creation of a Person.
 */
 
import React from "react";
import { Modal, Button } from "antd";
import { connect } from 'react-redux'
import { compose } from 'redux'

import PersonForm from "./PersonForm.js";
import { createObj, editObj} from "../../store/Actions/userActions"
import { PEOPLE } from "../../store/objectTypes.js";

class PersonHandler extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            type: this.props.type,
            title: this.props.type === "create" ? "Create an Event" : "Edit Event",
            docId: this.props.docId ? this.props.docId : null
        }
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

    handleSubmit = (person) => {
        if (this.state.type === "create") {
            this.props.createObj(PEOPLE, person);
        } else {
            this.props.editObj(PEOPLE, this.props.docId, person)
        }
        setTimeout(() => {
            this.setState({ visible: false });
          }, 1000);
    }

    render() {
        return (
            <React.Fragment>
                <Button type="primary" onClick={this.showModal}>Create Person</Button>
                <Modal
                    visible={this.state.visible}
                    title="Create a new Person"
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" type="default" onClick={this.handleCancel}>Cancel</Button>,
                    ]}
                >
                    <PersonForm handleSubmit={this.handleSubmit}/>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createObj: (objType, event) => dispatch(createObj(objType, event)),
        editObj: (objType, id, event) => dispatch(editObj(objType, id, event))
    }
}

export default compose(
    connect(null, mapDispatchToProps),
)(PersonHandler)
