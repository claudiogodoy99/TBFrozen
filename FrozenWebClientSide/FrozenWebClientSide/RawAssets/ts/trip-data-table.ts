(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais
    const hostUrl: string = 'http://localhost:64523/'
    const loadingModal = $('#loading-modal');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const addTripVehicle = $('#add-trip-form [name="trip-vehicle"]');
    const vehicleDetailButton = $('#vehicle-detail');

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

    //#endregion

  })
})(jQuery);