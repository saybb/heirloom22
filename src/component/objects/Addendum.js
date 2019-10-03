import React from 'react';
import faker from 'faker';
import CommentDetail from './CommentDetail';

class Addendum extends React.Component {

     state=
        {id:"1",
        author:"Sam",
        timeAgo:"Today AT 4:45pm",
        content:"vice blog test"}

        // {id:"2",
        // author:"Alex",
        // timeAgo:"Today AT 9:05pm",
        //     content:"vice nansdjcnasdcda test"}







    render() {
        return (


            <div className="ui container comments">

                <CommentDetail
                    author={this.state.author}
                    timeAgo={this.state.timeAgo}
                    content={this.state.content}
                    avatar={faker.image.avatar()}
                />

                <CommentDetail
                    author="Sam"
                    timeAgo="Today AT 4:45pm"
                    content ="vice blog test"
                    avatar={faker.image.avatar()}
                />

                <CommentDetail
                    author="Alex"
                    timeAgo="Today at 2:00pm"
                    content="I like the artifect"
                />

                <CommentDetail
                    author="Josh"
                    timeAgo="Today at 9:00pm"
                    content="I like the book"
                />
            </div>
        );
    }
}

export default Addendum;