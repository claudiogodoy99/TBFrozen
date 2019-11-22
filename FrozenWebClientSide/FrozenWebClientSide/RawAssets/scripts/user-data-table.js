(function ($) {
    $(function () {
        //#region Configurações Globais
        var hostUrl = 'http://localhost:64523/';
        var loadingModal = $('#loading-modal');
        var addModal = $('#addModal');
        var deleteModal = $('#deleteModal');
        var deleteForm = $('#delete-user-form');
        var editModal = $('#editModal');
        var editForm = $('#edit-user-form');
        var addForm = $('#add-user-form');
        var addUserName = $('#add-user-form [name="user-name"]');
        var addUserPassword = $('#add-user-form [name="user-password"]');
        var addUserEmail = $('#add-user-form [name="user-email"]');
        var addUserCompanyCnpj = $('#add-user-form [name="user-company-cnpj"]');
        var addUserAddress = $('#add-user-form [name="user-address"]');
        var addUserPhone = $('#add-user-form [name="user-phone"]');
        var editUserName = $('#edit-user-form [name="user-name"]');
        var editUserPassword = $('#edit-user-form [name="user-password"]');
        var editUserEmail = $('#edit-user-form [name="user-email"]');
        var editUserCompanyCnpj = $('#edit-user-form [name="user-company-cnpj"]');
        var editUserAddress = $('#edit-user-form [name="user-address"]');
        var editUserPhone = $('#edit-user-form [name="user-phone"]');
        var itemToEditOrDelete;
        addUserCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
        addUserPhone.mask('(00) 00000-0000');
        editUserCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
        editUserPhone.mask('(00) 00000-0000');
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
            dataObj['nome'] = addUserName.val();
            dataObj['email'] = addUserEmail.val();
            dataObj['senha'] = addUserPassword.val();
            dataObj['empresaCnpj'] = addUserCompanyCnpj.cleanVal();
            dataObj['endereco'] = addUserAddress.val();
            dataObj['telefone'] = addUserPhone.cleanVal();
            var ajaxProps = {
                url: hostUrl + "api/Usuario/Cadastrar",
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(dataObj)
            };
            $.ajax(ajaxProps)
                .done(function (a) {
                getItems()
                    .done(function (data) {
                    buildTableItems(data);
                    resetFields(['#addModal [name="user-name"]', '#addModal [name="user-email"]',
                        '#addModal [name="user-password"]', '#addModal [name="user-company-cnpj"]',
                        '#addModal [name="user-phone"]', '#addModal [name="user-address"]']);
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
                url: hostUrl + "api/Usuario/Deletar/" + itemToEditOrDelete.toString(),
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
            dataObj['id'] = itemToEditOrDelete;
            dataObj['nome'] = editUserName.val();
            dataObj['email'] = editUserEmail.val();
            dataObj['senha'] = editUserPassword.val();
            dataObj['empresaCnpj'] = editUserCompanyCnpj.cleanVal();
            dataObj['endereco'] = editUserAddress.val();
            dataObj['telefone'] = editUserPhone.cleanVal();
            var ajaxProps = {
                url: hostUrl + "api/Usuario/Atualizar",
                contentType: 'application/json; charset=utf-8',
                type: 'PUT',
                data: JSON.stringify(dataObj)
            };
            $.ajax(ajaxProps)
                .done(function (a) {
                getItems()
                    .done(function (data) {
                    buildTableItems(data);
                    resetFields(['#editModal [name="user-name"]', '#editModal [name="user-email"]',
                        '#editModal [name="user-password"]', '#editModal [name="user-company-cnpj"]',
                        '#editModal [name="user-phone"]', '#editModal [name="user-address"]']);
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
                url: hostUrl + "api/Usuario/ListarTodosDaEmpresa/12123232323232",
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
            $('#user-table tbody').html('');
            $('#data-results').text(items.length);
            if (items.length > 0) {
                items.forEach(function (item) {
                    $('#user-table tbody').append("\n            <tr data-item=\"" + item.id + "\">\n              <td class=\"d-none\">" + item.id + "</td>\n              <td class=\"d-none\">" + item.senha + "</td>\n              <td>" + item.nome + "</td>\n              <td>" + item.email + "</td>\n              <td style=\"min-width: 150px;\">" + item.endereco + "</td>\n              <td style=\"min-width: 150px;\">" + addUserPhone.masked(item.telefone) + "</td>\n              <td style=\"min-width: 150px;\">" + addUserCompanyCnpj.masked(item.empresaCnpj) + "</td>\n              <td>\n                <a href=\"#editModal\" class=\"edit\" onclick=\"setItemToDeleteOrUpdateValue(" + item.id + ")\" data-toggle=\"modal\"><i class=\"fa fa-pencil\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Editar\"></i></a>\n                <a href=\"#deleteModal\" class=\"delete\" onclick=\"setItemToDeleteOrUpdateValue(" + item.id + ")\" data-toggle=\"modal\"><i class=\"fa fa-trash\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Excluir\"></i></a>\n              </td>\n            </tr>");
                });
            }
        }
        window['setItemToDeleteOrUpdateValue'] = function (userId) {
            itemToEditOrDelete = userId;
            var itemRowData = $("[data-item=\"" + userId + "\"]").find('td');
            editUserPassword.val($(itemRowData[1]).text());
            editUserName.val($(itemRowData[2]).text());
            editUserEmail.val($(itemRowData[3]).text());
            editUserAddress.val($(itemRowData[4]).text());
            editUserPhone.val(editUserPhone.masked($(itemRowData[5]).text()));
            editUserCompanyCnpj.val(editUserCompanyCnpj.masked($(itemRowData[6]).text()));
        };
        //#endregion
    });
})(jQuery);
