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
        display: "inline-block"
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
            opacity: 1
        }

    }
})