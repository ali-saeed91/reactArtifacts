import React from "react";
import Amplify from "aws-amplify";
import {AmplifyAuthenticator, AmplifyGreetings, AmplifySignIn, AmplifySignUp} from "@aws-amplify/ui-react";
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import awsconfig from "aws-exports";

Amplify.configure(awsconfig);

const LoginPage = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AmplifyGreetings username={user.username}></AmplifyGreetings>
    </div>
  ) : (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        headerText="Login to First Salary"
        usernameAlias="email"
        formFields={[
          {
            type: "name",
            label: "Full Name *",
            placeholder: "Enter your full name",
            inputProps: { required: true, autocomplete: "name" },
          },
          {
            type: "email",
            label: "Email Address *",
            placeholder: "Enter your email address",
            inputProps: { required: true, autocomplete: "username" },
          },
          {
            type: "password",
            label: "Password *",
            placeholder: "Enter your password",
            inputProps: { required: true, autocomplete: "new-password" },
          },
          // {
          //   type: "phone_number",
          //   label: "Custom Phone Label",
          //   placeholder: "Custom phone placeholder",
          // },
        ]} 
      />
      <AmplifySignIn headerText="Login to First Salary" slot="sign-in" usernameAlias="email" />
      </AmplifyAuthenticator>
  );
};

export default LoginPage;