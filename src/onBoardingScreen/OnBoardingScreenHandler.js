import OnBoardingScreenCard from './OnBoardingScreenCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const cardContent = [{
    id: "01",
    header: "Lorem ipsum dolor",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    showButton: false,
    imgURL:"/res/onBoardingImage1.png"
},
{
    id: "02",
    header: "Lorem ipsum dolor",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    showButton: false,
    imgURL:"/res/onBoardingImage1.png"
},
{
    id: "03",
    header: "Lorem ipsum dolor",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    showButton: true,
    imgURL:"/res/onBoardingImage1.png"
}]

export default function OnBoardingScreenHandler(props) {
    return (
        <TransitionGroup style={{ height: "100%" }}>
            <CSSTransition
                timeout={1000}
                classNames="fade"
                key={cardContent[props.activeStep].id}
            >
                <OnBoardingScreenCard
                    header={cardContent[props.activeStep].header}
                    content={cardContent[props.activeStep].content}
                    showButton={cardContent[props.activeStep].showButton}
                    handleSkip={props.handleSkip}
                    imgURL={cardContent[props.activeStep].imgURL}
                />
            </CSSTransition>
        </TransitionGroup>
    )
};
