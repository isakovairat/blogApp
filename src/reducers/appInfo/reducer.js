import appInfoInitialState from './state';
import { CHANGE_PAGE } from '../../actions/types';

const appInfoReducer = (state = appInfoInitialState, action) => {
  switch (action.type) {
    default:
      return state;
    case CHANGE_PAGE:
      return { ...state, currentPage: action.payload };
  }
}

export default appInfoReducer;