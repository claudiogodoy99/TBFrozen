(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    /* Ativando as tooltips dos botões de ação */
    $('[data-toggle="tooltip"]').tooltip();

    /* Definindo comportamento das checkboxes das linhas da tabela */
    let checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function () {
      if (this['checked']) {
        checkbox.each(function () {
          this['checked'] = true;
        });
      } else {
        checkbox.each(function () {
          this['checked'] = false;
        });
      }
    });
    checkbox.click(function () {
      if (!this['checked']) {
        $("#selectAll").prop("checked", false);
      }
    });

    //#endregion

  })
})(jQuery);