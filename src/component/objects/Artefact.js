/* * *
 * Artefact :: ReactJS Component
 * Page for the display of an Artefact.
 * The artefact should be passed to this component as the prop "artefact".
 */

import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded  } from 'react-redux-firebase'
import { compose } from 'redux'
import { Button, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';

// components
import ItemLinks from './ItemLinks.js';
import "./Objects.css";
import Addendum from "./Addendum";
import faker from "faker";
import ArtefactHandler from "../forms/ArtefactHandler.js";
import { deleteArtefact } from "../../store/Actions/userActions";
import { ARTEFACTS } from "../../store/objectTypes";

const Artefact = (props) => {
    const { artefact } = props;
    const id = props.match.params.id;
    console.log(id);

    const menu = (
        <Menu>
          <Menu.Item key="1"><ArtefactHandler docId={id}/></Menu.Item>
          <Menu.Item key="2" onClick={handleDelete} ><Link to={"/feed"}>Delete</Link></Menu.Item>
        </Menu>
      );
    
    function handleDelete() {
        console.log(id);
        props.deleteArtefact(ARTEFACTS, id);
    }

    if (!isLoaded(artefact)){
        return (
            <div className="object-content">
                <h2>Artefact is loading...</h2>
            </div>
        )
    }
    
    if(isEmpty(artefact)){
        return (
              <div className="object-content">
                  <h2>Artefact is NOT FOUND</h2>
              </div>
        );
    }
    
    return (
        <div className="object">
            <div className="object-image-container">
                <img src={faker.image.abstract()} alt={artefact[id].name}/>
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
        deleteArtefact: (objType, docId) => dispatch(deleteArtefact(objType, docId)),
    }
  }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) =>[{
        collection: 'Artefacts', 
        doc: props.match.params.id,
    }])
)(Artefact)





