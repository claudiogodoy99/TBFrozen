(function ($) {
    $(function () {
        //#region Configurações Globais
        /* Fuñcionamento dos botões de acessibilidade */
        $('#toggle-contrast').bind('click', function () {
            toggleContrast();
        });
        $('#increase-size').bind('click', function () {
            toggleFontSize('+');
        });
        $('#decrease-size').bind('click', function () {
            toggleFontSize('-');
        });
        //#endregion
        //#region Declaração de funções
        function toggleContrast() {
            $("*").toggleClass('accessibility-contrast');
        }
        function toggleFontSize(operator) {
            $("*").each(function (index, e) {
                var currentSize = $(this).css('font-size');
                $(this).css('font-size', "calc(" + currentSize + " " + operator + " 5%)");
            });
        }
        //#endregion
    });
})(jQuery);
