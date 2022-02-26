
import * as tf from '@tensorflow/tfjs';

let sequence = [];

export const onResults = (results, model) => {
    if (model !== null) {
        try {
            let pose = new Array(33 * 4).fill(0), face = new Array(468 * 3).fill(0), lh = new Array(21 * 3).fill(0), rh = new Array(21 * 3).fill(0);
            console.log("getting frame")
            if (results.poseLandmarks) {
                let arr = [];
                for (let res of results.poseLandmarks) {
                    arr.push(...[res.x, res.y, res.z, res.visibility])
                }
                pose = arr;
            }
            if (results.faceLandmarks) {
                let arr = [];
                for (let res of results.faceLandmarks) {
                    arr.push(...[res.x, res.y, res.z])
                }
                face = arr;
            }
            if (results.leftHandLandmarks) {
                let arr = [];
                for (let res of results.leftHandLandmarks) {
                    arr.push(...[res.x, res.y, res.z])
                }
                lh = arr;
            }
            if (results.rightHandLandmarks) {
                let arr = [];
                for (let res of results.rightHandLandmarks) {
                    arr.push(...[res.x, res.y, res.z])
                }
                rh = arr;
            }
            sequence.push([...pose, ...face, ...lh, ...rh])
            if (sequence.length === 30) {
                console.log(sequence)
                let new_tensor = tf.tensor2d(sequence)
                console.log(new_tensor.shape, tf.expandDims(new_tensor, 0).shape)
                console.log(model.predict(tf.expandDims(new_tensor, 0)).print())
                sequence = [];
            }
        }
        catch (err) {
            sequence = [];
            console.log(err)
        }
    }
}