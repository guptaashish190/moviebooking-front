const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_USER':
      return state;
    case 'SET_USER':
      return Object.assign({}, state, { user: action.payload });
    case 'LOGOUT_USER':
      return { user: {} };
    default:
      return state;
  }
}
