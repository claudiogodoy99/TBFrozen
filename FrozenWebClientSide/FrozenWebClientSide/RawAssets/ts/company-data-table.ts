(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    const hostUrl: string = 'http://localhost:64523/'
    const loadingModal = $('#loading-modal');
    const addModal = $('#addModal');
    const deleteModal = $('#deleteModal');
    const deleteForm = $('#delete-company-form');
    const editModal = $('#editModal');
    const editForm = $('#edit-company-form');
    const addCompany = $('#add-company-form');
    const addCompanyCnpj = $('#add-company-form [name="company-cnpj"]');
    const addCompanyDescription = $('#add-company-form [name="company-description"]');
    const editCompanyCnpj = $('#edit-company-form [name="company-cnpj"]');
    const editCompanyDescription = $('#edit-company-form [name="company-description"]');
    let itemToEditOrDelete: string;

    addCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
    editCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });

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
    addCompany.on('submit', function (e) {

      e.preventDefault();

      addModal.modal('hide')

      loadingModal.modal();

      let dataObj: any = {}

      dataObj['cnpj'] = addCompanyCnpj.cleanVal();
      dataObj['descricao'] = addCompanyDescription.val();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Empresa/Cadastrar`,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dataObj)
      }

      $.ajax(ajaxProps)
        .done((a) => {
          getItems()
            .done((data) => {
              buildTableItems(data);
              resetFields(['#addModal [name="company-cnpj"]', '#addModal [name="company-description"]']);
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
        url: `${hostUrl}api/Empresa/Deletar/${itemToEditOrDelete}`,
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

      dataObj['cnpj'] = editCompanyCnpj.cleanVal();
      dataObj['descricao'] = editCompanyDescription.val();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Empresa/Atualizar`,
        contentType: 'application/json; charset=utf-8',
        type: 'PUT',
        data: JSON.stringify(dataObj)
      }

      $.ajax(ajaxProps)
        .done((a) => {
          getItems()
            .done((data) => {
              buildTableItems(data);
              resetFields(['#editModal [name="company-cnpj"]', '#editModal [name="company-description"]'])
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
        url: `${hostUrl}api/Empresa/listarTodos`,
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
      $('#empresa-table tbody').html('');
      $('#data-results').text(items.length);
      if (items.length > 0) {
        items.forEach((item) => {
          $('#empresa-table tbody').append(`<tr>
              <td style="min-width: 150px;">${editCompanyCnpj.masked(item.cnpj)}</td>
              <td>${item.descricao}</td>
              <td>
                <a href="#editModal" class="edit" onclick="setItemToDeleteOrUpdateValue(${item.cnpj})" data-toggle="modal"><i class="fa fa-pencil" aria-hidden="true" data-toggle="tooltip" title="Editar"></i></a>
                <a href="#deleteModal" class="delete" onclick="setItemToDeleteOrUpdateValue(${item.cnpj})" data-toggle="modal"><i class="fa fa-trash" aria-hidden="true" data-toggle="tooltip" title="Excluir"></i></a>
              </td>
            </tr>`);
        })
      }
    }

    window['setItemToDeleteOrUpdateValue'] = function (value: number) {
      itemToEditOrDelete = value.toString();
      editCompanyCnpj.val(editCompanyCnpj.masked(itemToEditOrDelete));
    }
    //#endregion
  })
})(jQuery);