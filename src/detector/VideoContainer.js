import {
  Paper,
  Typography,
} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

export default function VideoContainer(props) {
  return (
    <Paper elevation={3} className="videoContainer">
      <video ref={props.videoElementRef}></video>
      {props.isVideoOn === 0 && (
        <div className="instructions">
          <Typography component="h2" textAlign="center">
            Press <PlayCircleFilledIcon /> to start the camera!
          </Typography>
          <Typography component="h2" textAlign="center">
            OR
          </Typography>
          <Typography component="h2" textAlign="center">
            Upload a file to get started!
          </Typography>
        </div>
      )}
    </Paper>
  );
}
