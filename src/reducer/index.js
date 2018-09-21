export default function(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case "GET_USER_SUCCESS":
      return {
        user: action.user
      };
    case "GET_USER_ERROR":
      return {
        error: action.error
      };
    default:
      return state;
  }
}
