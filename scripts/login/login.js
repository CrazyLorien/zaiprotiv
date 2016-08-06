var login = {
    templateUrl: "../partial-views/login.html",
    controller: function () {

        this.inputType = 'password';

        this.login = () => {

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