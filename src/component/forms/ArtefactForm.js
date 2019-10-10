/* * *
 * CreateArtefactForm :: ReactJS Component
 * Form allowing user to input relevant information to create an artefact.
 */

import React from "react";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { EVENTS, PEOPLE } from "../../store/objectTypes"
import { Form, Input, Select, Button } from "antd";
import ImageUpload from "../util/imageUpload";
import { makeID } from "../util/makeID";
import {storageRef} from "../../firebase/config";

const { TextArea } = Input;

class ArtefactForm extends React.Component {
    state = {
        events_selected: [],
        people_selected: [],
        events_links: {},
        people_links: {},
        file: null,
        photoURL: null,
    }

    handleFile = file => {
        this.setState({
            file: file
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        //upload file first
        if(this.state.file){
            //await this.props.uploadFile("image/" + this.props.auth.uid + "/" + this.state.file.name, this.state.file);
            let snapshot = await storageRef.child("image/" + this.props.auth.uid + "/" + makeID(10) + this.state.file.name)
            .put(this.state.file);
            this.setState({
                photoURL: await snapshot.ref.getDownloadURL(),
            })
        }

        // fields must pass validation before submission
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { events, people } = this.props;
                // build artefact from form
                const artefact = {
                    name: values.name,
                    description: values.description || "",
                    events_links: values.events ?
                        values.events.map((event_id) => {
                            return {
                                name: events[event_id].name,
                                relation: values[event_id],
                                reference: this.props.firestore.doc("/Events/" + event_id)
                            }
                        })
                        : [],
                    people_links: values.people ?
                        values.people.map((person_id) => {
                            return {
                                name: people[person_id].name + " " + people[person_id].lastname,
                                relation: values[person_id],
                                reference: this.props.firestore.doc("/People/" + person_id)
                            }
                        })
                        : [],
                    media_links: this.state.photoURL ? [{
                        date_created: new Date(),
                        url: this.state.photoURL
                    }]
                    : [],
                }
                
                // pass form data to parent
                this.props.handleSubmit(artefact);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { type } = this.props;
        
        return(
            
            <Form onSubmit={ this.handleSubmit } className="CreateArtefactForm">
                <Form.Item label="Name">{getFieldDecorator('name',
                    { rules : [
                        { required: true,
                          message: "Please give your Artefact a name!"
                        }
                    ]})(
                    <Input placeholder="Give your Artefact a name."/>
                )}</Form.Item>

                <Form.Item label="Description">{getFieldDecorator('description')(
                    <TextArea
                        placeholder={"Tell us about your artefact.\ne.g., why it is important, or about its history"}
                        autosize={{minRows: 3}}
                    />
                )}</Form.Item>
                
                { type === "create" && <this.RelationFormItems form={getFieldDecorator}/>}
                <Form.Item><ImageUpload handleFile={this.handleFile}/></Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        );
    }

    RelationFormItems = () => {
        const { getFieldDecorator } = this.props.form;
        const { events, people } = this.props;
        const {
            events_selected, people_selected,
            events_links, people_links
        } = this.state;

        return (
            <React.Fragment>
                <Form.Item label="Related People">
                    {getFieldDecorator('people', {})(
                        <Select
                            mode="multiple"
                            placeholder="Select the People related to this Artefact."
                            optionFilterProp={"children"}
                            filterOption={true}
                            // updates list of selected people in state to show text boxes
                            onChange={(value) => {this.setState({people_selected: value})}}
                        >
                            { people ?
                                Object.keys(people).map( (id) =>
                                    <Select.Option key={id}>{people[id].name + " " + people[id].lastname}</Select.Option>
                                )
                            : null }
                        </Select>
                    )}
                </Form.Item>
                
                <div>
                    {people_selected.map((person_id) =>
                        <Form.Item
                            key={person_id}
                            label={"Relation with " + people[person_id].name + " " + people[person_id].lastname}
                        >
                            {getFieldDecorator(person_id,
                                { initialValue: people_links[person_id] || "",
                                  setFieldsValue : people_links[person_id] || "",
                                  rules : [
                                    { required: true,
                                    message: "Please describe how this person is related to your Artefact!"
                                    }
                            ]})(
                            <TextArea
                                placeholder={"Tell us how this person is related to your Artefact"}
                                autosize={{minRows: 1}}
                                onChange={(e) => {
                                    const new_people_links = people_links;
                                    new_people_links[person_id] = e.target.value;
                                    this.setState({people_links: new_people_links});
                                }}
                            />
                        )}</Form.Item>
                    )}
                </div>
                
                <Form.Item label="Related Events">
                    {getFieldDecorator('events', {})(
                        <Select
                        mode="multiple"
                        placeholder="Select the Events related to this Artefact!"
                        optionFilterProp={"children"}
                        filterOption={true}
                        // updates list of selected events in state to show text boxes
                        onChange={(value) => {this.setState({events_selected: value})}}
                        >
                            { events ?
                                Object.keys(events).map( (id) =>
                                    <Select.Option key={id}>{events[id].name}</Select.Option>
                                )
                            : null }
                        </Select>
                    )}
                </Form.Item>

                <div>
                    {events_selected.map((event_id) =>
                        <Form.Item
                            key={event_id}
                            label={"Relation with " + events[event_id].name}
                        >
                            {getFieldDecorator(event_id,
                                { initialValue: events_links[event_id] || "",
                                  setFieldsValue : events_links[event_id] || "",
                                  rules : [
                                    { required: true,
                                    message: "Please describe how this event is related to your Artefact!"
                                    }
                            ]})(
                            <TextArea
                                placeholder={"Tell us how this event is related to your Artefact"}
                                autosize={{minRows: 1}}
                                onChange={(e) => {
                                    const new_events_links = events_links;
                                    new_events_links[event_id] = e.target.value;
                                    this.setState({events_links: new_events_links});
                                }}
                            />
                        )}</Form.Item>
                    )}
                </div>
            </React.Fragment>
        );
    }
};

// use wrapper
ArtefactForm = Form.create({name: "createArtefactForm"})(ArtefactForm);

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        events: state.firestore.data.Events,
        people: state.firestore.data.People,
    }
}
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => [
        {collection: PEOPLE},
        {collection: EVENTS},
    ])
)(ArtefactForm);