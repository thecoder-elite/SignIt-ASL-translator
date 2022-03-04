import { Button } from "@mui/material";

export default function OnBoardingScreenCard(props) {
    return (
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "100%", gridTemplateRows: "60% 40%", height: "100%" }}>
            <div>
                <img src={props.imgURL} alt="onboarding user" width="100%" height="auto" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                <h1 style={{ color: "white", marginBottom: "0px" }}>{props.header}</h1>
                <p style={{ textAlign: "center", color: "white", fontSize: "0.9rem", width: "85%", opacity: "0.7" }}>{props.content}</p>
                {
                    props.showButton &&
                    <Button style={{ backgroundColor: "white", width: "90%", borderRadius: "40px", height: "60px", color: "black", fontWeight: "bold", fontSize: "1.1rem" }} onClick={props.handleSkip}>
                        Get started
                </Button>
                }
            </div>
        </div>
    );
};
