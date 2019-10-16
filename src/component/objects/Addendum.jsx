import React from "react";
// connect to backend module for delete
import GeneralDelComfirmation from "../forms/GeneralDelComfirmation";
// style
import {capitalize} from "../util/Text";
import {Icon, Button, Divider} from "antd";
import ImageDisplay from "../util/ImageDisplay";
import AddendumHandler from "../forms/AddendumHandler.jsx";
import "./List.css";

function convert_date_to_string(date) {
   const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
   };
   return date.toDate().toLocaleDateString("en-AU", options);
}

/*
function displayImage(media_links) {
   if (!media_links) return;
   return media_links.map(elem => <img key={elem.url} src={elem.url}></img>);
}*/

/**
 * Function component.
 * Props:
 *   - document : addendum json object to be represented
 *   - id: the addendum documen_id
 */
export default class Addendum extends React.Component {
   state = {visible: false};

   showModal = () => {
      this.setState({
         visible: true
      });
   };
   hideModal = () => {
      this.setState({
         visible: false
      });
   };
   /**
    * For the list, we intend to show:
    * Data:
    *   - date_created
    *   - created_by
    *   - image
    *   - details
    * Buttons:
    *   - delete
    *   - edit
    */
   render() {
      const {
         created_by,
         date_created,
         details,
         media_links,
         reference
      } = this.props.document;
      const docId = this.props.id;
      return (
         <div className='polaroid'>
            <div className='container'>
               <h4>{convert_date_to_string(date_created)}</h4>
               <p style={{color: "#1890ff"}}>By: {created_by? capitalize(created_by) : "unknown"}</p>
               <p>{details}</p>
               { media_links && media_links.length ? <ImageDisplay media_links={media_links} /> : null}
            </div>
            <div className='addendum-list left-align'>
               <AddendumHandler size="small" docId={this.props.id} artefact_id={reference.id} type="edit" />
               <Divider type='vertical' />
               <Button onClick={this.showModal} size='small'>
                  <Icon type='delete' /> Delete
               </Button>
               <GeneralDelComfirmation
                  objType='Addendums'
                  docId={docId}
                  visible={this.state.visible}
                  showModal={this.showModal}
                  hideModal={this.hideModal}
               />
            </div>
         </div>
      );
   }
}
