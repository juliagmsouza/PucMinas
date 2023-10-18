const API_KEY = 'c2ec1a65900c0c1778e092fd95ec6a76';
const API_GEOCODING_KEY = 'L4ed4GA8cwBlpmXkPtcyog==QNL1hNoNOWUdG2Im';
async function main() {

    const lat = -20.398970;
    const lon = -43.511945;
    const unit = 'metric';
    const lang = 'pt_br';
    let key = '';

    var getLocationKey = new XMLHttpRequest();
    getLocationKey.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&unit=${unit}&lang=${lang}`, true);


    getLocationKey.onload = function () {
        if (getLocationKey.status >= 200 && getLocationKey.status < 300) {
            console.log('requisição de localização bem sucedida: ', JSON.parse(getLocationKey.responseText));
        }
        else {
            console.log('Falha na requisição de localização:', getLocationKey.status);
        }
    };

    getLocationKey.onerror = function () {
        console.log('Erro de rede.');
    };

    // getLocationKey.send();

    const apiResponse = {
        "coord": {
            "lon": -43.5119,
            "lat": -20.399
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "nublado",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 294.79,
            "feels_like": 295.12,
            "temp_min": 294.79,
            "temp_max": 294.79,
            "pressure": 1013,
            "humidity": 81,
            "sea_level": 1013,
            "grnd_level": 884
        },
        "visibility": 10000,
        "wind": {
            "speed": 1.12,
            "deg": 242,
            "gust": 2.9
        },
        "clouds": {
            "all": 99
        },
        "dt": 1697223193,
        "sys": {
            "country": "BR",
            "sunrise": 1697185505,
            "sunset": 1697230518
        },
        "timezone": -10800,
        "id": 3455671,
        "name": "Ouro Preto",
        "cod": 200
    }
}

class Model {
    constructor() {
        this.response = {};
    }
    
    getCurrentLocation() {
if ("geolocation" in navigator) {
  // Geolocalização está disponível no navegador
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);
  }, function(error) {
    // Tratamento de erros
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("Permissão para geolocalização foi negada.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Informações de localização não estão disponíveis.");
        break;
      case error.TIMEOUT:
        console.log("Tempo limite da solicitação de localização expirado.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("Ocorreu um erro desconhecido.");
        break;
    }
  });
} else {
  console.log("Geolocalização não está disponível no navegador.");
}
        console.log('lat: ', lat)
        console.log('long: ', long)
    }
}

class Controller {
    constructor(model, view) {
        this.model = model; // Recebe o modelo
        // this.view = view; 
        console.log(view)
        }
    // Método de inicialização
    init() {
        this.model.getCurrentLocation();
        // this.view.render();
    }
}

main();

const model = new Model();
const controller = new Controller(model);

controller.init(); // Inicializa o controlador e a aplicação

/*
TODO: Integrar com API's
TODO: Implementar corretamente blur
*/