var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=XinQDHAn1nW30iWHV0eycQwKCmRwWEYGG7CVdXmR57Q";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });


// parse data and render HTML
const getData = (response) => {
  const plantData = JSON.parse(response).data;
  console.log(plantData);
  const beechData = plantData.filter(item => item.family_common_name == "Beech family");
  // console.log(plantData[0]);
  // console.log(plantData[0].common_name);
  var i;
  for (i = 0; i < beechData.length; i++) {
    addToDom(beechData[i], "beechplants");
  }
  // addToDom(plantData[0]);


  const buttercupData = plantData.filter(item => item.family_common_name == "Buttercup family");
  var i;
  for (i = 0; i < buttercupData.length; i++) {
    addToDom(buttercupData[i], "buttercupplants");
  }
}

const addToDom = (plant, div) => {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.setAttribute("class", "plant.common_name");

  const plant_name = document.createElement("h3");
  plant_name.innerText = plant.common_name;

  const image_url = plant.image_url;
  const plant_img = document.createElement("img");
  plant_img.setAttribute("src", image_url);

  wrapperDiv.appendChild(plant_name);
  wrapperDiv.appendChild(plant_img);

  document.getElementById(div).appendChild(wrapperDiv);
}

// function justBeech(plant) {
//   plant.family_common_name == "Beech family";
// }

// function filterBeech() {
//   document.getElementById("plantData").innerHTML = plants.filter(justBeech);
// }

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
const displayContent = () => {
  corsPromise().then(
    (request) =>
      (request.onload = request.onerror = function () {
        // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
        getData(request.response);
      })
  );
}

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
