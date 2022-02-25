import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as mpHolistic from "@mediapipe/holistic";
import * as tf from '@tensorflow/tfjs';
import { CircularProgress } from "@mui/material";
import { Camera } from '@mediapipe/camera_utils';

function App() {

  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)
  const canvasElementRef = useRef();
  const videoElementRef = useRef();
  const controlsRef = useRef();
  const [canvasCtx, setCanvasCtx] = useState(null);
  const [model, setModel] = useState();

  const onResults = useCallback((results) => {
    try {
      let pose = tf.zeros([33, 4]), face = tf.zeros([468, 3]), lh = tf.zeros([21, 3]), rh = tf.zeros([21, 3]);
      if (results.poseLandmarks) {
        for (let res of results.poseLandmarks)
          pose = tf.reshape(tf.tensor2d([[res.x, res.y, res.z, res.visibility]]), [-1]);
      }
      if (results.faceLandmarks) {
        for (let res of results.faceLandmarks)
          face = tf.reshape(tf.tensor2d([[res.x, res.y, res.z, res.visibility]]), [-1]);
      }
      if (results.leftHandLandmarks) {
        for (let res of results.leftHandLandmarks)
          lh = tf.reshape(tf.tensor2d([[res.x, res.y, res.z, res.visibility]]).flatten(), [-1]);
      }
      if (results.rightHandLandmarks) {
        for (let res of results.rightHandLandmarks)
          rh = tf.reshape(tf.tensor2d([[res.x, res.y, res.z, res.visibility]]).flatten(), [-1]);
      }
      console.log("pose1", pose.shape, face.shape, lh.shape, rh.shape);
    }
    catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    if (typeof canvasElementRef.current !== typeof undefined && typeof canvasElementRef.current !== typeof undefined && typeof controlsRef.current !== typeof undefined) {
      console.log("activating")
      // Set the canvas context
      setCanvasCtx(canvasElementRef.current.getContext('2d'))
      // ------------------------------
    }
  }, [canvasElementRef, videoElementRef, controlsRef])

  useEffect(() => {
    if (canvasCtx !== null) {
      tf.loadLayersModel('jsonmodel/model.json')
        .then(model => {
          setModel(model)
        })
        .catch(err => {
          console.log(err)
        })
      const holistic = new mpHolistic.Holistic({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@` +
            `${mpHolistic.VERSION}/${file}`;
        }
      })
      holistic.setOptions({ minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 })
      // set function to run on result of holistic model
      holistic.onResults(onResults);
      // ------------------------------------------------
      // Start the camera using mediapipe camera utility
      if (typeof videoElementRef.current !== "undefined" && videoElementRef.current !== null) {
        const camera = new Camera(videoElementRef.current, {
          onFrame: async () => {
            await holistic.send({ image: videoElementRef.current });
          },
          width: 480,
          height: 480
        });
        camera.start();
      }
      // --------------------------------------------------
    }
  }, [canvasCtx, onResults])

  return (
    <div className="App">
      <div className="container">
        <p >Webcam Input</p>
        <video ref={videoElementRef} ></video>

        <canvas ref={canvasElementRef} width="480px" height="480px">

        </canvas>
        <div className="loading">
          {
            showLoadingSpinner && <CircularProgress />
          }
        </div>
        <div ref={controlsRef} >
        </div>
      </div>

    </div>
  )
}

export default App;
