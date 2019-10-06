import React, {Component} from "react";
import Avatar from "../util/Avatar";
import {Modal} from "antd";

export class AddendumForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         image_url: null
      };
   }

   // get the url from the Avatar component
   getImageUrl = image_url => {
      this.setState({image_url});
      console.log("image_url", image_url);
   };

   render() {
      return (
         <div>
            <Modal visible={this.props.visible} onCancel={this.props.onCancel}>
               <Avatar returnUrl={this.getImageUrl} />
            </Modal>
         </div>
      );
   }
}

export default AddendumForm;
