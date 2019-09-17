import React from "react";
import { Form, Input, Select, Button } from "antd";


const { TextArea } = Input;

const peopleoptions = [
    <Select.Option key="Liam Gilbert">Liam Gilbert</Select.Option>,
    <Select.Option key="Amanda Gilbert">Amanda Gilbert</Select.Option>,
    <Select.Option key="Sarah Gilbert">Sarah Gilbert</Select.Option>
];

const eventoptions = [
    <Select.Option key="Birth of Amanda Gilbert">Birth of Amanda Gilbert</Select.Option>,
    <Select.Option key="Liam and Sarah's Marriage">Liam and Sarah's Marriage</Select.Option>
];
class CreateArtefactForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, artefact) => {
            if (!err) {
                this.props.handleSubmit(artefact);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={ this.handleSubmit } className="CreateArtefactForm">
                <Form.Item label="Title">{getFieldDecorator('title',
                    { rules : [
                        { required: true,
                          message: "Please give your Artefact a title!"
                        }
                    ]})(
                    <Input placeholder="Give your Artefact a title!"/>
                )}</Form.Item>
                <Form.Item label="Description">{getFieldDecorator('description')(
                    <TextArea
                        placeholder={"Tell us about your artefact!\ne.g., why it is important, or about its history"}
                        autosize={{minRows: 3}}
                    />
                )}</Form.Item>
                <Form.Item label="Related People">{getFieldDecorator('people', {})(
                    <Select
                        mode="multiple"
                        placeholder="Select the People related to this Artefact!"
                    >
                        {peopleoptions}
                    </Select>
                )}</Form.Item>
                
                <Form.Item label="Related Events">{getFieldDecorator('events', {})(
                    <Select
                        mode="multiple"
                        placeholder="Select the Events related to this Artefact!"
                    >
                        {eventoptions}
                    </Select>
                )}</Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        );
    }
};
CreateArtefactForm = Form.create({name: "createArtefactForm"})(CreateArtefactForm);

export default CreateArtefactForm 