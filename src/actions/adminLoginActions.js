function setAdmin(admin) {
  return {
    type: 'SET_ADMIN',
    payload: admin,
  };
}

function logoutAdmin() {
  window.localStorage.removeItem('adminToken');
  return {
    type: 'LOGOUT_ADMIN',
  };
}
export default { setAdmin, logoutAdmin };

