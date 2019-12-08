(function ($) {
    $(function () {
        //#region Configurações Globais
        var hostUrl = 'http://localhost:64523/';
        var loadingModal = $('#loading-modal');
        var addModal = $('#addModal');
        var deleteModal = $('#deleteModal');
        var deleteForm = $('#delete-vehicle-form');
        var editModal = $('#editModal');
        var editForm = $('#edit-vehicle-form');
        var addForm = $('#add-vehicle-form');
        var addVehiclePlate = $('#add-vehicle-form [name="vehicle-plate"]');
        var addVehicleType = $('#add-vehicle-form [name="vehicle-type"]');
        var addVehicleImage = $('#add-vehicle-form [name="vehicle-image"]');
        var addVehicleBrand = $('#add-vehicle-form [name="vehicle-brand"]');
        var addVehicleModel = $('#add-vehicle-form [name="vehicle-model"]');
        var addVehicleYear = $('#add-vehicle-form [name="vehicle-year"]');
        var addVehicleCompanyCnpj = $('#add-vehicle-form [name="vehicle-company-cnpj"]');
        var addVehicleInsurance = $('#add-vehicle-form [name="vehicle-insurance"]');
        var addVehicleGarage = $('#add-vehicle-form [name="vehicle-garage"]');
        var addVehicleCondition = $('#add-vehicle-form [name="vehicle-condition"]');
        var addVehicleKm = $('#add-vehicle-form [name="vehicle-km"]');
        var addVehicleFuel = $('#add-vehicle-form [name="vehicle-fuel"]');
        var addVehicleTransmission = $('#add-vehicle-form [name="vehicle-transmission"]');
        var addVehicleConsume = $('#add-vehicle-form [name="vehicle-consume"]');
        var addVehiclePlaces = $('#add-vehicle-form [name="vehicle-places"]');
        var addVehiclePrice = $('#add-vehicle-form [name="vehicle-price"]');
        var addPrevLastDate = $('#add-vehicle-form [name="maintance-prev-last-date"]');
        var addCorLastDate = $('#add-vehicle-form [name="maintance-cor-last-date"]');
        var addLastRecharge = $('#add-vehicle-form [name="recharge-last-date"]');
        var addVehicleOnMaintance = $('#add-vehicle-form [name="vehicle-on-maintance"]');
        var editVehiclePlate = $('#edit-vehicle-form [name="vehicle-plate"]');
        var editVehicleType = $('#edit-vehicle-form [name="vehicle-type"]');
        var editVehicleImage = $('#edit-vehicle-form [name="vehicle-image"]');
        var editVehicleBrand = $('#edit-vehicle-form [name="vehicle-brand"]');
        var editVehicleModel = $('#edit-vehicle-form [name="vehicle-model"]');
        var editVehicleYear = $('#edit-vehicle-form [name="vehicle-year"]');
        var editVehicleCompanyCnpj = $('#edit-vehicle-form [name="vehicle-company-cnpj"]');
        var editVehicleInsurance = $('#edit-vehicle-form [name="vehicle-insurance"]');
        var editVehicleGarage = $('#edit-vehicle-form [name="vehicle-garage"]');
        var editVehicleCondition = $('#edit-vehicle-form [name="vehicle-condition"]');
        var editVehicleKm = $('#edit-vehicle-form [name="vehicle-km"]');
        var editVehicleFuel = $('#edit-vehicle-form [name="vehicle-fuel"]');
        var editVehicleTransmission = $('#edit-vehicle-form [name="vehicle-transmission"]');
        var editVehicleConsume = $('#edit-vehicle-form [name="vehicle-consume"]');
        var editVehiclePlaces = $('#edit-vehicle-form [name="vehicle-places"]');
        var editVehiclePrice = $('#edit-vehicle-form [name="vehicle-price"]');
        var editPrevLastDate = $('#edit-vehicle-form [name="maintance-prev-last-date"]');
        var editCorLastDate = $('#edit-vehicle-form [name="maintance-cor-last-date"]');
        var editLastRecharge = $('#edit-vehicle-form [name="recharge-last-date"]');
        var editVehicleOnMaintance = $('#edit-vehicle-form [name="vehicle-on-maintance"]');
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var itemToEditOrDelete;
        var emViagem;
        var vehicleImagePath;
        addVehicleCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
        editVehicleCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
        //#endregion
        //#region Listagem dos items
        loadingModal.modal();
        getGarages()
            .done(function (garages) {
            buildGarageItens(garages);
            getItems()
                .done(function (data) {
                buildTableItems(data);
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
        //#endregion
        //#region Função dos botões
        // Botão de adicionar
        addForm.on('submit', function (e) {
            e.preventDefault();
            addModal.modal('hide');
            loadingModal.modal();
            var dataObj = {};
            dataObj['id'] = null;
            dataObj['placa'] = addVehiclePlate.val();
            dataObj['tipo'] = addVehicleType.val();
            if (document.querySelector('#customFile')['files']) {
                if (document.querySelector('#customFile')['files'][0]) {
                    dataObj['imagem'] = "C:/Users/Gabriel/Desktop/" + document.querySelector('#customFile')['files'][0].name;
                }
                else {
                    dataObj['imagem'] = null;
                }
            }
            else {
                dataObj['imagem'] = null;
            }
            dataObj['marca'] = addVehicleBrand.val();
            dataObj['modelo'] = addVehicleModel.val();
            dataObj['ano'] = parseInt(addVehicleYear.val());
            dataObj['condicao'] = addVehicleCondition.val();
            dataObj['km'] = parseInt(addVehicleKm.val());
            dataObj['tipoCambio'] = addVehicleTransmission.val();
            dataObj['tipoCombustivel'] = addVehicleFuel.val();
            dataObj['emViagem'] = "N";
            dataObj['emManutencao'] = addVehicleOnMaintance.val();
            dataObj['seguro'] = addVehicleInsurance.val();
            dataObj['preco'] = parseFloat(addVehiclePrice.val());
            dataObj['lugares'] = parseInt(addVehiclePlaces.val());
            dataObj['empresaCnpj'] = addVehicleCompanyCnpj.cleanVal();
            dataObj['empresa'] = null;
            dataObj['garagemId'] = parseInt(addVehicleGarage.val());
            dataObj['garagem'] = null;
            dataObj['consumo'] = addVehicleConsume.val();
            dataObj['ultimaPreventiva'] = new Date(addPrevLastDate.val()) || null;
            dataObj['ultimaCorretiva'] = new Date(addCorLastDate.val()) || null;
            dataObj['ultimoAbastecimento'] = new Date(addLastRecharge.val());
            dataObj['viagens'] = null;
            var ajaxProps = {
                url: hostUrl + "api/Veiculo/Cadastrar",
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(dataObj)
            };
            $.ajax(ajaxProps)
                .done(function (a) {
                getItems()
                    .done(function (data) {
                    buildTableItems(data);
                    document.getElementById('add-vehicle-form')['reset']();
                    //resetFields(['#addModal [name="vehicle-name"]', '#addModal [name="vehicle-cnh"]', '#addModal [name="vehicle-company-cnpj"]']);
                    loadingModal.modal('hide');
                    showHideAlert('#success-alert');
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
                console.error(e);
            });
        });
        // Botão de excluir
        deleteForm.on('submit', function (e) {
            e.preventDefault();
            deleteModal.modal('hide');
            loadingModal.modal();
            var ajaxProps = {
                url: hostUrl + "api/Veiculo/Deletar/" + itemToEditOrDelete.toString(),
                contentType: 'application/json; charset=utf-8',
                type: 'DELETE'
            };
            $.ajax(ajaxProps)
                .done(function (a) {
                getItems()
                    .done(function (data) {
                    buildTableItems(data);
                    loadingModal.modal('hide');
                    showHideAlert('#success-alert');
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
                console.error(e);
            });
        });
        // Botão de alterar
        editForm.on('submit', function (e) {
            e.preventDefault();
            editModal.modal('hide');
            loadingModal.modal();
            var dataObj = {};
            dataObj['id'] = parseInt(itemToEditOrDelete);
            dataObj['placa'] = editVehiclePlate.val();
            dataObj['tipo'] = editVehicleType.val();
            if (document.querySelector('#editCustomFile')['files']) {
                if (document.querySelector('#editCustomFile')['files'][0]) {
                    dataObj['imagem'] = "C:/Users/Gabriel/Desktop/" + document.querySelector('#editCustomFile')['files'][0].name;
                }
                else {
                    dataObj['imagem'] = vehicleImagePath;
                }
            }
            else {
                dataObj['imagem'] = vehicleImagePath;
            }
            dataObj['marca'] = editVehicleBrand.val();
            dataObj['modelo'] = editVehicleModel.val();
            dataObj['ano'] = parseInt(editVehicleYear.val());
            dataObj['condicao'] = editVehicleCondition.val();
            dataObj['km'] = parseInt(editVehicleKm.val());
            dataObj['tipoCambio'] = editVehicleTransmission.val();
            dataObj['tipoCombustivel'] = editVehicleFuel.val();
            dataObj['emViagem'] = emViagem;
            dataObj['emManutencao'] = editVehicleOnMaintance.val();
            dataObj['seguro'] = editVehicleInsurance.val();
            dataObj['preco'] = parseFloat(editVehiclePrice.val());
            dataObj['lugares'] = parseInt(editVehiclePlaces.val());
            dataObj['empresaCnpj'] = editVehicleCompanyCnpj.cleanVal();
            dataObj['empresa'] = null;
            dataObj['garagemId'] = parseInt(editVehicleGarage.val());
            dataObj['garagem'] = null;
            dataObj['consumo'] = editVehicleConsume.val();
            dataObj['ultimaPreventiva'] = new Date(editPrevLastDate.val()) || null;
            dataObj['ultimaCorretiva'] = new Date(editCorLastDate.val()) || null;
            dataObj['ultimoAbastecimento'] = new Date(editLastRecharge.val());
            dataObj['viagens'] = null;
            var ajaxProps = {
                url: hostUrl + "api/Veiculo/Atualizar",
                contentType: 'application/json; charset=utf-8',
                type: 'PUT',
                data: JSON.stringify(dataObj)
            };
            $.ajax(ajaxProps)
                .done(function (a) {
                getItems()
                    .done(function (data) {
                    buildTableItems(data);
                    document.getElementById('edit-vehicle-form')['reset']();
                    //resetFields(['#editModal [name="vehicle-name"]', '#editModal [name="vehicle-cnh"]', '#editModal [name="vehicle-company-cnpj"]'])
                    loadingModal.modal('hide');
                    showHideAlert('#success-alert');
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
                console.error(e);
            });
        });
        //#endregion
        //#region Funções auxiliares
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
        function resetFields(fieldsSelectors) {
            fieldsSelectors.forEach(function (field) {
                $(field).val(null);
            });
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
        function getGarages() {
            var def = $.Deferred();
            var ajaxProps = {
                url: hostUrl + "api/Garagem/ListarTodasDaEmpresa/" + currentUser.empresaCnpj,
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
        function buildGarageItens(items) {
            items.forEach(function (item) {
                addVehicleGarage.append("<option value=\"" + item.idGaragem + "\">" + item.nome + "</option>");
                editVehicleGarage.append("<option value=\"" + item.idGaragem + "\">" + item.nome + "</option>");
            });
        }
        function buildTableItems(items) {
            $('#vehicle-table tbody').html('');
            $('#data-results').text(items.length);
            if (items.length > 0) {
                items.forEach(function (item) {
                    $('#vehicle-table tbody').append("\n            <tr data-item=\"" + item.id + "\">\n              <td style=\"display: none\";>" + item.id + "</td>\n              <td style=\"display: none\";>" + item.garagemId + "</td>\n              <td style=\"display: none\";>" + item.tipoCombustivel + "</td>\n              <td style=\"display: none\";>" + item.condicao + "</td>\n              <td style=\"display: none\";>" + item.consumo + "</td>\n              <td style=\"display: none\";>" + item.emViagem + "</td>\n              <td style=\"display: none\";>" + item.km + "</td>\n              <td style=\"display: none\";>" + item.lugares + "</td>\n              <td style=\"display: none\";>" + item.preco + "</td>\n              <td style=\"display: none\";>" + item.tipo + "</td>\n              <td style=\"display: none\";>" + item.tipoCambio + "</td>\n              <td style=\"display: none\";>" + item.tipoCombustivel + "</td>\n              <td style=\"display: none\";>" + item.ultimaCorretiva + "</td>\n              <td style=\"display: none\";>" + item.ultimaPreventiva + "</td>\n              <td style=\"display: none\";>" + item.ultimoAbastecimento + "</td>\n              <td style=\"display: none\";>" + item.imagem + "</td>\n              <td style=\"min-width: 100px;\">" + item.placa + "</td>\n              <td>" + item.marca + "</td>\n              <td>" + item.modelo + "</td>\n              <td>" + item.ano + "</td>\n              <td style=\"min-width: 150px;\">" + addVehicleCompanyCnpj.masked(item.empresaCnpj) + "</td>              \n              <td>" + item.seguro + "</td>\n              <td>" + (item.emManutencao == 'S' ? 'Sim' : 'Não') + "</td>\n              <td style=\"width: 130px;\">\n                <a href=\"vehicle-master-detail.html?id=" + item.id + "\" class=\"finish-trip\"><i class=\"fa fa-info-circle\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Detalhes do Ve\u00EDculo\"></i></a>\n                <a href=\"#editModal\" class=\"edit\" onclick=\"setItemToDeleteOrUpdateValue(" + item.id + ")\" data-toggle=\"modal\"><i class=\"fa fa-pencil\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Editar\"></i></a>\n                <a href=\"#deleteModal\" class=\"delete\" onclick=\"setItemToDeleteOrUpdateValue(" + item.id + ")\" data-toggle=\"modal\"><i class=\"fa fa-trash\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Excluir\"></i></a>\n              </td>\n            </tr>");
                });
            }
        }
        window['setItemToDeleteOrUpdateValue'] = function (vehicleId) {
            itemToEditOrDelete = vehicleId;
            var itemRowData = $("[data-item=\"" + vehicleId + "\"]").find('td');
            editVehicleGarage.val($(itemRowData[1]).text());
            editVehicleFuel.val($(itemRowData[2]).text());
            editVehicleCondition.val($(itemRowData[3]).text());
            editVehicleConsume.val($(itemRowData[4]).text());
            emViagem = $(itemRowData[5]).text();
            editVehicleKm.val($(itemRowData[6]).text());
            editVehiclePlaces.val($(itemRowData[7]).text());
            editVehiclePrice.val($(itemRowData[8]).text());
            editVehicleType.val($(itemRowData[9]).text());
            editVehicleTransmission.val($(itemRowData[10]).text());
            editVehicleFuel.val($(itemRowData[11]).text());
            editCorLastDate.val(dateToInput($(itemRowData[12]).text()));
            editPrevLastDate.val(dateToInput($(itemRowData[13]).text()));
            editLastRecharge.val(dateToInput($(itemRowData[14]).text()));
            vehicleImagePath = $(itemRowData[15]).text();
            editVehiclePlate.val($(itemRowData[16]).text());
            editVehicleBrand.val($(itemRowData[17]).text());
            editVehicleModel.val($(itemRowData[18]).text());
            editVehicleYear.val($(itemRowData[19]).text());
            editVehicleCompanyCnpj.val(editVehicleCompanyCnpj.masked($(itemRowData[20]).text()));
            editVehicleInsurance.val($(itemRowData[21]).text());
            editVehicleOnMaintance.val($(itemRowData[22]).text() == 'Sim' ? 'S' : 'N');
        };
        function dateToInput(date) {
            var dateObj = new Date(date);
            return dateObj.getFullYear() + "-" + ('0' + (dateObj.getMonth() + 1)).slice(-2) + "-" + ('0' + dateObj.getDate()).slice(-2);
        }
        //#endregion
    });
})(jQuery);
