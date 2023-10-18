const API_KEY = '0a3c071a951d00dc0e048cf9f9f146a7';
const API_GEOCODING_KEY = 'L4ed4GA8cwBlpmXkPtcyog==QNL1hNoNOWUdG2Im';

class Model {
    constructor() {
        this.response = {};
        this.searchResponse = [];
        this.lat = '';
        this.long = '';
    };

    async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                const self = this;
                // Geolocalização está disponível no navegador
                navigator.geolocation.getCurrentPosition(async function (position) {
                    self.lat = position.coords.latitude;
                    self.long = position.coords.longitude;

                    await self.getCurrentWeather(self.lat, self.long);
                    resolve();
                }, function (error) {
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
                    reject("Ocorreu um erro desconhecido.");
                });
            } else {
                reject("Geolocalização não está disponível no navegador.");
            }
        });
    };

    async getCurrentWeather(lat, long) {

        return new Promise((resolve, reject) => {
            const unit = 'metric';
            const lang = 'pt_br';

            var getLocationKey = new XMLHttpRequest();
            getLocationKey.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${unit}&lang=${lang}`, true);

            const self = this;
            getLocationKey.onload = function () {
                if (getLocationKey.status >= 200 && getLocationKey.status < 300) {
                    self.response = JSON.parse(getLocationKey.responseText);
                    resolve();
                }
                else {
                    reject('Falha na requisição de localização:', getLocationKey.status);
                }
            };

            getLocationKey.onerror = function () {
                reject('Erro de rede.');
            };
            this.response =
            {
                "coord": {
                    "lon": -43.512,
                    "lat": -20.3891
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "nublado",
                        "icon": "04n"
                    }
                ],
                "base": "stations",
                "main": {
                    "temp": 20.4,
                    "feels_like": 20.53,
                    "temp_min": 20.4,
                    "temp_max": 20.4,
                    "pressure": 1017,
                    "humidity": 78,
                    "sea_level": 1017,
                    "grnd_level": 895
                },
                "visibility": 10000,
                "wind": {
                    "speed": 0.88,
                    "deg": 112,
                    "gust": 1.26
                },
                "clouds": {
                    "all": 85
                },
                "dt": 1697586838,
                "sys": {
                    "country": "BR",
                    "sunrise": 1697530915,
                    "sunset": 1697576200
                },
                "timezone": -10800,
                "id": 3455671,
                "name": "Ouro Preto",
                "cod": 200
            }
            // resolve();
            getLocationKey.send();
        });
    };

    async getLocationBySearch(search) {

        return new Promise((resolve, reject) => {

            var getLocationBySearchKey = new XMLHttpRequest();
            getLocationBySearchKey.open('GET', `https://api.api-ninjas.com/v1/geocoding?city=${search}`, true);
            getLocationBySearchKey.setRequestHeader('X-Api-Key', API_GEOCODING_KEY);

            const self = this;
            getLocationBySearchKey.onload = function () {
                if (getLocationBySearchKey.status >= 200 && getLocationBySearchKey.status < 300) {
                    self.searchResponse = JSON.parse(getLocationBySearchKey.responseText);
                    resolve();
                }
                else {
                    reject('Falha na requisição de localização:', getLocationBySearchKey.status);
                }
            };

            getLocationBySearchKey.onerror = function () {
                reject('Erro de rede.');
            };
            this.searchResponse = [
                {
                    "name": "London",
                    "latitude": 51.5073219,
                    "longitude": -0.1276474,
                    "country": "GB",
                    "state": "England"
                },
                {
                    "name": "City of London",
                    "latitude": 51.5156177,
                    "longitude": -0.0919983,
                    "country": "GB",
                    "state": "England"
                },
                {
                    "name": "London",
                    "latitude": 42.9832406,
                    "longitude": -81.243372,
                    "country": "CA",
                    "state": "Ontario"
                },
                {
                    "name": "Chelsea",
                    "latitude": 51.4875167,
                    "longitude": -0.1687007,
                    "country": "GB",
                    "state": "England"
                },
                {
                    "name": "London",
                    "latitude": 37.1289771,
                    "longitude": -84.0832646,
                    "country": "US",
                    "state": "Kentucky"
                }
            ]
            // resolve();
            getLocationBySearchKey.send();
        });
    };
}

class View {
    constructor() {
        this.temp = document.getElementById('temp');
        this.date = document.getElementById('date');
        this.location = document.getElementById('location');
        this.mainCondition = document.getElementById('main-condition');
        this.outterSpace = document.getElementById('outter-space');
        this.card = document.getElementById('card');
        this.innerClouds = document.querySelectorAll('.clouds');
        this.outterClouds = document.querySelectorAll('.clouds2');
        this.sun = document.getElementById('sun');
        this.details = document.getElementById('details');
        this.fallingItems = document.getElementById('falling-items');
        this.thunderbolt = document.getElementById('thunderbolt');
        this.searchButton = document.getElementById('search-button');
        this.inputSearch = document.getElementById('input-search');
        this.citySearch = document.getElementById('city-search');
        this.citySearchResults = document.getElementById('city-search-results');
        this.controller = null;
    };

    formatDate() {
        const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        const hoje = new Date();
        const diaDaSemana = diasDaSemana[hoje.getDay()];
        const diaDoMes = hoje.getDate();
        const mes = meses[hoje.getMonth()];

        return `${diaDaSemana}, ${diaDoMes} de ${mes}`;
    };

    capitalizarPrimeiraLetra(palavra) {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    };

    setController(controller) {
        this.controller = controller;
    };

