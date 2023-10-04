<template>
  <div class="container">
    <div v-if="shop.incoming_order" class="alert alert-info text-left">
      <h6>
        <strong>{{shop.incoming_order.user_name}}</strong> Tienes una orden abierta 
        <button v-if="opOrder == false" @click="openOrder()" class="btn btn-dark">
          <small>
            <i class="fas fa-eye"></i> Ver
          </small>
        </button>
        <button v-if="opOrder == true" @click="openOrder()" class="btn btn-light">
          <small>
            <i class="fas fa-eye-slash"></i> Ocultar
          </small>
        </button>
      </h6>
    </div>
    <div v-if="opOrder" class="alert alert-light">
      <ul>
        <li v-for="product in shop.incoming_order.products" :key="product.id">{{ product.product_title }}. <small>{{ currencyFormat(product.product_price) }} </small> <span v-if="product.status_id == 8" class="badge badge-warning"> en espera</span></li>
      </ul>
      <h6><strong>Ref:</strong>#{{ shop.incoming_order.id }}</h6>
      <h6><strong>Total:</strong> {{ currencyFormat(shop.incoming_order.total) }}</h6>
      <h6><strong>Estado:</strong> {{ shop.incoming_order.status.name }}</h6>
      <button v-if="opOrder == true" @click="openOrder()" class="btn btn-light">
        <small>
          <i class="fas fa-eye-slash"></i> Ocultar
        </small>
      </button>
    </div>
    <transition-group name="fade" class="row" tag="div">
      <div v-for="item in products" class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 pb-3" :key="item.id">
          <div class="card">
            <img
              v-if="item.images && item.images.length > 0"
              class="card-img-top"
              :src="'http://api.pluseller.com/assets/img/products/' + item.images[0].name"
              alt="pluseller.blank.png"
            />
            <img
              v-else
              class="card-img-top"
              :src="
                apiUrl + 'http://api.pluseller.com/assets/img/products/blank_product.png'
              "
              alt="blank_product.png"
            />
            <!-- <img class="card-img-top" :src="item.img" alt="Card image cap"> -->
            <div class="overlay">
              <button type="button" class="btn btn-outline-secondary btn-lg" @click="addtoCart(item)">Agregar +</button>
              <router-link to="/Info"><button type="button" class="btn btn-outline-secondary btn-lg" @click="sendInfo(item)">Info</button></router-link>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ currencyFormat(item.price) }}</p>
            </div>
          </div>
      </div>
    </transition-group>
  </div>

</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  props: ['CardArray'],
  name: 'Card',
  data() {
    return {
      items: [],
      opOrder: false
    }
  },
  computed: {
    ...mapState('shops', [
      'shop',
      'products'
    ]),
  },
  created() {
    console.log('productos', this.shop)
  },
  methods: {
    ...mapActions('shops', [
      'getShop'
    ]),
    currencyFormat(value){
      return '$' + new Intl.NumberFormat('es-MX').format(value)
    },
    addtoCart(it) {
      this.$store.commit('inCart', it)
      this.$swal({
        toast: true,
        position: 'center',
        title: 'Genial',
        text: 'Producto agregado al carrito',
        showConfirmButton: false,
        icon: 'success',
        timer: 2000,
      })
    },
    sendInfo(it) {
     this.$store.commit('addtoInfo', it)
    },
    openOrder() {
      if (this.opOrder == false) {
        this.opOrder = true
      } else {
        this.opOrder = false
      }
    }
  },
  // watch: {
  //   "shop"(data) {
  //     this.items = data
  //   }
  // }
}
</script>

<style>
/* transition Group style */
.fade-move {
  transition: transform 1s;
}
/* Card Style */
.card {
  transition: 500ms;
  position: relative;
  overflow: hidden;
}

.card img {
  z-index: 1;
}

.card button {
  width: 140px;
  margin-bottom: 10px;
}

.card:hover img {
  filter: blur(4px);
}

.card:hover .overlay {
  opacity: 0.8;

}

.card .overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  background-color: #232b34;
  opacity: 0;
  z-index: 100;
  transition: all 0.3s ease-in;
}

.card:hover, .card:active {
  transform: scaleY(1.1) scaleX(1.06);
  box-shadow: 0 14px 98px rgba(0, 0, 0, 0.25), 0 0px 60px rgba(0, 0, 0, 0.22);
}
</style>
