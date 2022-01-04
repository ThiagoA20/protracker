function show_error_message(message) {
    error_div_message = message
    alert(error_div_message)
}

var marker;

let show_mouse_position = false
let build_polygon = false
let build_line = false
let delete_feature = false

let pointer = document.getElementById("set-pointer")
let polygon = document.getElementById("draw-polygon")
let line = document.getElementById("draw-line")
let delfeature = document.getElementById("delete-feature")

let current_geo_json_value = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Your Position",
                "date": "2022-01-26T17:19:00Z"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-7.11532, -34.861]
            }
        }
    ]
}

function changeActionBarButton(button) {
    switch (button) {
        case pointer:
            show_mouse_position = true
            build_polygon = false
            build_line = false
            delete_feature = false

            pointer.style.filter = "hue-rotate(140deg) brightness(200%)"
            pointer.style.backgroundColor = "#EDE6EF"
            line.style.filter = "hue-rotate(0deg) brightness(100%)"
            line.style.backgroundColor = "white"
            polygon.style.filter = "hue-rotate(0deg) brightness(100%)"
            polygon.style.backgroundColor = "white"
            delfeature.style.filter = "hue-rotate(0deg) brightness(100%)"
            delfeature.style.backgroundColor = "white"
            break
        case polygon:
            show_mouse_position = false
            build_polygon = true
            build_line = false
            delete_feature = false

            polygon.style.filter = "hue-rotate(140deg) brightness(200%)"
            polygon.style.backgroundColor = "#EDE6EF"
            line.style.filter = "hue-rotate(0deg) brightness(100%)"
            line.style.backgroundColor = "white"
            pointer.style.filter = "hue-rotate(0deg) brightness(100%)"
            pointer.style.backgroundColor = "white"
            delfeature.style.filter = "hue-rotate(0deg) brightness(100%)"
            delfeature.style.backgroundColor = "white"
            break
        case line:
            show_mouse_position = false
            build_polygon = false
            build_line = true
            delete_feature = false

            line.style.filter = "hue-rotate(140deg) brightness(200%)"
            line.style.backgroundColor = "#EDE6EF"
            polygon.style.filter = "hue-rotate(0deg) brightness(100%)"
            polygon.style.backgroundColor = "white"
            pointer.style.filter = "hue-rotate(0deg) brightness(100%)"
            pointer.style.backgroundColor = "white"
            delfeature.style.filter = "hue-rotate(0deg) brightness(100%)"
            delfeature.style.backgroundColor = "white"
            break
        case delfeature:
            show_mouse_position = false
            build_polygon = false
            build_line = false
            delete_feature = true

            delfeature.style.filter = "hue-rotate(140deg) brightness(200%)"
            delfeature.style.backgroundColor = "#EDE6EF"
            line.style.filter = "hue-rotate(0deg) brightness(100%)"
            line.style.backgroundColor = "white"
            pointer.style.filter = "hue-rotate(0deg) brightness(100%)"
            pointer.style.backgroundColor = "white"
            polygon.style.filter = "hue-rotate(0deg) brightness(100%)"
            polygon.style.backgroundColor = "white"
            break
        default:
            show_mouse_position = false
            build_polygon = false
            build_line = false
            delete_feature = false

            pointer.style.filter = "hue-rotate(0deg) brightness(100%)"
            pointer.style.backgroundColor = "white"
            polygon.style.filter = "hue-rotate(0deg) brightness(100%)"
            polygon.style.backgroundColor = "white"
            line.style.filter = "hue-rotate(0deg) brightness(100%)"
            line.style.backgroundColor = "white"
            delfeature.style.filter = "hue-rotate(0deg) brightness(100%)"
            delfeature.style.backgroundColor = "white"
            break
    }
}

pointer.addEventListener('click', () => {
    if (show_mouse_position == false) {
        changeActionBarButton(pointer)
    } else {
        changeActionBarButton("default")
    }
})

polygon.addEventListener('click', () => {
    if (build_polygon == false) {
        changeActionBarButton(polygon)
    } else {
        changeActionBarButton("default")
    }
})

line.addEventListener('click', () => {
    if (build_line == false) {
        changeActionBarButton(line)
    } else {
        changeActionBarButton("default")
    }
})

