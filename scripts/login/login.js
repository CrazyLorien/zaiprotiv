var login = {
    templateUrl: "../partial-views/login.html",
    controller: function ($auth,$location,$rootScope) {

        this.inputType = 'password';

        this.create  = () => {
             $auth.submitRegistration(this.loginForm)
                   .then(function(resp) {
                       $location.path("/main");
                       // handle success response
                    })
                    .catch(function(resp) {
                      // handle error response
                      $location.path("/");
                    });
        };

        this.login  = () => {
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

        

     $rootScope.$on('$routeChangeStart', (evt) => {
        if($auth.userIsAuthenticated())
          evt.preventDefault()
     });
    
    }
}

module.exports = login;
