<template>
  <div>
    <Breadc />
    <Grid />
  </div>
</template>

<script>
import Breadc from '@/Components/ProductsPage/Breadc.vue'
import Grid from '@/Components/ProductsPage/Grid.vue'
import {mapActions} from "vuex";

export default {
  components: {
    Breadc, Grid
  },
  mounted: function () {
    var alias = this.$route.params.alias
    console.log(alias)
    this.getShop(alias)
  },
  methods: {
    ...mapActions('shops', [
      'getShop'
    ]),
  }
}
</script>
