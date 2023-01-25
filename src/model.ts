// namespace OrderModule {
//     export class Order { /* … */ }
//     export function cancelOrder(order: Order) { /* … */ }
//     export function processOrder(order: Order) { /* … */ }
//    }
//    let order = new OrderModule.Order();
//    OrderModule.cancelOrder(order);

export interface Todo {
    id: number;
    todo:string;
    isDone: boolean;
}