import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
export const addComment = (comment)=>({
    type:ActionTypes.ADD_COMMENT,
    payload:comment
});


export const postComment = (dishId,rating,author,comment)=>dispatch=>{
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    return fetch(baseUrl+"comments",{
        method:"POST",
        body:JSON.stringify(newComment),
        headers:{
            'Content-type':'application/json'
        },
        credentials:'same-origin'
    }).
    then((response)=>{
        if (response.ok){
            return response ;
        }else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },(error)=>{
        let errormess = new Error(error.message);
        throw errormess;
    })
    .then(response => response.json())
    .then(comment=>dispatch(addComment(comment)))
    .catch(error =>  { console.log('post comments', error.message); 
    alert('Your comment could not be posted\nError: '+error.message); });
}

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));
    return fetch(baseUrl+"dishes")
    .then((response)=>{
        if (response.ok){
            return response ;
        }else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },(error)=>{
        let errormess = new Error(error.message);
        throw errormess;
    })
    .then(response => response.json())
    .then(data=>dispatch(addDishes(data)))
    .catch(error=>dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then((response)=>{
        if (response.ok){
            return response ;
        }else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },(error)=>{
        let errormess = new Error(error.message);
        throw errormess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error=>dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then((response)=>{
        if (response.ok){
            return response ;
        }else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },(error)=>{
        let errormess = new Error(error.message);
        throw errormess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error=>dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

//leaders actions
export const fetchLeaders = ()=>dispatch=>{
    dispatch(leadersLoading());
    return fetch(baseUrl +'leaders')
    .then(response=>{
        if(response.ok){
            return response;
        }else{
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },error=>{
        let errormess = new Error(error.message);
        throw errormess;
    })
    .then(response=>response.json())
    .then(data=>dispatch(addLeaders(data)))
    .catch(error=>dispatch(leadersFailed(error.message)));

}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});


//post comment
export const  postFeedback = ({firstname,lastname,telnum,email,agree,message})=>dispatch=>{
    const newFeedback ={
        firstname:firstname,
        lastname:lastname,
        telnum:telnum,
        email:email,
        agree:agree,
        message:message
    }
    newFeedback.date = new Date().toISOString();
    return fetch(baseUrl+'feedback',{
        method:'POST',
        body:JSON.stringify(newFeedback),
        headers:{
            'Content-type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },error=>{
        let errormess = new Error(error.message);
        throw errormess;
    })
    .then(response=>response.json())
    .then(data=>alert(`Hi ${data.firstname} ${data.lastname} thank you for your feedback
     content
     ${data.firstname} ${data.lastname} ${data.telnum} ${data.email} ${data.agree}
     ${data.email} ${data.id}`))
    .catch(error =>  { console.log('post comments', error.message); 
    alert('Your comment could not be posted\nError: '+error.message); });
}