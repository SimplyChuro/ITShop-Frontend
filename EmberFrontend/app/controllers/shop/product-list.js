import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';

export default Controller.extend({
  customSession: service(),
  store: service(),
  
  queryParams: ['name', 'parent_category', 'child_category', 'brand', 'list_type', 'minPrice', 'maxPrice'],
  name: null,
  parent_category: null,
  child_category: null,
  sorting: null,
  minPrice: null,
  maxPrice: null,
  brand: null,
  checker: null,
  listSize: 9,


  products: computed('name', 'parent_category', 'child_category', function() {
    var categoryChecker;

    if(isEmpty(this.get('parent_category'))) {
      categoryChecker = 0;
    } else {
      if(isEmpty(this.get('child_category'))) {
        categoryChecker = this.get('parent_category');
      } else {
        categoryChecker = this.get('child_category');
      }
    }

    var nameChecker = this.get('name');
    if(isEmpty(nameChecker)) {
      nameChecker = '';
    }

    return this.store.query('product', { name: nameChecker, category: categoryChecker});
  }),

  filteredProducts: computed('products', 'name', 'parent_category', 'child_category', 'minPrice', 'maxPrice', 'brand', 'sorting', 'listSize', function() {
    
    var _this = this;
    let products = this.get('products');

    let singleProduct = null;

    if(!(isEmpty(this.get('brand')))) {
      products = products.filter(
        function(product) { 
          if(product.brand == _this.get('brand')) {
            singleProduct = product;
          } else {
            singleProduct = null;
          }
          return singleProduct;
        }
      );
    }

    if(!(isEmpty(this.get('minPrice'))) || !(isEmpty(this.get('maxPrice')))) {
      products = products.filter(
        function(product) { 
          if(isEmpty(_this.get('maxPrice'))) {
            if(product.price >= _this.get('minPrice')) {
              singleProduct = product;
            } else {
              singleProduct = null;
            }
          } else if(isEmpty(_this.get('minPrice'))) {
            if(_this.get('maxPrice') >= product.price) {
              singleProduct = product;
            } else {
              singleProduct = null;
            }
          } else {
            if((_this.get('maxPrice') >= product.price) && (product.price >= _this.get('minPrice'))) {
              singleProduct = product;
            } else {
              singleProduct = null;
            }
          }
          return singleProduct;
        }
      );
    }

    return products;

  }),

  actions: {
    toggleDetails: function(category) {

      if(category.id !== this.get('parent_category')) {
        this.set('parent_category', category.id);
        this.set('child_category', null);
      } else {
        this.set('parent_category', null);
        this.set('child_category', null);
      }

    },

    selectCategory: function(selected) {
      if(selected === null){
        this.set('child_category', selected);  
        this.set('parent_category', selected);  
      } else {
        if(this.get('child_category') == selected.id) {
          this.set('child_category', null);
        } else {
          this.set('child_category', selected.id); 
        } 
      }
    },

    setSortType: function(type) {
      this.set('sorting', type);  
    },

    setBrand: function(brand) {
      this.set('brand', brand);
    },

    increaseListSize: function() {
      var currentListSize = this.get('listSize');
      currentListSize += 9;
      this.set('listSize', currentListSize);
    },

    clearFields: function() {
      this.set('name', undefined);
      this.set('parent_category', undefined);
      this.set('child_category', undefined);
      this.set('sorting', undefined);
      this.set('brand', undefined); 
      this.set('minPrice', undefined); 
      this.set('maxPrice', undefined);  
      this.set('checker', null);
      this.set('listSize', 9);
    }
  }
});