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
    const editForm = $('#edit-trip-form');
    const finishTripModal = $('#finishTripModal');
    const finishTripForm = $('#finish-trip-form');
    const tripDetailButton = $('#trip-detail');

    // const addTripInicio = $('#')
    const addTripVehicle = $('#add-trip-form [name="trip-vehicle"]');
    const addTripDriver = $('#add-trip-form [name="trip-driver"]');
    const addTripGarage = $('#add-trip-form [name="trip-garage"]');
    const addTriDestination = $('#add-trip-form [name="trip-destination"]');
    const addTripStart = $('#add-trip-form [name="trip-start"]');
    const addTripPrevEnd = $('#add-trip-form [name="trip-prev-end"]');

    const editTripVehicle = $('#edit-trip-form [name="trip-vehicle"]');
    const editTripDriver = $('#edit-trip-form [name="trip-driver"]');
    const editTripGarage = $('#edit-trip-form [name="trip-garage"]');
    const editTriDestination = $('#edit-trip-form [name="trip-destination"]');
    const editTripStart = $('#edit-trip-form [name="trip-start"]');
    const editTripPrevEnd = $('#edit-trip-form [name="trip-prev-end"]');

    let itemToEditOrDelete: string;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let promises: JQueryPromise<any>[] = [];

    tripDetailButton.bind('click', function () {
      window.open(`trip-master-detail.html?id=${itemToEditOrDelete}`, '_blank');
    })

    addTripVehicle.bind('change', function (event) {
      getVehicleGarage(parseInt(event.target['options'][event.target['selectedIndex']].getAttribute('data-garage')))
        .done((garage) => {
          addTripGarage.attr('data-garageId', garage.idGaragem);
          addTripGarage.val(garage.nome);
        })
        .fail((e) => {
          showHideAlert('#error-alert');
          console.error(e);
        })
    })

    editTripVehicle.bind('change', function (event) {
      getVehicleGarage(parseInt(event.target['options'][event.target['selectedIndex']].getAttribute('data-garage')))
        .done((garage) => {
          editTripGarage.attr('data-garageId', garage.idGaragem);
          editTripGarage.val(garage.nome);
        })
        .fail((e) => {
          showHideAlert('#error-alert');
          console.error(e);
        })
    })

    loadingModal.modal();
    promises.push(getAvaliableVehicles())
    promises.push(getDrivers())

    $.when(...promises)
      .then(
        (veiculos, motoristas) => {
          buildVehicleItens(veiculos);
          buildDriverItens(motoristas);
          let items = [
            {
              id: 1,
              status: 'Em progresso',
              motorista: 'Motorista A',
              veiculo: 'Brio - 2018',
              garagem: 'Garagem A',
              destino: 'Avenida Tiradentes, 789, São Paulo - SP',
              inicio: '08/12/2019 15:15:45',
              fim: null
            },
            {
              id: 2,
              status: 'Encerrada',
              motorista: 'Motorista B',
              veiculo: 'Celta - 2008',
              garagem: 'Garagem B',
              destino: 'Avenida Bandeirantes, 1745, São Paulo - SP',
              inicio: '05/12/2019 14:00:00',
              fim: '05/12/2019 16:10:13'
            }
          ]
          buildTableItems(items);
          loadingModal.modal('hide');
        },
        (e) => {
          loadingModal.modal('hide');
          showHideAlert('#error-alert');
          console.error(e);
        }
      )

    //#region Função dos botões

    // Botão de adicionar
    addForm.on('submit', function (e) {

      e.preventDefault();

      addModal.modal('hide')

      let items = [
        {
          id: 1,
          status: 'Em progresso',
          motorista: 'Motorista A',
          veiculo: 'Brio - 2018',
          garagem: 'Garagem A',
          destino: 'Avenida Tiradentes, 789, São Paulo - SP',
          inicio: '08/12/2019 15:15:45',
          fim: null
        },
        {
          id: 2,
          status: 'Encerrada',
          motorista: 'Motorista B',
          veiculo: 'Celta - 2008',
          garagem: 'Garagem B',
          destino: 'Avenida Bandeirantes, 1745, São Paulo - SP',
          inicio: '05/12/2019 14:00:00',
          fim: '05/12/2019 16:10:13'
        },
        {
          id: 3,
          status: 'Em progresso',
          motorista: addTripDriver.val(),
          veiculo: addTripVehicle.val(),
          garagem: addTripGarage.val(),
          destino: addTriDestination.val(),
          inicio: new Date(addTripStart.val() as string).toLocaleString(),
          fim: null
        }
      ]

      buildTableItems(items);
      showHideAlert('#success-alert');
      //  let dataObj: any = {}

      //dataObj['id'] = null;
      //dataObj['dataDaSaida'] = new Date(addTripStart.val() as string)
      //dataObj['garagemId'] = parseInt(addTripGarage.val() as string)
      //dataObj['cnpjId'] = currentUser.empresaCnpj
      //dataObj['veiculoId'] = parseInt(addTripVehicle.val() as string)
      //dataObj['cnhMotorista'] = parseInt(addTripDriver.val() as string)
      //dataObj['previsaoDeVolta'] = new Date(addTripPrevEnd.val() as string)
      //dataObj['voltaReal'] = null
      //dataObj['relatorioDeViagemFinalizada'] = null
      //dataObj['enderecoDestino'] = ''
      //dataObj['empresa'] = null
      //dataObj['veiculo'] = null
      //dataObj['motorista'] = null
      //dataObj['garagemEntrada'] = null

      //const ajaxProps: JQueryAjaxSettings = {
      //  url: `${hostUrl}api/Viagem/Cadastrar`,
      //  type: 'POST',
      //  contentType: 'application/json; charset=utf-8',
      //  data: JSON.stringify(dataObj)
      //}

      //$.ajax(ajaxProps)
      //  .done((a) => {
      //    getItems()
      //      .done((data) => {
      //        buildTableItems(data);
      //        document.getElementById('add-vehicle-form')['reset']();

      //        loadingModal.modal('hide');
      //        showHideAlert('#success-alert');
      //      })
      //      .fail((e) => {
      //        loadingModal.modal('hide');
      //        showHideAlert('#error-alert');
      //        console.log(e);
      //      });
      //  })
      //  .fail((e) => {
      //    loadingModal.modal('hide');
      //    showHideAlert('#error-alert');
      //    console.error(e)
      //  })
    })

    // Botão de excluir
    deleteForm.on('submit', function (e) {

      e.preventDefault();

      deleteModal.modal('hide');

      let itemRowData = $(`[data-item="${itemToEditOrDelete}"]`);
      itemRowData.hide();
      showHideAlert('#success-alert');
      // loadingModal.modal();

      //const ajaxProps: JQueryAjaxSettings = {
      //  url: `${hostUrl}api/Veiculo/Deletar/${itemToEditOrDelete.toString()}`,
      //  contentType: 'application/json; charset=utf-8',
      //  type: 'DELETE'
      //}

      //$.ajax(ajaxProps)
      //  .done((a) => {
      //    getItems()
      //      .done((data) => {
      //        buildTableItems(data);
      //        loadingModal.modal('hide');
      //        showHideAlert('#success-alert');
      //      })
      //      .fail((e) => {
      //        loadingModal.modal('hide');
      //        showHideAlert('#error-alert');
      //        console.log(e);
      //      });
      //  })
      //  .fail((e) => {
      //    loadingModal.modal('hide');
      //    showHideAlert('#error-alert');
      //    console.error(e)
      //  })
    })

    // Botão de alterar
    editForm.on('submit', function (e) {
      e.preventDefault();

      editModal.modal('hide');

      let itemRowData = $(`[data-item="${itemToEditOrDelete}"]`).find('td');
      $(itemRowData[1]).text(editTripDriver.val() as string);
      $(itemRowData[2]).text(editTripVehicle.val() as string);
      $(itemRowData[3]).text(editTripGarage.val() as string);
      $(itemRowData[4]).text(editTriDestination.val() as string);
      $(itemRowData[5]).text(new Date(editTripStart.val() as string).toLocaleString());

      showHideAlert('#success-alert');

      //const ajaxProps: JQueryAjaxSettings = {
      //  url: `${hostUrl}api/Veiculo/Atualizar`,
      //  contentType: 'application/json; charset=utf-8',
      //  type: 'PUT',
      //  data: JSON.stringify(dataObj)
      //}

      //$.ajax(ajaxProps)
      //  .done((a) => {
      //    getItems()
      //      .done((data) => {
      //        buildTableItems(data);
      //        document.getElementById('edit-vehicle-form')['reset']();
      //        loadingModal.modal('hide');
      //        showHideAlert('#success-alert');
      //      })
      //      .fail((e) => {
      //        loadingModal.modal('hide');
      //        showHideAlert('#error-alert');
      //        console.log(e);
      //      });
      //  })
      //  .fail((e) => {
      //    loadingModal.modal('hide');
      //    showHideAlert('#error-alert');
      //    console.error(e);
      //  })
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
        addTripVehicle.append(`<option data-garage="${item.garagemId}" value="${item.modelo} - ${item.ano}">${item.modelo} - ${item.ano}</option>`);
        editTripVehicle.append(`<option data-garage="${item.garagemId}" value="${item.modelo} - ${item.ano}">${item.modelo} - ${item.ano}</option>`);
      })
    }

    function getDrivers(): JQueryPromise<any> {
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

    function buildDriverItens(items: any[]) {
      items.forEach((item) => {
        addTripDriver.append(`<option value="${item.nome}">${item.nome}</option>`);
        editTripDriver.append(`<option value="${item.nome}">${item.nome}</option>`);
      })
    }

    function getVehicleGarage(id: number) {

      let def: JQueryDeferred<any> = $.Deferred();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Garagem/Buscar/${id}`,
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
      $('#trip-table tbody').html('');
      $('#data-results').text(items.length);
      if (items.length > 0) {
        items.forEach((item) => {
          $('#trip-table tbody').append(`
          <tr data-item="${item.id}">
              <td>${item.status}</td>
               <td>${item.motorista}</td>
               <td>${item.veiculo}</td>
               <td>${item.garagem}</td>
               <td>${item.destino}</td>
               <td>${item.inicio}</td>
               <td>${item.fim ? item.fim : ''}</td>
              <td style="width: 160px;">
                <a href="trip-master-detail.html?id=${item.id}" class="finish-trip"><i class="fa fa-info-circle" aria-hidden="true" data-toggle="tooltip" title="Detalhes da Viagem"></i></a>
                <a href="#finishTripModal" class="finish-trip" onclick="setItemToDeleteOrUpdateValue(${item.id})" data-toggle="modal"><i class="fa fa-flag-checkered" aria-hidden="true" data-toggle="tooltip" title="Encerrar Viagem"></i></a>
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