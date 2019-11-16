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
        //#endregion
        function initMap() {
            return __awaiter(this, void 0, void 0, function () {
                var origin_1, destination, locations, pointA, pointB, myOptions, map, 
                // Instantiate a directions service.
                directionsService, directionsDisplay, markerA, markerB, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            origin_1 = 'Rua Coronel Querubin Franco, 111 - Jardim Bebedouro, Guarulhos - SP';
                            destination = 'Rua Benedito Passos, 184 - Vila Matilde, São Paulo - SP';
                            return [4 /*yield*/, getLatsAndLongs(encodeURI(origin_1), encodeURI(destination))];
                        case 1:
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
                            // get route from A to B
                            calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            console.log(e_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
            directionsService.route({
                origin: pointA,
                destination: pointB,
                travelMode: google.maps.TravelMode.DRIVING
            }, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
                else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
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
                    end: res.routes[0].legs[0].end_location
                };
                def.resolve(locations);
            })
                .fail(function (e) { return def.reject(e); });
            return def.promise();
        }
        initMap();
    });
})(jQuery);
