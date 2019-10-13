import React from "react";
import {Divider, Button} from "antd";
import ImageDisplay from "../util/ImageDisplay";
import AddendumHandler from "../forms/AddendumHandler.jsx";

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
export default function Addendum(props) {
   const {created_by, date_created, details, media_links, reference} = props.document;
   
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
   return (
      <React.Fragment>
         <div className='card'>
            <div className='Addendum'>
               <p>{convert_date_to_string(date_created)}</p>
               <p>{created_by}</p>
               <p>{details}</p>
               { media_links && media_links.length ? <ImageDisplay media_links={media_links} /> : null}
            </div>
            <div className="AddendumMenu">
               <AddendumHandler docId={props.id} artefact_id={reference.id} type="edit" />
               <Button onClick={() => props.delete(props.id)}> Delete </Button>
            </div>
            <Divider className='AddendumDivider' />
         </div>
      </React.Fragment>
   );
}
