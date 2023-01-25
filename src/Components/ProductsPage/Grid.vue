<template>
  <div class="container grid">
    <div class="row justify-content-around">
      <div class="row col-6 pb-4 pr-1">
        <div class="dropdown">
          <a class="btn btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Ordenar por
            <span style="color:#ff6464;">{{ sortButton }}</span>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" @click="sortDate">Fecha</a>
            <a class="dropdown-item" @click="sortPrice" >Precio</a>
            <a class="dropdown-item" @click="sortTrend">Popular</a>
          </div>
        </div>
      </div>
      <div class="row col-6 flex-row-reverse">
        <div class="view-button">
          <div class="dropdown">
            <button class="btn btn-light dropdown-toggle d-block d-lg-none d-xl-none" role="button" id="MenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">CATEGORÍAS</button>
            <div class="dropdown-menu" aria-labelledby="MenuLink">
              <a v-for="item in shop.categories" v-bind:key="item.id" class="dropdown-item" @click="sortI(item.name)">{{item.name}}</a>
              <div class="dropdown-divider"></div>
              <!-- <div class="pl-3">
                <span class="circle" style="background-color:yellow" @click="sortI('yellow')" />
                <span class="circle" style="background-color:blue" @click="sortI('blue')"  />
                <span class="circle" style="background-color:white" @click="sortI('white')" />
                <span class="circle" style="background-color:red" @click="sortI('red')" />
              </div> -->
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="reSet">Limpiar</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col col-xl-3 col-lg-3 d-none d-lg-block d-xl-block">
          <img
            style="width:100%;"
            class="float-center img-thumbnail"
            :src="this.$apiAdress + '/assets/img/brand/profile/' + shop.description.profile_image"
          />
          <div class="card-selector">
            <div class="card-body p-5">
              <div class="search-title">
                <h4>Categorías</h4>
                <br>
                <div v-for="category in shop.categories" v-bind:key="category.id">
                  <h6 @click="sortI(category.name)">{{ category.name }}</h6>
                </div>
                <!-- <br><br><br>
                <h4 class="search-title">Filtrar por  +</h4>
                <br>
                <div class="co">
                  <h5>Color</h5>
                  <span class="circle" style="background-color:yellow" @click="sortI('yellow')"></span>
                  <span class="circle" style="background-color:blue" @click="sortI('blue')" ></span>
                  <span class="circle" style="background-color:white" @click="sortI('white')"></span>
                  <span class="circle" style="background-color:red" @click="sortI('red')"></span>
                </div>
                <br><br>
                <h5>Rango de Precio</h5>
                <slider @clicked="valueSlider"/> -->
              </div>

            </div>
          </div>
        </div>
        <div class="row col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12 text-center">
          <div v-if="this.products.length == 0" class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h4>Perdón, no hemos encontrado productos en esta categoría.</h4>
          </div>
            <Card :CardArray="cards" />
          <div class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 py-5">
            <button type="button" @click="incCardNumber" class="btn btn-outline-secondary btn-lg btn-block">Cargar Más</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slider from './slider.vue'
import {mapActions, mapState} from "vuex";
import Card from './Card.vue'

export default {
  name:'Grid',
  components: {
    slider, Card
  },
  data() {
    return {
      cards: [],
      showCards: 6,
      sortButton: 'Defecto'
    }
  },
  created(){
    // this.cards = this.it
  },
  computed: {
    ...mapState('shops', [
      'shop',
      'products'
    ]),
    it(){
    return this.shop.products.slice(0, this.showCards)
    },
    slicedCards(){
      return this.shop.products.slice(0, this.showCards)
    }
  },
  methods: {
    ...mapActions('shops', [
      'setCategory',
      'setPrice'
    ]),
    incCardNumber() {
      return this.showCards += 6
    },
    valueSlider(value) {
      var x = value[0];
      var y = value[1];
      this.cards = this.it.filter((e)=> x < e.price && e.price < y)
    },
    sortDate() {
       this.cards.sort((a, b) => (a.title.length * 2)-(b.title.length * 4))
       return this.sortButton = 'FECHA'
    },
    sortPrice() {
      this.setPrice()
       return this.sortButton = 'PRECIO'
    },
    sortTrend() {
       this.cards.sort((a, b) => a.category.name.length-b.category.name.length)
       return this.sortButton = 'POPULAR'
    },
    sortI(name){
      this.setCategory(name)
      // console.log(name)
      // this.cards = this.it.filter((e) => e.category.match(name))
      // console.log(this.cards)
    },
    reSet() {
      return this.cards = this.it
    }
  }
  }
</script>

<style>
.container.grid {
  min-height: 65rem;
}

.container.grid a {
  cursor: pointer !important;
}

.btn-light {
  color: black !important;
  background: white;
  border-radius: 0 !important;
  border: 1px solid grey !important;
}
.dropdown-menu{
  background-color: #eee;
  color: #2c3539;
}

.dropdown-menu > a:hover{
  background-color: #dae0e5

}

.btn-outline-secondary {
  border-radius: 0 !important;
}

/*search options*/

.card-selector {
  color: #ffffff;
  height: 40rem;
  background: #ff6464 !important;
  box-shadow: 0 8px 6px 0 rgba(0, 0, 0, 0.1), 0 26px 70px 0 rgba(0, 0, 0, 0.69);
}

.search-title h6 {
  cursor: pointer;
}

.circle {
  height: 17px;
  width: 17px;
  border-radius: 50%;
  border: 0.7px solid #2c3539;
  display: inline-block;
  margin-left: 6px;
  cursor:pointer
}
</style>
