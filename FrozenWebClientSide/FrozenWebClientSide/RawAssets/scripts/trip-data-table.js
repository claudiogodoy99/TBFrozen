(function ($) {
    $(function () {
        //#region Configurações Globais
        var hostUrl = 'http://localhost:64523/';
        var loadingModal = $('#loading-modal');
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var addTripVehicle = $('#add-trip-form [name="trip-vehicle"]');
        var vehicleDetailButton = $('#vehicle-detail');
        vehicleDetailButton.bind('click', function () {
            window.open("vehicle-master-detail.html?id=" + addTripVehicle.val(), '_blank');
        });
        loadingModal.modal();
        getAvaliableVehicles()
            .done(function (data) {
            console.log(data);
            buildVehicleItens(data);
            loadingModal.modal('hide');
        })
            .fail(function (e) {
            loadingModal.modal('hide');
            showHideAlert('#error-alert');
            console.log(e);
        });
        function getAvaliableVehicles() {
            var def = $.Deferred();
            var ajaxProps = {
                url: hostUrl + "api/Veiculo/ListarTodosDisponiveis/" + currentUser.empresaCnpj,
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
        function buildVehicleItens(items) {
            items.forEach(function (item) {
                addTripVehicle.append("<option value=\"" + item.id + "\">" + item.modelo + " - " + item.ano + "</option>");
            });
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
        //#endregion
    });
})(jQuery);
