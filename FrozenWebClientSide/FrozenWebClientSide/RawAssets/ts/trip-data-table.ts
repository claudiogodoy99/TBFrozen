(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais
    let card: string = `<div class="card">
    <div class="card-horizontal">
        <div class="img-square-wrapper">
            <img class="" src="http://via.placeholder.com/300x180" alt="Imagem do veículo" width="150" height="125">
        </div>
        <div class="card-body">
            <h4 class="card-title">Mitsubish Lancer</h4>
            <div class="float-left mr-3">
                <div><strong>Placa: </strong>XPTO64-845</div>
                <div><strong>Garagem: </strong>Garagem A</div>
            </div>
            <div class="float-right">
                <div><strong>Seguro: </strong>54754</div>
                <div><strong>Combustível: </strong>Diesel</div>
            </div>
        </div>
    </div>
    <div class="card-footer">

    </div>
</div>`;

    $('.vehicle-info a').attr('data-content', card);
    //#endregion

  })
})(jQuery);