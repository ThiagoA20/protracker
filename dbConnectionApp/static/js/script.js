let current_geo_json_value = {
    "type": "FeatureCollection",
    "features": [
    ]
}

// Change Language
let language = document.getElementById("language-container")
let language_selector = document.getElementById("language-selector")
let lang = 0
let languages = document.getElementsByClassName("language-button")
let language_options = {"select-russian": "russian", "select-english": "english", "select-portuguese": "portuguese", "select-spanish": "spanish"}
let change_language = {
    "english":{"label_name": "Name", "label_latitude": "Latitude", "label_longitude": "Longitude", "label_date": "Date", "type": "Type", "info": "Info"},
    "portuguese":{"label_name": "Nome", "label_latitude": "Latitude", "label_longitude": "Longitude", "label_date": "Data", "type": "Tipo", "info": "informação"},
    "russian":{"label_name": "Имя", "label_latitude": "Широта", "label_longitude": "Долгота", "label_date": "Дата", "type": "тип", "info": "Информация"},
    "spanish":{"label_name": "Nombre", "label_latitude": "Latitud", "label_longitude": "Longitud", "label_date": "Fecha", "type": "Escribe", "info": 'Info'},
}
let selected_language = "english"
let language_flags = document.getElementsByClassName("flag")
language.addEventListener('click', () => {
    if (lang == 0) {
        lang = 1
        language_selector.style.display = "flex"
    } else {
        lang = 0
        language_selector.style.display = "none"
    }
})
function update_language() {
    let selected_flag = `flag-${selected_language}`
    let labels = change_language[selected_language]
    for (i = 0; i < language_flags.length; i+= 1) {
        flag_id = language_flags[i].id
        if (flag_id == selected_flag) {
            language_flags[i].style.display = "block"
        } else {
            language_flags[i].style.display = "none"
        }
    }
    let names = document.getElementsByClassName("label-name")
    let longitudes = document.getElementsByClassName("label-longitude")
    let latitudes = document.getElementsByClassName("label-latitude")
    let dates = document.getElementsByClassName("label-date")
    let type = document.getElementsByClassName("label-type")
    let info = document.getElementsByClassName("label-info")
    for (u = 0; u < names.length; u+=1) {
        names[u].textContent = labels["label_name"]
        longitudes[u].textContent = labels["label_longitude"]
        latitudes[u].textContent = labels["label_latitude"]
        dates[u].textContent = labels["label_date"]
        type[u].textContent = labels["type"]
        info[u].textContent = labels["info"]
    }
}
for (i = 0; i < languages.length; i += 1) {
    let id = languages[i].id
    languages[i].addEventListener('click', () => {
        selected_language = language_options[id]
        update_language()
    })
}

// Open the filter menu
let filters = document.getElementById("filters")
let filter_box = document.getElementById("filters-box")
let filter_active = 0

function openCloseFilterMenu() {
    if (filter_active == 0) {
        filter_active = 1
        filter_box.style.display = "flex"
    } else {
        filter_active = 0
        filter_box.style.display = "none"
    }
}

filters.addEventListener('click', () => {
    openCloseFilterMenu()
})

// Search for the points that contains the content of search input in the name
let search = document.getElementById("search-bt")
let search_value = document.getElementById("input-search")
search.addEventListener('click', () => {
    alert(search_value.value)
})

// Change the current function on the map
let show_mouse_position = false
let build_polygon = false

let pointer = document.getElementById("set-pointer")
let polygon = document.getElementById("draw-polygon")

function changeActionBarButton(button) {
    switch (button) {
        case pointer:
            show_mouse_position = true
            build_polygon = false

            pointer.style.filter = "hue-rotate(140deg) brightness(200%)"
            pointer.style.backgroundColor = "#EDE6EF"
            polygon.style.filter = "hue-rotate(0deg) brightness(100%)"
            polygon.style.backgroundColor = "white"
            break
        case polygon:
            show_mouse_position = false
            build_polygon = true

            pointer.style.filter = "hue-rotate(0deg) brightness(100%)"
            pointer.style.backgroundColor = "white"
            polygon.style.filter = "hue-rotate(140deg) brightness(200%)"
            polygon.style.backgroundColor = "#EDE6EF"
            break
        default:
            show_mouse_position = false
            build_polygon = false
            build_line = false

            pointer.style.filter = "hue-rotate(0deg) brightness(100%)"
            pointer.style.backgroundColor = "white"
            polygon.style.filter = "hue-rotate(0deg) brightness(100%)"
            polygon.style.backgroundColor = "white"
            break
    }
}

