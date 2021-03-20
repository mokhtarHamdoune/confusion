import React from 'react';
import { Card,CardBody,CardText,CardImg,CardTitle, Breadcrumb, BreadcrumbItem,
    Modal,ModalHeader,ModalBody,Button, Row, Col,Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
//validation functions 
const required = (val) => val && val.length;
const minLength = len => val => (val) && val.length >= len;
const maxLength = len => val => !(val) ||  val.length <= len ;

function RenderDish({dish}){
    return (
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({comments,addComment, dishId}){
    return(
        <div className="row">
            <div className="col-12">
                <ul className='list-unstyled '>
                        {
                            comments.map(({id,comment,author,date})=>{
                                return (
                                    <li key={id}>
                                        <p>
                                            {comment}
                                        </p>
                                        <p>
                                            --{author},{new Date(date).toDateString()}
                                        </p>
                                    </li>
                                )
                            })
                        }
                </ul>
                {
                    <CommentForm addComment={addComment}
                    dishId={dishId}/>
                }
            </div>
                        
        </div>

    )
}

class CommentForm  extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSumbit= this.handleSumbit.bind(this);
    }
    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen});
    }
    handleSumbit(values){
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        this.toggleModal();
    }

    render(){
        return(
            <div className="row">
                <div className="col-12">
                    <Button color="secondary" outline onClick={this.toggleModal} >
                        <span className="fa fa-edit fa-lg"></span>
                        Submit Comment
                    </Button>
                </div>
                <div className="col-12">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                        <ModalHeader>SumbitComment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values)=>this.handleSumbit(values)}>
                                <Row className="form-group">
                                    <Label for="rating" sm={12}>Rating</Label>
                                    <Col sm={12}>
                                        <Control.select  model='.rating'
                                         name='rating'
                                         id="rating" className="custom-select" >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label for="name" sm={12}>Your name</Label>
                                    <Col sm={12}>
                                        <Control.text  model='.name'
                                         name='name'
                                         id="name" className="form-control"
                                         validators={{
                                             required,minLength:minLength(3),maxLength:maxLength(15)
                                         }}
                                         />
                                        <Errors 
                                            className="text-danger"
                                            model='.name'
                                            show='touched'
                                            
                                            messages={{
                                                required:'author name is required, ',
                                                minLength:'must be greater than 2 characters, ',
                                                maxLength:'must be less than 15 characters'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label for="comment" sm={12}>Comment</Label>
                                    <Col sm={12}>
                                        <Control.textarea rows={6}  model='.comment'
                                         name='comment'
                                         id="comment" className="form-control" />
                                    </Col>
                                </Row>
                                <Button type="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>

            </div>
        );
    }
}


const  DishDetail = (props)=>{
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
    else if (props.dish != null){
        return (
            <div className='container'>
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
                        {<RenderDish dish={props.dish} />}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        {
                            <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}  />
                        }
                    </div>
                </div>
            </div>
        )
    }else{
        <div>
            <h>No dish</h>
        </div>
    }
}


export default DishDetail;

