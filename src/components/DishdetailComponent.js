import React from 'react';
import {Card,CardBody,CardText,CardTitle,CardImg} from 'reactstrap';

class DishDetail extends React.Component{
    constructor(props){
        super(props);
    }

    renderDish = (dish) => {
        if(dish!=null){
          return(
            <Card>
              <CardImg top src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          )
        }
        else{
          return(
            <div></div>
          )
        }
    }

    renderComments = (dish) => {
      if(dish!=null){
        const comment = this.props.dish.comments.map((comment) => {
          return(
              <div key={comment.id} style={{padding: '10px 10px 10px 0px'}}>
                <li>{comment.comment}</li>
                <li>{`--${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}, Oct 17,2020`}</li>
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

        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                  {this.renderComments(this.props.dish)}
                </div>
            </div>
        )
    }
}

export default DishDetail;