function changeGeneratorControls() {
    if (build_polygon == true) {
        document.getElementById("point-generator").style.display = "none"
        document.getElementById("line-polygon-generator").style.display = "flex"
    } else {
        document.getElementById("point-generator").style.display = "flex"
        document.getElementById("line-polygon-generator").style.display = "none"
    }
}

pointer.addEventListener('click', () => {
    if (show_mouse_position == false) {
        changeActionBarButton(pointer)
        current_draw_element = ""
        updateListAndMap()
        clearGeneratorInputs()
    } else {
        changeActionBarButton("default")
    }
    changeGeneratorControls()
})

polygon.addEventListener('click', () => {
    if (build_polygon == false) {
        changeActionBarButton(polygon)
        updateListAndMap()
        clearGeneratorInputs()
    } else {
        changeActionBarButton("default")
        current_draw_element = ""
        updateListAndMap()
    }
    changeGeneratorControls()
})


// Add mouse functions to the map

L.CursorHandler = L.Handler.extend({

    addHooks: function () {
        this._marker = new L.marker();
        this._popup = new L.Popup();
        this._map.on('mouseover', this._open, this);
        this._map.on('mousemove', this._update, this);
        this._map.on('mouseout', this._close, this);
        this._map.on('click', this._click, this);
    },

    removeHooks: function () {
        this._map.off('mouseover', this._open, this);
        this._map.off('mousemove', this._update, this);
        this._map.off('mouseout', this._close, this);
        this._map.off('click', this._click, this);
    },

    _open: function (e) {
        if (show_mouse_position == true) {
            this._marker.addTo(layerGroup)
            this._update(e);
        } else if (build_polygon == true) {
            document.getElementsByClassName("leaflet-draw")[0].style.display = "block"
        }
    },

    _close: function () {
        if (show_mouse_position == true) {
            layerGroup.removeLayer(this._marker)
        } else if (build_polygon == true) {
            document.getElementsByClassName("leaflet-draw")[0].style.display = "none"
        }
    },

    _update: function (e) {
        if (show_mouse_position == true) {
            this._marker.setLatLng(e.latlng).bindPopup(this._popup).openPopup()
            this._popup.setContent(e.latlng.toString());
        }
    },

    _click: function (e) {
        this._open(e)
        this._update(e)
        if (show_mouse_position == true) {
            let text = e.latlng.toString()
            let pattern = /[()].*/;
            let result = text.match(pattern)[0].replace(" ", "").replace("(", "").replace(")", "").split(",")
            let latit = result[0]
            let long = result[1]
            latitude_value.value = latit
            longitude_value.value = long
            changeActionBarButton("default")
        }
    }
});

L.Map.addInitHook('addHandler', 'cursor', L.CursorHandler);


// Show error messages
function show_error_message(message) {
    error_div_message = document.createElement('div')
    error_div_message.id = "error"
    error_text = document.createTextNode(message)
    error_div_message.appendChild(error_text)
    document.body.prepend(error_div_message)
    setTimeout(function() {
        document.body.removeChild(error_div_message)
    }, 4000)
}


// Get user current position ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let user_position;

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function getUserPosition() {
    navigator.geolocation.watchPosition((e) => {
        if (getCookie("user_latlgn") == "") {
            createCookie("user_latlgn", [e.coords.latitude, e.coords.longitude], 2)
        }
    }, (e) => {
        show_error_message("Error while tracking your current position, setting map position to default")
        createCookie("user_latlgn", [51.509865, -0.118092], 2)
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
    })
}


// Generate Map
var map;
let marker;

