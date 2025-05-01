<template>
  <aside class="sidebar">
    <button v-for="opt in options" :key="opt" @click="$emit('change', opt)" :class="{ active: selected === opt }"
      class="item-button">
      {{ opt.toUpperCase() }}
    </button>
  </aside>
</template>
<script>
export default {
  name: 'NavBar',
  props: { selected: String },
  data: () => ({ options: ['people', 'planets', 'starships'] })
};
</script>