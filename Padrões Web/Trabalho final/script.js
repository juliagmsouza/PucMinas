const API_KEY = 'c2ec1a65900c0c1778e092fd95ec6a76';
const API_GEOCODING_KEY = 'L4ed4GA8cwBlpmXkPtcyog==QNL1hNoNOWUdG2Im';
async function main() {

    const lat = -20.398970;
    const lon = -43.511945;
    const unit = 'metric';
    const lang = 'pt_br';
    let key = '';

    var getLocationKey = new XMLHttpRequest();
    getLocationKey.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&unit=${unit}&lang=${lang}`,true);

    
        getLocationKey.onload = function() { 
            if(getLocationKey.status >= 200 && getLocationKey.status < 300) {
                console.log('requisição de localização bem sucedida: ', JSON.parse(getLocationKey.responseText));
            }
            else {
                console.log('Falha na requisição de localização:', getLocationKey.status);
            }
        };
    
        getLocationKey.onerror = function() { 
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

main();

/*
TODO: Descer barra de pesquisa e opções para alinhar com card
TODO: Colocar borda na barra de pesquisa e nas opções
TODO: Integrar com API's
TODO: Implementar corretamente blur
*/