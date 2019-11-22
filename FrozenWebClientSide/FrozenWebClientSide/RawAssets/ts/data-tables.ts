(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    /* Definindo comportamento dos input files */
    $(".custom-file-input").on("change", function () {
      var fileName = $(this).val().toString().split("\\").pop();
      $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
    //#endregion

  })
})(jQuery);