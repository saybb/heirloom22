/* * *
 * CreateArtefact :: ReactJS Component
 * Button and Modal with Form to facilitate creation of an Artefact.
 * Created By: Lawson Wang-Wills
 */

import React from "react";
import { Modal, Button } from "antd";
import CreateArtefactForm from "./CreateArtefactForm.js";

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

    // we'll initiate the post to database from here
    handleSubmit = (values) => {
        console.log(values);
        this.setState({
            visible: false
        });
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

export default CreateArtefact;