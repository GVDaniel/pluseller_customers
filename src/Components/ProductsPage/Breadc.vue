<template>
  <div>
  <h6 class="pt-3 text-center">{{ shop.name }}</h6>
  <nav class="row justify-content-center" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">Inicio</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">Productos</li>
    </ol>
  </nav>
</div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: 'Breadc',
  computed: {
    ...mapState('shops', [
      'shop',
      'products'
    ])
  }
}
</script>

<style scoped>
.breadcrumb {
  background: inherit !important;
  color: #2c3539 !important;
  font-size: 20px;
}

.breadcrumb>li>a {
  text-decoration: none !important;
  color: #2c3539 !important;
}

.breadcrumb>li {
  text-decoration: none !important;
  color: #ff6464 !important;
}
</style>