    weatherIdsMapper(id) {
        if (id >= 200 && id <= 232) {
            return 'stormy';
        }
        if (id >= 300 && id <= 531) {
            return 'rainy';
        }
        if (id >= 600 && id <= 622) {
            return 'snowy';
        }
        if (id === 800) {
            return 'sunny';
        }
        if (id >= 701 && id <= 804) {
            return 'cloudy';
        }
    };

    removeCloudsClass() {
        const cloudClasses = [
            'rainy-dark-cloud',
            'rainy-light-cloud',
            'stormy-light-cloud',
            'stormy-dark-cloud',
            'snowy-light-cloud',
            'snowy-dark-cloud',
            'cloudy-light-cloud',
            'cloudy-dark-cloud',
        ];
        this.innerClouds.forEach(a => {
            cloudClasses.forEach(b => {
                a.classList.remove(b);
            });
        });
        this.outterClouds.forEach(a => {
            cloudClasses.forEach(b => {
                a.classList.remove(b);
            });
        });
    };

    disableEffects() {
        this.sun.style.display = 'none';
        const sunRays = this.sun.querySelectorAll('.sun-ray');
        sunRays.forEach(a => {
            a.style.display = 'none';
        });
    };

    setWeather(weather) {
        this.outterSpace.removeAttribute('class');
        this.outterSpace.classList.add('outter-space', `outter-space-${weather}`);
        this.card.removeAttribute('class');
        this.card.classList.add(`${weather}-weather`);
        this.removeCloudsClass();
        this.details.removeAttribute('class');
        this.details.classList.add('details');
        this.fallingItems.style.display = 'none';
        this.thunderbolt.removeAttribute('class');
        this.thunderbolt.style.display = 'none';

        if (weather !== 'sunny') {
            console.log('antes de sunny')
            this.innerClouds.forEach(a => {
                a.style.display = 'block';
                a.classList.add(`${weather}-light-cloud`);
            })
            this.outterClouds.forEach(a => {
                a.style.display = 'block';
                a.classList.add(`${weather}-dark-cloud`);
            })
        } else {
            this.innerClouds.forEach(a => {
                a.style.display = 'none';
            })
            this.outterClouds.forEach(a => {
                a.style.display = 'none';
            })
        }
        this.disableEffects();

        if (weather === 'cloudy') {
            this.sun.style.display = 'block';
            const child = this.sun.querySelector('.sun');
            child.classList.add('sun-cloudy');
        }
        if (weather === 'sunny') {
            this.details.classList.add('sunny-text');
            this.sun.style.display = 'block';
            const child = this.sun.querySelector('.sun');
            child.classList.remove('sun-cloudy');
            const sunRays = this.sun.querySelectorAll('.sun-ray');
            sunRays.forEach(a => {
                a.style.display = 'block';
            })
        }
        if (weather === 'snowy') {
            this.fallingItems.style.display = 'block';
            this.fallingItems.removeAttribute('class');
            this.fallingItems.classList.add('snow');
        }
        if (weather === 'rainy') {
            this.fallingItems.style.display = 'block';
            this.fallingItems.removeAttribute('class');
            this.fallingItems.classList.add('rain');
        }
        if (weather === 'stormy') {
            this.details.classList.add('stormy-text');
            this.fallingItems.style.display = 'block';
            this.fallingItems.removeAttribute('class');
            this.fallingItems.classList.add('storm');
            this.thunderbolt.style.display = 'block';
            this.thunderbolt.classList.add('thunderbolt');
            this.card.classList.add('shake-animation');
        }
    };

    renderSearchResults() {
        this.citySearch.style.display = 'block';
        let searchResults = '';
        this.citySearchResults.innerHTML = '';
        this.controller.model.searchResponse.forEach((a, index) => {
            searchResults += ` <div id="result-${index}" class="row w-120 pl-3 pt-2 city-list"><span class="mb-2">📍<strong class="ml-1">
            ${a.name}</strong> <span class="ml-1">- ${a.state}, ${a.country}</span></span></div>`
        });
        this.citySearchResults.innerHTML = searchResults;
        const self = this;
        for(let i = 0; i < this.controller.model.searchResponse.length; i++) {
            const element = document.getElementById(`result-${i}`);
            element.addEventListener('click', () => {
                self.controller.showWeatherConditionBySearch(i);
                this.citySearch.style.display = 'none';
            });
        };
    };

    render() {
        const currentWeather = this.weatherIdsMapper(this.controller.model.response.weather[0].id);
        this.temp.innerHTML = `${this.controller.model.response.main.temp.toString().split('.')[0]}<span class="celsius">c</span>`;
        this.date.textContent = this.formatDate();
        this.mainCondition.innerHTML = `<strong>${this.capitalizarPrimeiraLetra(this.controller.model.response.weather[0].description)}</strong>`;
        this.location.textContent = `${this.controller.model.response.name}, ${this.controller.model.response.sys.country}`;
        const self = this;
        this.searchButton.addEventListener('click', () => {
            self.controller.search(self.inputSearch.value);
        });
        this.setWeather(currentWeather);
    };
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    };

    async search(param) {
        await this.model.getLocationBySearch(param);
        this.view.renderSearchResults();
    };

    async showWeatherConditionBySearch(index) {
        const chosenLocation = this.model.searchResponse[index];
        await this.model.getCurrentWeather(chosenLocation.latitude, chosenLocation.longitude);
        this.view.render();
    };

    async init() {
        await this.model.getCurrentLocation();
        this.view.render();
    };
}


const model = new Model();
const view = new View();
const controller = new Controller(model, view);
view.setController(controller);

controller.init();

/*
TODO: integrar barra de pesquisa e botão de search
TODO: Criar botões e integrar
TODO: Criar loader para card
*/