function generateMap() {
    getUserPosition()
    user_position = getCookie("user_latlgn").split(",")
    
    if (user_position === undefined) {
        if (map === undefined) {
            map = L.map('map').setView([-7.11532, -34.861], 12);
            marker = L.marker([-7.11532, -34.861]).addTo(map)
        } else {
            map.remove()
            map = L.map('map').setView([-7.11532, -34.861], 12);
            marker = L.marker([-7.11532, -34.861]).addTo(map)
        }
    } else {
        if (map === undefined) {
            map = L.map('map').setView([-7.11532, -34.861], 12);
            marker = L.marker([-7.11532, -34.861]).addTo(map)
            // map = L.map('map').setView(user_position, 12);
            // marker = L.marker(user_position).addTo(map)
        } else {
            map.remove()
            map = L.map('map').setView([-7.11532, -34.861], 12);
            marker = L.marker([-7.11532, -34.861]).addTo(map)
            // map = L.map('map').setView(user_position, 12);
            // marker = L.marker(user_position).addTo(map)
        }
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker._icon.classList.add("huechange");

    // Creating new lines and polygons
    drawnItems = new L.FeatureGroup();
    map.on('draw:created', function(event){
        var layer = event.layer;
        feature = layer.feature = layer.feature || {};
        feature.type = feature.type || "Feature";
        var props = feature.properties = feature.properties || {};
        let generated_element = JSON.parse(JSON.stringify(layer.toGeoJSON()))
        if (generated_element["geometry"]["type"] == "LineString" || generated_element["geometry"]["type"] == "Polygon"){ 
            current_draw_element = generated_element
            console.log(current_draw_element)
            L.geoJSON(current_draw_element).addTo(layerGroup)
        }
    })

    drawControl = new L.Control.Draw({
        draw: {
            marker: false,
            rectangle: false,
            circle: false,
        },
        edit: {
            featureGroup: drawnItems,
            edit: false,
            remove: false,
        }
    });

    map.addControl(drawControl);

    document.getElementsByClassName("leaflet-draw")[0].style.display = "none"

    map.cursor.enable();
}

generateMap()


// Create line and polygons
let current_draw_element = ""
let lp_add = document.getElementById("lp-add")
let lp_cancel = document.getElementById("lp-add-cancel")
let lp_name = document.getElementById("lp-name")
let lp_date = document.getElementById("lp-date")



function createLine() {
    let csrftoken = getCookie('csrftoken');
    if (lp_name != "" && lp_date != "") {
        current_draw_element["properties"]["date"] = lp_date.value
        current_draw_element["properties"]["name"] = lp_name.value
        current_geo_json_value["features"].push(current_draw_element)
        fetch("create-line/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify(current_draw_element)
        }).then(res => {console.log(res)})
    
        updateListAndMap()
    } else {
        show_error_message("Input a date and a name for the line")
    }
}

function createPolygon() {
    let csrftoken = getCookie('csrftoken');
    if (lp_name.value != "" && lp_date.value != "") {
        current_draw_element["properties"]["date"] = lp_date.value
        current_draw_element["properties"]["name"] = lp_name.value
        current_geo_json_value["features"].push(current_draw_element)
        fetch("create-polygon/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify(current_draw_element)
        }).then(res => {console.log(res)})
        lp_date.value = ""
        lp_name.value = ""
        current_draw_element = ""
        updateListAndMap()
    } else {
        show_error_message("Input a date and a name for the polygon")
    }
}

lp_add.addEventListener('click', () => {
    if (current_draw_element != "") {
        if (current_draw_element["geometry"]["type"] == "LineString") {
            createLine()
        } else {
            createPolygon()
        }
    } else {
        show_error_message("Draw a form in the map first")
    }
})

lp_cancel.addEventListener('click', () => {
    current_draw_element = ""
    lp_date.value = ""
    lp_name.value = ""
    updateListAndMap()
})


// Generate layergroup to append the markers, popups, etc.
let layerGroup = L.layerGroup().addTo(map);


// Update the list and the points in the map
let menu_results = document.getElementById("menu-results")
function addListElementsFunctions() {
    /* add the function to edit and delete for any point in the query list */
    let elements = document.getElementsByClassName("edit-result")
    let delete_element = document.getElementsByClassName("remove-result")
    for (let i = 0; i < delete_element.length; i += 1) {
        let parentID = delete_element[i].parentNode.id.replace("result-", "")
        if (elements[i] != undefined) {
            elements[i].addEventListener('click', () => {
                edit_point(parentID)
            })
        }
        delete_element[i].addEventListener('click', () => {
            delete_feature(parentID)
        })
    }

    let lp_elements = document.getElementsByClassName("edit-result-lp")
    for (let i = 0; i < lp_elements.length; i+= 1) {
        let parentID = lp_elements[i].parentNode.id.replace("result-", "")
        lp_elements[i].addEventListener('click', () => {
            edit_lp(parentID)
        })
    }
}

