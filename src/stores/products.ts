import superAgent, { SuperAgentRequest } from 'superagent';
import { readable, writable, derived } from 'svelte/store';
import { BaseUrl } from "../utils/constants";

export function getProducts(): SuperAgentRequest {
    return superAgent
        .get(BaseUrl + "/v1/live/products");
}

class Product {
    id: string;
    total: {
        limits: Limits;
    };
    base: {
        id: string;
        limits: Limits;
    };
    quote: {
        id: string;
        increment: number;
        limits: Limits;
    };
}

class Limits {
    min: number;
    max: number;
}

export const currentProduct = createCurrentProduct();

export const currentBase = derived(
    currentProduct,
    $currentProduct => $currentProduct ? $currentProduct.split('-')[0] : undefined
);

export const currentQuote = derived(
    currentProduct,
    $currentProduct => $currentProduct ? $currentProduct.split('-')[1] : undefined
);

function createCurrentProduct() {
    const { subscribe, update } = writable(undefined);
    let previousValue: string;

    return {
        subscribe,
        set: (value: string) => {
            update(oldValue => {
                previousValue = oldValue;
                return value;
            });
        },
        getPreviousValue: () => previousValue
    }
}

const internal: Product[] = [];

export const products = readable(internal,
    function start(set) {

        getProducts()
            .then(response => {
                for (let product of response.body.products) {
                    internal.push(product);
                }

                set(internal);
                currentProduct.set(internal[0].id);
            });

        return function stop() { }
    }
);

