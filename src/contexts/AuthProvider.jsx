import React, { useEffect, useReducer } from "react";
import { getCognitoUser } from "api/AmplifyApi";

const defaultUser = undefined;
// export const AuthContext = React.createContext([defaultUser, () => {}]);
export const AuthContext = React.createContext({
  defaultUser: defaultUser,
  dispatchAction: () => {}
});

const reducerFunction = (prevState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return action.user;
    case "SIGN_OUT":
      return defaultUser;
    default:
      return prevState;
  }
};

export const AuthProvider = (props) => {
  // Using useReducer
  const [currentUser, dispatchAction] = useReducer(
    reducerFunction,
    defaultUser
  );

  // Trying new method, using useEffect instead of useRequest
  const fetchCurrentUser = async () => {
    const result = await getCognitoUser();
    if (result) {
      dispatchAction({ type: "SIGN_IN", user: result });
    }
  };
  // console.log(currentUser);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    // refer: https://github.com/mjzone/bookstore-v2/blob/master/src/context/books.js
    <AuthContext.Provider value={{
      defaultUser: currentUser,
      dispatchAction: dispatchAction}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