function updateListAndMap() {
    /* receives the actual GeoJSON data and generate the list and the points in the map*/
    menu_results.innerHTML = ""
    layerGroup.eachLayer((layer) => {
        layerGroup.removeLayer(layer)
    })
    for (i = 0; i < current_geo_json_value["features"].length; i += 1){
        let parentID = current_geo_json_value["features"][i]["properties"]["name"].replace(" ", "")
        if (current_geo_json_value["features"][i]["geometry"]["type"] == "Point") {
            menu_results.innerHTML += `
            <div class="result-box" id="result-${parentID}">
                <div class="result-parameters">
                    <h5 id="record-${parentID}-name">${current_geo_json_value["features"][i]["properties"]["name"]}</h5>
                    <div class="info-box">
                        <h5 id="record-${parentID}-latitude">Lat: ${current_geo_json_value["features"][i]["geometry"]["coordinates"][0]}</h5>
                        <h5 id="record-${parentID}-longitude">Lng: ${current_geo_json_value["features"][i]["geometry"]["coordinates"][1]}</h5>
                        <h5 id="record-${parentID}-date">Date: ${current_geo_json_value["features"][i]["properties"]["date"]}</h5>
                    </div>
                    <h5 id="record-${parentID}-date">${current_geo_json_value["features"][i]["geometry"]["type"]}</h5>
                </div>
                <button class="edit-result">
                    <img class="edit-img-0" src="static/media/edit.png">
                    <img class="edit-img-1" src="static/media/edit-1.png">
                </button>
                <button class="remove-result">X</button>
            </div>
            `
            L.marker(current_geo_json_value["features"][i]["geometry"]["coordinates"]).addTo(layerGroup).bindTooltip(`${current_geo_json_value["features"][i]["properties"]["name"]}`, {permanent: true, opacity: 0.9}).openTooltip();
        } else if (current_geo_json_value["features"][i]["geometry"]["type"] == "LineString") {
            menu_results.innerHTML += `
            <div class="result-box" id="result-${parentID}">
                <div class="result-parameters">
                    <h5 id="record-${parentID}-name">${current_geo_json_value["features"][i]["properties"]["name"]}</h5>
                    <div class="info-box">
                        <h5 id="record-${parentID}-date">Date: ${current_geo_json_value["features"][i]["properties"]["date"]}</h5>
                    </div>
                    <h5 id="record-${parentID}-type">${current_geo_json_value["features"][i]["geometry"]["type"]}</h5>
                </div>
                <button class="edit-result-lp">
                    <img class="edit-img-0" src="static/media/edit.png">
                    <img class="edit-img-1" src="static/media/edit-1.png">
                </button>
                <button class="remove-result">X</button>
            </div>
            `
            L.geoJSON(current_geo_json_value["features"][i]).addTo(layerGroup)
        } else if (current_geo_json_value["features"][i]["geometry"]["type"] == "Polygon") {
            menu_results.innerHTML += `
            <div class="result-box" id="result-${parentID}">
                <div class="result-parameters">
                    <h5 id="record-${parentID}-name">${current_geo_json_value["features"][i]["properties"]["name"]}</h5>
                    <div class="info-box">
                        <h5 id="record-${parentID}-date">Date: ${current_geo_json_value["features"][i]["properties"]["date"]}</h5>
                    </div>
                    <h5 id="record-${parentID}-type">${current_geo_json_value["features"][i]["geometry"]["type"]}</h5>
                </div>
                <button class="edit-result-lp">
                    <img class="edit-img-0" src="static/media/edit.png">
                    <img class="edit-img-1" src="static/media/edit-1.png">
                </button>
                <button class="remove-result">X</button>
            </div>
            `
            L.geoJSON(current_geo_json_value["features"][i]).addTo(layerGroup)
        }
        // localStorage.setItem(current_geo_json_value) /////////////////////////////////////////////////////////////////////////////////////////
    }
    addListElementsFunctions()
}


// Create a new point in the map
let location_value = document.getElementById("location-name")
let latitude_value = document.getElementById("latitude-value")
let longitude_value = document.getElementById("longitude-value")
let date_value = document.getElementById("date-input")

