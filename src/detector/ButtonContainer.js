import {
  IconButton,
  Avatar,
  Tooltip,
  CircularProgress,
  Paper,
} from "@mui/material";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

export default function ButtonContainer(props) {
  return (
    <Paper elevation={3} className="buttonsContainer">
      <Tooltip title="Start Video">
        <div>
          <IconButton
            disabled={props.isVideoOn !== 0}
            color="primary"
            variant="outlined"
            onClick={props.toggleVideo}
          >
            <PlayCircleFilledIcon sx={{ height: "40px", width: "40px" }} />
          </IconButton>
        </div>
      </Tooltip>
      {props.isVideoOn === -1 ? (
        <div
          style={{
            height: "100px",
            width: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Avatar src="/logo512.png" sx={{ height: "100px", width: "100px" }} />
      )}
      <Tooltip title="Stop Video">
        <div>
          <IconButton
            disabled={props.isVideoOn !== 1}
            color="primary"
            variant="outlined"
            onClick={props.toggleVideo}
          >
            <StopCircleIcon sx={{ height: "40px", width: "40px" }} />
          </IconButton>
        </div>
      </Tooltip>
    </Paper>
  );
}
