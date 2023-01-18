import axios from "axios";
var apiAdress = process.env.VUE_APP_API;

export async function getShop({commit}) {
  var shop = new URL(location.href).searchParams.get('tienda')
  var master = new URL(location.href).searchParams.get('maestro')
  var data = {'shop': shop, 'master': master}
  await axios.post(apiAdress + "/api/shop/alias/", data)
    .then(response => {
      commit("setShop", response.data);
    }).catch(error => {console.log(error)});
}
