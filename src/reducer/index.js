import {combineReducers} from 'redux'
import TokenReducers from './car'

const allReducers =combineReducers({
    Token:TokenReducers
})

export default allReducers