(function ($) {
    $(function () {
        //#region Configurações Globais
        /* Ativando as tooltips e popovers */
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
        /* Definindo comportamento das checkboxes das linhas da tabela */
        var checkbox = $('table tbody input[type="checkbox"]');
        $("#selectAll").click(function () {
            if (this['checked']) {
                checkbox.each(function () {
                    this['checked'] = true;
                });
            }
            else {
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
        /* Definindo comportamento dos input files */
        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().toString().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
        //#endregion
    });
})(jQuery);
