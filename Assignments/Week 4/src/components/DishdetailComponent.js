import React from 'react';
import { Card, CardImg, CardText, CardBody, Button, Label,
  CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => {
  return (val && val.length);
}

const maxLength = (len) => (val) => {
  return (!(val) || (val.length <= len));
}

const minLength = (len) => (val) => {
  return ( val && (val.length >= len));
}

class CommentForm extends React.Component {

  state = {
    isModalOpen: false
  }

  toggleModal = () => {
    this.setState({
    isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit = (values) => {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render(){
    return(
      <div>
        <Button outline color="secondary" onClick={() => this.toggleModal()}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" name="rating"
                  className="form-control" defaultValue="1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>

              <div className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text model=".author" id="author"
                  name="author" placeholder="Your Name"
                  className="form-control" 
                  validators={{ minLength: minLength(3), 
                    maxLength: maxLength(15)
                  }}
                />

                <Errors className="text-danger"
                  model=".author" show="touched"
                  messages={{minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                  }}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea model=".comment" id="comment" 
                  name="comment" rows="6" 
                  className="form-control" 
                  validators={{ required
                  }}
                  />

                <Errors className="text-danger"
                  model=".comment" show="touched"
                  messages={{ required: 'Required'
                  }}
                />
              </div>

              <Button type="submit" value="submit" color="primary">Submit</Button>
                            
            </LocalForm>
              
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const RenderDish = ({dish}) => {
  return(
    <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
      <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
      </Card>
    </FadeTransform>
  );
}

const RenderComments = ({comments, postComment, dishId}) => {
  if(comments!=null){
    const comment = comments.map((comment) => {
      return(
        <Fade in>
          <li key={comment.id}>
            <p className="pt-2 pr-2 pb-2">{comment.comment}</p>
            <p className="pt-2 pr-2 pb-2">{`-- ${comment.author} , ${new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}`}</p>
          </li>
        </Fade>
      ) 
    })
    return(
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled"><Stagger in>{comment}</Stagger></ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    )
  }
  else{
    return(<div></div>)
  }
}

const Dishdetail = (props) => {
    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return(
          <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>

                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>

            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} 
                      postComment={props.postComment}
                      dishId={props.dish.id} />
                </div>
            </div>
            
        </div>
        )
    }
}

export default Dishdetail;