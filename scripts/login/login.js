var login = {
    templateUrl: "../partial-views/login.html",
    controller: function ($auth,$location) {

        this.inputType = 'password';

        this.login = () => {
             $auth.submitLogin(this.loginForm)
                   .then(function(resp) {
                       $location.path("/main");
                       // handle success response
                    })
                    .catch(function(resp) {
                    // handle error response
                      $location.path("/");
                    });
        };

        this.showPasswordValue = ()=> {

            if (this.inputType == 'password')
                this.inputType = 'text';
            else
                this.inputType = 'password';
        };
    }
};

module.exports = login;