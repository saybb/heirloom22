/* * *
 * CreateEvent :: ReactJS Component
 * Button and Modal with Form to facilitate creation of an Event.
 */
 
import React from "react";
import { Modal, Button } from "antd";
import CreateEventForm from "./CreateEventForm.js";

class CreateEvent extends React.Component {
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

    handleSubmit = (event) => {
        console.log(event);
        setTimeout(() => {
            this.setState({ visible: false });
          }, 1000);
    }

    render() {
        return (
            <React.Fragment>
                <Button type="primary" onClick={this.showModal}>Create Event</Button>
                <Modal
                    visible={this.state.visible}
                    title="Create a new Event"
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" type="default" onClick={this.handleCancel}>Cancel</Button>,
                    ]}
                >
                    <CreateEventForm handleSubmit={this.handleSubmit}/>
                </Modal>
            </React.Fragment>
        );
    }
}

export default CreateEvent;
