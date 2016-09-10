var login = {
    templateUrl: "../partial-views/login.html",
    controller: function ($auth, $location, $rootScope, Notification) {

        this.inputType = 'password';

        this.create = () => {
            $auth.submitRegistration(this.loginForm)
                .then(function (resp) {
                    $location.path("/main");
                    // handle success response
                    var respData = resp.data.data;
                    Notification.success('User with email ' + respData.email + 'has been registered!');
                })
                .catch(function (resp) {
                    // handle error response
                    $location.path("/");
                    Notification.error(resp.data.errors.full_messages[0]);
                });
        };

        this.login = () => {
            $auth.submitLogin(this.loginForm)
                .then(function (resp) {
                    $location.path("/main");
                    // handle success response
                    Notification.success('Nice to meet you!');
                })
                .catch(function (resp) {
                    // handle error response
                    $location.path("/");
                    Notification.error('Oooops. Please try register it is as simple as possible - just enter email, pass and click sign up. After then click log in. And voila you are user =)');
                });
        };

        this.showPasswordValue = () => {
            if (this.inputType == 'password')
                this.inputType = 'text';
            else
                this.inputType = 'password';
        };

        $rootScope.$on('$routeChangeStart', (evt) => {
            if (!$auth.userIsAuthenticated()) {
                Notification.error('Oooops. Please try register it is as simple as possible - just enter email, pass and click sign up. After then click log in. And voila you are user =)');
                evt.preventDefault()
            }
        });

    }
}

module.exports = login;
