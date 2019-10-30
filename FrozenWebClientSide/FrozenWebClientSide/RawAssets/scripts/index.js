(function ($) {
    $(function () {
        //#region Configurações Globais
        /** IIFE responsável por recuperar os dados do login do usuário */
        (function () {
            var email = $('#inputEmail');
            var pw = $('#inputPassword');
            var userData = JSON.parse(localStorage.getItem('loginData'));
            if (userData) {
                email.val(userData.userEmail);
                pw.val(userData.userPassword);
            }
        })();
        //#endregion
        //#region Funções dos botões
        $('#btn-entrar').bind('click', login);
        //#endregion
        //#region Declaração de Funções
        /** Função responsável por realizar o login do usuário */
        function login() {
            var email = $('#inputEmail');
            var pw = $('#inputPassword');
            var lembrar = $('#inputLembrar');
            if (lembrar.is(":checked")) {
                var loginData = {
                    userEmail: email.val(),
                    userPassword: pw.val()
                };
                localStorage.setItem('loginData', JSON.stringify(loginData));
            }
            window.location.replace('../SitePages/home.html');
        }
        //#endregion
    });
})(jQuery);
