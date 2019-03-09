import Service from '@ember/service';
import { isEmpty } from '@ember/utils';

export default Service.extend({
  authToken: null,
  userID: null,
  adminChecker: null,

  getAuthToken: function(){
    var token = null;
    if(!isEmpty(window.localStorage.getItem('auth-token'))) {
      token = window.localStorage.getItem('auth-token');
    }
    return token;
  },
  
  getUserID: function(){
    var idNumber = null;
    if(!isEmpty(window.localStorage.getItem('user-id'))) {
      idNumber = window.localStorage.getItem('user-id');
    }
    return parseInt(idNumber);
  },

  getAdminChecker: function(){
    var token = null;
    if(!isEmpty(window.localStorage.getItem('admin-checker'))) {
      token = window.localStorage.getItem('admin-checker');
    }
    return token;
  }

});
