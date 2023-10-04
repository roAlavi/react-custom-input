import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";
import CustomInput from "./CustomInput";
import { CustomButton, ButtonsSection } from "./CustomButton";
import { styled } from "styled-components";
import showHideImage from "../assets/images/eye-image.png";
// Styled keyboard which can be extended later
const StyleKeyboard = styled(Keyboard)`
  max-width: 600px;
`;

const SignInBox = styled.div`
  border: 5px solid;
  margin: auto;
  width: 50%;
  padding: 10px;
`;

const PercentageWrapper = styled.div`
  width: ${props => props.width || "50%"};
  display: ${props => props.display || "table"};
`;

const ShowHideButtonWrapper = styled.div`
  top: 20px;
  position: relative;
  float: right;
  margin-right: 20px;
`
const ShowHideButton = ({ onClick }) => {
  return (
    <ShowHideButtonWrapper>
      <img src={showHideImage} alt="Show/Hide" onClick={onClick} height={"30px"}/>   
    </ShowHideButtonWrapper>
  );
}

// Sign In form which will be used later and can be improved
const SignInForm = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  // Handle switching
  const [inputs, setInputs] = useState({});
  const [layoutName, setLayoutName] = useState("default");
  const [inputName, setInputName] = useState("username");
  const [showPassword, setShowPassword] = useState(false);
  const keyboard = useRef();

  const onChangeAll = inputs => {
    setInputs({ ...inputs });
  };

  
  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };

  const onKeyPress = button => {
    if (button === "{shift}" || button === "{lock}") handleShift();
    if (button === "{tab}" || button === "{enter}") {
      if (inputName === "username") {
        setInputName(() => 'password');
        setFocus('passwordRef');
      } else {
        setInputName(() => 'username');
        setFocus('usernameRef');
      }
    } else {
      if (inputName === "password") {
        setFocus('passwordRef');
      } else {
        setFocus('usernameRef');
      }
    }
  };

  const onChangeInput = event => {
    const inputVal = event.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputVal
    });

    keyboard.current.setInput(inputVal);
  };

  const getInputValue = inputName => {
    return inputs[inputName] || "";
  };


  const onShowHideClick = () => {
    setShowPassword(prevState => !prevState);
  }

  const setFocus = (refName) => {
    const refs = {
      usernameRef,
      passwordRef,
    };
    if (refs[refName] && refs[refName].current) {
      refs[refName].current.focus();
    }
  }

  return (
    <SignInBox>
      <CustomInput
        ref={usernameRef}
        placeholder="Type Username Here"
        type="username"
        value={getInputValue("username")}
        onFocus={() => setInputName("username")}
        focused={inputName === "username"}
        onChange={onChangeInput}
        onClick={() => setFocus("usernameRef")}
        tabIndex="0"
        // isActive={false} This can be used to deactivate input
      />
      <PercentageWrapper width="100%">
        <PercentageWrapper width="80%" display="table-cell">
          <CustomInput
            ref={passwordRef}
            showValue={showPassword}
            placeholder="Type Password Here"
            type="password"
            value={getInputValue("password")}
            onFocus={() => setInputName("password")}
            focused={inputName === "password"}
            onChange={onChangeInput}
            onClick={() => setFocus("passwordRef")}
            tabIndex="1"
          />
        </PercentageWrapper>
        <PercentageWrapper width="20%" display="table-cell">
          <ShowHideButton onClick={onShowHideClick}/>
        </PercentageWrapper>
      </PercentageWrapper>
      <ButtonsSection>
        <CustomButton>
          Sign in
        </CustomButton>
      </ButtonsSection>

      <StyleKeyboard
        keyboardRef={(r) => keyboard.current = r}
        inputName={inputName}
        layoutName={layoutName}
        onChangeAll={onChangeAll}
        onKeyPress={onKeyPress}
      />
    </SignInBox>
  );
}


export default SignInForm;
