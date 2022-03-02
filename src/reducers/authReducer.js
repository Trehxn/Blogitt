const INITIAL_STATE = {
  loading: false,
  error: null,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN_START":
      return {
        ...state,
        loading: true,
        error: null,
        user: null,
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case "SIGN_IN_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
        user: null,
      };
    case "SIGN_OUT":
      return {
        ...state,
        loading: false,
        error: null,
        user: null,
      };
    case "NO_USER_FOUND":
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
