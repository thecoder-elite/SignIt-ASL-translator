import { LoadingDiv } from "./detectorStyles";
import { Typography, Box, CircularProgress } from "@mui/material";

export default function LoadingComponent(props) {
    return (
        <LoadingDiv >
            <div>
                <div className="dot1">
                </div>
                <div className="dot2">
                </div>
                <div className="dot3">
                </div>
            </div>
            <div style={{ margin: "50px 50px 25px 50px" }}>
                <Typography component="h3" textAlign="center">Please wait while we get a few things ready!</Typography>
            </div>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={props.loadingStates === 0 ? 0 : props.loadingStates === 1 ? 50 : 100} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                    >{props.loadingStates}/2</Typography>
                </Box>
            </Box>
        </LoadingDiv>
    );
};
