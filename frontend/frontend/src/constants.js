const ApiRoutes = function () {
    this.host = "127.0.0.1";
    this.port = 8000;
    this.baseUrl = 'http://' + this.host + ':' + this.port;
    this.loginUrl = this.baseUrl + '/api-token-auth/token/';
    this.revokeToken = this.baseUrl + '/api-token-auth/revoke_token/'

    this.baseUserUrl = this.baseUrl + '/api/user';
    this.baseAlbumUrl = this.baseUrl + '/api/albums';
    this.baseCartUrl = this.baseUrl + '/api/cart';

    this.loggedUserCart = this.baseUserUrl + '/cart';
    this.loggedUserUrl = this.baseUserUrl + '/logged';
    this.registerUser = this.baseUserUrl + '/register';
    this.placeOrder = this.baseUserUrl + '/place_order';
    this.addAlbumToCart = this.baseCartUrl + '/add_album';
};

export const constants = {
    routes: {
        api: new ApiRoutes(),
    },
    savedToken: 'savedToken',
    loggedUser: 'loggedUser',
    pagination: {
        defaultPagination: false,
        perPage: 2
    }

};

