import { useEffect, useRef, useState } from "react";
import * as mpHolistic from "@mediapipe/holistic";
import * as tf from '@tensorflow/tfjs';
import { CircularProgress } from "@mui/material";
import { Camera } from '@mediapipe/camera_utils';
import { onResults } from "./helperFunctions";

function Detector() {

  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true)
  const videoElementRef = useRef();
  const [holisticModel, setHolisticModel] = useState(null);



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
      camera.start();
    }
    // --------------------------------------------------
  }, [videoElementRef, holisticModel])

  useEffect(() => {
    // load our custom model and set it
    tf.loadLayersModel('jsonmodel/model.json')
      .then(fetched_model => {
        console.log("fetched custom model")
        // initialize the holistic model
        const holistic = new mpHolistic.Holistic({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@` +
              `${mpHolistic.VERSION}/${file}`;
          }
        })
        holistic.setOptions({ minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 })
        holistic.onResults((results) => onResults(results, fetched_model));
        holistic.initialize()
          .then(res => {
            console.log("Initialized Mp holistic model")
            setShowLoadingSpinner(false)
            setHolisticModel(holistic)
          })
        // -----------------------------
      })
      .catch(err => {
        console.log(err)
      })
    // ------------------------------------------
  }, [])

  if (showLoadingSpinner)
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    )
  else
    return (
      <div className="App">
        <div className="container">
          <p >Webcam Input</p>
          <video ref={videoElementRef} ></video>
        </div>

      </div>
    )
}

export default Detector;
