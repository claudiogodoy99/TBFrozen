(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    /* Ativando as tooltips e popovers */
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //#endregion

  })
})(jQuery);