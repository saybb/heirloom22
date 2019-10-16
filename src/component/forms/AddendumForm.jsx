/* * *
 * CreatePersonForm :: ReactJS Component
 * Form allowing user to input relevant information to create a Person.
 */

import React from "react";
import ImageUpload from "../util/imageUpload";
import {Form, Input, Button} from "antd";
import {storageRef} from "../../firebase/config";
import {makeID} from "../util/Makeid";
import {connect} from "react-redux";
import {compose} from "redux";

const {TextArea} = Input;

class AddendumForm extends React.Component {
   state = {
      file: null,
      image_url: null
   };

   //get file from file uploader
   handleFile = file => {
      this.setState({
         file: file
      });
   };

   /* When submit clicked, upload image (if any) => fetch download URL 
        => construct artefact object => pass object up to parent */
   handleSubmit = async e => {
      // stops the page from refreshing
      e.preventDefault();

      // wait for the file to be uploaded first
      if (this.state.file) {
         let snapshot = await storageRef
            .child(
               "image/" +
                  this.props.auth.uid +
                  "/" +
                  makeID(10) +
                  this.state.file.name
            )
            .put(this.state.file);
         // get the url
         this.setState({
            image_url: await snapshot.ref.getDownloadURL()
         });
      }

      // fields must pass validation before submission
      this.props.form.validateFields((err, values) => {
         if (!err) {
            const addendum = {
               details: values.details,
               media_links: this.state.image_url
                  ? [
                       {
                          date_created: Date.now(),
                          url: this.state.image_url
                       }
                    ]
                  : []
            };

            // pass form data to parent
            this.props.handleSubmit(addendum);
            this.props.form.resetFields();
         }
      });
   };

   render() {
      const {getFieldDecorator} = this.props.form;

      return (
         <Form onSubmit={this.handleSubmit}>
            <Form.Item label='Details'>
               {getFieldDecorator("details", {
                  rules: [
                     {required: true, message: "Please enter some details!"}
                  ]
               })(
                  <TextArea
                     placeholder={
                        "What would you like to add about the story of this artefact?"
                     }
                     autosize={{minRows: 3}}
                  />
               )}
            </Form.Item>

            <ImageUpload handleFile={this.handleFile} />

            <Form.Item>
               <Button type='primary' ghost htmlType='submit'>
                  Submit
               </Button>
            </Form.Item>
         </Form>
      );
   }
}

// Antd UI wrapper
AddendumForm = Form.create({name: "addendumForm"})(AddendumForm);

// grab authenticaion from Redux store
const mapStateToProps = state => {
   return {
      auth: state.firebase.auth
   };
};

export default compose(connect(mapStateToProps))(AddendumForm);
