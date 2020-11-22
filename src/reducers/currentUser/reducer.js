import currentUserInitialState from './state';
import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR} from '../../actions/types';

const currentUserReducer = (state = currentUserInitialState, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_USER_REQUEST:
      return { ...state, isLoading: true};
    case GET_USER_SUCCESS:
      return { ...state, user: action.payload, isLoading: false };
    case GET_USER_ERROR:
      return { ...state, isLoading: false, isError: true, user: null};
  }
}

export default currentUserReducer;