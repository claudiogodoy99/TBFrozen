(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    const hostUrl: string = 'http://localhost:64523/'
    const loadingModal = $('#loading-modal');
    const addModal = $('#addModal');
    const deleteModal = $('#deleteModal');
    const deleteForm = $('#delete-vehicle-form');
    const editModal = $('#editModal');
    const editForm = $('#edit-vehicle-form');
    const addForm = $('#add-vehicle-form');

    const addVehiclePlate = $('#add-vehicle-form [name="vehicle-plate"]');
    const addVehicleType = $('#add-vehicle-form [name="vehicle-type"]');
    const addVehicleImage = $('#add-vehicle-form [name="vehicle-image"]');
    const addVehicleBrand = $('#add-vehicle-form [name="vehicle-brand"]');
    const addVehicleModel = $('#add-vehicle-form [name="vehicle-model"]');
    const addVehicleYear = $('#add-vehicle-form [name="vehicle-year"]');
    const addVehicleCompanyCnpj = $('#add-vehicle-form [name="vehicle-company-cnpj"]');
    const addVehicleInsurance = $('#add-vehicle-form [name="vehicle-insurance"]');
    const addVehicleGarage = $('#add-vehicle-form [name="vehicle-garage"]');
    const addVehicleCondition = $('#add-vehicle-form [name="vehicle-condition"]');
    const addVehicleKm = $('#add-vehicle-form [name="vehicle-km"]');
    const addVehicleFuel = $('#add-vehicle-form [name="vehicle-fuel"]');
    const addVehicleTransmission = $('#add-vehicle-form [name="vehicle-transmission"]');
    const addVehicleConsume = $('#add-vehicle-form [name="vehicle-consume"]');
    const addVehiclePlaces = $('#add-vehicle-form [name="vehicle-places"]');
    const addTireBrand = $('#add-vehicle-form [name="tire-brand"]');
    const addTireModel = $('#add-vehicle-form [name="tire-model"]');
    const addTireHoop = $('#add-vehicle-form [name="tire-hoop"]');
    const addTireCategory = $('#add-vehicle-form [name="tire-category"]');
    const addTireMessure = $('#add-vehicle-form [name="tire-messure"]');
    const addTireTerrain = $('#add-vehicle-form [name="tire-terrain"]');
    const addPrevStatus = $('#add-vehicle-form [name="maintance-prev-status"]');
    const addPrevLastDate = $('#add-vehicle-form [name="maintance-prev-last-date"]');
    const addCorStatus = $('#add-vehicle-form [name="maintance-cor-status"]');
    const addCorLastDate = $('#add-vehicle-form [name="maintance-cor-last-date"]');
    const addLastRecharge = $('#add-vehicle-form [name="recharge-last-date"]');

    const editVehiclePlate = $('#edit-vehicle-form [name="vehicle-plate"]');
    const editVehicleType = $('#edit-vehicle-form [name="vehicle-type"]');
    const editVehicleImage = $('#edit-vehicle-form [name="vehicle-image"]');
    const editVehicleBrand = $('#edit-vehicle-form [name="vehicle-brand"]');
    const editVehicleModel = $('#edit-vehicle-form [name="vehicle-model"]');
    const editVehicleYear = $('#edit-vehicle-form [name="vehicle-year"]');
    const editVehicleCompanyCnpj = $('#edit-vehicle-form [name="vehicle-company-cnpj"]');
    const editVehicleInsurance = $('#edit-vehicle-form [name="vehicle-insurance"]');
    const editVehicleGarage = $('#edit-vehicle-form [name="vehicle-garage"]');
    const editVehicleCondition = $('#edit-vehicle-form [name="vehicle-condition"]');
    const editVehicleKm = $('#edit-vehicle-form [name="vehicle-km"]');
    const editVehicleFuel = $('#edit-vehicle-form [name="vehicle-fuel"]');
    const editVehicleTransmission = $('#edit-vehicle-form [name="vehicle-transmission"]');
    const editVehicleConsume = $('#edit-vehicle-form [name="vehicle-consume"]');
    const editVehiclePlaces = $('#edit-vehicle-form [name="vehicle-places"]');
    const editTireBrand = $('#edit-vehicle-form [name="tire-brand"]');
    const editTireModel = $('#edit-vehicle-form [name="tire-model"]');
    const editTireHoop = $('#edit-vehicle-form [name="tire-hoop"]');
    const editTireCategory = $('#edit-vehicle-form [name="tire-category"]');
    const editTireMessure = $('#edit-vehicle-form [name="tire-messure"]');
    const editTireTerrain = $('#edit-vehicle-form [name="tire-terrain"]');
    const editPrevStatus = $('#edit-vehicle-form [name="maintance-prev-status"]');
    const editPrevLastDate = $('#edit-vehicle-form [name="maintance-prev-last-date"]');
    const editCorStatus = $('#edit-vehicle-form [name="maintance-cor-status"]');
    const editCorLastDate = $('#edit-vehicle-form [name="maintance-cor-last-date"]');
    const editLastRecharge = $('#edit-vehicle-form [name="recharge-last-date"]');

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let itemToEditOrDelete: string;

    addVehicleCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
    editVehicleCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });

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

      dataObj['placa'] = addVehiclePlate.val();
      dataObj['tipoVeiculo'] = addVehicleType.val();
      dataObj['imagem'] = addVehicleImage.val();
      dataObj['marca'] = addVehicleBrand.val();
      dataObj['modelo'] = addVehicleModel.val();
      dataObj['ano'] = addVehicleYear.val();
      dataObj['empresaCnpj'] = addVehicleCompanyCnpj.cleanVal();
      dataObj['seguro'] = addVehicleInsurance.val();
      dataObj['garagem'] = addVehicleGarage.val();
      dataObj['condicao'] = addVehicleCondition.val();
      dataObj['quilometragem'] = addVehicleKm.val();
      dataObj['tipoCombustivel'] = addVehicleFuel.val();
      dataObj['tipoCambio'] = addVehicleTransmission.val();
      dataObj['consumo'] = addVehicleConsume.val();
      dataObj['lugares'] = addVehiclePlaces.val();
      dataObj['pneus'] = {
        'marca': addTireBrand.val(),
        'modelo': addTireModel.val(),
        'aro': addTireHoop.val(),
        'categoria': addTireCategory.val(),
        'medida': addTireMessure.val(),
        'tipoTerreno': addTireTerrain.val()
      };
      dataObj['manutencoes'] = {
        'preventivaStatus': addPrevStatus.val(),
        'ultimaPreventiva': addPrevLastDate.val(),
        'corretivaStatus': addCorStatus.val(),
        'ultimaCorretiva': addCorLastDate.val(),
        'ultimoAbastecimento': addLastRecharge.val()
      };

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
              resetFields(['#addModal [name="vehicle-name"]', '#addModal [name="vehicle-cnh"]', '#addModal [name="vehicle-company-cnpj"]']);

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

      dataObj['cnh'] = itemToEditOrDelete
      dataObj['empresaCnpj'] = editVehicleCompanyCnpj.cleanVal();

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
              resetFields(['#editModal [name="vehicle-name"]', '#editModal [name="vehicle-cnh"]', '#editModal [name="vehicle-company-cnpj"]'])
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
            <tr data-item="${item.cnh}">
              <td style="min-width: 150px;">${item.nome}</td>
              <td>${item.cnh}</td>
              <td style="min-width: 150px;">${addVehicleCompanyCnpj.masked(item.empresaCnpj)}</td>
              <td>
                <a href="#editModal" class="edit" onclick="setItemToDeleteOrUpdateValue(${item.cnh})" data-toggle="modal"><i class="fa fa-pencil" aria-hidden="true" data-toggle="tooltip" title="Editar"></i></a>
                <a href="#deleteModal" class="delete" onclick="setItemToDeleteOrUpdateValue(${item.cnh})" data-toggle="modal"><i class="fa fa-trash" aria-hidden="true" data-toggle="tooltip" title="Excluir"></i></a>
              </td>
            </tr>`);
        })
      }
    }

    window['setItemToDeleteOrUpdateValue'] = function (vehicleCNH: string) {
      itemToEditOrDelete = vehicleCNH;
      let itemRowData = $(`[data-item="${vehicleCNH}"]`).find('td');
      editVehicleCompanyCnpj.val(editVehicleCompanyCnpj.masked($(itemRowData[2]).text() as string));
    }
    //#endregion
  })
})(jQuery);