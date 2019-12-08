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
    const addVehiclePrice = $('#add-vehicle-form [name="vehicle-price"]');
    const addPrevLastDate = $('#add-vehicle-form [name="maintance-prev-last-date"]');
    const addCorLastDate = $('#add-vehicle-form [name="maintance-cor-last-date"]');
    const addLastRecharge = $('#add-vehicle-form [name="recharge-last-date"]');
    const addVehicleOnMaintance = $('#add-vehicle-form [name="vehicle-on-maintance"]');

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
    const editVehiclePrice = $('#edit-vehicle-form [name="vehicle-price"]');
    const editPrevLastDate = $('#edit-vehicle-form [name="maintance-prev-last-date"]');
    const editCorLastDate = $('#edit-vehicle-form [name="maintance-cor-last-date"]');
    const editLastRecharge = $('#edit-vehicle-form [name="recharge-last-date"]');
    const editVehicleOnMaintance = $('#edit-vehicle-form [name="vehicle-on-maintance"]');

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let itemToEditOrDelete: string;
    let emViagem: string;
    let vehicleImagePath: string;

    addVehicleCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });
    editVehicleCompanyCnpj.mask('00.000.000/0000-00', { reverse: true });

    //#endregion

    //#region Listagem dos items
    loadingModal.modal();
    getGarages()
      .done((garages) => {

        buildGarageItens(garages);

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

      dataObj['id'] = null;
      dataObj['placa'] = addVehiclePlate.val();
      dataObj['tipo'] = addVehicleType.val();

      if (document.querySelector('#customFile')['files']) {
        if (document.querySelector('#customFile')['files'][0]) {
          dataObj['imagem'] = `C:/Users/Gabriel/Desktop/${document.querySelector('#customFile')['files'][0].name}`;
        } else {
          dataObj['imagem'] = null;
        }
      } else {
        dataObj['imagem'] = null;
      }

      dataObj['marca'] = addVehicleBrand.val();
      dataObj['modelo'] = addVehicleModel.val();
      dataObj['ano'] = parseInt(addVehicleYear.val() as string);
      dataObj['condicao'] = addVehicleCondition.val();
      dataObj['km'] = parseInt(addVehicleKm.val() as string);
      dataObj['tipoCambio'] = addVehicleTransmission.val();
      dataObj['tipoCombustivel'] = addVehicleFuel.val();
      dataObj['emViagem'] = "N";
      dataObj['emManutencao'] = addVehicleOnMaintance.val();
      dataObj['seguro'] = addVehicleInsurance.val();
      dataObj['preco'] = parseFloat(addVehiclePrice.val() as string);
      dataObj['lugares'] = parseInt(addVehiclePlaces.val() as string);
      dataObj['empresaCnpj'] = addVehicleCompanyCnpj.cleanVal();
      dataObj['empresa'] = null;
      dataObj['garagemId'] = parseInt(addVehicleGarage.val() as string);
      dataObj['garagem'] = null;
      dataObj['consumo'] = addVehicleConsume.val();
      dataObj['ultimaPreventiva'] = new Date(addPrevLastDate.val() as string) || null;
      dataObj['ultimaCorretiva'] = new Date(addCorLastDate.val() as string) || null;
      dataObj['ultimoAbastecimento'] = new Date(addLastRecharge.val() as string);
      dataObj['viagens'] = null;

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
              //resetFields(['#addModal [name="vehicle-name"]', '#addModal [name="vehicle-cnh"]', '#addModal [name="vehicle-company-cnpj"]']);

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
      dataObj['placa'] = editVehiclePlate.val();
      dataObj['tipo'] = editVehicleType.val();

      if (document.querySelector('#editCustomFile')['files']) {
        if (document.querySelector('#editCustomFile')['files'][0]) {
          dataObj['imagem'] = `C:/Users/Gabriel/Desktop/${document.querySelector('#editCustomFile')['files'][0].name}`;
        } else {
          dataObj['imagem'] = vehicleImagePath;
        }
      } else {
        dataObj['imagem'] = vehicleImagePath;
      }

      dataObj['marca'] = editVehicleBrand.val();
      dataObj['modelo'] = editVehicleModel.val();
      dataObj['ano'] = parseInt(editVehicleYear.val() as string);
      dataObj['condicao'] = editVehicleCondition.val();
      dataObj['km'] = parseInt(editVehicleKm.val() as string);
      dataObj['tipoCambio'] = editVehicleTransmission.val();
      dataObj['tipoCombustivel'] = editVehicleFuel.val();
      dataObj['emViagem'] = emViagem;
      dataObj['emManutencao'] = editVehicleOnMaintance.val();
      dataObj['seguro'] = editVehicleInsurance.val();
      dataObj['preco'] = parseFloat(editVehiclePrice.val() as string);
      dataObj['lugares'] = parseInt(editVehiclePlaces.val() as string);
      dataObj['empresaCnpj'] = editVehicleCompanyCnpj.cleanVal();
      dataObj['empresa'] = null;
      dataObj['garagemId'] = parseInt(editVehicleGarage.val() as string);
      dataObj['garagem'] = null;
      dataObj['consumo'] = editVehicleConsume.val();
      dataObj['ultimaPreventiva'] = new Date(editPrevLastDate.val() as string) || null;
      dataObj['ultimaCorretiva'] = new Date(editCorLastDate.val() as string) || null;
      dataObj['ultimoAbastecimento'] = new Date(editLastRecharge.val() as string);
      dataObj['viagens'] = null;

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
              //resetFields(['#editModal [name="vehicle-name"]', '#editModal [name="vehicle-cnh"]', '#editModal [name="vehicle-company-cnpj"]'])
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

    function getGarages(): JQueryPromise<any> {
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

    function buildGarageItens(items: any[]) {
      items.forEach((item) => {
        addVehicleGarage.append(`<option value="${item.idGaragem}">${item.nome}</option>`);
        editVehicleGarage.append(`<option value="${item.idGaragem}">${item.nome}</option>`);
      })
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
              <td style="display: none";>${item.consumo}</td>
              <td style="display: none";>${item.emViagem}</td>
              <td style="display: none";>${item.km}</td>
              <td style="display: none";>${item.lugares}</td>
              <td style="display: none";>${item.preco}</td>
              <td style="display: none";>${item.tipo}</td>
              <td style="display: none";>${item.tipoCambio}</td>
              <td style="display: none";>${item.tipoCombustivel}</td>
              <td style="display: none";>${item.ultimaCorretiva}</td>
              <td style="display: none";>${item.ultimaPreventiva}</td>
              <td style="display: none";>${item.ultimoAbastecimento}</td>
              <td style="display: none";>${item.imagem}</td>
              <td style="min-width: 100px;">${item.placa}</td>
              <td>${item.marca}</td>
              <td>${item.modelo}</td>
              <td>${item.ano}</td>
              <td style="min-width: 150px;">${addVehicleCompanyCnpj.masked(item.empresaCnpj)}</td>              
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
      editVehicleGarage.val($(itemRowData[1]).text());
      editVehicleFuel.val($(itemRowData[2]).text());
      editVehicleCondition.val($(itemRowData[3]).text());
      editVehicleConsume.val($(itemRowData[4]).text());
      emViagem = $(itemRowData[5]).text();
      editVehicleKm.val($(itemRowData[6]).text());
      editVehiclePlaces.val($(itemRowData[7]).text());
      editVehiclePrice.val($(itemRowData[8]).text());
      editVehicleType.val($(itemRowData[9]).text());
      editVehicleTransmission.val($(itemRowData[10]).text());
      editVehicleFuel.val($(itemRowData[11]).text());
      editCorLastDate.val(dateToInput($(itemRowData[12]).text()));
      editPrevLastDate.val(dateToInput($(itemRowData[13]).text()));
      editLastRecharge.val(dateToInput($(itemRowData[14]).text()));
      vehicleImagePath = $(itemRowData[15]).text();
      editVehiclePlate.val($(itemRowData[16]).text());
      editVehicleBrand.val($(itemRowData[17]).text());
      editVehicleModel.val($(itemRowData[18]).text());
      editVehicleYear.val($(itemRowData[19]).text());
      editVehicleCompanyCnpj.val(editVehicleCompanyCnpj.masked($(itemRowData[20]).text() as string));
      editVehicleInsurance.val($(itemRowData[21]).text());
      editVehicleOnMaintance.val(($(itemRowData[22]).text() as string) == 'Sim' ? 'S' : 'N');
    }

    function dateToInput(date) {
      let dateObj = new Date(date);
      return `${dateObj.getFullYear()
        }-${('0' + (dateObj.getMonth() + 1)).slice(-2)
        }-${('0' + dateObj.getDate()).slice(-2)
        }`
    }

    //#endregion
  })
})(jQuery);