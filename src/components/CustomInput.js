import { useEffect, useState, forwardRef } from 'react';
import styled from 'styled-components';
import { validationCheck } from '../utils/validation';

const StyledInput = styled.div`
  margin: 20px;
  height: 30px;
  border: 1px solid ${props => props.borderColor || "black"};
  background-color: ${props => props.backgroundColor || "lightblue"};
  color: ${props => props.color || "black"};
`;

const PlaceholderText = styled.span`
  color: ${props => props.color || "#777777"};
  align-items: center;
  justify-content: center;
  position:relative;
  left:30%;
`;

const ErrorMessage = styled.span`
  color: ${props => props.color || "red"};
  margin: 10px;
  padding: 10px;
`;

const BlinkingCaret = styled.span`
  color: ${props => props.color || "black"};
  animation: blink-animation 1s steps(5, start) infinite;
  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
`;

const getValueForType = (value, type, showValue, maskLast = true) => {
  if (type !== 'password') {
    return value;
  }
  if (type === 'password' && showValue) {
    return value;
  }
  const maskedStr = '*'.repeat((value || '').length);
  if (!maskLast && value) {
    return maskedStr.slice(0, -1) + value.charAt(value.length - 1);
  }
  return maskedStr;
}

const useHandleText = ({value, type, showValue = false, isActive = true}) => {
  let [errorMessage, setErrorMessage] = useState('');
  let [maskedValue, setMaskedValue] = useState(getValueForType(value, type, showValue, false));
  useEffect(() => {
    if (value && value.length > 0) {
      setErrorMessage(validationCheck(value, type)[1]);
    }
    if (value && value.length >= maskedValue.length) {
      if (isActive) {
        setMaskedValue(getValueForType(value, type, showValue, false));
      }
      if (type === 'password' && isActive) {
        setTimeout(() => {
          setMaskedValue(getValueForType(value, type, showValue, true));
        }, 200);
      }
    } else {
      if (isActive) {
        setMaskedValue(getValueForType(value, type, showValue, true));
      }
    }
  // We don't need maskedValue, this will simplify the logic
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, value, showValue]);

  return [maskedValue, errorMessage];  
}

const CustomInput = forwardRef(({value, placeholder, type, showValue = false, tabIndex, onFocus, onBlur, focused, isActive}, ref) => {
  const [maskedValue, errorMessage] = useHandleText({value, type, showValue, isActive});

  return (
    <>
      <StyledInput tabIndex={tabIndex} ref={ref} onFocus={onFocus} onBlur={onBlur}>
        {maskedValue}
        {focused ? <BlinkingCaret>▒</BlinkingCaret> : ''}
        {value ? <></> : <PlaceholderText>{placeholder}</PlaceholderText>}
      </StyledInput>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </>
  )

});

export default CustomInput;
