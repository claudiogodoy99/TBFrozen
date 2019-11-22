var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function ($) {
    $(function () {
        //#region Configurações Globais
        /* Ativando as tooltips e popovers */
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
        /* Iniciando a modal de carregamento */
        $('#loading-modal').modal();
        initMap()
            .then(function () { return $('#loading-modal').modal('hide'); }, function () {
            $('#loading-modal').modal('hide');
            $('#error-modal').modal();
        });
        //#endregion
        //#region Trip Map
        function initMap() {
            return __awaiter(this, void 0, void 0, function () {
                var def, origin_1, destination, locations, pointA, pointB, myOptions, map, 
                // Instantiate a directions service.
                directionsService, directionsDisplay, markerA, markerB, resp, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            def = $.Deferred();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            origin_1 = 'Rua Coronel Querubin Franco, 111 - Jardim Bebedouro, Guarulhos - SP';
                            destination = 'Rua Benedito Passos, 184 - Vila Matilde, São Paulo - SP';
                            return [4 /*yield*/, getLatsAndLongs(encodeURI(origin_1), encodeURI(destination))];
                        case 2:
                            locations = _a.sent();
                            pointA = new google.maps.LatLng(locations.start.lat, locations.start.lng), pointB = new google.maps.LatLng(locations.end.lat, locations.end.lng), myOptions = {
                                zoom: 7,
                                center: pointA
                            }, map = new google.maps.Map(document.getElementById('map-canvas'), myOptions), directionsService = new google.maps.DirectionsService, directionsDisplay = new google.maps.DirectionsRenderer({
                                map: map
                            }), markerA = new google.maps.Marker({
                                position: pointA,
                                animation: google.maps.Animation.BOUNCE,
                                map: map
                            }), markerB = new google.maps.Marker({
                                position: pointB,
                                animation: google.maps.Animation.BOUNCE,
                                map: map
                            });
                            return [4 /*yield*/, calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, locations)];
                        case 3:
                            resp = _a.sent();
                            if (resp) {
                                buildRouteSteps(locations.steps);
                                def.resolve();
                            }
                            else {
                                def.reject();
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            def.reject(e_1);
                            console.error(e_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, def.promise()];
                    }
                });
            });
        }
        function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, locationsObject) {
            var def = $.Deferred();
            directionsService.route({
                origin: pointA,
                destination: pointB,
                travelMode: google.maps.TravelMode.DRIVING
            }, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    setTripDetailInfo(locationsObject);
                    directionsDisplay.setDirections(response);
                    def.resolve(true);
                }
                else {
                    console.error('Directions request failed due to ' + status);
                    def.reject();
                }
            });
            return def.promise();
        }
        function getLatsAndLongs(origin, destination) {
            var def = $.Deferred();
            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&key=AIzaSyCMmgvcmwZF3-ZwliwvhlIqPMEcFU170EY",
                crossDomain: true,
                type: "GET",
                dataType: 'json',
                cache: false,
                contentType: 'application/json',
            })
                .done(function (res) {
                var locations = {
                    start: res.routes[0].legs[0].start_location,
                    startAddress: res.routes[0].legs[0].start_address,
                    end: res.routes[0].legs[0].end_location,
                    endAddress: res.routes[0].legs[0].end_address,
                    duration: res.routes[0].legs[0].duration.text,
                    distance: Math.round((res.routes[0].legs[0].distance.value / 1000)) + " Km",
                    steps: res.routes[0].legs[0].steps
                };
                def.resolve(locations);
            })
                .fail(function (e) { return def.reject(e); });
            return def.promise();
        }
        function setTripDetailInfo(locationsObject) {
            $('#route-origin').text(locationsObject.startAddress);
            $('#route-destination').text(locationsObject.endAddress);
            $('#route-distance').text(locationsObject.distance);
            $('#route-duration').text(locationsObject.duration);
        }
        function buildRouteSteps(steps) {
            var elements = [];
            var iconClass;
            steps.forEach(function (step) {
                if (step.maneuver) {
                    if (step.maneuver.indexOf('left') > -1)
                        iconClass = 'fa-arrow-left';
                    if (step.maneuver.indexOf('right') > -1)
                        iconClass = 'fa-arrow-right';
                }
                else {
                    iconClass = 'fa-arrow-up';
                }
                elements.push("<div class=\"feature-title\">\n                  <h5><i class=\"maneuver-icon mr-2 fa " + iconClass + "\" aria-hidden=\"true\"></i><span class=\"step-instruction\">" + step.html_instructions + "</span></h5>\n                  <div class=\"text-muted step-info\">" + step.duration.text + " (" + step.distance.text + ")</div>\n                </div>");
            });
            $('#trajeto .feature').append(elements.join(''));
        }
        //#endregion
    });
})(jQuery);
