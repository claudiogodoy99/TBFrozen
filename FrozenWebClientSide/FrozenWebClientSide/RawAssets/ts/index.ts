(($: JQueryStatic) => {

  $(() => {

    //#region Configurações Globais

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

    $('#btn-entrar').bind('click', login);

    //#endregion

    //#region Declaração de Funções

    /** Função responsável por realizar o login do usuário */
    function login() {
      let email = $('#inputEmail')
      let pw = $('#inputPassword')
      let lembrar = $('#inputLembrar')

      if (lembrar.is(":checked")) {
        let loginData: any = {
          userEmail: email.val() as string,
          userPassword: pw.val() as string
        }

        localStorage.setItem('loginData', JSON.stringify(loginData))
      }

      window.location.replace('../SitePages/home.html')

    }

    //#endregion
  })
})(jQuery);