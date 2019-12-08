(function ($) {
    $(function () {
        //#region Configurações Globais
        var hostUrl = 'http://localhost:64523/';
        var loadingModal = $('#loading-modal');
        var addModal = $('#addModal');
        var addForm = $('#add-trip-form');
        var deleteModal = $('#deleteModal');
        var deleteForm = $('#delete-trip-form');
        var editModal = $('#editModal');
        var editForm = $('#edit-trip-form');
        var finishTripModal = $('#finishTripModal');
        var finishTripForm = $('#finish-trip-form');
        var tripDetailButton = $('#trip-detail');
        // const addTripInicio = $('#')
        var addTripVehicle = $('#add-trip-form [name="trip-vehicle"]');
        var addTripDriver = $('#add-trip-form [name="trip-driver"]');
        var addTripGarage = $('#add-trip-form [name="trip-garage"]');
        var addTriDestination = $('#add-trip-form [name="trip-destination"]');
        var addTripStart = $('#add-trip-form [name="trip-start"]');
        var addTripPrevEnd = $('#add-trip-form [name="trip-prev-end"]');
        var editTripVehicle = $('#edit-trip-form [name="trip-vehicle"]');
        var editTripDriver = $('#edit-trip-form [name="trip-driver"]');
        var editTripGarage = $('#edit-trip-form [name="trip-garage"]');
        var editTriDestination = $('#edit-trip-form [name="trip-destination"]');
        var editTripStart = $('#edit-trip-form [name="trip-start"]');
        var editTripPrevEnd = $('#edit-trip-form [name="trip-prev-end"]');
        var itemToEditOrDelete;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var promises = [];
        tripDetailButton.bind('click', function () {
            window.open("trip-master-detail.html?id=" + itemToEditOrDelete, '_blank');
        });
        addTripVehicle.bind('change', function (event) {
            getVehicleGarage(parseInt(event.target['options'][event.target['selectedIndex']].getAttribute('data-garage')))
                .done(function (garage) {
                addTripGarage.attr('data-garageId', garage.idGaragem);
                addTripGarage.val(garage.nome);
            })
                .fail(function (e) {
                showHideAlert('#error-alert');
                console.error(e);
            });
        });
        editTripVehicle.bind('change', function (event) {
            getVehicleGarage(parseInt(event.target['options'][event.target['selectedIndex']].getAttribute('data-garage')))
                .done(function (garage) {
                editTripGarage.attr('data-garageId', garage.idGaragem);
                editTripGarage.val(garage.nome);
            })
                .fail(function (e) {
                showHideAlert('#error-alert');
                console.error(e);
            });
        });
        loadingModal.modal();
        promises.push(getAvaliableVehicles());
        promises.push(getDrivers());
        $.when.apply($, promises).then(function (veiculos, motoristas) {
            buildVehicleItens(veiculos);
            buildDriverItens(motoristas);
            var items = [
                {
                    id: 1,
                    status: 'Em progresso',
                    motorista: 'Motorista A',
                    veiculo: 'Brio - 2018',
                    garagem: 'Garagem A',
                    destino: 'Avenida Tiradentes, 789, São Paulo - SP',
                    inicio: '08/12/2019 15:15:45',
                    fim: null
                },
                {
                    id: 2,
                    status: 'Encerrada',
                    motorista: 'Motorista B',
                    veiculo: 'Celta - 2008',
                    garagem: 'Garagem B',
                    destino: 'Avenida Bandeirantes, 1745, São Paulo - SP',
                    inicio: '05/12/2019 14:00:00',
                    fim: '05/12/2019 16:10:13'
                }
            ];
            buildTableItems(items);
            loadingModal.modal('hide');
        }, function (e) {
            loadingModal.modal('hide');
            showHideAlert('#error-alert');
            console.error(e);
        });
        //#region Função dos botões
        // Botão de adicionar
        addForm.on('submit', function (e) {
            e.preventDefault();
            addModal.modal('hide');
            var items = [
                {
                    id: 1,
                    status: 'Em progresso',
                    motorista: 'Motorista A',
                    veiculo: 'Brio - 2018',
                    garagem: 'Garagem A',
                    destino: 'Avenida Tiradentes, 789, São Paulo - SP',
                    inicio: '08/12/2019 15:15:45',
                    fim: null
                },
                {
                    id: 2,
                    status: 'Encerrada',
                    motorista: 'Motorista B',
                    veiculo: 'Celta - 2008',
                    garagem: 'Garagem B',
                    destino: 'Avenida Bandeirantes, 1745, São Paulo - SP',
                    inicio: '05/12/2019 14:00:00',
                    fim: '05/12/2019 16:10:13'
                },
                {
                    id: 3,
                    status: 'Em progresso',
                    motorista: addTripDriver.val(),
                    veiculo: addTripVehicle.val(),
                    garagem: addTripGarage.val(),
                    destino: addTriDestination.val(),
                    inicio: new Date(addTripStart.val()).toLocaleString(),
                    fim: null
                }
            ];
            buildTableItems(items);
            showHideAlert('#success-alert');
            //  let dataObj: any = {}
            //dataObj['id'] = null;
            //dataObj['dataDaSaida'] = new Date(addTripStart.val() as string)
            //dataObj['garagemId'] = parseInt(addTripGarage.val() as string)
            //dataObj['cnpjId'] = currentUser.empresaCnpj
            //dataObj['veiculoId'] = parseInt(addTripVehicle.val() as string)
            //dataObj['cnhMotorista'] = parseInt(addTripDriver.val() as string)
            //dataObj['previsaoDeVolta'] = new Date(addTripPrevEnd.val() as string)
            //dataObj['voltaReal'] = null
            //dataObj['relatorioDeViagemFinalizada'] = null
            //dataObj['enderecoDestino'] = ''
            //dataObj['empresa'] = null
            //dataObj['veiculo'] = null
            //dataObj['motorista'] = null
            //dataObj['garagemEntrada'] = null
            //const ajaxProps: JQueryAjaxSettings = {
            //  url: `${hostUrl}api/Viagem/Cadastrar`,
            //  type: 'POST',
            //  contentType: 'application/json; charset=utf-8',
            //  data: JSON.stringify(dataObj)
            //}
            //$.ajax(ajaxProps)
            //  .done((a) => {
            //    getItems()
            //      .done((data) => {
            //        buildTableItems(data);
            //        document.getElementById('add-vehicle-form')['reset']();
            //        loadingModal.modal('hide');
            //        showHideAlert('#success-alert');
            //      })
            //      .fail((e) => {
            //        loadingModal.modal('hide');
            //        showHideAlert('#error-alert');
            //        console.log(e);
            //      });
            //  })
            //  .fail((e) => {
            //    loadingModal.modal('hide');
            //    showHideAlert('#error-alert');
            //    console.error(e)
            //  })
        });
        // Botão de excluir
        deleteForm.on('submit', function (e) {
            e.preventDefault();
            deleteModal.modal('hide');
            var itemRowData = $("[data-item=\"" + itemToEditOrDelete + "\"]");
            itemRowData.hide();
            showHideAlert('#success-alert');
            // loadingModal.modal();
            //const ajaxProps: JQueryAjaxSettings = {
            //  url: `${hostUrl}api/Veiculo/Deletar/${itemToEditOrDelete.toString()}`,
            //  contentType: 'application/json; charset=utf-8',
            //  type: 'DELETE'
            //}
            //$.ajax(ajaxProps)
            //  .done((a) => {
            //    getItems()
            //      .done((data) => {
            //        buildTableItems(data);
            //        loadingModal.modal('hide');
            //        showHideAlert('#success-alert');
            //      })
            //      .fail((e) => {
            //        loadingModal.modal('hide');
            //        showHideAlert('#error-alert');
            //        console.log(e);
            //      });
            //  })
            //  .fail((e) => {
            //    loadingModal.modal('hide');
            //    showHideAlert('#error-alert');
            //    console.error(e)
            //  })
        });
        // Botão de alterar
        editForm.on('submit', function (e) {
            e.preventDefault();
            editModal.modal('hide');
            var itemRowData = $("[data-item=\"" + itemToEditOrDelete + "\"]").find('td');
            $(itemRowData[1]).text(editTripDriver.val());
            $(itemRowData[2]).text(editTripVehicle.val());
            $(itemRowData[3]).text(editTripGarage.val());
            $(itemRowData[4]).text(editTriDestination.val());
            $(itemRowData[5]).text(new Date(editTripStart.val()).toLocaleString());
            showHideAlert('#success-alert');
            //const ajaxProps: JQueryAjaxSettings = {
            //  url: `${hostUrl}api/Veiculo/Atualizar`,
            //  contentType: 'application/json; charset=utf-8',
            //  type: 'PUT',
            //  data: JSON.stringify(dataObj)
            //}
            //$.ajax(ajaxProps)
            //  .done((a) => {
            //    getItems()
            //      .done((data) => {
            //        buildTableItems(data);
            //        document.getElementById('edit-vehicle-form')['reset']();
            //        loadingModal.modal('hide');
            //        showHideAlert('#success-alert');
            //      })
            //      .fail((e) => {
            //        loadingModal.modal('hide');
            //        showHideAlert('#error-alert');
            //        console.log(e);
            //      });
            //  })
            //  .fail((e) => {
            //    loadingModal.modal('hide');
            //    showHideAlert('#error-alert');
            //    console.error(e);
            //  })
        });
        //#endregion
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
                addTripVehicle.append("<option data-garage=\"" + item.garagemId + "\" value=\"" + item.modelo + " - " + item.ano + "\">" + item.modelo + " - " + item.ano + "</option>");
                editTripVehicle.append("<option data-garage=\"" + item.garagemId + "\" value=\"" + item.modelo + " - " + item.ano + "\">" + item.modelo + " - " + item.ano + "</option>");
            });
        }
        function getDrivers() {
            var def = $.Deferred();
            var ajaxProps = {
                url: hostUrl + "api/Motorista/ListarTodosDaEmpresa/" + currentUser.empresaCnpj,
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
        function buildDriverItens(items) {
            items.forEach(function (item) {
                addTripDriver.append("<option value=\"" + item.nome + "\">" + item.nome + "</option>");
                editTripDriver.append("<option value=\"" + item.nome + "\">" + item.nome + "</option>");
            });
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
        function getItems() {
            var def = $.Deferred();
            var ajaxProps = {
                url: hostUrl + "api/Veiculo/ListarTodosDaEmpresa/" + currentUser.empresaCnpj,
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
        function buildTableItems(items) {
            $('#trip-table tbody').html('');
            $('#data-results').text(items.length);
            if (items.length > 0) {
                items.forEach(function (item) {
                    $('#trip-table tbody').append("\n          <tr data-item=\"" + item.id + "\">\n              <td>" + item.status + "</td>\n               <td>" + item.motorista + "</td>\n               <td>" + item.veiculo + "</td>\n               <td>" + item.garagem + "</td>\n               <td>" + item.destino + "</td>\n               <td>" + item.inicio + "</td>\n               <td>" + (item.fim ? item.fim : '') + "</td>\n              <td style=\"width: 160px;\">\n                <a href=\"trip-master-detail.html?id=" + item.id + "\" class=\"finish-trip\"><i class=\"fa fa-info-circle\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Detalhes da Viagem\"></i></a>\n                <a href=\"#finishTripModal\" class=\"finish-trip\" onclick=\"setItemToDeleteOrUpdateValue(" + item.id + ")\" data-toggle=\"modal\"><i class=\"fa fa-flag-checkered\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Encerrar Viagem\"></i></a>\n                <a href=\"#editModal\" class=\"edit\" onclick=\"setItemToDeleteOrUpdateValue(" + item.id + ")\" data-toggle=\"modal\"><i class=\"fa fa-pencil\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Editar\"></i></a>\n                <a href=\"#deleteModal\" class=\"delete\" onclick=\"setItemToDeleteOrUpdateValue(" + item.id + ")\" data-toggle=\"modal\"><i class=\"fa fa-trash\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Excluir\"></i></a>\n              </td>\n            </tr>");
                });
            }
        }
        window['setItemToDeleteOrUpdateValue'] = function (vehicleId) {
            itemToEditOrDelete = vehicleId;
            var itemRowData = $("[data-item=\"" + vehicleId + "\"]").find('td');
        };
        //#endregion
    });
})(jQuery);
