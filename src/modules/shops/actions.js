import axios from "axios";
var apiAdress = process.env.VUE_APP_API;

export async function getShop({commit, state}) {
  console.log(state.params.shop)
  if (state.params.shop) {
    var data = {'shop': state.params.shop, 'master': state.params.master}
  } else {
    var shop = new URL(location.href).searchParams.get('tienda')
    var master = new URL(location.href).searchParams.get('maestro')
    var data = {'shop': shop, 'master': master}
  }
  state.params = data
  await axios.post(apiAdress + "/api/shop/alias", data)
    .then(response => {
      commit("setShop", response.data);
    }).catch(error => {console.log(error)});
}

export async function setCategory({commit, state}, name) {
  var items = state.shop.products
  var filter = items.filter((e) => e.category_x.match(name))
  state.products = filter
}

export async function setPrice({commit, state}) {
  state.products.sort((a, b) => a.price-b.price)
}
