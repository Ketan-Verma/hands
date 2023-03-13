
  let choice ;
    const URL = "https://teachablemachine.withgoogle.com/models/40wXJLmU6/";

    let model, webcam, labelContainer, maxPredictions;

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
            console.log("loading camera");
            webcam = new tmImage.Webcam(200, 200, flip);
            await webcam.setup(); 
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
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }

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
        const element = document.getElementById(elementId);
        if (element) {
          const elementsWithSameClass = document.getElementsByClassName("choice");
          for (let i = 0; i < elementsWithSameClass.length; i++) {
            elementsWithSameClass[i].classList.remove(cname);
          }
          element.classList.add(cname);
        }
      }