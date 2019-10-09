/* * *
 * Artefact :: ReactJS Component
 * Page for the display of an Artefact.
 * The artefact should be passed to this component as the prop "artefact".
 */

import React from "react";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Button, Menu, Dropdown, Icon} from "antd";
import {Link} from "react-router-dom";
import ItemLinks from "./ItemLinks.js";
import "./Objects.css";
import "./Gallery.css";
import AddendumList from "./AddendumList.jsx";
import ArtefactHandler from "../forms/ArtefactHandler.js";
import {deleteObj} from "../../store/Actions/userActions";
import {ARTEFACTS} from "../../store/objectTypes";
import ImageDisplay from "../util/ImageDisplay.js";
import RelationForm from "../forms/RelationForm";

const Artefact = props => {
   const {artefact} = props;
   const id = props.match.params.id;

   const menu = (
      <Menu>
         <Menu.Item key='1'>
            <ArtefactHandler docId={id} />
         </Menu.Item>
         <Menu.Item key='2' onClick={handleDelete}>
            <Link to={"/feed"}>Delete</Link>
         </Menu.Item>
         <Menu.Item key='3'>
            <RelationForm
               artefact={artefact ? artefact[id] : null}
               artefact_id={id}
            />
         </Menu.Item>
      </Menu>
   );

   function handleDelete() {
      props.deleteObj(ARTEFACTS, id);
   }

   if (!artefact) {
      return (
         <div className='object-content'>
            <h2>loading...</h2>
         </div>
      );
   }

   if (artefact && !artefact[id]) {
      return (
         <div className='object-content'>
            <h2>Artefact is NOT FOUND</h2>
         </div>
      );
   }
   console.log(artefact[id]);
   //console.log(artefact);
   return (
      <div>
         <ImageDisplay media_links={artefact[id].media_links} />
         <div className='object-content'>
            <h2>{artefact[id].name}</h2>
            <p>{artefact[id].details}</p>
            <p>{artefact[id].description}</p>
            <Dropdown overlay={menu}>
               <Button>
                  Actions <Icon type='down' />
               </Button>
            </Dropdown>
            {/* ItemLinks will render links as items with names and relation descriptors */}
            <ItemLinks
               key='related people'
               title='Related People'
               items={artefact[id].people_links}
            />
            <ItemLinks
               key='related events'
               title='Related Events'
               items={artefact[id].events_links}
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

const mapDispatchToProps = dispatch => {
   return {
      deleteObj: (objType, docId) => dispatch(deleteObj(objType, docId))
   };
};

export default compose(
   connect(
      mapStateToProps,
      mapDispatchToProps
   ),
   firestoreConnect(props => [
      {
         collection: "Artefacts",
         doc: props.match.params.id
      }
   ])
)(Artefact);
