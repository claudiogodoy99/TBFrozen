(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    const hostUrl: string = 'http://localhost:64523/'
    const loadingModal = $('#loading-modal');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const vehicleIdParam: string = new URLSearchParams(window.location.search).get('id');

    const vehicleTitle = $('#vehicle-title h3');
    const vehicleImage = $('#vehicle-image img');
    const vehicleCondition = $('#vehicle-condition');
    const vehicleKm = $('#vehicle-km');
    const vehicleFuelType = $('#vehicle-fuel-type');
    const vehicleTransmission = $('#vehicle-transmission');
    const vehicleConsume = $('#vehicle-consume');
    const vehicleType = $('#vehicle-type');
    const vehicleBrand = $('#vehicle-brand');
    const vehicleModel = $('#vehicle-model');
    const vehicleYear = $('#vehicle-year');
    const vehiclePlaces = $('#vehicle-places');
    const vehicleInsurance = $('#vehicle-insurance');
    const vehiclePlate = $('#vehicle-plate');
    const vehicleGarage = $('#vehicle-garage');
    const companyCnpj = $('#company-cnpj');
    const vehiclePrice = $('#vehicle-price');
    const onMaintance = $('#on-maintance');
    const onTrip = $('#on-trip');
    const lastCorretive = $('#last-corretive');
    const lastPreventive = $('#last-preventive');
    const lastRecharge = $('#last-recharge');

    companyCnpj.mask('00.000.000/0000-00', { reverse: true });
    //#endregion

    loadingModal.modal();
    getVehicleById(vehicleIdParam)
      .done((data: any) => {

        let vehicle = data;

        getVehicleGarage(vehicle.garagemId)
          .done((garagem: any) => {
            vehicle.garagem = garagem;

            displayVehicleDetails(data);
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

    function displayVehicleDetails(vehicleInfo: any) {
      vehicleTitle.text(`${vehicleInfo.modelo} - ${vehicleInfo.ano}`);
      vehicleImage.attr('src', vehicleInfo.imagem);
      vehicleCondition.text(fitCondition(vehicleInfo.condicao));
      vehicleKm.text(`${vehicleInfo.km} km`);
      vehicleFuelType.text(fitFuelType(vehicleInfo.tipoCombustivel));
      vehicleTransmission.text(fitTransmission(vehicleInfo.tipoCambio));
      vehicleConsume.text(vehicleInfo.consumo);
      vehicleType.text(fitVehicleType(vehicleInfo.tipo));
      vehicleBrand.text(vehicleInfo.marca);
      vehicleModel.text(vehicleInfo.modelo);
      vehicleYear.text(vehicleInfo.ano);
      vehiclePlaces.text(vehicleInfo.lugares);
      vehicleInsurance.text(vehicleInfo.seguro);
      vehiclePlate.text(vehicleInfo.placa);
      vehicleGarage.text(vehicleInfo.garagem.nome);
      companyCnpj.text(companyCnpj.masked(vehicleInfo.empresaCnpj as string));
      vehiclePrice.text(`R$ ${vehicleInfo.preco}`.replace(/\./g, ','));
      onMaintance.text(fitYesNo(vehicleInfo.emManutencao));
      onTrip.text(fitYesNo(vehicleInfo.emViagem));
      lastCorretive.text(fitDate(vehicleInfo.ultimaCorretiva));
      lastPreventive.text(fitDate(vehicleInfo.ultimaPreventiva));
      lastRecharge.text(fitDate(vehicleInfo.ultimoAbastecimento));
    }

    function getVehicleById(id: string): JQueryPromise<any> {
      let def: JQueryDeferred<any> = $.Deferred();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Veiculo/BuscarPorId/${id}`,
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

    function fitCondition(condition: string) {
      let conditionHash: { [key: string]: string } = {
        N: 'Novo',
        U: 'Usado'
      };

      return conditionHash[condition];

    }

    function fitFuelType(fuelType: string) {
      let fuelTypeHash: { [key: string]: string } = {
        G: 'Gasolina',
        A: 'Álcool',
        F: 'Flex',
        E: 'Energia Elétrica',
        H: 'Híbrido'
      };

      return fuelTypeHash[fuelType];

    }

    function fitTransmission(param: string) {
      let hash: { [key: string]: string } = {
        A: 'Automática',
        M: 'Manual'
      };

      return hash[param];

    }

    function fitVehicleType(param: string) {
      let hash: { [key: string]: string } = {
        SUV: 'SUV',
        S: 'Sedan',
        H: 'Hatch'
      };

      return hash[param];

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

    function fitDate(date: string) {
      if (date) {
        return new Date(date).toLocaleDateString();
      } else {
        return 'N/A';
      }
    }

    function fitYesNo(param: string) {
      let hash: { [key: string]: string } = {
        S: 'Sim',
        N: 'Não'
      };

      return hash[param];
    }
  })
})(jQuery);