/* * *
 * Artefact :: ReactJS Component
 * Page for the display of an Artefact.
 * The artefact should be passed to this component as the prop "artefact".
 */

import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Button, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import ItemLinks from './ItemLinks.js';
import "./Objects.css";
import "./Gallery.css"
import Addendum from "./Addendum";
import ArtefactHandler from "../forms/ArtefactHandler.js";
import { deleteObj } from "../../store/Actions/userActions";
import { ARTEFACTS } from "../../store/objectTypes";

const Artefact = (props) => {
    const { artefact } = props;
    const id = props.match.params.id;

    const menu = (
        <Menu>
          <Menu.Item key="1"><ArtefactHandler docId={id}/></Menu.Item>
          <Menu.Item key="2" onClick={handleDelete} ><Link to={"/feed"}>Delete</Link></Menu.Item>
        </Menu>
      );
    
    function handleDelete() {
        props.deleteObj(ARTEFACTS, id);
    }

    if (!artefact){
        return (
            <div className="object-content">
                <h2>loading...</h2>
            </div>
        )
    }
    
    if(artefact && !artefact[id]){
        return (
              <div className="object-content">
                  <h2>Artefact is NOT FOUND</h2>
              </div>
        );
    }
    
    return (
        <div>
            <div className="tech-slideshow">
                <div className="mover-1"></div>
                <div className="mover-2"></div>
            </div>
            <div className="object-content">
                <h2>{artefact[id].name}</h2>
                <p>{artefact[id].details}</p>
                <p>{artefact[id].description}</p>
                <Dropdown overlay={menu}>
                    <Button>
                        Actions <Icon type="down" />
                    </Button>
                </Dropdown>
                {/* ItemLinks will render links as items with names and relation descriptors */}
                <ItemLinks title="Related People" items={artefact[id].people_links}/>
                <ItemLinks title="Related Events" items={artefact[id].events_links}/>
                <Addendum />

            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    const artefact = state.firestore.data.Artefacts;   
    return {
        artefact: artefact
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        deleteObj: (objType, docId) => dispatch(deleteObj(objType, docId)),
    }
  }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) =>[{
        collection: 'Artefacts', 
        doc: props.match.params.id,
    }])
)(Artefact)





