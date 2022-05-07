import OnBoardingScreenCard from "./OnBoardingScreenCard";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const cardContent = [
  {
    id: "01",
    header: "Welcome to Signit",
    content:
      "Welcome to Sign-it a cross platform, machine learning based American sign language translator application that helps you to communicate with ease",
    showButton: false,
    imgURL: "/logo512.png",
  },
  {
    id: "02",
    header: "Communicate quickly and easily",
    content:
      "Sign-it provides realtime on device machine learning based accurate translations instantly, so there's no hassle or delay in your communication",
    showButton: false,
    imgURL: "/res/onBoardingImage1.png",
  },
  {
    id: "03",
    header: "Get started with Signit",
    content:
      "Using Sign-it is super easy, just enable your camera and start performing ASL signs and get instant and accurate translations",
    showButton: true,
    imgURL: "/res/onBoardingImage2.png",
  },
];

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
  );
}
