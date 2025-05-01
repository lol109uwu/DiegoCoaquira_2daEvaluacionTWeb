<template>
  <section class="container">
    <NavBar :selected="category" @change="updateCategory" />
    <div class="content">
      <div class="list-panel">
        <ItemList :type="category" @select="selectItem" />
      </div>
      <div class="details-panel">
        <ItemDetails v-if="itemUrl" :url="itemUrl" />
        <p v-else class="placeholder">
          Selecciona un {{ category }} para ver detalles.
        </p>
      </div>
    </div>
  </section>
</template>
<script>
import NavBar from './NavBar.vue';
import ItemList from './ItemList.vue';
import ItemDetails from './ItemDetails.vue';
import swapi from '../services/swapi';

export default {
  name: 'CategorySelector',
  components: { NavBar, ItemList, ItemDetails },
  data: () => ({ category: 'people', itemUrl: null }),
  mounted() {
    ['people', 'planets', 'starships'].forEach(t => swapi.getList(t));
  },
  methods: {
    updateCategory(opt) {
      this.category = opt;
      this.itemUrl = null;
    },
    selectItem(url) {
      this.itemUrl = url;
    }
  }
};
</script>