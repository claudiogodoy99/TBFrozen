(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

    const hostUrl: string = 'http://localhost:64523/';
    const loadingModal = $('#loading-modal');
    const userEmail = $('#inputEmail');
    const userPassword = $('#inputPassword');
    const lembrar = $('#inputLembrar');

    /** IIFE responsável por recuperar os dados do login do usuário */
    (() => {
      let email = $('#inputEmail')
      let pw = $('#inputPassword')
      let userData = JSON.parse(localStorage.getItem('loginData'))

      if (userData) {
        email.val(userData.userEmail)
        pw.val(userData.userPassword)
      }
    })();

    //#endregion

    //#region Funções dos botões

    $('.form-signin').on('submit', function (e) {

      e.preventDefault();
      loadingModal.modal();

      let dataObj: any = {}

      dataObj['emailLogin'] = userEmail.val();
      dataObj['senhaLogin'] = userPassword.val();

      const ajaxProps: JQueryAjaxSettings = {
        url: `${hostUrl}api/Autorizacao/Login`,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dataObj)
      }

      $.ajax(ajaxProps)
        .done((res) => {
          if (res.Status == 'erro') {
            loadingModal.modal('hide');
            showHideAlert('#warn-alert');
          } else if (res.Status == 'ok') {
            loadingModal.modal('hide');
            localStorage.setItem('currentUser', JSON.stringify(res.usuario));
            window.location.replace('../SitePages/home.html');
          }

        })
        .fail((e) => {
          loadingModal.modal('hide');
          showHideAlert('#error-alert');
          console.error(e);
        })

      if (lembrar.is(":checked")) {
        let loginData: any = {
          userEmail: userEmail.val() as string,
          userPassword: userPassword.val() as string
        }

        localStorage.setItem('loginData', JSON.stringify(loginData))
      }

    });

    //#endregion

    //#region Declaração de Funções

    function showHideAlert(selector: string, show: boolean = true) {
      if (show) {
        $(selector).removeClass('d-none');
        setTimeout(() => {
          $(selector).addClass('d-none');
        }, 5000)
      } else {
        $(selector).addClass('d-none');
      }
    }

    //#endregion
  })
})(jQuery);