const initialState = {
  theatres: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_THEATRE':
      return Object.assign({}, state, { theatres: [...state.theatres, action.payload] });
    case 'REMOVE_THEATRE':
      return Object.assign({}, state, { theatres: state.theatres.filter(theatre => theatre.THEATREID !== action.payload) });
    default:
      return state;
  }
}

