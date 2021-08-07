// console.log("Hello, Sammy!");

function userLocationApi(coords, term = "dog") {
    return "https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/" +
        "?api_key=d11aa1b5f6d6d8fbdc60f4dc4c589753" +
        "&format=json" +
        "&nojsoncallback=1" +
        "&method=flickr.photos.search" +
        "&safe_search=1" +
        "&per_page=5" +
        "&lat=" + coords.latitude +
        "&lon=" + coords.longitude +
        "&text=" + term;
};

let photosArray = [];
let firstPic = 0;

function imageOfURL(photoObj) {
    return "https://live.staticflickr.com/" + photoObj.server +
        "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
};

function showNextImage(data) {
    let photoOfURL = imageOfURL(data)
    let img = document.createElement("img");
    img.src = photoOfURL;
    document.body.append(img);
};

document.getElementById("btn").addEventListener("click", showNextImage);

function fetchFlickrData(location) {
    let url = userLocationApi(location);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            photosArray = data.photos.photo;

            // if (firstPic < data.photos.photo.length) {
            //     firstPic += 1;
            // }
            // if (firstPic === 5) {
            //     firstPic = 0;
            // }
            showNextImage(photosArray[firstPic]);
        });
};

function locationSuccess(data) {
    let location = data.coords;
    fetchFlickrData(location);
};


function locationError() {
    // let newTargetLocation = { latitude: 19.075984, longitude: 72.877656} // Mumbai
    let newTargetLocation = { latitude: 35.689487, longitude: 139.691706 } // Tokyo
    fetchFlickrData(newTargetLocation);
    console.log("Something went wrong with getting current geoposition! Proceeded to new location..");
};


navigator.geolocation.getCurrentPosition(locationSuccess, locationError);







// let photoIndex = photosArray[0];
// let picIndex = 0;

// function showNextImage() {
//     let img = document.createElement("img");
//     img.src = imageOfURL(photoIndex[picIndex]);
//     document.body.append(img);
// };

// let arrayOfPhotos = [];
// let picIndex = 0;
// photosArray = data.photos.photo
// imgageOfURL(photosArray[picIndex])
// picIndex +=1
// if (picIndex >= photosArray.length) {
// picIndex = 0
//}
// let photoIndex = photosArray[0];

// let picIndex = 0;

// navigator.geolocation.getCurrentPosition(success, error)
// // console.log(navigator.geolocation.getCurrentPosition)

// function success(responseObj) {
//     console.log("Success!");
//     let longitude = responseObj.coords.longitude;
//     let latitude = responseObj.coords.latitude;
//     console.log(responseObj);
//     let location = latitude + longitude;

//     fetch(responsePromise).then(response => response.json((location)).then(location))
// }

// targetLocation = {
//     latitude : 35.689487,
//     longitude : 139.691706,
// }

// function error(responseObj) {
//     console.log("Fail!");
//     alert("Could not access your location");
//     if (responseObj === "Fail!") {
//         return targetLocation;
//     }
// }


// let fetchPromise = fetch()//URL I'm searching info about
// // fetchPromise.then(function () {}) <=== instead of this callback function, use callback function names as arguments for this fetchPromise.then !!!
// fetchPromise.then(success, fail)

// spaceId: 792600537
// nsid: 193579316@N06

// latitude: 34.9812607  >>> mine
// longitude: -85.3032709 >>> mine

// Latitude: 35.689487 >>> Tokyo
// Longitude: 139.691706 >>> Tokyo

// Key: d11aa1b5f6d6d8fbdc60f4dc4c589753
// Secret: 6b45f06063c280b4

// function success (responseObj) {
//     console.log("Success!");
// }
// function error (responseObj) {
//     console.log("Fail!")
// }
// let fetchPromise = fetch("https://flickr.com/services/rest/?api_key=d11aa1b5f6d6d8fbdc60f4dc4c589753fcb&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=39.76574&lon=-86.1579024&text=dog");
// fetchPromise.then(success, fail);

//https://flickr.com/services/rest/?api_key=993fake589fake6cdfakefcb&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=39.76574&lon=-86.1579024&text=dog
