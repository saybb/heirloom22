/* * *
 * CreateEventForm :: ReactJS Component
 * Form allowing user to input relevant information to create an event.
 */

import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
const { TextArea } = Input;

class CreateEventForm extends React.Component {
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
                          message: "Please give your event a name!"
                        }
                    ]})(
                    <Input placeholder="Give your event a name."/>
                )}</Form.Item>

                <Form.Item label="Date">{getFieldDecorator('date',
                    { rules : [
                        { required: true,
                          message: "Please give your event a date!"
                        }
                    ]})(
                    <DatePicker placeholder="dd/mm/yyyy" format={dateFormat}/>
                )}
                </Form.Item>

                <Form.Item label="Description">{getFieldDecorator('description')(
                    <TextArea
                        placeholder={"Tell us about this event.\ne.g., why it is important, or what happened at it."}
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
CreateEventForm = Form.create({name: "createEventForm"})(CreateEventForm);

export default CreateEventForm 
