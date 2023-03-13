    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
  let choice ;
    const URL = "https://teachablemachine.withgoogle.com/models/40wXJLmU6/";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
            console.log("loading camera");
            webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
            await webcam.setup(); // request access to the webcam
            await webcam.play();
        
        
        window.requestAnimationFrame(loop);
        
        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        let celem = prediction[maxIndex(prediction)].className
        setActive(celem,"active")

    }

    function maxIndex(arr){
        let max = 0
        for (let i = 0; i < arr.length; i++) {
            if(arr[max].probability<arr[i].probability)max=i;
        }
        return max;
    }

    function setActive(elementId,cname) {
        choice =elementId
        // Get the element by its ID
        const element = document.getElementById(elementId);
        // if(!inputs.contains(elementId))inputs.push(elementId);
        // Check if the element exists
        if (element) {
          // Remove the cname class from all elements with the same class name
          const elementsWithSameClass = document.getElementsByClassName("choice");
          for (let i = 0; i < elementsWithSameClass.length; i++) {
            elementsWithSameClass[i].classList.remove(cname);
          }
      
          // Add the 'active' class to the specified element
          element.classList.add(cname);
        }
      }
    //   isSequenceAZX(inputs)