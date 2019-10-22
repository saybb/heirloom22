/* * *
 * Event :: ReactJS Component
 * Page for the display of an Event.
 */

import React from "react";
import ItemLinks from "./ItemLinks.js";
import "./Objects.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {PageHeader, Descriptions, Spin} from 'antd';
import moment from 'moment';
import DelComfirmation from "../forms/DelComfirmation";
import {EVENTS} from "../../store/objectTypes"

const Event = props => {
   const { event } = props;
   const id = props.match.params.id;
   const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
   };

   if (!event) {
      return (
         <div className='container center'>
            <Spin tip="Loading..." size="large"/>
         </div>
      );
   }

   if (event && !event[id]) {
      return (
         <div className="object-content">
            <h2>Event not found. Are you sure the url is correct?</h2>
         </div>
      );
   }

   return (
      <div>
            <PageHeader
               onBack={() => window.history.back()}
               title={event[id].name}
               subTitle={'Occured on: '+ event[id].date.toDate().toLocaleDateString("en-AU", options)}
            >
               <Descriptions size="small" column={2}>
                  <Descriptions.Item label="Created on">
                     {moment(event[id].date_created.toDate()).format('LL')}
                  </Descriptions.Item>
                  
                  {event[id].last_modified ?
                  <Descriptions.Item label="Last Modified">
                   {moment(event[id].last_modified.toDate()).calendar()}
                  </Descriptions.Item>
                  :
                  null
                  }
               </Descriptions>
            </PageHeader>
            <DelComfirmation
                  docId={id}
                  objType={EVENTS}
                  history={props.history}
               />
      <div className="object-content">
         <p>{event[id].details}</p>
         <ItemLinks
            title="Related Artefacts"
            fieldName='artefacts_links'
            objType={EVENTS}
            items={event[id].artefacts_links}
            docId={id}
         />
      </div>
      </div>
   );
};

const mapStateToProps = state => {
   const event = state.firestore.data.Events;
   return {
      event: event
   };
};

export default compose(
   connect(mapStateToProps),
   firestoreConnect(props => [
      {
         collection: "Events",
         doc: props.match.params.id
      }
   ])
)(Event);
