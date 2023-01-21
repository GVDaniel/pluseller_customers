export function setShop(state, data){
    state.shop = data
    state.products = data.products
    console.log(state.shop)
    if (data.incomming_order) {
        state.incoming_order = data.incoming_order
    }
}