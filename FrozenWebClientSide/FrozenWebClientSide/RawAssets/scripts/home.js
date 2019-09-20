(function ($) {
    $(function () {
        //#region Configurações Globais
        /** Adiciona o comportamento de hover nas tiles */
        $(".card").hover(function () {
            $(this).addClass('shadow-lg').css('cursor', 'pointer');
        }, function () {
            $(this).removeClass('shadow-lg');
        });
        //#endregion
    });
})(jQuery);
