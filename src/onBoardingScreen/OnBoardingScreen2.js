import { Button } from "@mui/material";

export default function OnBoardingScreen2(props) {
    return (
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "100%", gridTemplateRows: "60% 40%", height: "100%" }}>
            <div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                <h1 style={{ color: "white", marginBottom: "0px" }}>Lorem ipsum dolor</h1>
                <p style={{ textAlign: "center", color: "white", fontSize: "0.9rem", width: "85%", opacity: "0.7"  }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                <Button style={{ backgroundColor: "white", width: "90%", borderRadius: "40px", height: "60px", color: "black", fontWeight: "bold", fontSize: "1.1rem" }} onClick={props.handleSkip}>
                    Get started
                </Button>
            </div>
        </div>
    );
};
