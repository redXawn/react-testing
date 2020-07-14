import { actionTypes } from "../actions";

export default(state = false, action) => {
  switch(action.type) {
    case(actionTypes.DISPLAY_TRUE) :
      return true;
    case(actionTypes.DISPLAY_FALSE) :
      return false;
    default:
      return state;
  }
}