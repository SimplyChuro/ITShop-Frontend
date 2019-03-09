import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';

export default Controller.extend({

  userNameHasError: null,
  userNameErrorMessage: null,

  userSurnameHasError: null,
  userSurnameErrorMessage: null,

  userEmailHasError: null,
  userEmailErrorMessage: null,

  userPhoneHasError: null,
  userPhoneErrorMessage: null,

  userCountryHasError: null,
  userCountryErrorMessage: null,

  userZipCodeHasError: null,
  userZioCodeErrorMessage: null,

  userAddressHasError: null,
  userAddressErrorMessage: null,

  itemQuantityHasError: null,
  itemQuantityErrorMessage: null,

  customValidationPageOne: function() {
    var checker = true;
    var regex;
    
    if(isEmpty(this.get('name')) || (this.get('name').length != 0 && this.get('name').trim().length == 0)) {
      this.set('userNameHasError', true);
      this.set('userNameErrorMessage', 'Name can not be blank');
      checker = false;
    } else {
      if(this.get('name').length > 60){
        this.set('userNameHasError', true);
        this.set('userNameErrorMessage', 'The given name is way too big');
        checker = false;
      } else {
        this.set('userNameHasError', false);
      }
    }
    
    if(isEmpty(this.get('surname')) || (this.get('surname').length != 0 && this.get('surname').trim().length == 0)) {
      this.set('userSurnameHasError', true);
      this.set('userSurnameErrorMessage', 'Surname can not be blank');
      checker = false;
    } else {
      if(this.get('surname').length > 60){
        this.set('userSurnameHasError', true);
        this.set('userSurnameErrorMessage', 'The given surname is way too big');
        checker = false;
      } else {
        this.set('userSurnameHasError', false);
      }
    }

    if(isEmpty(this.get('email')) || (this.get('email').length != 0 && this.get('email').trim().length == 0)) {
      this.set('userEmailHasError', true);
      this.set('userEmailErrorMessage', 'Email can not be blank');
      checker = false;
    } else {
      regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if(regex.test(this.get('email'))) {
        if(this.get('email').length > 200){
          this.set('userEmailHasError', true);
          this.set('userEmailErrorMessage', 'The given email is way too big');
          checker = false;
        } else {
          this.set('userEmailHasError', false);
        }
      } else {
        this.set('userEmailHasError', true);
        this.set('userEmailErrorMessage', 'Invalid Email Address');
      }
    }

    if(isEmpty(this.get('phone')) || (this.get('phone').length != 0 && this.get('phone').trim().length == 0)) {
      this.set('userPhoneHasError', true);
      this.set('userPhoneErrorMessage', 'Phone can not be blank');
      checker = false;
    } else {
      regex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);
      if(regex.test(this.get('phone'))) {
        if(this.get('phone').length > 50){
          this.set('userPhoneHasError', true);
          this.set('userPhoneErrorMessage', 'The given phone number is way too big');
          checker = false;
        } else {
          this.set('userPhoneHasError', false);
        }
      } else { 
        this.set('userPhoneHasError', true);
        this.set('userPhoneErrorMessage', 'Invalid Phone Number');
        checker = false;
      }
    }

    if(isEmpty(this.get('country')) || (this.get('country').length != 0 && this.get('country').trim().length == 0)) {
      this.set('userCountryHasError', true);
      this.set('userCountryErrorMessage', 'Country can not be blank');
      checker = false;
    } else {
      if(this.get('country').length > 200){
        this.set('userCountryHasError', true);
        this.set('userCountryErrorMessage', 'The given country name is way too big');
        checker = false;
      } else {
        this.set('userCountryHasError', false);
      }
    }

    if(isEmpty(this.get('zipCode')) || (this.get('zipCode').length != 0 && this.get('zipCode').trim().length == 0)) {
      this.set('userZipCodeHasError', true);
      this.set('userZioCodeErrorMessage', 'ZipCode can not be blank');
      checker = false;
    } else {
      if(this.get('zipCode').length > 200){
        this.set('userZipCodeHasError', true);
        this.set('userZioCodeErrorMessage', 'The given ZipCode is way too big');
        checker = false;
      } else {
        this.set('userZipCodeHasError', false);
      }
    }

    if(isEmpty(this.get('address')) || (this.get('address').length != 0 && this.get('address').trim().length == 0)) {
      this.set('userAddressHasError', true);
      this.set('userAddressErrorMessage', 'Address can not be blank');
      checker = false;
    } else {
      if(this.get('address').length > 200){
        this.set('userAddressHasError', true);
        this.set('userAddressErrorMessage', 'The given address is way too big');
        checker = false;
      } else {
        this.set('userAddressHasError', false);
      }
    }

    if(isEmpty(this.get('quantity')) || (this.get('quantity').length != 0 && this.get('quantity').trim().length == 0)) {
      this.set('itemQuantityHasError', true);
      this.set('itemQuantityErrorMessage', 'Quantity can not be blank');
      checker = false;
    } else {
      regex = new RegExp(/^-?\d*(\.\d+)?$/);
      if(regex.test(this.get('quantity'))) {
        if(this.get('quantity') > 0) {
          this.set('itemQuantityHasError', false);
        } else {
          this.set('itemQuantityHasError', true);
          this.set('itemQuantityErrorMessage', 'Please put in a number higher than 0');
          checker = false;
        }
      } else {
        this.set('itemQuantityHasError', true);
        this.set('itemQuantityErrorMessage', 'Please put in a valid number');
        checker = false;
      }
    }

    return checker;
  },

  actions: {

    async checkout(){
      if(this.customValidationPageOne()) {
        this.set('userNameHasError', null);
        this.set('userNameErrorMessage', null);
        this.set('userSurnameHasError', null);
        this.set('userSurnameErrorMessage', null);
        this.set('userEmailHasError', null);
        this.set('userEmailErrorMessage', null);
        this.set('userPhoneHasError', null);
        this.set('userPhoneErrorMessage', null);
        this.set('userCountryHasError', null);
        this.set('userCountryErrorMessage', null);
        this.set('userZipCodeHasError', null);
        this.set('userZioCodeErrorMessage', null);
        this.set('userAddressHasError', null);
        this.set('userAddressErrorMessage', null);
        this.set('itemQuantityHasError', null);
        this.set('itemQuantityErrorMessage', null);
        swal("Item successfully ordered!", "You have successfully ordered your product!", "success");
      }
    },

    clearFields: function() {
      this.set('name', null);
      this.set('surname', null);
      this.set('email', null);
      this.set('phone', null);
      this.set('country', null);
      this.set('zipCode', null);
      this.set('address', null);
      this.set('quantity', null);

      this.set('userNameHasError', null);
      this.set('userNameErrorMessage', null);
      this.set('userSurnameHasError', null);
      this.set('userSurnameErrorMessage', null);
      this.set('userEmailHasError', null);
      this.set('userEmailErrorMessage', null);
      this.set('userPhoneHasError', null);
      this.set('userPhoneErrorMessage', null);
      this.set('userCountryHasError', null);
      this.set('userCountryErrorMessage', null);
      this.set('userZipCodeHasError', null);
      this.set('userZioCodeErrorMessage', null);
      this.set('userAddressHasError', null);
      this.set('userAddressErrorMessage', null);
      this.set('itemQuantityHasError', null);
      this.set('itemQuantityErrorMessage', null);

    }

  }

});