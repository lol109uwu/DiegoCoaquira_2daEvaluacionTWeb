<template>
  <div>
    <button @click="fetchCharacters">Cargar Personajes</button>
    <ul v-if="characters.length">
      <li v-for="char in characters" :key="char.url">
        <strong>{{ char.name }}</strong> — {{ char.birth_year }}
      </li>
    </ul>
    <p v-else>Haz clic en "Cargar Personajes" para ver la lista.</p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'StarWarsList',
  data() {
    return {
      characters: []
    };
  },
  methods: {
    async fetchCharacters() {
      try {
        const response = await axios.get('https://www.swapi.tech/api/people/');
        this.characters = response.data.results;
      } catch (error) {
        console.error('Error al obtener datos de SWAPI:', error);
      }
    }
  }
};
</script>

<style scoped>
button {
  padding: 0.5em 1em;
  margin-bottom: 1em;
  cursor: pointer;
}
li {
  list-style: none;
  margin: 0.5em 0;
}
</style>