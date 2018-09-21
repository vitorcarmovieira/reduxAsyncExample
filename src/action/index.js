const get_user = function(username) {
  return function(dispatch) {
    return fetch(`https://api.github.com/users/${username}`)
      .then(response =>
        response.json().then(user => dispatch(get_user_success(user)))
      )
      .catch(error => dispatch(get_user_error(error)));
  };
};

const get_user_success = function(user) {
  return {
    type: "GET_USER_SUCCESS",
    user
  };
};

const get_user_error = function(error) {
  return {
    type: "GET_USER_ERROR",
    error
  };
};

export default {
  get_user,
  get_user_success,
  get_user_error
};
