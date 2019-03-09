import Helper from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export default Helper.extend({

  compute(params) {
    let products = params[0];
    let sorting = params[1];

    if(sorting == 'price-low'){
      return products.sortBy('startingPrice');
    }

    if(sorting == 'price-high'){
      return products.sortBy('startingPrice').reverse();
    }

    return products;
  }
  
});
