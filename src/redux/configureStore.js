import {createStore,combineReducers, applyMiddleware} from 'redux';
import {Dishes} from './dishes';
import {Promotions} from './promotions';
import {Leaders} from './leader';
import {Comments} from './comments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';
import { InitialFeeback } from './form';
export const ConfigureStore =()=>{
    const store = createStore(combineReducers({
        dishes:Dishes,
        promotions:Promotions,
        leaders : Leaders,
        comments : Comments,
        ...createForms({feedback:InitialFeeback})
    }),applyMiddleware(thunk,logger));
    return store;
}