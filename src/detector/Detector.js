import { useEffect, useState, useRef } from "react";
import * as mpHolistic from "@mediapipe/holistic";
import * as tf from '@tensorflow/tfjs';
import { onResults } from "./helperFunctions";
import LoadingComponent from './LoadingComponent';
import { DetectorContainer } from "./detectorStyles";
import { IconButton, Avatar, Tooltip, Paper, CircularProgress, Typography } from "@mui/material";
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Camera } from '@mediapipe/camera_utils';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

function Detector() {

  const [loadingStates, setLoadingStates] = useState(0)
  const [holisticModel, setHolisticModel] = useState(null);
  const [camera, setCamera] = useState(null)
  const [isVideoOn, setIsVideoOn] = useState(0);
  const videoElementRef = useRef();

  useEffect(() => {
    // load our custom model and set it
    const speechSynthesisUtterance = new SpeechSynthesisUtterance();
    tf.loadLayersModel('jsonmodel/model.json')
      .then(fetched_model => {
        setLoadingStates(prev => prev + 1)
        // initialize the holistic model
        const holistic = new mpHolistic.Holistic({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@` +
              `${mpHolistic.VERSION}/${file}`;
          }
        })
        holistic.setOptions({ minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 })
        holistic.onResults((results) => onResults(results, fetched_model, speechSynthesisUtterance));
        holistic.initialize()
          .then(res => {
            setLoadingStates(prev => prev + 1)
            setHolisticModel(holistic)
          })
        // -----------------------------
      })
      .catch(err => {
        console.log(err)
      })
    // ------------------------------------------
  }, [])

  useEffect(() => {
    // Start the camera using mediapipe camera utility
    if (typeof videoElementRef.current !== "undefined" && videoElementRef.current !== null && holisticModel !== null) {
      const camera = new Camera(videoElementRef.current, {
        onFrame: async () => {
          await holisticModel.send({ image: videoElementRef.current });
        },
        width: 480,
        height: 480
      });
      setCamera(camera)
    }
    // --------------------------------------------------
  }, [videoElementRef, holisticModel])

  const initCamera = () => {
    // resetSentence();
    camera.start()
      .then(res => setIsVideoOn(1))
  }

  const stopVideo = () => {
    camera.stop()
      .then(res => setIsVideoOn(0))
  }

  const toggleVideo = () => {
    if (isVideoOn === 0) {
      setIsVideoOn(-1)
      initCamera();
    }
    else {
      setIsVideoOn(-1)
      stopVideo();
    }
  }

  if (loadingStates < 2)
    return (
      <LoadingComponent loadingStates={loadingStates} />
    )
  else
    return (
      <DetectorContainer>
        <Paper elevation={3} className="videoContainer">
          <video ref={videoElementRef} ></video>
          {
            isVideoOn === 0 && <div className="instructions">
              <Typography component="h2" textAlign="center">Press <PlayCircleFilledIcon /> to start the camera!</Typography>
              <Typography component="h2" textAlign="center">OR</Typography>
              <Typography component="h2" textAlign="center">Upload a file to get started!</Typography>
            </div>
          }
        </Paper>
        <div className="buttonsContainer">
          {
            isVideoOn === -1 ?
              <CircularProgress />
              :
              isVideoOn === 1 ?
                <Tooltip title="Stop">
                  <IconButton color="primary" variant="outlined" onClick={toggleVideo}  ><StopCircleIcon sx={{ height: "40px", width: "40px" }} /></IconButton>
                </Tooltip>
                :
                <Tooltip title="Play">
                  <IconButton color="primary" variant="outlined" onClick={toggleVideo}  ><PlayCircleFilledIcon sx={{ height: "40px", width: "40px" }} /></IconButton>
                </Tooltip>
          }
          <Avatar src="/logo512.png" sx={{ height: "100px", width: "100px" }} />
          <input type="file" style={{ width: "90px" }} onClick={() => alert("Feature is currently under development!")} disabled={isVideoOn !== 0} />
          {/* <Tooltip title="Upload File">
            <IconButton color="primary" variant="outlined"  ><UploadFileIcon sx={{ height: "40px", width: "40px" }} /></IconButton>
          </Tooltip> */}
        </div>
      </DetectorContainer>
    )
}

export default Detector;
