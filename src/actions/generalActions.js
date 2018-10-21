function setLoading(type) {
  return {
    type: 'SET_LOADING',
    payload: type,
  };
}

export default { setLoading };
