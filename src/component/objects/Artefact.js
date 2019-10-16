/* * *
 * Artefact :: ReactJS Component
 * Page for the display of an Artefact.
 * The artefact should be passed to this component as the prop "artefact".
 */

import React from "react";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import moment from 'moment';
import ItemLinks from "./ItemLinks.js";
import AddendumList from "./AddendumList.jsx";
import ArtefactHandler from "../forms/ArtefactHandler.js";
import {ARTEFACTS} from "../../store/objectTypes";
import ImageDisplay from "../util/ImageDisplay.js";
import DelComfirmation from "../forms/DelComfirmation";
import {Divider, Row, PageHeader, Descriptions, Spin} from 'antd';
import "./Objects.css";

const Artefact = props => {
   const {artefact} = props;
   const id = props.match.params.id;

   //any result returns?
   if (!artefact) {
      return (
         <div className='object-content'>
            <Spin tip="Loading..." size="large"/>
         </div>
      );
   }

   //if result is null.
   if (artefact && !artefact[id]) {
      return (
         <div className='object-content'>
            <h2>Artefact is NOT FOUND</h2>
         </div>
      );
   }
   return (
      <div>
            <PageHeader
               onBack={() => window.history.back()}
               title={artefact[id].name}
            >
               <Descriptions size="small" column={2}>
               <Descriptions.Item label="Created by">{artefact[id].created_by}</Descriptions.Item>
                  <Descriptions.Item label="Created at">
                     {moment(artefact[id].date_created.toDate()).format('LL')}
                  </Descriptions.Item>
                  
                  {artefact[id].last_modified ?
                  <Descriptions.Item label="Last Modified">
                   {moment(artefact[id].last_modified.toDate()).calendar()}
                  </Descriptions.Item>
                  :
                  null
                  }
               </Descriptions>
            </PageHeader>
         <ImageDisplay media_links={artefact[id].media_links} />
         <div className='object-content'>
            <p>{artefact[id].description}</p>
            <Row className="contentLink" style={{display: 'flex', alignItems:'center'}}>
               <ArtefactHandler docId={id} />
               <Divider type='vertical' />
               <DelComfirmation
                  docId={id}
                  objType={ARTEFACTS}
                  history={props.history}
               />
            </Row>

            {/* ItemLinks will render links as items with names and relation descriptors */}
            <div className='List'>
               <AddendumList id={id} />
               <ItemLinks
                  key='related people'
                  title='Related People'
                  fieldName='people_links'
                  items={artefact[id].people_links}
                  objType={ARTEFACTS}
                  obj={artefact}
                  docId={id}
               />
               <ItemLinks
                  key='related events'
                  title='Related Events'
                  fieldName='events_links'
                  items={artefact[id].events_links}
                  objType={ARTEFACTS}
                  docId={id}
               />
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = state => {
   const artefact = state.firestore.data.Artefacts;
   return {
      artefact: artefact
   };
};

export default compose(
   connect(
      mapStateToProps,
      null
   ),
   firestoreConnect(props => [
      {
         collection: "Artefacts",
         doc: props.match.params.id
      }
   ])
)(Artefact);
