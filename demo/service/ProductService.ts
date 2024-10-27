import type { Demo } from '../../types/types';
import { getMovements } from '../../service/queries';

export const ProductService = {
    getProductsSmall() {
        return fetch('/demo/data/products-small.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getProducts(client) {
        return client
            .graphql({
                query: getMovements,
                variables: { input: { limit: 10 } }
            })
            .then((d) => d.data.getMovements.items as Demo.Product[]);
    },

    getProductsMixed() {
        return fetch('/demo/data/products-mixed.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getProductsWithOrdersSmall() {
        return fetch('/demo/data/products-orders-small.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getProductsWithOrdersLarge() {
        return fetch('/demo/data/products-orders.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    }
};
