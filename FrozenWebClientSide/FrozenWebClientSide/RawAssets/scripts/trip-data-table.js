(function ($) {
    $(function () {
        //#region Configurações Globais
        var card = "<div class=\"card\">\n    <div class=\"card-horizontal\">\n        <div class=\"img-square-wrapper\">\n            <img class=\"\" src=\"http://via.placeholder.com/300x180\" alt=\"Imagem do ve\u00EDculo\" width=\"150\" height=\"125\">\n        </div>\n        <div class=\"card-body\">\n            <h4 class=\"card-title\">Mitsubish Lancer</h4>\n            <div class=\"float-left mr-3\">\n                <div><strong>Placa: </strong>XPTO64-845</div>\n                <div><strong>Garagem: </strong>Garagem A</div>\n            </div>\n            <div class=\"float-right\">\n                <div><strong>Seguro: </strong>54754</div>\n                <div><strong>Combust\u00EDvel: </strong>Diesel</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"card-footer\">\n\n    </div>\n</div>";
        $('.vehicle-info a').attr('data-content', card);
        //#endregion
    });
})(jQuery);
