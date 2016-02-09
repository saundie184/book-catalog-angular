app.factory('authInterceptor', ['$rootScope', '$q','$window', authInterceptorFunc]);

function authInterceptorFunc($rootScope, $q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStoragetoken;
      }
      return config;
    },
    response: function(response){
      if(response.status == 401){
        //handle this case here
        console.log('User not authorized!!');
      }
      return response || $q.when(response);
    }
  };
}
