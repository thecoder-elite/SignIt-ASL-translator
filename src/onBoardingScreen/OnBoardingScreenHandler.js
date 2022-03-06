import OnBoardingScreenCard from './OnBoardingScreenCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const cardContent = [{
    id: "01",
    header: "Lorem ipsum dolor",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    showButton: false,
    imgURL: "/logo512.png"
},
{
    id: "02",
    header: "Lorem ipsum dolor",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    showButton: false,
    imgURL: "/res/onBoardingImage1.png"
},
{
    id: "03",
    header: "Lorem ipsum dolor",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    showButton: true,
    imgURL: "/res/onBoardingImage2.png"
}]

export default function OnBoardingScreenHandler(props) {
    return (
        <TransitionGroup style={{ height: "100%" }}>
            <CSSTransition
                timeout={1000}
                classNames="slide"
                key={cardContent[props.activeStep].id}
            >
                <OnBoardingScreenCard
                    handleNext={props.handleNext}
                    activeStep={props.activeStep}
                    handleSkip={props.handleSkip}
                    header={cardContent[props.activeStep].header}
                    content={cardContent[props.activeStep].content}
                    showButton={cardContent[props.activeStep].showButton}
                    imgURL={cardContent[props.activeStep].imgURL}
                />
            </CSSTransition>
        </TransitionGroup>
    )
};
