/* * *
 * ArtefactHandler :: ReactJS Component
 * Button and Modal with Form to facilitate creation of an Artefact.
 */

import React from "react";
import {Modal, Button, Icon} from "antd";
import {connect} from "react-redux";
import {compose} from "redux";

import { firestore } from "../../firebase/config"
import {createObj, editObj, fieldAppend} from "../../store/Actions/userActions";
import {ARTEFACTS, EVENTS, PEOPLE} from "../../store/objectTypes";
import ArtefactForm from "./ArtefactForm.js";
import EventHandler from "./EventHandler.js";
import PersonHandler from "./PersonHandler.js";

class ArtefactHandler extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         visible: false,
         type: this.props.type,
         title:
            this.props.type === "create"
               ? "Create an Artefact"
               : "Edit Artefact",
         buttonText:
            this.props.type === "create"
               ? "Create an Artefact"
               : "Edit",
         docId:
            this.props.docId
               ? this.props.docId
               : null,
         icon:
            this.props.type === "create"
               ? "plus-square"
               : "form",
         
         events_selected: [],
         people_selected: [],
         events_links: {},
         people_links: {},
         events_names:{},
         people_names:{},
      };
   }

   handleFieldChange = (field) =>{
      this.setState(field);
   }

   showModal = () => {
      this.setState({
         visible: true
      });
   };

   handleCancel = () => {
      this.setState({
         visible: false
      });
   };

   handleSubmit = async (artefact) => {
      const { type, 
         events_selected, people_selected,
         events_links, people_links, 
         events_names, people_names }  = this.state;
      const { auth } = this.props;

      //decide action.
      if (type === "create") {
         const newArtefact = await firestore.collection(ARTEFACTS).add({
            ...artefact,
            created_by: auth.uid,
            date_created: new Date(),
            last_modified: new Date(),
         })
         
         //construct and update links
         if(events_selected.length > 0){
            events_selected.forEach(event => {
               const artefact_link = {
                  name: artefact.name,
                  reference: firestore.doc("/Artefacts/" + newArtefact.id),
                  relation: events_links[event]
               }
               const event_link = {
                  name: events_names[event],
                  reference: firestore.doc("/Events/" + event),
                  relation: events_links[event]
               }
               this.props.fieldAppend(EVENTS, event, 'artefacts_links', artefact_link)
               this.props.fieldAppend(ARTEFACTS, newArtefact.id, 'events_links', event_link)
            })
         }

         if(people_selected.length > 0){
               people_selected.forEach(person => {
                  const artefact_link = {
                     name: artefact.name,
                     reference: firestore.doc("/Artefacts/" + newArtefact.id),
                     relation: people_links[person]
                  }
                  const person_link = {
                     name: people_names[person],
                     reference: firestore.doc("/People/" + person),
                     relation: people_links[person]
                  }
                  this.props.fieldAppend(PEOPLE, person, 'artefacts_links', artefact_link)
                  this.props.fieldAppend(ARTEFACTS, newArtefact.id, 'people_links', person_link)
               })
         }

      } else {
         this.props.editObj(ARTEFACTS, this.props.docId, artefact);
      }

      this.setState({visible: false});
   };

   render() {
      return (
         <React.Fragment>
            <Button type='primary' onClick={this.showModal} ghost size="small">
               <Icon type={this.state.icon} />{this.state.buttonText}
            </Button>

            <Modal
               visible={this.state.visible}
               title={this.state.title}
               onCancel={this.handleCancel}
               footer={[
                  <Button
                     key='cancel'
                     type='default'
                     onClick={this.handleCancel}
                  >
                     Cancel
                  </Button>
               ]}
            >
               {this.state.type === "create" ? (
                  <React.Fragment>
                     <PersonHandler type={"create"} />
                     <EventHandler type={"create"} />
                  </React.Fragment>
               ) : null}

               <ArtefactForm
                  handleSubmit={this.handleSubmit}
                  handleFieldChange={this.handleFieldChange}
                  type={this.state.type}
                  docId={this.state.docId}
               />
            </Modal>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => {
   return {
      auth: state.firebase.auth
   };
};

const mapDispatchToProps = dispatch => {
   return {
      createObj: (objType, artefact) => dispatch(createObj(objType, artefact)),
      editObj: (objType, id, artefact) =>
      dispatch(editObj(objType, id, artefact)),
      fieldAppend: (objType, docId,fieldName, fieldValue) => dispatch(fieldAppend(objType, docId, fieldName ,fieldValue)),
   };
};

export default compose(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )
)(ArtefactHandler);
