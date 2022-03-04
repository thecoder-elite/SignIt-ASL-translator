import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import styled from '@emotion/styled';
import { CSSTransition } from 'react-transition-group';
import OnBoardingScreenHandler from './OnBoardingScreenHandler';

const StyledMobileStepper = styled(MobileStepper)({
    "& .MuiMobileStepper-dotActive": {
        width: "24px",
        borderRadius: "10px"
    },
    "& .MuiMobileStepper-dot": {
        backgroundColor: "white"
    },
    "& .MuiButton-root": {
        color: "white"
    }
})

export default function OnBoardingScreen(props) {

    const theme = useTheme();

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "100vh" }}>
            <div></div>
            <CSSTransition
                in={true}
                appear={true}
                timeout={1000}
                classNames="fade"
            >
                <OnBoardingScreenHandler activeStep={props.activeStep} handleSkip={props.handleSkip} />
            </CSSTransition>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                {props.activeStep < 2
                    ?
                    <StyledMobileStepper
                        variant="dots"
                        steps={3}
                        position="static"
                        activeStep={props.activeStep}
                        sx={{ maxWidth: 400, flexGrow: 1, backgroundColor: "transparent" }}
                        nextButton={
                            <Button onClick={props.handleNext} disabled={props.activeStep === 2}>
                                Next
              {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                        <KeyboardArrowRight />
                                    )}
                            </Button>
                        }
                        backButton={
                            <Button onClick={props.handleSkip}>
                                Skip
                        </Button>
                        }
                    />
                    :
                    <span></span>
                }
            </div>
        </div>
    );
};
