import { SET_TRUE, SET_FALSE } from '../actions/loading'

export default function loading (state = true, action) {
  switch(action.type) {
    case SET_TRUE : 
      return(true)
    case SET_FALSE :
      return(false)
    default: 
      return(state)
  }
}