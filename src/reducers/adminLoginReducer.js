const initialState = {
  admin: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_ADMIN':
      return state;
    case 'SET_ADMIN':
      return Object.assign({}, state, { admin: action.payload });
    case 'LOGOUT_ADMIN':
      return { admin: {} };
    default:
      return state;
  }
}
