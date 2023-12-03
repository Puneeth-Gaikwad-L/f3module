const container = document.getElementById("container");
const fetchBtn = document.getElementById("fetch-btn");
const mainContent = document.getElementById("main");
const lat = document.getElementById("lat")
const lng = document.getElementById("lng")
const map = document.getElementById("iframe");


fetchBtn.addEventListener("click", displayData)

function displayData() {
    console.log("function called");
    container.innerHTML = "";
    container.appendChild(mainContent);
    mainContent.style.display = "flex"

    if ("geolocation" in navigator) {
        /* geolocation is available */
        console.log("geolocation available");
        navigator.geolocation.getCurrentPosition((position) => {
            lat.innerHTML = position.coords.latitude;
            lng.innerHTML = position.coords.longitude;
            map.src = `https://maps.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&z=15&output=embed`
            getData(position.coords.latitude, position.coords.longitude);
        },
            function (error) {
                if (error.code == error.PERMISSION_DENIED)
                    container.innerHTML = "";
                let message = document.createElement("h1");
                message.innerText = "you denied me :-("
                container.appendChild(message);
            });

    } else {
        /* geolocation IS NOT available */
        console.log("geolocation not available");
    }
}





async function getData(lat, lon) {
    const APIkey = "205fc8f371f61b3de3af318966864edd"

    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}.44&lon=${lon}.04&appid=${APIkey}`)
    const data = await response.json
    console.log(data);
    addData(data);
}

function addData(response) {
    document.getElementById("city").innerText = response.city_name;
    document.getElementById("windSpeed").innerText = `${response.wind.speed}kmph`;
    document.getElementById("Humidity").innerText = response.main.humidity;
    document.getElementById("pres").innerText = response.main.pressure;
    document.getElementById("wDirection").innerText = response.wind.speed
    document.getElementById("UV").innerText = response.clouds.all;
    document.getElementById("feels").innerText = response.main.feels_like;
    document.getElementById("time").innerText = response.timezone;
}

