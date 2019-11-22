(function ($) {
    $(function () {
        //#region Configurações Globais
        var hostUrl = 'http://localhost:64523/';
        var loadingModal = $('#loading-modal');
        var addModal = $('#addModal');
        var deleteModal = $('#deleteModal');
        var deleteForm = $('#delete-driver-form');
        var editModal = $('#editModal');
        var editForm = $('#edit-driver-form');
        var addForm = $('#add-driver-form');
        var addDriverName = $('#add-driver-form [name="driver-name"]');
        var addDriverCNH = $('#add-driver-form [name="driver-cnh"]');
        var addDriverCompanyCnpj = $('#add-driver-form [name="driver-company-cnpj"]');
        var editDriverName = $('#edit-driver-form [name="driver-name"]');
        var editDriverCNH = $('#edit-driver-form [name="driver-cnh"]');
        var editDriverCompanyCnpj = $('#edit-driver-form [name="driver-company-cnpj"]');
        var itemToEditOrDelete;
        addDriverCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
        editDriverCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
        //#endregion
        //#region Listagem dos items
        loadingModal.modal();
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
        //#endregion
        //#region Função dos botões
        // Botão de adicionar
        addForm.on('submit', function (e) {
            e.preventDefault();
            addModal.modal('hide');
            loadingModal.modal();
            var dataObj = {};
            dataObj['nome'] = addDriverName.val();
            dataObj['cnh'] = addDriverCNH.val();
            dataObj['empresaCnpj'] = addDriverCompanyCnpj.cleanVal();
            var ajaxProps = {
                url: hostUrl + "api/Motorista/Cadastrar",
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(dataObj)
            };
            $.ajax(ajaxProps)
                .done(function (a) {
                getItems()
                    .done(function (data) {
                    buildTableItems(data);
                    resetFields(['#addModal [name="driver-name"]', '#addModal [name="driver-cnh"]', '#addModal [name="driver-company-cnpj"]']);
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
                url: hostUrl + "api/Motorista/Deletar/" + itemToEditOrDelete.toString(),
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
            dataObj['cnh'] = itemToEditOrDelete;
            dataObj['nome'] = editDriverName.val();
            dataObj['empresaCnpj'] = editDriverCompanyCnpj.cleanVal();
            var ajaxProps = {
                url: hostUrl + "api/Motorista/Atualizar",
                contentType: 'application/json; charset=utf-8',
                type: 'PUT',
                data: JSON.stringify(dataObj)
            };
            $.ajax(ajaxProps)
                .done(function (a) {
                getItems()
                    .done(function (data) {
                    buildTableItems(data);
                    resetFields(['#editModal [name="driver-name"]', '#editModal [name="driver-cnh"]', '#editModal [name="driver-company-cnpj"]']);
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
                url: hostUrl + "api/Motorista/ListarTodosDaEmpresa/12123232323232",
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
            $('#driver-table tbody').html('');
            $('#data-results').text(items.length);
            if (items.length > 0) {
                items.forEach(function (item) {
                    $('#driver-table tbody').append("\n            <tr data-item=\"" + item.cnh + "\">\n              <td style=\"min-width: 150px;\">" + item.nome + "</td>\n              <td>" + item.cnh + "</td>\n              <td style=\"min-width: 150px;\">" + addDriverCompanyCnpj.masked(item.empresaCnpj) + "</td>\n              <td>\n                <a href=\"#editModal\" class=\"edit\" onclick=\"setItemToDeleteOrUpdateValue(" + item.cnh + ")\" data-toggle=\"modal\"><i class=\"fa fa-pencil\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Editar\"></i></a>\n                <a href=\"#deleteModal\" class=\"delete\" onclick=\"setItemToDeleteOrUpdateValue(" + item.cnh + ")\" data-toggle=\"modal\"><i class=\"fa fa-trash\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Excluir\"></i></a>\n              </td>\n            </tr>");
                });
            }
        }
        window['setItemToDeleteOrUpdateValue'] = function (driverCNH) {
            itemToEditOrDelete = driverCNH;
            var itemRowData = $("[data-item=\"" + driverCNH + "\"]").find('td');
            editDriverName.val($(itemRowData[0]).text());
            editDriverCNH.val($(itemRowData[1]).text());
            editDriverCompanyCnpj.val(editDriverCompanyCnpj.masked($(itemRowData[2]).text()));
        };
        //#endregion
    });
})(jQuery);
