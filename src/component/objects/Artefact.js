/* * *
 * Artefact :: ReactJS Component
 * Page for the display of an Artefact.
 * The artefact should be passed to this component as the prop "artefact".
 */

import React from "react";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import ItemLinks from "./ItemLinks.js";
import "./Objects.css";
import "./Gallery.css";
import AddendumList from "./AddendumList.jsx";
import ArtefactHandler from "../forms/ArtefactHandler.js";
import {ARTEFACTS} from "../../store/objectTypes";
import ImageDisplay from "../util/ImageDisplay.js";
import DelComfirmation from "../forms/DelComfirmation";
import {Divider, Row, Col} from 'antd';


const Artefact = props => {
   const {artefact} = props;
   const id = props.match.params.id;

   //any result returns?
   if (!artefact) {
      return (
         <div className='object-content'>
            <h2>loading...</h2>
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
         <ImageDisplay media_links={artefact[id].media_links} />
         <div className='object-content'>
            <h2>{artefact[id].name}</h2>
            <p>{artefact[id].details}</p>
            <p>{artefact[id].description}</p>
             {/* <Divider/> */}
            <Row style={{display: 'flex', alignItems:'center'}}>
               <ArtefactHandler docId={id} />
               <Divider type="vertical"/>
               <DelComfirmation docId={id} objType={ARTEFACTS} history={props.history} />
            </Row>
            <Divider/>
            {/* ItemLinks will render links as items with names and relation descriptors */}
            <ItemLinks
               key='related people'
               title='Related People'
               items={artefact[id].people_links}
               artefact={artefact}
               id={id}
            />
            <ItemLinks
               key='related events'
               title='Related Events'
               items={artefact[id].events_links}
               artefact={artefact}
               id={id}
            />
            <AddendumList id={id} />
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
      null,
   ),
   firestoreConnect(props => [
      {
         collection: "Artefacts",
         doc: props.match.params.id
      }
   ])
)(Artefact);
