import * as ActionTypes from './ActionTypes';
export const Comments = (state =  
    {errMess: null,
    comments:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state,errMess: null,comments:action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state,errMess: null,comments:[]};
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return state.concat(comment);

        default:
          return state;
      }
};