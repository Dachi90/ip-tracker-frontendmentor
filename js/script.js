const d = document;

d.addEventListener("DOMContentLoaded", () => {
  init();
});

d.querySelector(".ip-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  //console.log(event);
  const inputIp = d.querySelector(".ip-input").value;
  const ipData = await formData(inputIp);
  fillData(ipData);
});

async function init() {
  const data = await getData();
  fillData(data);
}

async function getData() {
  try {
    const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_ZmY5YaIQwg6w4OMF7iQE4vZfIlGtj`);
    const data = await response.json();
    if (!response.ok) throw { status: response.status, statusText: response.statusText };
    return data;
  } catch (err) {
    //console.log(err);
    let $error = d.querySelector(".error");
    $error.classList.add("showError");
    $error.innerHTML = `<p> Error ${err.status}: ${err.statusText}</p>
                        <p> La ip ${d.querySelector(".ip-input").value} no es válida</p>`;
    setTimeout(() => {
      $error.innerHTML = "";
      $error.classList.remove("showError");
    }, 3000);
  }
}

function fillData(data) {
  let ip = document.querySelector(".ip-data");
  let location = document.querySelector(".location-data");
  let timezone = document.querySelector(".timezone-data");
  let isp = document.querySelector(".isp-data");
  let lat = null;
  let lng = null;

  ip.textContent = data.ip;
  location.textContent = `${data.location.city}, ${data.location.region}`;
  timezone.textContent = data.location.timezone;
  isp.textContent = data.isp;
  lat = data.location.lat;
  lng = data.location.lng;
  drawMap(lat, lng);
}

function drawMap(lat, lng) {
  document.querySelector(".map-container").innerHTML = "<div id='map'></div>";

  var mymap = L.map("map").setView([lat, lng], 18);
  const marker = L.marker([lat, lng]).addTo(mymap);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap);
}

async function formData(ipAddress) {
  try {
    const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_ZmY5YaIQwg6w4OMF7iQE4vZfIlGtj&ipAddress=${ipAddress}`);
    const formData = await response.json();
    //console.log(response, formData);
    if (!response.ok) throw { status: response.status, statusText: response.statusText };
    return formData;
  } catch (err) {
    //console.log(err);
    let $error = d.querySelector(".error");
    $error.classList.add("showError");
    $error.innerHTML = `<p> Error ${err.status}: ${err.statusText}</p>
                        <p> La ip ${d.querySelector(".ip-input").value} no es válida</p>`;
    setTimeout(() => {
      $error.innerHTML = "";
      $error.classList.remove("showError");
    }, 3000);
  }
}
