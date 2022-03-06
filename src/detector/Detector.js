import { useEffect, useState } from "react";
import * as mpHolistic from "@mediapipe/holistic";
import * as tf from '@tensorflow/tfjs';
import { onResults } from "./helperFunctions";
import LoadingComponent from './LoadingComponent';
import VideoContainer from "./VideoContainer";
import { DetectorContainer } from "./detectorStyles";
import { IconButton, Avatar, Tooltip } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function Detector() {

  const [loadingStates, setLoadingStates] = useState(0)
  const [holisticModel, setHolisticModel] = useState(null);

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

  if (loadingStates < 2)
    return (
      <LoadingComponent loadingStates={loadingStates} />
    )
  else
    return (
      <DetectorContainer>
        {/* <div className="navbar">
          <img src="/logo512.png" alt="logo" height="50px" width="50px" />
          <Typography component="h4" style={{color:"white", fontSize:"1.5rem"}}>Sign-it ASL Translator</Typography> 
        </div> */}
        <VideoContainer holisticModel={holisticModel} />
        <div class="buttonsContainer">
          <Tooltip title="Play">
            <IconButton color="primary" variant="outlined"  ><PlayArrowIcon sx={{ height: "40px", width: "40px" }} /></IconButton>
          </Tooltip>
          <Avatar src="/logo512.png" sx={{ height: "100px", width: "100px" }} />
          <Tooltip title="Upload File">
            <IconButton color="primary" variant="outlined"  ><UploadFileIcon sx={{ height: "40px", width: "40px" }} /></IconButton>
          </Tooltip>
        </div>
      </DetectorContainer>
    )
}

export default Detector;
