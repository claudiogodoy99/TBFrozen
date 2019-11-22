(function ($) {
    $(function () {
        //#region Configurações Globais
        var hostUrl = 'http://localhost:64523/';
        var loadingModal = $('#loading-modal');
        var userEmail = $('#inputEmail');
        var userPassword = $('#inputPassword');
        var lembrar = $('#inputLembrar');
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
        $('.form-signin').on('submit', function (e) {
            e.preventDefault();
            loadingModal.modal();
            var dataObj = {};
            dataObj['emailLogin'] = userEmail.val();
            dataObj['senhaLogin'] = userPassword.val();
            var ajaxProps = {
                url: hostUrl + "api/Autorizacao/Login",
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(dataObj)
            };
            $.ajax(ajaxProps)
                .done(function (res) {
                if (res.Status == 'erro') {
                    loadingModal.modal('hide');
                    showHideAlert('#warn-alert');
                }
                else if (res.Status == 'ok') {
                    loadingModal.modal('hide');
                    window.location.replace('../SitePages/home.html');
                }
            })
                .fail(function (e) {
                loadingModal.modal('hide');
                showHideAlert('#error-alert');
                console.error(e);
            });
            if (lembrar.is(":checked")) {
                var loginData = {
                    userEmail: userEmail.val(),
                    userPassword: userPassword.val()
                };
                localStorage.setItem('loginData', JSON.stringify(loginData));
            }
        });
        //#endregion
        //#region Declaração de Funções
        function showHideAlert(selector, show) {
            if (show === void 0) { show = true; }
            if (show) {
                $(selector).removeClass('d-none');
                setTimeout(function () {
                    $(selector).addClass('d-none');
                }, 5000);
            }
            else {
                $(selector).addClass('d-none');
            }
        }
        //#endregion
    });
})(jQuery);
