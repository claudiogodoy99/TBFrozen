(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    /* Ativando as tooltips e popovers */
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //#endregion

    async function initMap() {

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
        calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
      } catch (e) {
        console.log(e)
      }
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
      directionsService.route({
        origin: pointA,
        destination: pointB,
        travelMode: google.maps.TravelMode.DRIVING
      }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
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
            end: res.routes[0].legs[0].end_location
          }

          def.resolve(locations);
        })
        .fail((e) => def.reject(e));

      return def.promise();
    }

    initMap();

  })
})(jQuery);