(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    const hostUrl: string = 'http://localhost:64523/'
    const loadingModal = $('#loading-modal');
    const addModal = $('#addModal');
    const deleteModal = $('#deleteModal');
    const deleteForm = $('#delete-user-form');
    const editModal = $('#editModal');
    const editForm = $('#edit-user-form');
    const addForm = $('#add-user-form');
    const addUserName = $('#add-user-form [name="user-name"]');
    const addUserPassword = $('#add-user-form [name="user-password"]');
    const addUserEmail = $('#add-user-form [name="user-email"]');
    const addUserCompanyCnpj = $('#add-user-form [name="user-company-cnpj"]');
    const addUserAddress = $('#add-user-form [name="user-address"]');
    const addUserPhone = $('#add-user-form [name="user-phone"]');

    const editUserName = $('#edit-user-form [name="user-name"]');
    const editUserPassword = $('#edit-user-form [name="user-password"]');
    const editUserEmail = $('#edit-user-form [name="user-email"]');
    const editUserCompanyCnpj = $('#edit-user-form [name="user-company-cnpj"]');
    const editUserAddress = $('#edit-user-form [name="user-address"]');
    const editUserPhone = $('#edit-user-form [name="user-phone"]');

    let itemToEditOrDelete: number;

    addUserCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
    addUserPhone.mask('(00) 00000-0000');

    editUserCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
    editUserPhone.mask('(00) 00000-0000');

    //#endregion

    //#region Listagem dos items
    loadingModal.modal();

    getItems()
      .done((data) => {
        buildTableItems(data);
        loadingModal.modal('hide');
      })
      .fail((e) => {
        loadingModal.modal('hide');
        showHideAlert('#error-alert');
        console.log(e);
      });

    //#endregion

    //#region Função dos botões

    // Botão de adicionar
    addForm.on('submit', function (e) {

      e.preventDefault();

      addModal.modal('hide')

      loadingModal.modal();

      let dataObj: any = {}

      dataObj['nome'] = addUserName.val();
      dataObj['email'] = addUserEmail.val();
      dataObj['senha'] = addUserPassword.val();
      dataObj['empresaCnpj'] = addUserCompanyCnpj.cleanVal();
      dataObj['endereco'] = addUserAddress.val();
      dataObj['telefone'] = addUserPhone.cleanVal();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Usuario/Cadastrar`,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dataObj)
      }

      $.ajax(ajaxProps)
        .done((a) => {
          getItems()
            .done((data) => {
              buildTableItems(data);
              resetFields(['#addModal [name="user-name"]', '#addModal [name="user-email"]',
                '#addModal [name="user-password"]', '#addModal [name="user-company-cnpj"]',
                '#addModal [name="user-phone"]', '#addModal [name="user-address"]']);

              loadingModal.modal('hide');
              showHideAlert('#success-alert');
            })
            .fail((e) => {
              loadingModal.modal('hide');
              showHideAlert('#error-alert');
              console.log(e);
            });
        })
        .fail((e) => {
          loadingModal.modal('hide');
          showHideAlert('#error-alert');
          console.error(e)
        })
    })

    // Botão de excluir
    deleteForm.on('submit', function (e) {

      e.preventDefault();

      deleteModal.modal('hide');

      loadingModal.modal();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Usuario/Deletar/${itemToEditOrDelete.toString()}`,
        contentType: 'application/json; charset=utf-8',
        type: 'DELETE'
      }

      $.ajax(ajaxProps)
        .done((a) => {
          getItems()
            .done((data) => {
              buildTableItems(data);
              loadingModal.modal('hide');
              showHideAlert('#success-alert');
            })
            .fail((e) => {
              loadingModal.modal('hide');
              showHideAlert('#error-alert');
              console.log(e);
            });
        })
        .fail((e) => {
          loadingModal.modal('hide');
          showHideAlert('#error-alert');
          console.error(e)
        })
    })

    // Botão de alterar
    editForm.on('submit', function (e) {

      e.preventDefault();

      editModal.modal('hide');

      loadingModal.modal();

      let dataObj: any = {}

      dataObj['id'] = itemToEditOrDelete
      dataObj['nome'] = editUserName.val();
      dataObj['email'] = editUserEmail.val();
      dataObj['senha'] = editUserPassword.val();
      dataObj['empresaCnpj'] = editUserCompanyCnpj.cleanVal();
      dataObj['endereco'] = editUserAddress.val();
      dataObj['telefone'] = editUserPhone.cleanVal();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Usuario/Atualizar`,
        contentType: 'application/json; charset=utf-8',
        type: 'PUT',
        data: JSON.stringify(dataObj)
      }

      $.ajax(ajaxProps)
        .done((a) => {
          getItems()
            .done((data) => {
              buildTableItems(data);
              resetFields(['#editModal [name="user-name"]', '#editModal [name="user-email"]',
                '#editModal [name="user-password"]', '#editModal [name="user-company-cnpj"]',
                '#editModal [name="user-phone"]', '#editModal [name="user-address"]'])
              loadingModal.modal('hide');
              showHideAlert('#success-alert');
            })
            .fail((e) => {
              loadingModal.modal('hide');
              showHideAlert('#error-alert');
              console.log(e);
            });
        })
        .fail((e) => {
          loadingModal.modal('hide');
          showHideAlert('#error-alert');
          console.error(e);
        })
    })

    //#endregion

    //#region Funções auxiliares

    function showHideAlert(selector: string, show: boolean = true) {
      if (show) {
        $(selector).removeClass('d-none');
        setTimeout(() => {
          $(selector).addClass('d-none');
        }, 5000)
      } else {
        $(selector).addClass('d-none');
      }
    }

    function resetFields(fieldsSelectors: string[]) {
      fieldsSelectors.forEach((field: string) => {
        $(field).val(null)
      })
    }

    function getItems(): JQueryPromise<any> {
      let def: JQueryDeferred<any> = $.Deferred();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Usuario/ListarTodosDaEmpresa/12123232323232`,
        type: 'GET',
        contentType: 'application/json; charset=utf-8'
      }

      $.ajax(ajaxProps)
        .done((data) => {
          def.resolve(data);
        })
        .fail((e) => {
          def.reject(e);
        })

      return def.promise();
    }

    function buildTableItems(items: any[]) {
      $('#user-table tbody').html('');
      $('#data-results').text(items.length);
      if (items.length > 0) {
        items.forEach((item) => {
          $('#user-table tbody').append(`
            <tr data-item="${item.id}">
              <td class="d-none">${item.id}</td>
              <td class="d-none">${item.senha}</td>
              <td>${item.nome}</td>
              <td>${item.email}</td>
              <td style="min-width: 150px;">${item.endereco}</td>
              <td style="min-width: 150px;">${addUserPhone.masked(item.telefone)}</td>
              <td style="min-width: 150px;">${addUserCompanyCnpj.masked(item.empresaCnpj)}</td>
              <td>
                <a href="#editModal" class="edit" onclick="setItemToDeleteOrUpdateValue(${item.id})" data-toggle="modal"><i class="fa fa-pencil" aria-hidden="true" data-toggle="tooltip" title="Editar"></i></a>
                <a href="#deleteModal" class="delete" onclick="setItemToDeleteOrUpdateValue(${item.id})" data-toggle="modal"><i class="fa fa-trash" aria-hidden="true" data-toggle="tooltip" title="Excluir"></i></a>
              </td>
            </tr>`);
        })
      }
    }

    window['setItemToDeleteOrUpdateValue'] = function (userId: number) {
      itemToEditOrDelete = userId;
      let itemRowData = $(`[data-item="${userId}"]`).find('td');
      editUserPassword.val($(itemRowData[1]).text());
      editUserName.val($(itemRowData[2]).text());
      editUserEmail.val($(itemRowData[3]).text());
      editUserAddress.val($(itemRowData[4]).text());
      editUserPhone.val(editUserPhone.masked($(itemRowData[5]).text() as string));
      editUserCompanyCnpj.val(editUserCompanyCnpj.masked($(itemRowData[6]).text() as string));
    }
    //#endregion
  })
})(jQuery);