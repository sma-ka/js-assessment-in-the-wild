let photosArray = [];
let firstPic = 0;

function userLocationApi(coords, term = "avocado") {
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

document.getElementById("btn").addEventListener("click", function () { showNextImage(photosArray[firstPic]) });

function showNextImage(data) {
    let photoOfURL = imageOfURL(data);
    let img = document.createElement("img");
    img.src = photoOfURL;

    document.getElementById("photoBox").innerHTML = "";
    document.getElementById("photoBox").append(img);

    if (firstPic < photosArray.length) {
        firstPic += 1;
    }

    if (firstPic === photosArray.length) {
        firstPic = 0;
    }
};

function imageOfURL(photoObj) {
    return "https://live.staticflickr.com/" + photoObj.server +
        "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
};

function fetchFlickrData(location) {
    let url = userLocationApi(location);
    fetch(url)
        .then(response => response.json())
        .then(photoObj => {
            photosArray = photoObj.photos.photo;
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



// latitude: 34.9812607  >>> currentLocation
// longitude: -85.3032709 >>> currentLocation

// Latitude: 35.689487 >>> Tokyo, spoofedLocation
// Longitude: 139.691706 >>> Tokyo, spoofedLocation

// Key: d11aa1b5f6d6d8fbdc60f4dc4c589753
// Secret: 6b45f06063c280b4