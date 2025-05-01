<template>
  <div>
    <button v-for="obj in items" :key="obj.url" class="item-button" @click="$emit('select', obj.url)">
      {{ obj.name || obj.title }}
    </button>
  </div>
</template>
<script>
import swapi from '../services/swapi';
export default {
  name: 'ItemList',
  props: ['type'],
  data: () => ({ items: [] }),
  watch: { type: { immediate: true, handler() { this.fetch(); } } },
  methods: {
    async fetch() {
      const res = await swapi.getList(this.type);
      this.items = res.data.results;
    }
  }
};
</script>