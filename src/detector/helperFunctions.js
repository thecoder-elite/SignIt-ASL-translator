
import * as tf from '@tensorflow/tfjs';

let sequence = [];
const actions = ['hello', 'thanks'];

export const onResults = (results, model, speechSynthesisUtterance) => {
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
                let new_tensor = tf.tensor2d(sequence)
                let model_result = model.predict(tf.expandDims(new_tensor, 0))
                model_result.array().then(res => {
                    let prediction = actions[res[0].indexOf(Math.max(...res[0]))];
                    speechSynthesisUtterance.text = prediction;
                    window.speechSynthesis.speak(speechSynthesisUtterance);
                })
                sequence = [];
            }
        }
        catch (err) {
            sequence = [];
            console.log(err)
        }
    }
}