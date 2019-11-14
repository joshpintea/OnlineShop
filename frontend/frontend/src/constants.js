

const ApiRoutes = function () {
    this.host = "127.0.0.1";
    this.port = 8000;
    this.baseUrl = 'http://' + this.host + ':' + this.port;
    this.loginUrl = this.baseUrl + '/api-token-auth/token/';
    this.baseUserUrl = this.baseUrl + '/api/user';
    this.loggedUserUrl = this.baseUserUrl + '/logged';
    this.registerUser = this.baseUserUrl + '/register';
};

export const constants = {
  routes: {
      api: new ApiRoutes(),
      savedToken: 'savedToken',
      loggedUser: 'loggedUser'
  }
};

