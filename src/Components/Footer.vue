<template>
  <div>
  <footer class="footer_area container">
    <div class="container">
      <div class="row justify-content-between">

        <!-- <div class="col-4 col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <div class="footer-widget">
            <div class="footer-title">Navigate</div>
            <ul class="list-unstyled">
              <router-link to="/"><li>Acerca</li></router-link>
              <router-link to="/"><li>Blog</li></router-link>
              <router-link to="/"><li>Contacto</li></router-link>
            </ul>
          </div>
        </div>

        <div class="col-4 col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <div class="footer-widget">
            <div class="footer-title">Colección</div>
            <ul class="list-unstyled">
              <router-link to="/products"><li>Nuevo</li></router-link>
              <router-link to="/products"><li>Recomen</li></router-link>
              <router-link to="/products"><li>Catálogo</li></router-link>
              <router-link to="/products"><li>Marcas</li></router-link>
            </ul>
          </div>
        </div>

        <div class="col-4 col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <div class="footer-widget">
            <div class="footer-title">Categorías</div>
            <ul class="list-unstyled">
              <router-link to="/products"><li>Tables</li></router-link>
              <router-link to="/products"><li>Lamps</li></router-link>
              <router-link to="/products"><li>Chairs</li></router-link>
              <router-link to="/products"><li>Sofas</li></router-link>
            </ul>
          </div>
        </div> -->

        <div class="col-xl-12 col-lg-3 col-md-12 col-xs-12 text-md-center text-xl-right text-sm-center pb-5">
          <div class="footer-widget">
            <h4>{{ shop.address.address_shop.address }} / {{ shop.address.address_shop.city.name }}</h4>
            <a :href="'mailto:' + shop.email">{{ shop.description.cs_email }}</a>
            <h6><a :href="'tel:' + shop.description.mobile_phone"> {{ shop.description.mobile_phone }}</a></h6>
          </div>
        </div>

      </div>

      <div class="row justify-content-between">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
          <div class="tiny-footer">
            <p>Copyright©  {{new Date().getFullYear()}} <a target="_blank" href="http://pluseller.com">Pluseller</a> | Comercio de tu ciudad. </p>
          </div>
        </div>
        <div class="col-6 col-xl-6 col-lg-4 col-md-4 col-sm-4 text-right">
          <div class="social-info">
            <strong>Redes Sociales</strong><br>
            <a v-if="shop.social_networks.facebook" :href="shop.social_networks.facebook" target="_blank">
              <i class="fa-brands fa-facebook"></i>
            </a>
            <a v-if="shop.social_networks.instagram" :href="shop.social_networks.instagram" target="_blank">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a v-if="shop.social_networks.twitter" :href="shop.social_networks.twitter" target="_blank">
              <i class="fa-brands fa-twitter"></i>
            </a>
            <a v-if="shop.social_networks.pinterest" :href="shop.social_networks.pinterest" target="_blank">
              <i class="fa-brands fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="bag" @click="openCart">
      <i class="fa-solid fa-cart-shopping"></i>
      <span class="mb-3 bg-success"  v-if="this.bagItemscount > 0">{{ bagItemscount }}</span>
    </div>
  </footer>
  <Cart ref="cartMove" />
  </div>
</template>

<script>
import {mapState} from "vuex";
import Cart from '@/Components/Cart.vue'
export default {
  name: 'Footer',
  components: {
    Cart
  },
  computed: {
    ...mapState('shops', [
      'shop',
      'products'
    ]),
    bagItemscount() {
      return this.$store.getters.itemsNumber
    }
  },
  methods: {
    openCart() {
      this.$refs.cartMove.cartON()
    }
  }
}
</script>

<style scoped>
.footer_area {
  position: relative;
  z-index: 1;
  color: #2c3539;
  background-color: #fefefe;
}

.footer-widget {
  padding-top: 60px;
}

.footer-title {
  padding-bottom: 20px;
  font-weight: bold;
}

.list-unstyled a {
  text-decoration: none;
}

.list-unstyled a li {
  color: #2c3e50;
  margin-bottom: 10px;
}

.social-info>img {
  padding-left: 10px;
}

.social-info>img:hover {
  opacity: 0.7;
}
.bag {
  position: fixed;
  bottom: 2%;
  right: 2%;
  background-color: #ff6464;
  padding: 15px;
  border-radius: 100%;
  color: white;
  cursor: pointer;
  box-shadow: 7px 10px 23px -6px rgba(0,0,0,0.42);
}

.bag span {
    border-radius: 10px;
    color: white;
    position: absolute;
    font-size: 15px;
    line-height: 1;
    padding: 2px 3px 3px 3px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    margin-left: -9px;
    bottom: 1rem;
}


</style>
