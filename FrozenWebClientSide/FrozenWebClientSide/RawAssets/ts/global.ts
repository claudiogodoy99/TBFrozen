(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    /* Ativando as tooltips e popovers */
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    /* Fuñcionamento dos botões de acessibilidade */
    $('#toggle-contrast').bind('click', function () {
      toggleContrast();
    })

    $('#increase-size').bind('click', function () {
      toggleFontSize('+');
    })

    $('#decrease-size').bind('click', function () {
      toggleFontSize('-');
    })

    //#endregion

    //#region Declaração de funções

    function toggleContrast() {
      $("*").toggleClass('accessibility-contrast');
    }

    function toggleFontSize(operator: string) {
      $("*").each(function (index, e) {
        let currentSize = $(this).css('font-size');
        $(this).css('font-size', `calc(${currentSize} ${operator} 5%)`);
      });
    }
    //#endregion

  })
})(jQuery);