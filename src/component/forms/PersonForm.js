/* * *
 * CreatePersonForm :: ReactJS Component
 * Form allowing user to input relevant information to create a Person.
 */

import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
const { TextArea } = Input;

class PersonForm extends React.Component {
    handleSubmit = e => {
        // stops the page from refreshing
        e.preventDefault();

        // fields must pass validation before submission
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const person = {
                    name: values.name,
                    lastname: values.lastname,
                    details: values.description || "",
                    dob: new Date(values.date),
                }
                // pass form data to parent
                
                this.props.handleSubmit(person);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const dateFormat = "DD/MM/YYYY";

        return(
            <Form onSubmit={ this.handleSubmit }>
                <Form.Item label="First Name">{getFieldDecorator('name',
                    { rules : [
                        { required: true,
                          message: "Please input this person's first name."
                        }
                    ]})(
                    <Input placeholder="What is this person's first name?"/>
                )}</Form.Item>

                <Form.Item label="Last Name">{getFieldDecorator('lastname',
                    { rules : [
                        { required: true,
                          message: "Please input this person's last name."
                        }
                    ]})(
                    <Input placeholder="What is this person's last name?"/>
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
PersonForm = Form.create({name: "personForm"})(PersonForm);
export default PersonForm 
