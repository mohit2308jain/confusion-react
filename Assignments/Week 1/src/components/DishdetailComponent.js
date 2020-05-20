import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends React.Component{
    constructor(props){
        super(props);
    }

    renderDish = (dish) => {
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments = (comments) => {
        if(comments!=null){
          const comment = comments.map((comment) => {
            return(
              <div key={comment.id}>
                <li className="p-2">{comment.comment}</li>
                <li className="p-2">{`-- ${comment.author} , ${new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}`}</li>
              </div>
            ) 
          })
          return(
            <div>
              <h4>Comments</h4>
              <ul className="list-unstyled">{comment}</ul>
            </div>
          )
        }
        else{
          return(<div></div>)
        }
    }

    render(){
        if (this.props.dish != null){
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            )
        }   
        else{
            return(
                <div></div>
            );
        }
    }
}

export default Dishdetail;