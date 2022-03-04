import { CSSTransition } from 'react-transition-group';
import OnBoardingScreenHandler from './OnBoardingScreenHandler';

export default function OnBoardingScreen(props) {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "100vh" }}>
            <div></div>
            <CSSTransition
                in={true}
                appear={true}
                timeout={1000}
                classNames="fade"
            >
                <OnBoardingScreenHandler
                    handleNext={props.handleNext}
                    activeStep={props.activeStep}
                    handleSkip={props.handleSkip} />
            </CSSTransition>
        </div>
    );
};
