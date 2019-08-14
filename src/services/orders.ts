import superAgent from 'superagent';
import { OrderType, Side } from "../domain/order"
import { BaseUrl } from "../utils/constants";
import BigNumber from 'bignumber.js';

export function placeOrder(productId: string, type: OrderType, side: Side, quantity: BigNumber, price: BigNumber) {
    superAgent
        .post(BaseUrl + "/orders")
        .set('Content-Type', 'application/json')
        .send({
            type: type,
            side: side,
            product_id: productId,
            quantity: quantity.toString(),
            price: price.toString()
        })
        .end();
}

export function cancelOrder(orderId: string) {
    superAgent
        .delete(BaseUrl + "/orders/" + orderId)
        .end();
}