let generator_button = document.getElementById("generator-button")

function createPoint() {
    let csrftoken = getCookie('csrftoken');
    fetch("/create-point/", {
        method: "POST",
        headers: {'Content-Type': 'application/json',
        "X-CSRFToken": csrftoken},
        body: JSON.stringify({
            "name": location_value.value,
            "point": [latitude_value.value, longitude_value.value],
            "date": date_value.value,
        })
    }).then(res => {
        console.log("Request Complete! response: ", res);
    });

    current_geo_json_value["features"].push(
        {
            "type": "Feature",
            "properties": {
                "name": location_value.value,
                "date": date_value.value,
            },
            "geometry": {
                "type": "Point",
                "coordinates": [latitude_value.value, longitude_value.value]
            }
        }
    )

    updateListAndMap()
    location_value.value = ""
    latitude_value.value = ""
    longitude_value.value = ""
    date_value.value = ""
}

generator_button.addEventListener('click', () => {
    if (location_value.value == "" || latitude_value.value == "" || longitude_value.value == "" || date_value.value == "") {
        show_error_message("Erro: valor faltante, preencha todos os campos!")
    }  else if (latitude_value.value > 85 || latitude_value.value < -85 || longitude_value.value > 180 || longitude_value.value < -180) {
        show_error_message("Erro: parâmetros de latitude e longitude não estão no intervalo (-85/+85|-180/+180")
    } else {
        createPoint()
        updateListAndMap()
    }
})


// Delete a point in the map
function delete_feature(parentID) {
    console.log(parentID)
    for (i=0; i < current_geo_json_value["features"].length; i += 1) {
        if (current_geo_json_value["features"][i]["properties"]["name"].replace(" ", "") == parentID) {
            if (current_geo_json_value["features"][i]["geometry"]["type"] == "Point") {
                current_geo_json_value["features"].splice(i, 1)
                let csrftoken = getCookie('csrftoken');
                fetch(`/point-delete/${parentID}`, {
                    method: "DELETE",
                    headers: { "X-CSRFToken": csrftoken },
                }).then(res => {
                    console.log("Request Complete! response: ", res);
                });
            } else if (current_geo_json_value["features"][i]["geometry"]["type"] == "LineString") {
                current_geo_json_value["features"].splice(i, 1)
                let csrftoken = getCookie('csrftoken');
                fetch(`/line-delete/${parentID}`, {
                    method: "DELETE",
                    headers: { "X-CSRFToken": csrftoken },
                }).then(res => {
                    console.log("Request Complete! response: ", res);
                });
            } else if (current_geo_json_value["features"][i]["geometry"]["type"] == "Polygon") {
                current_geo_json_value["features"].splice(i, 1)
                let csrftoken = getCookie('csrftoken');
                fetch(`/polygon-delete/${parentID}`, {
                    method: "DELETE",
                    headers: { "X-CSRFToken": csrftoken },
                }).then(res => {
                    console.log("Request Complete! response: ", res);
                });
            }
        }
    }
    if (edit_element == parentID) {
        clearGeneratorInputs()
        changeGeneratorButtons("create")
    }
    updateListAndMap()
}


// Update a point (name, latitude, longitude or date)
let generator_save_edit = document.getElementById("generator-save-edit")
let generator_cancel = document.getElementById("generator-cancel-edit")
let generator = document.getElementById("generator")

let edit_element = ""

function changeGeneratorButtons(state) {
    if (state == "edit") {
        generator.style.flexDirection = "row"
        generator.style.justifyContent = "center"
        generator.style.alignItems = "center"
        generator_button.style.display = "none"
        generator_save_edit.style.display = "flex"
        generator_cancel.style.display = "block"
    } else if (state == "create") {
        generator.style.flexDirection = "column"
        generator.style.justifyContent = "flex-end"
        generator.style.alignItems = "center"
        generator_button.style.display = "block"
        generator_save_edit.style.display = "none"
        generator_cancel.style.display = "none"
    }
}

function clearGeneratorInputs() {
    location_value.value = ""
    latitude_value.value = ""
    longitude_value.value = ""
    date_value.value = ""
    edit_element = ""
}