delfeature.addEventListener('click', () => {
    if (delete_feature == false) {
        changeActionBarButton(delfeature)
    } else {
        changeActionBarButton("default")
    }
})


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
            this._marker.addTo(this._map)
            this._update(e);
        }
    },

    _close: function () {
        if (show_mouse_position == true) {
            this._marker.unbindPopup();
            this._map.removeLayer(this._marker)
            marker.openPopup()
        }
    },

    _update: function (e) {
        if (show_mouse_position == true) {
            this._marker.setLatLng(e.latlng).bindPopup(this._popup).openPopup()
            this._popup.setContent(e.latlng.toString());
        } else {}
    },

    _click: function (e) {
        this._open(e)
        this._update(e)
        let text = e.latlng.toString()
        let pattern = /[()].*/;
        let result = text.match(pattern)[0].replace(" ", "").replace("(", "").replace(")", "").split(",")
        let latit = result[0]
        let long = result[1]
        if (show_mouse_position == true) {
            latitude_value.value = latit
            longitude_value.value = long
            changeActionBarButton("default")
        }
    }
});

L.Map.addInitHook('addHandler', 'cursor', L.CursorHandler);

var map;

function success() {
    // console.log(pos.coords.latitude, pos.coords.longitude)
    if (map === undefined) {
        map = L.map('map').setView([-7.11532, -34.861], 12);
    } else {
        map.remove()
        map = L.map('map').setView([-7.11532, -34.861], 12);
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = L.marker([-7.11532, -34.861]).addTo(map).bindPopup(`-7.11532, -34.861`)
    marker.openPopup()

    marker._icon.classList.add("huechange");
    map.cursor.enable();
}

function error(err) {
    console.log(err)
}

// var watchID = navigator.geolocation.watchPosition(success, error, {
//     enableHighAccuracy: true,
//     timeout: 5000,
// })

success()

// .bindPopup('You')
// .openPopup();

let language = document.getElementById("language-container")
let language_selector = document.getElementById("language-selector")
let lang = 0

language.addEventListener('click', () => {
    if (lang == 0) {
        lang = 1
        language_selector.style.display = "flex"
    } else {
        lang = 0
        language_selector.style.display = "none"
    }
})

let languages = document.getElementsByClassName("language-button")

let language_options = {"select-russian": "russian", "select-english": "english", "select-portuguese": "portuguese", "select-spanish": "spanish"}
let change_language = {
    "english":{"label_name": "Name", "label_latitude": "Latitude", "label_longitude": "Longitude", "label_date": "Date"},
    "portuguese":{"label_name": "Nome", "label_latitude": "Latitude", "label_longitude": "Longitude", "label_date": "Data"},
    "russian":{"label_name": "Имя", "label_latitude": "Широта", "label_longitude": "Долгота", "label_date": "Дата"},
    "spanish":{"label_name": "Nombre", "label_latitude": "Latitud", "label_longitude": "Longitud", "label_date": "Fecha"},
}

let selected_language = "english"

let language_flags = document.getElementsByClassName("flag")

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
    for (u = 0; u < names.length; u+=1) {
        names[u].textContent = labels["label_name"]
        longitudes[u].textContent = labels["label_longitude"]
        latitudes[u].textContent = labels["label_latitude"]
        dates[u].textContent = labels["label_date"]
    }
}

for (i = 0; i < languages.length; i += 1) {
    let id = languages[i].id
    languages[i].addEventListener('click', () => {
        selected_language = language_options[id]
        update_language()
    })
}


let location_value = document.getElementById("location-name")
let latitude_value = document.getElementById("latitude-value")
let longitude_value = document.getElementById("longitude-value")
let date_value = document.getElementById("date-input")

let add_record = document.getElementById("generator-button")
let menu_results = document.getElementById("menu-results")
let error_div_message = ""
let records = 0

let generator_button = document.getElementById("generator-button")
let generator_edit = document.getElementById("generator-save-edit")
let generator_cancel = document.getElementById("generator-cancel-edit")

let edit_element = ""

generator_cancel.addEventListener('click', () => {
    generator.style.flexDirection = "column"
    generator.style.justifyContent = "flex-end"
    generator.style.alignItems = "center"
    generator_button.style.display = "block"
    generator_edit.style.display = "none"
    generator_cancel.style.display = "none"
    location_value.value = ""
    latitude_value.value = ""
    longitude_value.value = ""
    date_value.value = ""
})

