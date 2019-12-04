(function ($) {
    $(function () {
        //#region Configurações Globais
        var hostUrl = 'http://localhost:64523/';
        var loadingModal = $('#loading-modal');
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var vehicleIdParam = new URLSearchParams(window.location.search).get('id');
        var vehicleTitle = $('#vehicle-title h3');
        var vehicleImage = $('#vehicle-image img');
        var vehicleCondition = $('#vehicle-condition');
        var vehicleKm = $('#vehicle-km');
        var vehicleFuelType = $('#vehicle-fuel-type');
        var vehicleTransmission = $('#vehicle-transmission');
        var vehicleConsume = $('#vehicle-consume');
        var vehicleType = $('#vehicle-type');
        var vehicleBrand = $('#vehicle-brand');
        var vehicleModel = $('#vehicle-model');
        var vehicleYear = $('#vehicle-year');
        var vehiclePlaces = $('#vehicle-places');
        var vehicleInsurance = $('#vehicle-insurance');
        var vehiclePlate = $('#vehicle-plate');
        var vehicleGarage = $('#vehicle-garage');
        var companyCnpj = $('#company-cnpj');
        var vehiclePrice = $('#vehicle-price');
        var onMaintance = $('#on-maintance');
        var onTrip = $('#on-trip');
        var lastCorretive = $('#last-corretive');
        var lastPreventive = $('#last-preventive');
        var lastRecharge = $('#last-recharge');
        companyCnpj.mask('00.000.000/0000-00', { reverse: true });
        //#endregion
        loadingModal.modal();
        getVehicleById(vehicleIdParam)
            .done(function (data) {
            var vehicle = data;
            getVehicleGarage(vehicle.garagemId)
                .done(function (garagem) {
                vehicle.garagem = garagem;
                displayVehicleDetails(data);
                loadingModal.modal('hide');
            })
                .fail(function (e) {
                loadingModal.modal('hide');
                showHideAlert('#error-alert');
                console.log(e);
            });
        })
            .fail(function (e) {
            loadingModal.modal('hide');
            showHideAlert('#error-alert');
            console.log(e);
        });
        function displayVehicleDetails(vehicleInfo) {
            vehicleTitle.text(vehicleInfo.modelo + " - " + vehicleInfo.ano);
            vehicleImage.attr('src', vehicleInfo.imagem);
            vehicleCondition.text(fitCondition(vehicleInfo.condicao));
            vehicleKm.text(vehicleInfo.km + " km");
            vehicleFuelType.text(fitFuelType(vehicleInfo.tipoCombustivel));
            vehicleTransmission.text(fitTransmission(vehicleInfo.tipoCambio));
            vehicleConsume.text(vehicleInfo.consumo);
            vehicleType.text(fitVehicleType(vehicleInfo.tipo));
            vehicleBrand.text(vehicleInfo.marca);
            vehicleModel.text(vehicleInfo.modelo);
            vehicleYear.text(vehicleInfo.ano);
            vehiclePlaces.text(vehicleInfo.lugares);
            vehicleInsurance.text(vehicleInfo.seguro);
            vehiclePlate.text(vehicleInfo.placa);
            vehicleGarage.text(vehicleInfo.garagem.nome);
            companyCnpj.text(companyCnpj.masked(vehicleInfo.empresaCnpj));
            vehiclePrice.text(("R$ " + vehicleInfo.preco).replace(/\./g, ','));
            onMaintance.text(fitYesNo(vehicleInfo.emManutencao));
            onTrip.text(fitYesNo(vehicleInfo.emViagem));
            lastCorretive.text(fitDate(vehicleInfo.ultimaCorretiva));
            lastPreventive.text(fitDate(vehicleInfo.ultimaPreventiva));
            lastRecharge.text(fitDate(vehicleInfo.ultimoAbastecimento));
        }
        function getVehicleById(id) {
            var def = $.Deferred();
            var ajaxProps = {
                url: hostUrl + "api/Veiculo/BuscarPorId/" + id,
                type: 'GET',
                contentType: 'application/json; charset=utf-8'
            };
            $.ajax(ajaxProps)
                .done(function (data) {
                def.resolve(data);
            })
                .fail(function (e) {
                def.reject(e);
            });
            return def.promise();
        }
        function showHideAlert(selector, show) {
            if (show === void 0) { show = true; }
            if (show) {
                $(selector).removeClass('d-none');
                setTimeout(function () {
                    $(selector).addClass('d-none');
                }, 5000);
            }
            else {
                $(selector).addClass('d-none');
            }
        }
        function fitCondition(condition) {
            var conditionHash = {
                N: 'Novo',
                U: 'Usado'
            };
            return conditionHash[condition];
        }
        function fitFuelType(fuelType) {
            var fuelTypeHash = {
                G: 'Gasolina',
                A: 'Álcool',
                F: 'Flex',
                E: 'Energia Elétrica',
                H: 'Híbrido'
            };
            return fuelTypeHash[fuelType];
        }
        function fitTransmission(param) {
            var hash = {
                A: 'Automática',
                M: 'Manual'
            };
            return hash[param];
        }
        function fitVehicleType(param) {
            var hash = {
                SUV: 'SUV',
                S: 'Sedan',
                H: 'Hatch'
            };
            return hash[param];
        }
        function getVehicleGarage(id) {
            var def = $.Deferred();
            var ajaxProps = {
                url: hostUrl + "api/Garagem/Buscar/" + id,
                type: 'GET',
                contentType: 'application/json; charset=utf-8'
            };
            $.ajax(ajaxProps)
                .done(function (data) {
                def.resolve(data);
            })
                .fail(function (e) {
                def.reject(e);
            });
            return def.promise();
        }
        function fitDate(date) {
            if (date) {
                return new Date(date).toLocaleDateString();
            }
            else {
                return 'N/A';
            }
        }
        function fitYesNo(param) {
            var hash = {
                S: 'Sim',
                N: 'Não'
            };
            return hash[param];
        }
    });
})(jQuery);
