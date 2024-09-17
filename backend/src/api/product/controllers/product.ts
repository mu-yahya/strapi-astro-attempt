/**
 * product controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product');
/*export default factories.createCoreController('api::product.product', ({strapi}) => ({async updateQuantity(data)
        {
            const id=data.id;
            const quantity = data.quantity;
        }

    }) );
*/
