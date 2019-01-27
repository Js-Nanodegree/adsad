import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

//сделать инициализацию по другому... 


const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
});
const store = createStore(reducer);

export default store;