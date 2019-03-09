import { helper } from '@ember/component/helper';

export function formatPrice(params) {
  var formattedString = parseFloat(params, 10).toFixed(2);

  return '$' + formattedString;
}

export default helper(formatPrice);
