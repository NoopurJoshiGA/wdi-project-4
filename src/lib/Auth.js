
// create an object called Auth which can contain multiple functions
// it's like writing an object ex:
// const Auth = {
//  setToken: function() {
// return ...
//}
//};

const Auth = {};

Auth.isAuthenticated = function(){
  // !! changes it to truthy/falsy
  return !!this.getToken();
};

Auth.setToken = function(token) {
  localStorage.setItem('token', token);
};

Auth.getToken = function() {
  return localStorage.getItem('token');
};

Auth.removeToken = function() {
  localStorage.removeItem('token');
};

// getPayload is getting the token using getToken()
// getting the purple bit (the middle bit of the token xxx.thisbit.xxx)
// and then turning it into an object
Auth.getPayload = function() {
  const token = this.getToken();
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
};

Auth.currentUsername = function() {
  return this.getPayload().username;
};

Auth.currentUserId = function() {
  return this.getPayload().sub;
};

Auth.bearerHeader = function() {
  return {
    // request options
    headers: {
      // request headers
      authorization: `Bearer ${Auth.getToken()}`
    }
  };
};


export default Auth;
