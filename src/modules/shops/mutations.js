export function setShop(state, data){
    state.shop = data
    state.products = data.products
}