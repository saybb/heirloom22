import React, {Component} from "react";
import {List, Avatar, Icon} from "antd";

// a function component
function IconText({type, text}) {
   return (
      <span>
         <Icon type={type} style={{marginRight: 8}} />
         {text}
      </span>
   );
}

// inspiration from https://ant.design/components/list/#components-list-demo-vertical
class Addendum extends Component {
   constructor(props) {
      super(props);

      this.items = [
         {
            name: `name ${1}`,
            avatar:
               "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            date: "1998",
            content:
               "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
         }
      ];
   }

   renderItem = item => {
      return (
         <List.Item
            key={item.title}
            actions={[
               <IconText type='edit' text='Edit' key='list-vertical-edit' />,
               <IconText
                  type='delete'
                  text='Delete'
                  key='list-vertical-delete'
               />
            ]}
            extra={
               <img
                  width={272}
                  alt='logo'
                  src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
               />
            }
         >
            <List.Item.Meta
               avatar={<Avatar src={item.avatar} />}
               title={item.date}
               description={item.name}
            />
            {item.content}
         </List.Item>
      );
   };

   render() {
      return (
         <List
            itemLayout='vertical'
            size='large'
            dataSource={this.items}
            renderItem={this.renderItem}
         />
      );
   }
}

export default Addendum;
