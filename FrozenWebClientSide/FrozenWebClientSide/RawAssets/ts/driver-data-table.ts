(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    const hostUrl: string = 'http://localhost:64523/'
    const loadingModal = $('#loading-modal');
    const addModal = $('#addModal');
    const deleteModal = $('#deleteModal');
    const deleteForm = $('#delete-driver-form');
    const editModal = $('#editModal');
    const editForm = $('#edit-driver-form');
    const addForm = $('#add-driver-form');
    const addDriverName = $('#add-driver-form [name="driver-name"]');
    const addDriverCNH = $('#add-driver-form [name="driver-cnh"]');
    const addDriverCompanyCnpj = $('#add-driver-form [name="driver-company-cnpj"]');

    const editDriverName = $('#edit-driver-form [name="driver-name"]');
    const editDriverCNH = $('#edit-driver-form [name="driver-cnh"]');
    const editDriverCompanyCnpj = $('#edit-driver-form [name="driver-company-cnpj"]');

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let itemToEditOrDelete: string;

    addDriverCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
    editDriverCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });

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

      dataObj['nome'] = addDriverName.val();
      dataObj['cnh'] = addDriverCNH.val();
      dataObj['empresaCnpj'] = addDriverCompanyCnpj.cleanVal();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Motorista/Cadastrar`,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dataObj)
      }

      $.ajax(ajaxProps)
        .done((a) => {
          getItems()
            .done((data) => {
              buildTableItems(data);
              resetFields(['#addModal [name="driver-name"]', '#addModal [name="driver-cnh"]', '#addModal [name="driver-company-cnpj"]']);

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
        url: `${hostUrl}api/Motorista/Deletar/${itemToEditOrDelete.toString()}`,
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

      dataObj['cnh'] = itemToEditOrDelete
      dataObj['nome'] = editDriverName.val();
      dataObj['empresaCnpj'] = editDriverCompanyCnpj.cleanVal();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Motorista/Atualizar`,
        contentType: 'application/json; charset=utf-8',
        type: 'PUT',
        data: JSON.stringify(dataObj)
      }

      $.ajax(ajaxProps)
        .done((a) => {
          getItems()
            .done((data) => {
              buildTableItems(data);
              resetFields(['#editModal [name="driver-name"]', '#editModal [name="driver-cnh"]', '#editModal [name="driver-company-cnpj"]'])
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
        url: `${hostUrl}api/Motorista/ListarTodosDaEmpresa/${currentUser.empresaCnpj}`,
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
      $('#driver-table tbody').html('');
      $('#data-results').text(items.length);
      if (items.length > 0) {
        items.forEach((item) => {
          $('#driver-table tbody').append(`
            <tr data-item="${item.cnh}">
              <td style="min-width: 150px;">${item.nome}</td>
              <td>${item.cnh}</td>
              <td style="min-width: 150px;">${addDriverCompanyCnpj.masked(item.empresaCnpj)}</td>
              <td>
                <a href="#editModal" class="edit" onclick="setItemToDeleteOrUpdateValue(${item.cnh})" data-toggle="modal"><i class="fa fa-pencil" aria-hidden="true" data-toggle="tooltip" title="Editar"></i></a>
                <a href="#deleteModal" class="delete" onclick="setItemToDeleteOrUpdateValue(${item.cnh})" data-toggle="modal"><i class="fa fa-trash" aria-hidden="true" data-toggle="tooltip" title="Excluir"></i></a>
              </td>
            </tr>`);
        })
      }
    }

    window['setItemToDeleteOrUpdateValue'] = function (driverCNH: string) {
      itemToEditOrDelete = driverCNH;
      let itemRowData = $(`[data-item="${driverCNH}"]`).find('td');
      editDriverName.val($(itemRowData[0]).text());
      editDriverCNH.val($(itemRowData[1]).text());
      editDriverCompanyCnpj.val(editDriverCompanyCnpj.masked($(itemRowData[2]).text() as string));
    }
    //#endregion
  })
})(jQuery);