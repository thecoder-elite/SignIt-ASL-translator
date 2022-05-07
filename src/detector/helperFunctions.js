import * as tf from "@tensorflow/tfjs";

let sequence = [];
let sentence = [];
let prevWord = "";
const actions = ["Hello", "Thanks", "Goodbye", "Please", "Yes", "No"];

export const onResults = (
  results,
  model,
  speechSynthesisUtterance,
  textAreaRef
) => {
  if (model !== null) {
    try {
      let pose = new Array(33 * 4).fill(0),
        face = new Array(468 * 3).fill(0),
        lh = new Array(21 * 3).fill(0),
        rh = new Array(21 * 3).fill(0);
      console.log("getting frame");
      if (results.poseLandmarks) {
        let arr = [];
        for (let res of results.poseLandmarks) {
          arr.push(...[res.x, res.y, res.z, res.visibility]);
        }
        pose = arr;
      }
      if (results.faceLandmarks) {
        let arr = [];
        for (let res of results.faceLandmarks) {
          arr.push(...[res.x, res.y, res.z]);
        }
        face = arr;
      }
      if (results.leftHandLandmarks) {
        let arr = [];
        for (let res of results.leftHandLandmarks) {
          arr.push(...[res.x, res.y, res.z]);
        }
        lh = arr;
      }
      if (results.rightHandLandmarks) {
        let arr = [];
        for (let res of results.rightHandLandmarks) {
          arr.push(...[res.x, res.y, res.z]);
        }
        rh = arr;
      }
      sequence.push([...pose, ...face, ...lh, ...rh]);
      if (sequence.length === 20) {
        let new_tensor = tf.tensor2d(sequence);
        let model_result = model.predict(tf.expandDims(new_tensor, 0));
        model_result.array().then((res) => {
          let prediction = actions[res[0].indexOf(Math.max(...res[0]))];
          if (prediction !== prevWord) {
            speechSynthesisUtterance.text = prediction;
            window.speechSynthesis.speak(speechSynthesisUtterance);
            textAreaRef.current.innerText = prediction;
            sentence.push(prediction);
          }
          prevWord = prediction;
        });
        sequence = [];
      }
    } catch (err) {
      sequence = [];
      console.log(err);
    }
  }
};

export const resetSentence = () => (sentence = []);
