function addTheatre(theatre) {
  return {
    type: 'ADD_THEATRE',
    payload: theatre,
  };
}

function removeTheatre(theatreID) {
  return {
    type: 'REMOVE_THEATRE',
    payload: theatreID,
  };
}
export default { addTheatre, removeTheatre };

