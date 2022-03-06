import { useRef, useCallback } from "react";
import { Camera } from '@mediapipe/camera_utils';
import { Paper } from "@mui/material";

export default function VideoContainer(props) {

    const videoElementRef = useRef();

    const initCamera = useCallback(() => {
        // Start the camera using mediapipe camera utility
        if (typeof videoElementRef.current !== "undefined" && videoElementRef.current !== null && props.holisticModel !== null) {
            const camera = new Camera(videoElementRef.current, {
                onFrame: async () => {
                    await props.holisticModel.send({ image: videoElementRef.current });
                },
                width: 480,
                height: 480
            });
            camera.start();
        }
        // --------------------------------------------------
    }, [videoElementRef, props.holisticModel])

    console.log(initCamera)

    return (
        <Paper elevation={3} className="videoContainer">
            <video ref={videoElementRef} ></video>
        </Paper>
    );
};
