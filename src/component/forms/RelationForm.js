import React from "react";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { EVENTS, PEOPLE, ARTEFACTS} from "../../store/objectTypes"
import { Form, Input, Select, Modal, Icon, Button} from "antd";
import { fieldAppend } from "../../store/Actions/userActions";

const { TextArea } = Input;

class RelationForm extends React.Component {
    state = {
        visible: false,
        title: this.props.type,
        docId: this.props.docId ? this.props.docId : null,

        events_selected: [],
        people_selected: [],
        events_links: {},
        people_links: {},
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleCancel = () => {
        this.setState({ 
            visible: false,
        })
      };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { firestore, events, people, artefact_id, fieldAppend } = this.props;
        const artefact = this.props.artefact[artefact_id]
        const {
            events_selected, people_selected,
            events_links, people_links
        } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(events_selected.length > 0){
                    events_selected.forEach(event => {
                        const artefact_link = {
                            name: artefact.name,
                            reference: firestore.doc("/Artefacts/" + artefact_id),
                            relation: events_links[event]
                        }
                        const event_link = {
                            name: events[event].name,
                            reference: firestore.doc("/Events/" + event),
                            relation: events_links[event]
                        }
                        fieldAppend(EVENTS, event, 'artefacts_links', artefact_link)
                        fieldAppend(ARTEFACTS, artefact_id, 'events_links', event_link)
                    })
                }

                if(people_selected.length > 0){
                    people_selected.forEach(person => {
                        const artefact_link = {
                            name: artefact.name,
                            reference: firestore.doc("/Artefacts/" + artefact_id),
                            relation: people_links[person]
                        }
                        const person_link = {
                            name: people[person].name,
                            reference: firestore.doc("/People/" + person),
                            relation: people_links[person]
                        }
                        fieldAppend(PEOPLE, person, 'artefacts_links', artefact_link)
                        fieldAppend(ARTEFACTS, artefact_id, 'people_links', person_link)

                    })

                }
                this.setState({ 
                    visible: false,
                })
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { events, people, title, iconType } = this.props;
        const {
            events_selected, people_selected,
            events_links, people_links, visible,
        } = this.state;
        return(
            <div>
            <Button type="primary" shape="circle" icon={iconType} ghost onClick={this.showModal} size="small"/>
            <Modal
                visible={visible}
                title={title}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                    Return
                    </Button>,
                    <Button key="submit" type="primary"  onClick={this.handleSubmit}>
                    Submit
                    </Button>,
                ]}
            >
            
            <Form layout="vertical" hideRequiredMark>
            
            {title === "Related People" ?
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
                </React.Fragment>
                :
                <React.Fragment>
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
                }
            
            </Form>
            </Modal>
            </div>
        )
    }


}

// use wrapper
RelationForm = Form.create({name: "createRelationForm"})(RelationForm);

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        events: state.firestore.data.Events,
        people: state.firestore.data.People,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fieldAppend: (objType, docId,fieldName, fieldValue) => dispatch(fieldAppend(objType, docId, fieldName ,fieldValue)),
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {collection: PEOPLE},
        {collection: EVENTS},
    ])
)(RelationForm);