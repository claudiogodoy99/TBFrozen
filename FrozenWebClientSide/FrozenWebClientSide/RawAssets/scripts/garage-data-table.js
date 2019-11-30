(function ($) {
    $(function () {
        //#region Configurações Globais
        var hostUrl = 'http://localhost:64523/';
        var loadingModal = $('#loading-modal');
        var addModal = $('#addModal');
        var deleteModal = $('#deleteModal');
        var deleteForm = $('#delete-garage-form');
        var editModal = $('#editModal');
        var editForm = $('#edit-garage-form');
        var addGarage = $('#add-garage-form');
        var addGarageName = $('#add-garage-form [name="garage-name"]');
        var addGarageCnpj = $('#add-garage-form [name="garage-cnpj"]');
        var addGarageAddress = $('#add-garage-form [name="garage-address"]');
        var editGarageName = $('#edit-garage-form [name="garage-name"]');
        var editGarageCnpj = $('#edit-garage-form [name="garage-cnpj"]');
        var editGarageAddress = $('#edit-garage-form [name="garage-address"]');
        var itemToEditOrDelete;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        addGarageCnpj.mask('00.000.000/0000-00', { reverse: true });
        editGarageCnpj.mask('00.000.000/0000-00', { reverse: true });
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
        addGarage.on('submit', function (e) {
            e.preventDefault();
            addModal.modal('hide');
            loadingModal.modal();
            var dataObj = {};
            dataObj['nome'] = addGarageName.val();
            dataObj['empresaCnpj'] = addGarageCnpj.cleanVal();
            dataObj['endereco'] = addGarageAddress.val();
            dataObj['empresa'] = null;
            var ajaxProps = {
                url: hostUrl + "api/Garagem/Cadastrar",
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(dataObj)
            };
            $.ajax(ajaxProps)
                .done(function (a) {
                getItems()
                    .done(function (data) {
                    buildTableItems(data);
                    resetFields(['#addModal [name="garage-cnpj"]', '#addModal [name="garage-name"]', '#addModal [name="garage-address"]']);
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
                url: hostUrl + "api/Garagem/Deletar/" + itemToEditOrDelete,
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
            dataObj['idGaragem'] = parseInt(itemToEditOrDelete);
            dataObj['nome'] = editGarageName.val();
            dataObj['empresaCnpj'] = editGarageCnpj.cleanVal();
            dataObj['endereco'] = editGarageAddress.val();
            dataObj['empresa'] = null;
            var ajaxProps = {
                url: hostUrl + "api/Garagem/Atualizar",
                contentType: 'application/json; charset=utf-8',
                type: 'PUT',
                data: JSON.stringify(dataObj)
            };
            $.ajax(ajaxProps)
                .done(function (a) {
                getItems()
                    .done(function (data) {
                    buildTableItems(data);
                    resetFields(['#editModal [name="garage-cnpj"]', '#editModal [name="garage-name"]', '#editModal [name="garage-address"]']);
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
        function buildTableItems(items) {
            $('#garage-table tbody').html('');
            $('#data-results').text(items.length);
            if (items.length > 0) {
                items.forEach(function (item) {
                    $('#garage-table tbody').append("\n            <tr data-item=\"" + item.idGaragem + "\">\n              <td style=\"min-width: 150px;\">" + item.nome + "</td>\n              <td style=\"min-width: 150px;\">" + addGarageCnpj.masked(item.empresaCnpj) + "</td>\n              <td>" + item.endereco + "</td>\n              <td>\n                <a href=\"#editModal\" class=\"edit\" onclick=\"setItemToDeleteOrUpdateValue(" + item.idGaragem + ")\" data-toggle=\"modal\"><i class=\"fa fa-pencil\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Editar\"></i></a>\n                <a href=\"#deleteModal\" class=\"delete\" onclick=\"setItemToDeleteOrUpdateValue(" + item.idGaragem + ")\" data-toggle=\"modal\"><i class=\"fa fa-trash\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Excluir\"></i></a>\n              </td>\n            </tr>");
                });
            }
        }
        window['setItemToDeleteOrUpdateValue'] = function (value) {
            itemToEditOrDelete = value.toString();
            var itemRowData = $("[data-item=\"" + value + "\"]").find('td');
            editGarageName.val($(itemRowData[0]).text());
            editGarageCnpj.val(editGarageCnpj.masked($(itemRowData[1]).text()));
            editGarageAddress.val($(itemRowData[2]).text());
        };
        //#endregion
    });
})(jQuery);
