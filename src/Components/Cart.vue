<template>
  <div>
    <div :class="cClass">
      <div class="cart-menu">
        <h6 class="text-center pt-2"> <i class="fa-solid fa-cart-shopping"></i> Carrito</h6>
        <div @click="cartON" style="cursor: pointer;">X Cerrar</div>
        <hr>

        <transition name="fade">
          <div v-if="this.cartContent.length === 0" class="text-center font-italic">
            Tu carrito esta vacio, selecciona algún producto.
          </div>
        </transition>

        <transition-group name="fade">
          <div class="row" v-for="thing in cartContent" v-bind:key="thing.id">
            <div class="col4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
              <img :src="thing.img" style="width: 90px;">
            </div>
            <div class="col6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <h6>{{ thing.title }}</h6>
              <h6>{{ currencyFormat(thing.price) }}</h6>
            </div>
            <div class="col2 col-xl-2 col-lg-2 col-md-2 col-sm-2 pt-4">
              <span class="remove-btn" @click="removeThing(thing.id)">Eliminar</span>
            </div>
          </div>
        </transition-group >

        <hr v-if="this.cartContent.length !== 0">
        <div class="row justify-content-between" style="background:#ff6464;padding:10px 10px 10px 10px" v-if="this.cartPrice != undefined">
          <div class="flex-column pl-3">
            <h4>Total</h4>
          </div>
          <div class="flex-column pr-3">
            <h4>{{ currencyFormat(cartPrice) }}</h4>
          </div>
        </div>
        <h6><strong>Negocio:</strong> {{ params.shop }}</h6>
        <h6><strong>Lugar:</strong> {{ params.master }}</h6>
        <form @submit.prevent="validate()" class="pt-4">
            <div class="form-group">
              <input v-model="order.customer.name" type="text" class="form-control" required>
              <label class="label" for="Nombre">Nombre</label>
            </div>
            <div class="form-group">
              <input v-model="order.customer.phone" type="number" class="form-control" required>
              <label class="label" for="Teléfono">Teléfono</label>
            </div>
            <div class="form-group">
              <textarea v-model="order.customer.comment" class="form-control" style="overflow:hidden;" rows="2"></textarea>
              <label class="label" for="Comentario">Comentario</label>
            </div>
            <div class="form-group">
              <button 
                type="submit"
                style="background-color: #ff6464; 
                border-color: #ff6464; 
                border-radius: 5px;" 
                class="btn btn-primary"
                >
                <i class="fas fa-check"></i> 
                Hacer Pedido
              </button>
            </div>
          </form>
      </div>
    </div>

    <div :class="modalClass" @click="cartON">Cerrar</div>
  </div>
</template>

<script>
import { validate } from "json-schema";
import {mapState} from "vuex";
import axios from "axios";

export default {
  name: 'Cart',
  data() {
    return {
      cClass: 'cart',
      modalClass: 'modal off',
      order: {
        products: [],
        customer: {
          name: '',
          phone: '',
          comment: '',
        },
        params: {},
      }
    }
  },
  computed:{
    ...mapState('shops', [
      'shop',
      'params'
    ]),
    cartContent(){
      return this.$store.state.cartItems
    },
    cartPrice() {
      return this.$store.getters.totalPrice
    }
  },
  methods: {
    currencyFormat(value){
      return '$' + new Intl.NumberFormat('es-MX').format(value)
    },
    cartON() {
      if(this.cClass === 'cart on'){
        this.cClass = 'cart'
        this.modalClass = 'modal off'
      }else{
        this.cClass = 'cart on'
        this.modalClass = 'modal'
      }
    },
    removeThing(id){
      this.$store.commit('outCart',id)
    },
    validate() {
      if (this.cartContent.length < 1) {
        this.$swal({
          title: 'Upps!!',
          toast: true,
          position: 'center',
          text: 'Seleccione al menos un producto',
          showConfirmButton: false,
          icon: 'warning',
          timer: 4000,
        })
      }
      if (this.params.shop == null) {
        this.$swal({
          title: 'Upps!!',
          toast: true,
          position: 'center',
          text: 'Parece que no estas en el local',
          showConfirmButton: false,
          icon: 'warning',
          timer: 2000,
        })
        return false
      }
      if (this.order.customer.name == ''){
        this.$swal({
          title: 'Upps!!',
          toast: true,
          position: 'center',
          text: 'Ingresa tu nombre',
          showConfirmButton: false,
          icon: 'warning',
          timer: 4000,
        })
      }
      if (this.order.customer.phone == ''){
        this.$swal({
          title: 'Upps!!',
          toast: true,
          position: 'center',
          text: 'Ingresa un teléfono',
          showConfirmButton: false,
          icon: 'warning',
          timer: 4000,
        })
      }
      this.storeOrder(this.order)
    },
    storeOrder () {
      let self = this
      self.order.products = self.cartContent
      self.order.params = self.params
			axios.post('http://127.0.0.1:8000/api/shop/order/create',
			{
			_method: 'POST',
			order: self.order,
			})
			.then(function (response) {
        self.$swal({
          toast: true,
          position: 'center',
          title: 'Genial',
          text: 'Orden Creada',
          showConfirmButton: true,
          icon: 'success',
          timer: 10000,
        })
        self.cartContent = {}
        self.cartON()
			}).catch(function (error) {
				console.log(error);
			 });
    },
  }
}
</script>

<style scoped>
/* Modal Overlay */
.modal {
  display: block;
  z-index: 1050;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.modal.off {
  display: none;
}
/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
/* Cart Body */
.cart {
  position: fixed;
  margin-right: 0px;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background: #333333;
  overflow-y: auto;
  z-index:1051;
  -webkit-overflow-scrolling: touch;
  transform: translateX(360px);
  transition-property: transform;
  transition-duration: 0.4s;
}
.cart.on{
  transform: translateX(0);
  -webkit-overflow-scrolling: touch;
  transition-property: transform;
  transition-duration: 0.4s;
}

.cart-menu{
  color: #eee;
  margin-left: 10px;
  margin-right: 15px;
}

hr {
border-color: white;
}

.row{
  margin-top: 10px;
  margin-bottom: 10px;
}


.remove-btn{
  border-radius: 50%;
  content: url('../assets/multiply.png')
}

.remove-btn:hover {
  background-color: grey;
}


.form-group {
  width: 100%;
  position: relative;
  margin: 0 0 50px;
}
.form-group label {
  font-weight: 100;
  font-size: 1.0rem;
  color: grey;
  position: absolute;
  transition: .5s ease-in-out;
  top: 0px;
  z-index: 0;
}
.form-group input, .form-group textarea  {
  outline: none;
  box-shadow: none;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid #555;
  font-size: 1.4rem;
  font-weight: 100;
  width: 100%;
  height: 40px;
  transition: all 0.5s;
  z-index: 1;
  position: relative;
  border-radius: 0;
  resize: none;
  scroll-behavior: none;
}

.form-group input:valid ~ label,
.form-group input:focus ~ label,
.form-group textarea:valid ~ label,
.form-group textarea:focus ~ label {
  color: #ff6464;
  font-size: 1rem;
  top: -15px;
  transition: all 0.5s;
}

.form-group input:valid,
.form-group input:focus,
.form-group textarea:valid,
.form-group textarea:focus{
  border-color: #ff6464;
}

</style>
