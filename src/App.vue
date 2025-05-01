<template>
  <div id="app">
    <h1>STAR WARS PORTAL</h1>
    <CategorySelector />
  </div>
</template>

<script>
import CategorySelector from './components/CategorySelector.vue';
export default { name: 'App', components: { CategorySelector } };
</script>

<style>
@import './assets/styles.css';

h1 {
  margin: 1rem;
  text-align: center;
}
</style>