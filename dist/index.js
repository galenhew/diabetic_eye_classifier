var model = undefined;
const classifierElement = document.getElementById('classifier');
const loaderElement = document.getElementById('loader');

async function initialize() {
    // loadGraphModel and not loadLayersModel exported as tf, not keras
    model = await tf.loadGraphModel('trained-model/model.json');
    classifierElement.style.display = 'block';
    loaderElement.style.display = 'none';

    document.getElementById('predict').addEventListener('click', () => predict());


    // list of eyeballs


    // Get the container element
    var btnContainer = document.getElementById("list-of-eyeballs");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("list-group-item list-group-item-action");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
    }

}

async function predict () {

    const imageElement = document.getElementById('img');
    let tensorImg = tf.browser.fromPixels(imageElement).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
    prediction = await model.predict(tensorImg).data();
    console.log(prediction)
    prediction_chance= (prediction[1]*100).toFixed(2);
    prediction_display= 'There is a ' + '<b>' + prediction_chance + '% </b>' + 'chance that the patient has diabetic blindness signs.'
    document.getElementById('image-card-text').innerHTML = prediction_display
}

function changeImage() {
    var imageDisplay = document.getElementById('img');
    var uploadedImage = document.getElementById('my-file-selector').files[0];

    // show image name
    var uploadedImageName= document.getElementById('my-file-selector').files[0].name;
    document.getElementById('image-card-title').innerHTML = uploadedImageName;

    imageDisplay.src = URL.createObjectURL(uploadedImage);
}


var myFunction = function(val){
    var imageDisplay = document.getElementById('img');
    imageDisplay.src = val ;
    console.log(imageDisplay)
}


initialize();