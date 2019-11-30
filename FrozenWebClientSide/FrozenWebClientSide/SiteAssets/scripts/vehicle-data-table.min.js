(function ($) {
    $(function () {
        //#region Configurações Globais
        var hostUrl = 'http://localhost:64523/';
        var loadingModal = $('#loading-modal');
        var addModal = $('#addModal');
        var deleteModal = $('#deleteModal');
        var deleteForm = $('#delete-company-form');
        var editModal = $('#editModal');
        var editForm = $('#edit-company-form');
        var addCompany = $('#add-company-form');
        var addCompanyCnpj = $('#add-company-form [name="company-cnpj"]');
        var addCompanyDescription = $('#add-company-form [name="company-description"]');
        var editCompanyCnpj = $('#edit-company-form [name="company-cnpj"]');
        var editCompanyDescription = $('#edit-company-form [name="company-description"]');
        var itemToEditOrDelete;
        addCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
        editCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
        //#endregion
        //#region Listagem dos items
        //loadingModal.modal();
        //getItems()
        //  .done((data) => {
        //    buildTableItems(data);
        //    loadingModal.modal('hide');
        //  })
        //  .fail((e) => {
        //    loadingModal.modal('hide');
        //    showHideAlert('#error-alert');
        //    console.log(e);
        //  });
        //#endregion
        //#region Função dos botões
        // Botão de adicionar
        addCompany.on('submit', function (e) {
            e.preventDefault();
            addModal.modal('hide');
            loadingModal.modal();
            var dataObj = {};
            dataObj['cnpj'] = addCompanyCnpj.cleanVal();
            dataObj['descricao'] = addCompanyDescription.val();
            var ajaxProps = {
                url: hostUrl + "api/Empresa/Cadastrar",
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(dataObj)
            };
            $.ajax(ajaxProps)
                .done(function (a) {
                getItems()
                    .done(function (data) {
                    buildTableItems(data);
                    resetFields(['#addModal [name="company-cnpj"]', '#addModal [name="company-description"]']);
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
                url: hostUrl + "api/Empresa/Deletar/" + itemToEditOrDelete,
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
            dataObj['cnpj'] = editCompanyCnpj.cleanVal();
            dataObj['descricao'] = editCompanyDescription.val();
            var ajaxProps = {
                url: hostUrl + "api/Empresa/Atualizar",
                contentType: 'application/json; charset=utf-8',
                type: 'PUT',
                data: JSON.stringify(dataObj)
            };
            $.ajax(ajaxProps)
                .done(function (a) {
                getItems()
                    .done(function (data) {
                    buildTableItems(data);
                    resetFields(['#editModal [name="company-cnpj"]', '#editModal [name="company-description"]']);
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
                url: hostUrl + "api/Empresa/listarTodos",
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
            $('#empresa-table tbody').html('');
            $('#data-results').text(items.length);
            if (items.length > 0) {
                items.forEach(function (item) {
                    $('#empresa-table tbody').append("<tr>\n              <td style=\"min-width: 150px;\">" + editCompanyCnpj.masked(item.cnpj) + "</td>\n              <td>" + item.descricao + "</td>\n              <td>\n                <a href=\"#editModal\" class=\"edit\" onclick=\"setItemToDeleteOrUpdateValue(" + item.cnpj + ")\" data-toggle=\"modal\"><i class=\"fa fa-pencil\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Editar\"></i></a>\n                <a href=\"#deleteModal\" class=\"delete\" onclick=\"setItemToDeleteOrUpdateValue(" + item.cnpj + ")\" data-toggle=\"modal\"><i class=\"fa fa-trash\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Excluir\"></i></a>\n              </td>\n            </tr>");
                });
            }
        }
        window['setItemToDeleteOrUpdateValue'] = function (value) {
            itemToEditOrDelete = value.toString();
            editCompanyCnpj.val(editCompanyCnpj.masked(itemToEditOrDelete));
        };
        //#endregion
    });
})(jQuery);