generator_edit.addEventListener('click', () => {
    if (location_value.value == "" || latitude_value.value == "" || longitude_value.value == "" || date_value.value == "") {
        show_error_message("Ta errado véi")
    } else {
        generator.style.flexDirection = "column"
        generator.style.justifyContent = "flex-end"
        generator.style.alignItems = "center"
        generator_button.style.display = "block"
        generator_edit.style.display = "none"
        generator_cancel.style.display = "none"
        document.getElementById(`result-${edit_element}`).id = `result-${location_value.value}`
        let name = document.getElementById(`record-${edit_element}-name`)
        name.innerText = location_value.value
        name.id = `record-${location_value.value}-name`
        let latitude = document.getElementById(`record-${edit_element}-latitude`)
        latitude.innerText = latitude_value.value
        latitude.id = `record-${location_value.value}-latitude`
        let longitude = document.getElementById(`record-${edit_element}-longitude`)
        longitude.innerText = longitude_value.value
        longitude.id = `record-${location_value.value}-longitude`
        let date = document.getElementById(`record-${edit_element}-date`)
        date.innerText = date_value.value
        date.id = `record-${location_value.value}-date`
        location_value.value = ""
        latitude_value.value = ""
        longitude_value.value = ""
        date_value.value = ""
        update_records()
    }
})

function edit_record(record_id) {
    let generator = document.getElementById("generator")
    generator.style.flexDirection = "row"
    generator.style.justifyContent = "center"
    generator.style.alignItems = "center"
    generator_button.style.display = "none"
    generator_edit.style.display = "flex"
    generator_cancel.style.display = "block"
    location_value.value = document.getElementById(`record-${record_id}-name`).innerText
    latitude_value.value = document.getElementById(`record-${record_id}-latitude`).innerText
    longitude_value.value = document.getElementById(`record-${record_id}-longitude`).innerText
    date_value.value = document.getElementById(`record-${record_id}-date`).innerText
    edit_element = record_id
}

function delete_record(record_id) {
    let element_removed = document.getElementById(`result-${record_id}`)
    element_removed.remove()
}

function update_records() {
    let elements = document.getElementsByClassName("edit-result")
    let delete_element = document.getElementsByClassName("remove-result")
    for (let i = 0; i < elements.length; i += 1) {
        let parentID = elements[i].parentNode.id.replace("result-", "")
        elements[i].addEventListener('click', () => {
            edit_record(parentID)
        })
        delete_element[i].addEventListener('click', () => {
            delete_record(parentID)
        })
    }
}

function create_record() {
    error_div_message = ""
    let parent_id = location_value.value.replace(" ", "")
    menu_results.innerHTML += `
        <div class="result-box" id="result-${parent_id}">
            <div class="result-parameters">
                <h5 id="record-${parent_id}-name">${location_value.value}</h5>
                <h5 id="record-${parent_id}-latitude">${latitude_value.value}</h5>
                <h5 id="record-${parent_id}-longitude">${longitude_value.value}</h5>
                <h5 id="record-${parent_id}-date">${date_value.value}</h5>
            </div>
            <button class="edit-result">
                <img class="edit-img-0" src="static/media/edit.png">
                <img class="edit-img-1" src="static/media/edit-1.png">
            </button>
            <button class="remove-result">X</button>
        </div>
    `
    fetch("/new-locality/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "name": location_value.value,
            "latitude": latitude_value.value,
            "longitude": longitude_value.value,
            "date": date_value.value,
        })
    }).then(res => {
        console.log("Request Complete! response: ", res);
    });
    var new_marker = L.marker([latitude_value.value, longitude_value.value]).addTo(map).bindTooltip(`${location_value.value}`, {permanent: true, opacity: 0.9}).openTooltip();
    location_value.value = ""
    latitude_value.value = ""
    longitude_value.value = ""
    date_value.value = ""
}

add_record.addEventListener('click', () => {
    if (location_value.value == "" || latitude_value.value == "" || longitude_value.value == "" || date_value.value == "") {
        show_error_message("Ta errado mano >:(")
    } else {
        records += 1
        create_record()
        update_records()
    }
})

let filters = document.getElementById("filters")
let filter_box = document.getElementById("filters-box")
let filter_active = 0

filters.addEventListener('click', () => {
    if (filter_active == 0) {
        filter_active = 1
        filter_box.style.display = "flex"
    } else {
        filter_active = 0
        filter_box.style.display = "none"
    }
})

let search = document.getElementById("search-bt")
let search_value = document.getElementById("input-search")

search.addEventListener('click', () => {
    alert(search_value.value)
})