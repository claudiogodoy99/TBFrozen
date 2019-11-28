(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    const hostUrl: string = 'http://localhost:64523/'
    const loadingModal = $('#loading-modal');
    const addModal = $('#addModal');
    const deleteModal = $('#deleteModal');
    const deleteForm = $('#delete-garage-form');
    const editModal = $('#editModal');
    const editForm = $('#edit-garage-form');
    const addGarage = $('#add-garage-form');
    const addGarageName = $('#add-garage-form [name="garage-name"]');
    const addGarageCnpj = $('#add-garage-form [name="garage-cnpj"]');
    const addGarageAddress = $('#add-garage-form [name="garage-address"]');
    const editGarageName = $('#edit-garage-form [name="garage-name"]');
    const editGarageCnpj = $('#edit-garage-form [name="garage-cnpj"]');
    const editGarageAddress = $('#edit-garage-form [name="garage-address"]');

    let itemToEditOrDelete: string;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    addGarageCnpj.mask('00.000.000/0000-00', { reverse: true });
    editGarageCnpj.mask('00.000.000/0000-00', { reverse: true });

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
    addGarage.on('submit', function (e) {

      e.preventDefault();

      addModal.modal('hide')

      loadingModal.modal();

      let dataObj: any = {}

      dataObj['nome'] = addGarageName.val();
      dataObj['empresaCnpj'] = addGarageCnpj.cleanVal();
      dataObj['endereco'] = addGarageAddress.val();
      dataObj['empresa'] = null;

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Garagem/Cadastrar`,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dataObj)
      }

      $.ajax(ajaxProps)
        .done((a) => {
          getItems()
            .done((data) => {
              buildTableItems(data);
              resetFields(['#addModal [name="garage-cnpj"]', '#addModal [name="garage-name"]', '#addModal [name="garage-address"]']);
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
        url: `${hostUrl}api/Garagem/Deletar/${itemToEditOrDelete}`,
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

      dataObj['idGaragem'] = parseInt(itemToEditOrDelete);
      dataObj['nome'] = editGarageName.val();
      dataObj['empresaCnpj'] = editGarageCnpj.cleanVal();
      dataObj['endereco'] = editGarageAddress.val();
      dataObj['empresa'] = null;

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Garagem/Atualizar`,
        contentType: 'application/json; charset=utf-8',
        type: 'PUT',
        data: JSON.stringify(dataObj)
      }

      $.ajax(ajaxProps)
        .done((a) => {
          getItems()
            .done((data) => {
              buildTableItems(data);
              resetFields(['#editModal [name="garage-cnpj"]', '#editModal [name="garage-name"]', '#editModal [name="garage-address"]'])
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
        url: `${hostUrl}api/Garagem/ListarTodasDaEmpresa/${currentUser.empresaCnpj}`,
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
      $('#garage-table tbody').html('');
      $('#data-results').text(items.length);
      if (items.length > 0) {
        items.forEach((item) => {
          $('#garage-table tbody').append(`
            <tr data-item="${item.idGaragem}">
              <td style="min-width: 150px;">${item.nome}</td>
              <td style="min-width: 150px;">${addGarageCnpj.masked(item.empresaCnpj)}</td>
              <td>${item.endereco}</td>
              <td>
                <a href="#editModal" class="edit" onclick="setItemToDeleteOrUpdateValue(${item.idGaragem})" data-toggle="modal"><i class="fa fa-pencil" aria-hidden="true" data-toggle="tooltip" title="Editar"></i></a>
                <a href="#deleteModal" class="delete" onclick="setItemToDeleteOrUpdateValue(${item.idGaragem})" data-toggle="modal"><i class="fa fa-trash" aria-hidden="true" data-toggle="tooltip" title="Excluir"></i></a>
              </td>
            </tr>`);
        })
      }
    }

    window['setItemToDeleteOrUpdateValue'] = function (value: number) {
      itemToEditOrDelete = value.toString();
      let itemRowData = $(`[data-item="${value}"]`).find('td');
      editGarageName.val($(itemRowData[0]).text());
      editGarageCnpj.val(editGarageCnpj.masked($(itemRowData[1]).text() as string));
      editGarageAddress.val($(itemRowData[2]).text());
    }
    //#endregion
  })
})(jQuery);