import DeviceDetector from "device-detector-js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as mpHolistic from "@mediapipe/holistic";
import { connect, removeLandmarks } from "./detector/helperFunctions";
import * as controls from "@mediapipe/control_utils";
import * as drawingUtils from "@mediapipe/drawing_utils";
import { CircularProgress } from "@mui/material";

export default function Detector() {
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)
  const canvasElementRef = useRef();
  const videoElementRef = useRef();
  const [canvasCtx, setCanvasCtx] = useState(null);
  const fpsControl = useMemo(() => new controls.FPS(), []);
  const holistic = useMemo(() => new mpHolistic.Holistic(), []);

  let activeEffect = 'mask';

  const onResults = useCallback((results) => {
    console.log("hello1")
    if (canvasCtx !== null) {
      // Hide the spinner.
      setShowLoadingSpinner(true)

      // Remove landmarks we don't want to draw.
      removeLandmarks(results);

      // Update the frame rate.
      fpsControl.tick();

      // Draw the overlays.
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElementRef.width, canvasElementRef.height);

      if (results.segmentationMask) {
        canvasCtx.drawImage(
          results.segmentationMask, 0, 0, canvasElementRef.width,
          canvasElementRef.height);

        // Only overwrite existing pixels.
        if (activeEffect === 'mask' || activeEffect === 'both') {
          canvasCtx.globalCompositeOperation = 'source-in';
          // This can be a color or a texture or whatever...
          canvasCtx.fillStyle = '#00FF007F';
          canvasCtx.fillRect(0, 0, canvasElementRef.width, canvasElementRef.height);
        } else {
          canvasCtx.globalCompositeOperation = 'source-out';
          canvasCtx.fillStyle = '#0000FF7F';
          canvasCtx.fillRect(0, 0, canvasElementRef.width, canvasElementRef.height);
        }

        // Only overwrite missing pixels.
        canvasCtx.globalCompositeOperation = 'destination-atop';
        canvasCtx.drawImage(
          results.image, 0, 0, canvasElementRef.width, canvasElementRef.height);

        canvasCtx.globalCompositeOperation = 'source-over';
      } else {
        canvasCtx.drawImage(
          results.image, 0, 0, canvasElementRef.width, canvasElementRef.height);
      }

      // Connect elbows to hands. Do this first so that the other graphics will draw
      // on top of these marks.
      canvasCtx.lineWidth = 5;
      if (results.poseLandmarks) {
        if (results.rightHandLandmarks) {
          canvasCtx.strokeStyle = 'white';
          connect(canvasCtx, [[
            results.poseLandmarks[mpHolistic.POSE_LANDMARKS.RIGHT_ELBOW],
            results.rightHandLandmarks[0]
          ]]);
        }
        if (results.leftHandLandmarks) {
          canvasCtx.strokeStyle = 'white';
          connect(canvasCtx, [[
            results.poseLandmarks[mpHolistic.POSE_LANDMARKS.LEFT_ELBOW],
            results.leftHandLandmarks[0]
          ]]);
        }
      }

      // Pose...
      drawingUtils.drawConnectors(
        canvasCtx, results.poseLandmarks, mpHolistic.POSE_CONNECTIONS,
        { color: 'white' });
      drawingUtils.drawLandmarks(
        canvasCtx,
        Object.values(mpHolistic.POSE_LANDMARKS_LEFT)
          .map(index => results.poseLandmarks[index]),
        { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)' });
      drawingUtils.drawLandmarks(
        canvasCtx,
        Object.values(mpHolistic.POSE_LANDMARKS_RIGHT)
          .map(index => results.poseLandmarks[index]),
        { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)' });

      // Hands...
      drawingUtils.drawConnectors(
        canvasCtx, results.rightHandLandmarks, mpHolistic.HAND_CONNECTIONS,
        { color: 'white' });
      drawingUtils.drawLandmarks(canvasCtx, results.rightHandLandmarks, {
        color: 'white',
        fillColor: 'rgb(0,217,231)',
        lineWidth: 2,
        radius: (data) => {
          return drawingUtils.lerp(data.from.z, -0.15, .1, 10, 1);
        }
      });
      drawingUtils.drawConnectors(
        canvasCtx, results.leftHandLandmarks, mpHolistic.HAND_CONNECTIONS,
        { color: 'white' });
      drawingUtils.drawLandmarks(canvasCtx, results.leftHandLandmarks, {
        color: 'white',
        fillColor: 'rgb(255,138,0)',
        lineWidth: 2,
        radius: (data) => {
          return drawingUtils.lerp(data.from.z, -0.15, .1, 10, 1);
        }
      });

      // Face...
      drawingUtils.drawConnectors(
        canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_TESSELATION,
        { color: '#C0C0C070', lineWidth: 1 });
      drawingUtils.drawConnectors(
        canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_RIGHT_EYE,
        { color: 'rgb(0,217,231)' });
      drawingUtils.drawConnectors(
        canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_RIGHT_EYEBROW,
        { color: 'rgb(0,217,231)' });
      drawingUtils.drawConnectors(
        canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_LEFT_EYE,
        { color: 'rgb(255,138,0)' });
      drawingUtils.drawConnectors(
        canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_LEFT_EYEBROW,
        { color: 'rgb(255,138,0)' });
      drawingUtils.drawConnectors(
        canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_FACE_OVAL,
        { color: '#E0E0E0', lineWidth: 5 });
      drawingUtils.drawConnectors(
        canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_LIPS,
        { color: '#E0E0E0', lineWidth: 5 });

      canvasCtx.restore();
    }
  }, [activeEffect, canvasCtx, fpsControl])

  useEffect(() => {
    if (typeof canvasElementRef.current !== typeof undefined) {
      setCanvasCtx(canvasElementRef.current.getContext('2d'))
      console.log("hello0")
      holistic.onResults(onResults);
    }
  }, [canvasElementRef, holistic, onResults])

  useEffect(() => {
    // call function to test the browser compatibility
    testSupport([
      { client: 'Chrome' },
    ]);
  }, [])

  const testSupport = (supportedDevices) => {
    /*
    * this function tests the browser support for running the application
    * */
    const deviceDetector = new DeviceDetector();
    const detectedDevice = deviceDetector.parse(navigator.userAgent);

    let isSupported = false;
    for (const device of supportedDevices) {
      if (device.client !== undefined) {
        const re = new RegExp(`^${device.client}$`);
        if (!re.test(detectedDevice.client.name)) {
          continue;
        }
      }
      if (device.os !== undefined) {
        const re = new RegExp(`^${device.os}$`);
        if (!re.test(detectedDevice.os.name)) {
          continue;
        }
      }
      isSupported = true;
      break;
    }
    if (!isSupported) {
      alert(`This demo, running on ${detectedDevice.client.name}/${detectedDevice.os.name}, ` +
        `is not well supported at this time, continue at your own risk.`);
    }
    else {
      alert(`This demo, running on ${detectedDevice.client.name}/${detectedDevice.os.name}, ` +
        `is well supported, please enjoy.`);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <video className="input_video" ref={videoElementRef}></video>
        <div className="canvas-container">
          <canvas className="output_canvas" ref={canvasElementRef} width="1280px" height="720px">
          </canvas>
        </div>
        <div className="loading">
          {
            showLoadingSpinner && <CircularProgress />
          }
        </div>
      </div>

    </div>
  );
};
