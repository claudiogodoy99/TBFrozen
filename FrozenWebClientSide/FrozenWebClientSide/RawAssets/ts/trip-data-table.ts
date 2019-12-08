(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais
    const hostUrl: string = 'http://localhost:64523/'
    const loadingModal = $('#loading-modal');
    const addModal = $('#addModal');
    const addForm = $('#add-trip-form');
    const deleteModal = $('#deleteModal');
    const deleteForm = $('#delete-trip-form');
    const editModal = $('#editModal');
    const editForm = $('#edit-vehicle-form');
    const finishTripModal = $('#finishTripModal');
    const finishTripForm = $('#finish-trip-form');
    const addTripVehicle = $('#add-trip-form [name="trip-vehicle"]');
    const vehicleDetailButton = $('#vehicle-detail');

    let itemToEditOrDelete: string;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    vehicleDetailButton.bind('click', function () {
      window.open(`vehicle-master-detail.html?id=${addTripVehicle.val()}`, '_blank');
    })

    loadingModal.modal();
    getAvaliableVehicles()
      .done((data: any) => {
        console.log(data);
        buildVehicleItens(data);
        loadingModal.modal('hide');
      })
      .fail((e) => {
        loadingModal.modal('hide');
        showHideAlert('#error-alert');
        console.log(e);
      });


    //#region Função dos botões

    // Botão de adicionar
    addForm.on('submit', function (e) {

      e.preventDefault();

      addModal.modal('hide')

      loadingModal.modal();

      let dataObj: any = {}

      dataObj['id'] = null;
      dataObj['placa'] = ''
      dataObj['tipo'] = ''

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Veiculo/Cadastrar`,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dataObj)
      }

      $.ajax(ajaxProps)
        .done((a) => {
          getItems()
            .done((data) => {
              buildTableItems(data);
              document.getElementById('add-vehicle-form')['reset']();

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
        url: `${hostUrl}api/Veiculo/Deletar/${itemToEditOrDelete.toString()}`,
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

      dataObj['id'] = parseInt(itemToEditOrDelete);
      dataObj['placa'] = ''
      dataObj['tipo'] = ''

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Veiculo/Atualizar`,
        contentType: 'application/json; charset=utf-8',
        type: 'PUT',
        data: JSON.stringify(dataObj)
      }

      $.ajax(ajaxProps)
        .done((a) => {
          getItems()
            .done((data) => {
              buildTableItems(data);
              document.getElementById('edit-vehicle-form')['reset']();
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

    function getAvaliableVehicles(): JQueryPromise<any> {
      let def: JQueryDeferred<any> = $.Deferred();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Veiculo/ListarTodosDisponiveis/${currentUser.empresaCnpj}`,
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

    function buildVehicleItens(items: any[]) {
      items.forEach((item) => {
        addTripVehicle.append(`<option value="${item.id}">${item.modelo} - ${item.ano}</option>`);
      })
    }

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

    function getItems(): JQueryPromise<any> {
      let def: JQueryDeferred<any> = $.Deferred();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Veiculo/ListarTodosDaEmpresa/${currentUser.empresaCnpj}`,
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
      $('#vehicle-table tbody').html('');
      $('#data-results').text(items.length);
      if (items.length > 0) {
        items.forEach((item) => {
          $('#vehicle-table tbody').append(`
            <tr data-item="${item.id}">
              <td style="display: none";>${item.id}</td>
              <td style="display: none";>${item.garagemId}</td>
              <td style="display: none";>${item.tipoCombustivel}</td>
              <td style="display: none";>${item.condicao}</td>
              <td>${item.seguro}</td>
              <td>${item.emManutencao == 'S' ? 'Sim' : 'Não'}</td>
              <td style="width: 130px;">
                <a href="vehicle-master-detail.html?id=${item.id}" class="finish-trip"><i class="fa fa-info-circle" aria-hidden="true" data-toggle="tooltip" title="Detalhes do Veículo"></i></a>
                <a href="#editModal" class="edit" onclick="setItemToDeleteOrUpdateValue(${item.id})" data-toggle="modal"><i class="fa fa-pencil" aria-hidden="true" data-toggle="tooltip" title="Editar"></i></a>
                <a href="#deleteModal" class="delete" onclick="setItemToDeleteOrUpdateValue(${item.id})" data-toggle="modal"><i class="fa fa-trash" aria-hidden="true" data-toggle="tooltip" title="Excluir"></i></a>
              </td>
            </tr>`);
        })
      }
    }

    window['setItemToDeleteOrUpdateValue'] = function (vehicleId: string) {
      itemToEditOrDelete = vehicleId;
      let itemRowData = $(`[data-item="${vehicleId}"]`).find('td');

    }

    //#endregion

  })
})(jQuery);