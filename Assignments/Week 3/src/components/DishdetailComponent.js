import React from 'react';
import { Card, CardImg, CardText, CardBody, Button, Label,
  CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

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
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
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
                <Label htmlFor="message">Comment</Label>
                <Control.textarea model=".message" id="message" 
                  name="message" rows="6" 
                  className="form-control" 
                  validators={{ required
                  }}
                  />

                <Errors className="text-danger"
                  model=".message" show="touched"
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
    <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
  );
}

const RenderComments = ({comments}) => {
  if(comments!=null){
    const comment = comments.map((comment) => {
      return(
        <div key={comment.id}>
          <li className="pt-2 pr-2 pb-2">{comment.comment}</li>
          <li className="pt-2 pr-2 pb-2">{`-- ${comment.author} , ${new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}`}</li>
        </div>
      ) 
    })
    return(
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">{comment}</ul>
        <CommentForm />
      </div>
    )
  }
  else{
    return(<div></div>)
  }
}

const Dishdetail = (props) => {
  if (props.dish != null){
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
                <RenderComments comments={props.comments} />
            </div>
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

export default Dishdetail;