function edit_point(parentID) {
    /* Receive the parent ID of the point clicked to edit, change the buttons of the generator to edit mode, set the information
    of the point clicked in the fields of the editor and set the global element being edited to the value of the parent ID*/
    changeGeneratorButtons("edit")
    location_value.value = document.getElementById(`record-${parentID}-name`).innerText
    latitude_value.value = document.getElementById(`record-${parentID}-latitude`).innerText.replace("Lat: ", "")
    longitude_value.value = document.getElementById(`record-${parentID}-longitude`).innerText.replace("Lng: ", "")
    date_value.value = document.getElementById(`record-${parentID}-date`).innerText.replace(":00Z", "").replace("Date: ", "")
    edit_element = parentID
}

function replacePointDetails() {
    /* Receive the current element being edited and update it in the geoJSON, then call the function to update the list and points */
    for (i = 0; i < current_geo_json_value["features"].length; i++) {
        if (current_geo_json_value["features"][i]["properties"]["name"] == edit_element) {
            current_geo_json_value["features"][i]["properties"]["date"] = date_value.value
            current_geo_json_value["features"][i]["geometry"]["coordinates"] = [latitude_value.value, longitude_value.value]
            current_geo_json_value["features"][i]["properties"]["name"] = location_value.value
            let csrftoken = getCookie('csrftoken');
            fetch(`/point-update/${edit_element}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken},
                body: JSON.stringify({
                    "name": location_value.value,
                    "point": [latitude_value, longitude_value],
                    "date": date_value.value,
                })
            }).then(res => {
                console.log("Request Complete! response: ", res);
            });
        }
    }
    updateListAndMap()
}

generator_save_edit.addEventListener('click', () => {
    if (location_value.value == "" || latitude_value.value == "" || longitude_value.value == "" || date_value.value == "") {
        show_error_message("Erro: valor faltante, preencha todos os campos!")
    } else if (latitude_value.value > 85 || latitude_value.value < -85 || longitude_value.value > 180 || longitude_value.value < -180) {
        show_error_message("Erro: parâmetros de latitude e longitude não estão no intervalo (-85/+85|-180/+180")
    } else {
        replacePointDetails()
        changeGeneratorButtons("create")
        clearGeneratorInputs()
    }
})

// Update LineString and Polygons (name, date)
let lp_save_edit = document.getElementById("lp-save")
let lp_cancel_edit = document.getElementById("lp-cancel")

function replaceLPDetails() {
    for (i = 0; i < current_geo_json_value["features"].length; i++) {
        if (current_geo_json_value["features"][i]["properties"]["name"] == current_draw_element["properties"]["name"]) {
            current_geo_json_value["features"][i]["properties"]["date"] = lp_date.value
            current_geo_json_value["features"][i]["geometry"]["coordinates"] = current_draw_element["geometry"]["coordinates"]
            current_geo_json_value["features"][i]["properties"]["name"] = lp_name.value
            let csrftoken = getCookie('csrftoken');
            let fetch_url = ""
            if (current_draw_element["geometry"]["type"] == "Polygon") {
                fetch_url = "polygon-update"
            } else {
                fetch_url = "line-update"
            }
            fetch(`/${fetch_url}/${current_draw_element["properties"]["name"]}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken},
                body: JSON.stringify({
                    "type": "Feature",
                    "properties": {
                        "date": lp_date.value,
                        "name": lp_name.value,
                    },
                    "geometry": {
                        "type": current_draw_element["geometry"]["type"],
                        "coordinates": current_draw_element["geometry"]["coordinates"],
                    }
                })
            }).then(res => {
                console.log("Request Complete! response: ", res);
            });
        }
    }
    updateListAndMap()
}

lp_save_edit.addEventListener("click", () => {
    replaceLPDetails()
    lp_name.value = ""
    lp_date.value = ""
})

lp_cancel_edit.addEventListener('click', () => {
    lp_add.style.display = "block"
    lp_cancel.style.display = "block"
    lp_save_edit.style.display = "none"
    lp_cancel_edit.style.display = "none"
    build_polygon = false
    changeActionBarButton("default")
    changeGeneratorControls()
    lp_name.value = ""
    lp_date.value = ""
})

