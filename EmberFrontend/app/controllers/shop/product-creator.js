import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';
import EmberObject, { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import S3Uploader from 'ember-uploader/uploaders/s3';
import ENV from 'ember-frontend/config/environment';
import swal from 'sweetalert';
import RSVP from 'rsvp';

export default Controller.extend({
  signingUrl: ENV.HOST_URL+'/api/v1/validate/product/image',
  customSession: service(),

  nameHasError: null,
  nameErrorMessage: null,
  descriptionHasError: null,
  descriptionErrorMessage: null,
  picturesHaveError: null,
  picturesErrorMessage: null,
  brandHasError: null,
  brandErrorMessage: null,
  categoryHasError: null,
  categoryErrorMessage: null,
  subCategoryHasError: null,
  subCategoryErrorMessage: null,
  priceHasError: null,
  priceErrorMessage: null,
  tokenHasError: null,
  tokenErrorMessage: null,

  category: null,
  subCategory: null,

  pictureFiles: [],

  customValidations: function() {
    var checker = true;
    var regex;
    
    if(isEmpty(this.get('name')) || (this.get('name').length != 0 && this.get('name').trim().length == 0)) {
      this.set('nameHasError', true);
      this.set('nameErrorMessage', 'Name can not be blank');
      checker = false;
    } else {
      if(this.get('name').length > 60){
        this.set('nameHasError', true);
        this.set('nameErrorMessage', 'The given name is way too big');
        checker = false;
      } else {
        this.set('nameHasError', false);
      }
    }

    if(!(isEmpty(this.get('category')))) {
      this.set('categoryHasError', false);
    } else {
      this.set('categoryHasError', true);
      this.set('categoryErrorMessage', 'Category can not be blank');
      checker = false;
    }

    if(!(isEmpty(this.get('subCategory')))) {
      this.set('subCategoryHasError', false);
    } else {
      this.set('subCategoryHasError', true);
      this.set('subCategoryErrorMessage', 'SubCategory can not be blank');
      checker = false;
    }

    if(isEmpty(this.get('description')) || (this.get('description').length != 0 && this.get('description').trim().length == 0)) {
      this.set('descriptionHasError', true);
      this.set('descriptionErrorMessage', 'Description can not be blank');
      checker = false;
    } else {
      if(this.get('description').length > 700) {
        this.set('descriptionHasError', true);
        this.set('descriptionErrorMessage', 'The given description is way too big');
        checker = false;
      } else {
        this.set('descriptionHasError', false);
      }
    }

    if(isEmpty(this.get('brand')) || (this.get('brand').length != 0 && this.get('brand').trim().length == 0)) {
      this.set('brandHasError', true);
      this.set('brandErrorMessage', 'Brand can not be blank');
      checker = false;
    } else {
      if(this.get('brand').length > 60) {
        this.set('brandHasError', true);
        this.set('brandErrorMessage', 'The given brand is way too big');
        checker = false;
      } else {
        this.set('brandHasError', false);
      }
    }

    if(isEmpty(this.get('token')) || (this.get('token').length != 0 && this.get('token').trim().length == 0)) {
      this.set('tokenHasError', true);
      this.set('tokenErrorMessage', 'Token can not be blank');
      checker = false;
    } else {
      if(this.get('token').length > 60) {
        this.set('tokenHasError', true);
        this.set('tokenErrorMessage', 'The given token is way too big');
        checker = false;
      } else {
        this.set('tokenHasError', false);
      }
    }

    if(isEmpty(this.get('price')) || (this.get('price').length != 0 && this.get('price').trim().length == 0)) {
      this.set('priceHasError', true);
      this.set('priceErrorMessage', 'Price can not be blank');
      checker = false;
    } else {
      regex = new RegExp(/^-?\d*(\.\d+)?$/);
      if(regex.test(this.get('price'))) {
        if(this.get('price') > 0) {
          this.set('priceHasError', false);
        } else {
          this.set('priceHasError', true);
          this.set('priceErrorMessage', 'Please put in a number higher than 0');
          checker = false;
        }
      } else {
        this.set('priceHasError', true);
        this.set('priceErrorMessage', 'Please put in a valid number');
        checker = false;
      }
    }

    if((this.get('pictureFiles').length) >= 3 
      && (this.get('pictureFiles').length) <= 5) {
      this.set('picturesHaveError', false);
    } else {
      if((this.get('pictureFiles').length) >= 3) {
        this.set('picturesHaveError', true);
        this.set('picturesErrorMessage', 'Too many images, max amount is 5 images');
        checker = false;
      } else {
        this.set('picturesHaveError', true);
        this.set('picturesErrorMessage', 'You need to add atleast 3 images');
        checker = false;
      }
    }

    return checker;
  },


  addedFileEvent: computed(function() {
    var _this = this;
    return function(file) {
      var myDropzone = Dropzone.forElement("#dropzone-id");
      myDropzone.removeAllFiles(true);

      _this.get('pictureFiles').addObject(file);
    };
  }),

  previewImages: observer('page', 'pictureFiles.[]', function() { 
    this.get('pictureFiles').forEach((item, index) => {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#preview-image-' + index).attr('src', e.target.result);
      }

      reader.readAsDataURL(item);
    });
  }),

  actions: {

    async create() {
      if(this.customValidations()) {
        var _this = this;

        let product = this.store.createRecord('product');
        product.set('name', this.get('name'));
        product.set('description', this.get('description'));
        product.set('brand', this.get('brand'));
        product.set('price', this.get('price'));

        product.set('category_id', this.get('subCategory'));

        let promises = [];

        this.get('pictureFiles').forEach((file, index) => {
          var promise = new RSVP.Promise(function(resolve, reject) {
            const uploader = S3Uploader.create({
              signingUrl: _this.get('signingUrl'),
              signingAjaxSettings: {
                headers: {
                  'X-AUTH-TOKEN': _this.get('token')
                }
              }
            });

            uploader.on('didUpload', response => {
              let uploadedUrl = $(response).find('Location')[0].textContent;
              uploadedUrl = decodeURIComponent(uploadedUrl);

              let picture = _this.store.createRecord('picture');
              picture.set('url', uploadedUrl);
              product.get('pictures').pushObject(picture);
              
              resolve();

            });

            uploader.upload(file);
          });

          promises.push(promise);

        });

       await RSVP.all(promises).then(function() {
          window.localStorage.setItem('auth-token', _this.get('token'));
          product.save().then(function() {
            swal("Product successfully posted!", "You have successfully posted your product!", "success");
            window.localStorage.clear();
          }).catch(function() {
            swal("Ooops!", "It would seem an error has occurred please try again.", "error");
            window.localStorage.clear();
          });
        });
      }
    },

    removePicture: function(picture) {
      this.get('pictureFiles').removeObject(picture);
    },

    setCategory: function(category) {
      this.set('category', category);
    },

    setSubCategory: function(category) {
      this.set('subCategory', category);
    },

    clearFields: function() {
      this.set('category', null);
      this.set('subCategory', null);
      this.set('name', null);
      this.set('description', null);
      this.set('brand', null);
      this.set('price', null);
      this.set('pictureFiles', []);
      this.set('nameHasError', null);
      this.set('nameErrorMessage', null);
      this.set('descriptionHasError', null);
      this.set('descriptionErrorMessage', null);
      this.set('brandHasError', null);
      this.set('brandErrorMessage', null);
      this.set('priceHasError', null);
      this.set('priceErrorMessage', null);
      this.set('tokenHasError', null);
      this.set('tokenErrorMessage', null);
      this.set('picturesHaveError', null);
      this.set('picturesErrorMessage', null);
      this.set('categoryHasError', null);
      this.set('categoryErrorMessage', null);
      this.set('subCategoryHasError', null);
      this.set('subCategoryErrorMessage', null);
    }

  }

});