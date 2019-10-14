/* * *
 * CreatePersonForm :: ReactJS Component
 * Form allowing user to input relevant information to create a Person.
 */

import React from "react";
import Avatar from "../util/Avatar";
import { Form, Input, Button } from "antd";
const { TextArea } = Input;

class AddendumForm extends React.Component {
    state = {
       image_url: null
    }

    // get the url from the Avatar component
    getImageUrl = image_url => {
        this.setState({image_url});
        console.log("image_url", image_url);
    };

    handleSubmit = e => {
        // stops the page from refreshing
        e.preventDefault();

        // fields must pass validation before submission
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const addendum = {
                    details: values.details,
                    media_links: this.state.image_url ?
                        [
                            {
                                date_created: Date.now(),
                                url: this.state.image_url
                            }
                        ]
                    : []
                }

                // pass form data to parent
                this.props.handleSubmit(addendum);
                this.props.form.resetFields();
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return(
            <Form onSubmit={ this.handleSubmit }>
                <Form.Item label="Details">{getFieldDecorator('details', {rules: [{required: true, message: "Please enter some details!"}]})(
                    <TextArea
                        placeholder={"What would you like to add about the story of this artefact?"}
                        autosize={{minRows: 3}}
                    />
                )}</Form.Item>

                <Form.Item label="Photos">
                    <Avatar returnUrl={this.getImageUrl} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" ghost htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        );
    }
};

// use wrapper
AddendumForm = Form.create({name: "addendumForm"})(AddendumForm);
export default AddendumForm;