function edit_lp(parentID) {
    build_polygon = true
    changeActionBarButton(polygon)
    changeGeneratorControls()
    lp_add.style.display = "none"
    lp_cancel.style.display = "none"
    lp_save_edit.style.display = "block"
    lp_cancel_edit.style.display = "block"
    lp_name.value = document.getElementById(`record-${parentID}-name`).innerText
    lp_date.value = document.getElementById(`record-${parentID}-date`).innerText.replace(":00Z", "").replace("Date: ", "")
    lp_type = document.getElementById(`record-${parentID}-type`).value
    let coordinates = ""
    for (i = 0; i < current_geo_json_value["features"].length; i++) {
        if (current_geo_json_value["features"][i]["properties"]["name"].replace(" ", "") == parentID) {
            coordinates = current_geo_json_value["features"][i]["geometry"]["coordinates"]
        }
    }
    current_draw_element = {
        "type": "Feature",
        "properties": {
            "date": lp_date.value,
            "name": lp_name.value
        },
        "geometry": {
            "type": lp_type,
            "coordinates": coordinates,
        }
    }
}

function formatCoordinates(coordinates) {
    let pattern = /[()].*/
    let formated_string = coordinates.match(pattern)[0]

    let result = []

    if (formated_string[0] == "(" && formated_string[1] == "(") {
        let formated_array = formated_string.slice(2, -2).split(", ")
        let myarray = []
        for (element in formated_array) {
            myarray.push(formated_array[element].split(" "))
        }
        for (element in myarray){
            result.push([parseFloat(myarray[element][0]), parseFloat(myarray[element][1])])
        }
    } else {
        let formated_array = formated_string.slice(1, -1).split(", ")
        let myarray = []
        for (element in formated_array) {
            myarray.push(formated_array[element].split(" "))
        }
        for (element in myarray){
            result.push([parseFloat(myarray[element][0]), parseFloat(myarray[element][1])])
        }
    }

    return result
}


// Get Search list
function getList() {
    current_geo_json_value["features"] = []
    updateListAndMap()
    filter_date_select = document.getElementById("filter-by-date")
    if (filter_date_select.options[filter_date_select.selectedIndex].text == "Default") {
        filter_date = ""
    } else if (filter_date_select.options[filter_date_select.selectedIndex].text == "New first") {
        filter_date = "newfirst"
    } else {
        filter_date = "oldfirst"
    }
    if (filter_point.checked == true) {
        fetch(`list-points/${filter_date}`, {
            method: "GET"
        })
            .then((resp) => {return resp.json()})
            .then(function(data) {
                for (i=0; i < data.length; i += 1) {
                    let pattern = /[()].*/;
                    let result = data[i]["point"].match(pattern)[0].replace("(", "").replace(")", "").split(" ")
                    current_geo_json_value["features"].push(
                        {
                            "type": "Feature",
                            "properties": {
                                "name": data[i]["name"],
                                "date": data[i]["date"],
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [result[1], result[0]]
                            }
                        }
                    )
                }
                updateListAndMap()
            })
    }
    if (filter_line.checked == true) {
        fetch(`list-lines/${filter_date}`, {
            method: "GET"
        })
            .then((resp) => {return resp.json()})
            .then(function(data) {
                for (i=0; i < data.length; i += 1) {
                    current_geo_json_value["features"].push(
                        {
                            "type": "Feature",
                            "properties": {
                                "name": data[i]["name"],
                                "date": data[i]["date"],
                            },
                            "geometry": {
                                "type": "LineString",
                                "coordinates": formatCoordinates(data[i]["points"])
                            }
                        }
                    )
                }
                updateListAndMap()
            })
    }
    if (filter_polygon.checked == true) {
        fetch(`list-polygons/${filter_date}`, {
            method: "GET"
        })
            .then((resp) => {return resp.json()})
            .then(function(data) {
                for (i=0; i < data.length; i += 1) {
                    current_geo_json_value["features"].push(
                        {
                            "type": "Feature",
                            "properties": {
                                "name": data[i]["name"],
                                "date": data[i]["date"],
                            },
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": [formatCoordinates(data[i]["polygon"])]
                            }
                        }
                    )
                }
                updateListAndMap()
            })
    }
}

let apply_button = document.getElementById("apply-filters")
let filter_point = document.getElementById("filter-points")
let filter_line = document.getElementById("filter-lines")
let filter_polygon = document.getElementById("filter-polygons")

apply_button.addEventListener('click', () => {
    getList()
    openCloseFilterMenu()
})

getList()