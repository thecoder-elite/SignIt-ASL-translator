import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const LoadingDiv = styled(Box)({
  "&": {
    background: "transparent",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  "& .dot1": {
    background: "#0ebeff",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    margin: "0 5px",
    display: "inline-block",
    animation: "dots 1s ease-in infinite",
  },
  "& .dot2": {
    background: "#fcd000",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    margin: "0 5px",
    animation: "dots 1s 0.25s ease-in infinite",
    display: "inline-block",
  },
  "& .dot3": {
    background: "#ff3c41",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    margin: "0 5px",
    display: "inline-block",
    animation: "dots 1s 0.5s ease-in infinite",
  },
  "@keyframes dots": {
    "0%": {
      transform: "translateY(30px)",
      opacity: 1,
    },
    "50%": {
      transform: "translateY(12px)",
      opacity: 0.7,
    },
    "60%": {
      transfom: "translateY(12px)",
    },
    "100%": {
      transform: "translateY(30px)",
      opacity: 1,
    },
  },
});

export const DetectorContainer = styled("div")({
  "&": {
    width: "100%",
    background: "linear-gradient(-25deg, #fdcb6c 50%, #7d8dc1 50%)",
    animation: "detector_bg 0.5s ease-in forwards",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  "@keyframes detector_bg": {
    "0%": {
      height: 0,
    },
    "100%": {
      height: "100%",
    },
  },
  "& .videoContainer": {
    border: "5px solid white",
    borderRadius: "20px",
    backgroundColor: "white",
    animation: "detector_container 1s ease-in forwards",
    animationDelay: "1s",
    visibility: "hidden",
    width: "min(500px, 90vw)",
    height: "min(500px, 110vw)",
  },
  "& .videoContainer video": {
    height: "100%",
    width: "100%",
    borderRadius: "20px",
  },
  "& .videoContainer .instructions": {
    position: "relative",
    bottom: "60%",
    color: "#101335",
    left: "0",
  },
  "@keyframes detector_container": {
    "0%": {
      visibility: "visible",
      opacity: 0,
    },
    "100%": {
      visibility: "visible",
      opacity: 1,
    },
  },
  "& .navbar": {
    position: "absolute",
    top: 20,
    left: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .buttonsContainer": {
    backgroundColor: "white",
    marginTop: "50px",
    width: "max-content",
    padding: "0 20px",
    borderRadius: "20px",
    justifyContent: "center",
    alignItems: "center",
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    gridColumnGap: "10px",
    visibility: "hidden",
    animation: "detector_container 1s ease-in forwards",
    animationDelay: "1s",
  },
});
