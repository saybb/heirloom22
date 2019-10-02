/* * *
 * CreatePersonForm :: ReactJS Component
 * Form allowing user to input relevant information to create a Person.
 */

import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
const { TextArea } = Input;

class CreatePersonForm extends React.Component {
    handleSubmit = e => {
        // stops the page from refreshing
        e.preventDefault();

        // fields must pass validation before submission
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // pass form data to parent
                this.props.handleSubmit(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const dateFormat = "DD/MM/YYYY";

        return(
            <Form onSubmit={ this.handleSubmit }>
                <Form.Item label="Name">{getFieldDecorator('name',
                    { rules : [
                        { required: true,
                          message: "Please input this person's name."
                        }
                    ]})(
                    <Input placeholder="What is this person's name?"/>
                )}</Form.Item>

                <Form.Item label="Date of Birth">{getFieldDecorator('date',
                    { rules : [
                        { required: true,
                          message: "Please input this"
                        }
                    ]})(
                    <DatePicker placeholder="dd/mm/yyyy" format={dateFormat}/>
                )}
                </Form.Item>

                <Form.Item label="Description">{getFieldDecorator('description')(
                    <TextArea
                        placeholder={"Tell us about this person.\ne.g. what did they do, or how they are a part of the family."}
                        autosize={{minRows: 3}}
                    />
                )}</Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        );
    }
};

// use wrapper
CreatePersonForm = Form.create({name: "createPersonForm"})(CreatePersonForm);

export default CreatePersonForm 
