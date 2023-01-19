<template>
  <div>
  <h2 class="pt-3 text-center">Baldar Gastrobar</h2>
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
export default {
  name: 'Breadc'
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
