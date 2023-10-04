import React from "react";

import GradientBackground from "./components/GradientBackground";
import SignInForm from "./components/SignInForm";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

const App = () => {
  

  return (
    <GradientBackground>
      <SignInForm />
    </GradientBackground>
  );
}


export default App;
