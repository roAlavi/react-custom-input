import styled from 'styled-components';
    
const GradientBackground = styled.div`
  background-image: linear-gradient(to bottom,
    ${props => props.startColor || "blue"} 0%,
    ${props => props.midColor || "darkblue"} 40%,
    ${props => props.endColor || "lightblue"} 100%);
  width: 100vw;
  height: 100vh;
  background-position:top;
  background-size:cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .div {
    margin: 20px auto;
  }
`;

export default GradientBackground;