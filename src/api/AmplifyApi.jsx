//  Use this to actually talking to AWS for verifying the user
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";

const catchError = (err) => {
  // const isDashboard = window.location.pathname.startsWith("/dashboard");
  // const isLogin = window.location.pathname.startsWith("/dashboard/login");

  if (err.response) {
    if (err.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      toast.warn("You're unauthorized, please sign in");
    } else if (err.response.status === 403) {
      toast.warn("Unauthorized action");
    }
  } else if (err.message === "Network Error") {
    toast.error("Error occured, please try again");
  } else {
    if (err === "No current user") return;
    // if (!isDashboard || isLogin) return;

    if (err.message) toast.error(err.message);
    else {
      if (typeof err === "string") {
        toast.error(err);
      }
    }
    console.log(err);
  }
};

// #region [Auth]
export const getCognitoUser = async () => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    return currentUser;
  } catch (err) {
    console.log("auth error:", err);
    catchError(err);
    return false;
  }
};

export const amplifyLogin = async (data) => {
  try {
    const { email, password } = data;
    await Auth.signIn({ username: email, password });
    return true;
  } catch (err) {
    console.log("auth error:", err);
    catchError(err);
    return false;
  }
};

export const amplifySignUp = async (data) => {
  try {
    const { givenName, familyName, username, email, password } = data;
    // console.log(data);
    await Auth.signUp({
      username,
      email,
      password,
      attributes: {
        given_name: givenName,
        family_name: familyName,
        name: givenName + " " + familyName,
        phone_number: "+919739007273",
      },
    });
    return true;
  } catch (err) {
    console.log("auth error:", err);
    catchError(err);
    return false;
  }
};

export const amplifyLogout = async () => {
  try {
    await Auth.signOut();
    return true;
  } catch (err) {
    console.log("auth error:", err);
    catchError(err);
    return false;
  }
};
// #endregion
