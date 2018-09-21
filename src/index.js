import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import userReducer from "./reducer/index";
import actions from "./action/index";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.handleUserDetail = this.handleUserDetail.bind(this);
  }

  // We call our thunk here.
  // ComponentDidmount is for dynamic behavior, side effects, AJAX, etc.
  componentDidMount() {
    this.props.fetchUserDetails("asdf");
  }

  handleUserDetail(event) {
    event.preventDefault();
    if (this.username !== null) {
      this.props.fetchUserDetails(this.username.value);
      this.username.value = "";
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {user ? (
          <div>
            <input type="text" ref={ref => (this.username = ref)} />
            <button onClick={this.handleUserDetail}>Search</button>
            <div>
              <h1> User Profile </h1>
              <img src={user.avatar_url} />
              <p>
                <a href={user.html_url} target="_blank">
                  {user.login}
                </a>
              </p>
            </div>
          </div>
        ) : (
          "...loading"
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: username => dispatch(actions.get_user(username))
});

const AppRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const store = createStore(userReducer, applyMiddleware(thunk));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <AppRedux />
  </Provider>,
  rootElement
);
