/* * *
 * CreateEvent :: ReactJS Component
 * Button and Modal with Form to facilitate creation of an Event.
 */
 
import React from "react";
import { Modal, Button, Icon } from "antd";
import { connect } from 'react-redux'
import { compose } from 'redux'

import EventForm from "./EventForm.js";
import { createObj, editObj} from "../../store/Actions/userActions"
import { EVENTS } from "../../store/objectTypes.js";

class EventHandler extends React.Component {
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

    handleSubmit = (event) => {
        if (this.state.type === "create") {
            this.props.createObj(EVENTS, event);
        } else {
            this.props.editObj(EVENTS, this.props.docId, event)
        }
        this.setState({ visible: false });
    }

    render() {
        return (
            <React.Fragment>
                <Button type="primary" ghost onClick={this.showModal} style={{margin: "0 1rem"}}><Icon type="plus-square"/>{this.state.title}</Button>
                <Modal
                    visible={this.state.visible}
                    title={this.state.title}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" type="default" onClick={this.handleCancel}>Cancel</Button>,
                    ]}
                >
                    <EventForm handleSubmit={this.handleSubmit}/>
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
)(EventHandler)
