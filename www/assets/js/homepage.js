const isHidden = (el) => el.offsetParent === null

const initMap = () => {
  const map = L.map('map').setView([46.845, 0.615], 5)
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 10,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWRpcGFzcXVhbGUiLCJhIjoiY2pxZjludW05NG13dDQ4bGMxM3ByaWVrNyJ9.jPlbYXNedgJ1thHf8LRITA'
  }).addTo(map)
  document.querySelectorAll("#js-route-select option").forEach(option => {
    coords = JSON.parse(option.dataset.coordinatesJson)
    const polyline = L.polyline(coords, {color: 'white'}).addTo(map);
    polyline.bindPopup(`
      <a
        href="/routes/${option.value}"
        style="text-align: center; text-decoration: underline; display: block;"
      >
        ${option.dataset.name}
        <br />
        ${option.dataset.distanceKm} km
        <br />
        🚢 ${option.dataset.shipsCount} ship(s)
      </a>
    `)
    polyline.addEventListener("mouseover", e => {
      polyline.setStyle({ color: "red" })
      polyline.openPopup()
    })
    polyline.addEventListener("popupopen", e => {
      polyline.setStyle({ color: "red" })
    })
    polyline.addEventListener("popupclose", e => {
      polyline.setStyle({ color: "white" })
    })
  })
}

window.onload = () => {
  const submitRouteForm = document.getElementById("js-route-form")
  const routeSelect = document.getElementById("js-route-select")
  submitRouteForm.addEventListener("submit", e => {
    e.preventDefault()
    const selectedRouteSlug = routeSelect.options[routeSelect.selectedIndex].value
    window.location.href = `/routes/${selectedRouteSlug}`
  })

  Array.from(document.getElementsByClassName("js-collapse")).forEach(button => {
    const targets = document.querySelectorAll(button.dataset.target)
    button.addEventListener("click", e => {
      Array.from(targets).forEach(elt => elt.classList.toggle("hidden"))
    })
  })

  document.getElementById("js-show-map").addEventListener("click", initMap)

  if (!isHidden(document.getElementById("map"))) initMap()
}
