import { useEffect, useState, useRef } from "react";
import * as mpHolistic from "@mediapipe/holistic";
import * as tf from "@tensorflow/tfjs";
import { onResults } from "./helperFunctions";
import LoadingComponent from "./LoadingComponent";
import { DetectorContainer } from "./detectorStyles";
import { Camera } from "@mediapipe/camera_utils";
import VideoContainer from "./VideoContainer";
import ButtonContainer from "./ButtonContainer";

function Detector() {
  const [loadingStates, setLoadingStates] = useState(0);
  const [holisticModel, setHolisticModel] = useState(null);
  const [camera, setCamera] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(0);
  const videoElementRef = useRef();

  useEffect(() => {
    // load our custom model and set it
    const speechSynthesisUtterance = new SpeechSynthesisUtterance();
    tf.loadLayersModel("jsonmodel/model.json")
      .then((fetched_model) => {
        setLoadingStates((prev) => prev + 1);
        // initialize the holistic model
        const holistic = new mpHolistic.Holistic({
          locateFile: (file) => {
            return (
              `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@` +
              `${mpHolistic.VERSION}/${file}`
            );
          },
        });
        holistic.setOptions({
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
        holistic.onResults((results) =>
          onResults(results, fetched_model, speechSynthesisUtterance)
        );
        holistic.initialize().then((res) => {
          setLoadingStates((prev) => prev + 1);
          setHolisticModel(holistic);
        });
        // -----------------------------
      })
      .catch((err) => {
        console.log(err);
      });
    // ------------------------------------------
  }, []);

  useEffect(() => {
    // Start the camera using mediapipe camera utility
    if (
      typeof videoElementRef.current !== "undefined" &&
      videoElementRef.current !== null &&
      holisticModel !== null
    ) {
      const camera = new Camera(videoElementRef.current, {
        onFrame: async () => {
          await holisticModel.send({ image: videoElementRef.current });
        },
        width: 480,
        height: 480,
      });
      setCamera(camera);
    }
    // --------------------------------------------------
  }, [videoElementRef, holisticModel]);

  const initCamera = () => {
    // resetSentence();
    camera.start().then((res) => setIsVideoOn(1));
  };

  const stopVideo = () => {
    camera.stop().then((res) => setIsVideoOn(0));
  };

  const toggleVideo = () => {
    setIsVideoOn(-1);
    if (isVideoOn === 0) {
      initCamera();
    } else {
      stopVideo();
    }
  };

  if (loadingStates < 2)
    return <LoadingComponent loadingStates={loadingStates} />;
  else
    return (
      <DetectorContainer>
        <VideoContainer
          videoElementRef={videoElementRef}
          isVideoOn={isVideoOn}
        />
        <ButtonContainer isVideoOn={isVideoOn} toggleVideo={toggleVideo} />
      </DetectorContainer>
    );
}

export default Detector;
