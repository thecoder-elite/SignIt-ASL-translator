import { Button, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';
import styled from '@emotion/styled';

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

export default function OnBoardingScreenCard(props) {

    const theme = useTheme();

    return (
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "min(90%, 500px)", gridTemplateRows: "auto auto 50px", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: 'flex-end' }}>
                <img src={props.imgURL} alt="onboarding user" style={{ height: "auto", width: "min(100%, 400px)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                <Typography variant="h3" style={{ color: "white", margin: "10px 0", textAlign: "center" }}>{props.header}</Typography>
                <Typography style={{ textAlign: "center", color: "white", width: "100%", opacity: "0.7", margin: "10px 0" }}>{props.content}</Typography>
                {
                    props.showButton &&
                    <Button style={{ backgroundColor: "white", width: "100%", borderRadius: "40px", height: "60px", color: "black", fontWeight: "bold", fontSize: "1.1rem", margin: "10px 0" }} onClick={props.handleSkip}>
                        Get started
                </Button>
                }
            </div>
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
