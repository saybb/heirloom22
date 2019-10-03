/* * *
 * CreatePerson :: ReactJS Component
 * Button and Modal with Form to facilitate creation of a Person.
 */
 
import React from "react";
import { Modal, Button } from "antd";
import PersonForm from "./PersonForm.js";

class PersonHandler extends React.Component {
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

export default PersonHandler;
