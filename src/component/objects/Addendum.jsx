import React from "react";
import {Divider, Button} from "antd";
import ImageDisplay from "../util/ImageDisplay";

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
 * Function element.
 * Props:
 *   - document : addendum json object to be represented
 *   - id: the documen_id
 */
export default function Addendum(props) {
   const {created_by, date_created, details, media_links} = props.document;

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
               <ImageDisplay media_links={media_links} />
            </div>
            <Button> Edit </Button>
            <Button onClick={() => props.delete(props.id)}> Delete </Button>
            <Divider className='AddendumDivider' />
         </div>
      </React.Fragment>
   );
}
