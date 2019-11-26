(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    /* Ativando as tooltips e popovers */
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    /* Iniciando a modal de carregamento */
    $('#loading-modal').modal();

    initMap()
      .then(
        () => $('#loading-modal').modal('hide'),
        () => {
          $('#loading-modal').modal('hide')
          $('#error-modal').modal()
        })

    //#endregion

    //#region Trip Map
    async function initMap(): Promise<any> {
      let def: JQueryDeferred<any> = $.Deferred();

      try {
        let origin: string = 'Rua Coronel Querubin Franco, 111 - Jardim Bebedouro, Guarulhos - SP'
        let destination: string = 'Rua Benedito Passos, 184 - Vila Matilde, São Paulo - SP'

        let locations = await getLatsAndLongs(encodeURI(origin), encodeURI(destination));

        let pointA = new google.maps.LatLng(locations.start.lat, locations.start.lng),
          pointB = new google.maps.LatLng(locations.end.lat, locations.end.lng),
          myOptions = {
            zoom: 7,
            center: pointA
          },
          map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
          // Instantiate a directions service.
          directionsService = new google.maps.DirectionsService,
          directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
          }),
          markerA = new google.maps.Marker({
            position: pointA,
            animation: google.maps.Animation.BOUNCE,
            map: map
          }),
          markerB = new google.maps.Marker({
            position: pointB,
            animation: google.maps.Animation.BOUNCE,
            map: map
          });

        // get route from A to B
        let resp: boolean = await calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, locations)

        if (resp) {
          buildRouteSteps(locations.steps);
          def.resolve();
        } else {
          def.reject();
        }

      } catch (e) {
        def.reject(e);
        console.error(e);
      }

      return def.promise();
    }

    function calculateAndDisplayRoute(directionsService: google.maps.DirectionsService, directionsDisplay: google.maps.DirectionsRenderer, pointA: google.maps.LatLng, pointB: google.maps.LatLng, locationsObject: any): JQueryPromise<boolean> {
      let def: JQueryDeferred<boolean> = $.Deferred();

      directionsService.route({
        origin: pointA,
        destination: pointB,
        travelMode: google.maps.TravelMode.DRIVING
      }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          setTripDetailInfo(locationsObject);
          directionsDisplay.setDirections(response);
          def.resolve(true);
        } else {
          console.error('Directions request failed due to ' + status)
          def.reject();
        }
      });

      return def.promise();
    }

    function getLatsAndLongs(origin: string, destination: string): JQueryPromise<any> {
      let def: JQueryDeferred<any> = $.Deferred();

      $.ajax({
        url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyCMmgvcmwZF3-ZwliwvhlIqPMEcFU170EY`,
        crossDomain: true,
        type: "GET",
        dataType: 'json',
        cache: false,
        contentType: 'application/json',
      })
        .done((res) => {
          let locations = {
            start: res.routes[0].legs[0].start_location,
            startAddress: res.routes[0].legs[0].start_address,
            end: res.routes[0].legs[0].end_location,
            endAddress: res.routes[0].legs[0].end_address,
            duration: res.routes[0].legs[0].duration.text,
            distance: `${Math.round((res.routes[0].legs[0].distance.value / 1000))} Km`,
            steps: res.routes[0].legs[0].steps
          }

          def.resolve(locations);
        })
        .fail((e) => def.reject(e));

      return def.promise();
    }

    function setTripDetailInfo(locationsObject) {
      $('#route-origin').text(locationsObject.startAddress)
      $('#route-destination').text(locationsObject.endAddress)
      $('#route-distance').text(locationsObject.distance)
      $('#route-duration').text(locationsObject.duration)
    }

    function buildRouteSteps(steps: any[]) {
      let elements: string[] = [];
      let iconClass: string;
      steps.forEach((step) => {
        if (step.maneuver) {
          if (step.maneuver.indexOf('left') > -1) iconClass = 'fa-arrow-left';
          if (step.maneuver.indexOf('right') > -1) iconClass = 'fa-arrow-right';
        } else {
          iconClass = 'fa-arrow-up';
        }

        elements.push(`<div class="feature-title">
                  <h5><i class="maneuver-icon mr-2 fa ${iconClass}" aria-hidden="true"></i><span class="step-instruction">${step.html_instructions}</span></h5>
                  <div class="text-muted step-info">${step.duration.text} (${step.distance.text})</div>
                </div>`)
      })

      $('#trajeto .feature').append(elements.join(''));
    }

    //#endregion
  })
})(jQuery);