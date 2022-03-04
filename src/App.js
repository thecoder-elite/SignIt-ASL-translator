import Detector from "./detector/Detector";
import { useState, useLayoutEffect } from 'react';
import { getCookie } from "./helperFunctions";
import OnBoardingScreen from "./onBoardingScreen/OnBoardingScreen";
import { theme } from "./Theme";
import { ThemeProvider } from '@mui/material/styles';
import './onBoardingScreen/transitionStyles.css';

const stepColors = {
  0: "#4abdac",
  1: "#e8a87c",
  2: "#eb6e80",
}

function App() {

  const [showOnboardingScreen, setShowOnboardingScreen] = useState(true)
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleSkip = () => setShowOnboardingScreen(false)

  useLayoutEffect(() => {
    let isUserOnboarded = getCookie("isUserOnboarded");
    // if (isUserOnboarded === "") {
    //   document.cookie = "isUserOnboarded=true";
    // }
    // else {
    //   setShowOnboardingScreen(false);
    // }

  }, [])

  return (

    <ThemeProvider theme={theme}>
      <div className="App" style={{ display: "flex", justifyContent: "center", backgroundColor: showOnboardingScreen ? stepColors[activeStep] : "#dfdce3", height: "100vh", width: "100vw" }}>
        <div style={{ width: "min(100%, 800px)" }}>
          {
            showOnboardingScreen ?
              <OnBoardingScreen
                handleNext={handleNext}
                handleSkip={handleSkip}
                activeStep={activeStep}
              />
              :
              <></>
          }
          {/* <Detector /> */}
        </div>
      </div>
    </ThemeProvider>
  )

}

export default App;
