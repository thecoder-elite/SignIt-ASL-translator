import { useEffect, useRef, useState, useCallback } from "react";
import * as mpHolistic from "@mediapipe/holistic";
import * as tf from '@tensorflow/tfjs';
import { Camera } from '@mediapipe/camera_utils';
import { onResults } from "./helperFunctions";
import { Typography } from "@mui/material";
import LoadingComponent from './LoadingComponent';

function Detector() {

  const [loadingStates, setLoadingStates] = useState(0)
  const videoElementRef = useRef();
  const [holisticModel, setHolisticModel] = useState(null);

  const initCamera = useCallback(() => {
    // Start the camera using mediapipe camera utility
    if (typeof videoElementRef.current !== "undefined" && videoElementRef.current !== null && holisticModel !== null) {
      const camera = new Camera(videoElementRef.current, {
        onFrame: async () => {
          await holisticModel.send({ image: videoElementRef.current });
        },
        width: 480,
        height: 480
      });
      camera.start();
    }
    // --------------------------------------------------
  }, [videoElementRef, holisticModel])

  console.log(initCamera)

  useEffect(() => {
    // load our custom model and set it
    const speechSynthesisUtterance = new SpeechSynthesisUtterance();
    tf.loadLayersModel('jsonmodel/model.json')
      .then(fetched_model => {
        setLoadingStates(1)
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
            setLoadingStates(2)
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
      <div className="container">
        <Typography >Webcam Input</Typography>
        <video ref={videoElementRef} ></video>
      </div>
    )
}

export default Detector;
