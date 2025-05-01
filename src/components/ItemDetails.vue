<template>
  <div class="details-panel">
    <!-- Spinner mientras carga -->
    <div v-if="loading" class="placeholder">Cargando detalles…</div>

    <!-- Error si algo falla -->
    <div v-else-if="error" class="placeholder" style="color: red">
      Error: {{ error }}
    </div>

    <!-- Información desplegada -->
    <div v-else-if="info">
      <h3>{{ info.name || info.title }}</h3>


      <ul>
        <li v-for="(val, key) in displayed" :key="key">
          <strong>{{ formatKey(key) }}:</strong> {{ val }}
        </li>
      </ul>
    </div>

    <!-- Placeholder inicial -->
    <div v-else class="placeholder">
      Selecciona un elemento para ver detalles.
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// Define aquí los campos que quieres mostrar por tipo
const fieldsByType = {
  people: [
    'name', 'height', 'mass', 'hair_color', 'skin_color',
    'eye_color', 'birth_year', 'gender', 'homeworld'
  ],
  planets: [
    'name', 'rotation_period', 'orbital_period', 'diameter',
    'climate', 'gravity', 'terrain', 'surface_water', 'population'
  ],
  starships: [
    'name', 'model', 'manufacturer', 'cost_in_credits', 'length',
    'max_atmosphering_speed', 'crew', 'passengers', 'cargo_capacity',
    'consumables', 'hyperdrive_rating', 'MGLT', 'starship_class'
  ]
};

export default {
  name: 'ItemDetails',
  props: ['url'],
  data() {
    return {
      info: null,
      loading: false,
      error: null,
      debug: true      // cambia a false para ocultar el <pre>
    };
  },
  watch: {
    url: {
      immediate: true,
      handler(u) { this.loadDetails(u); }
    }
  },
  methods: {
    async loadDetails(u) {
      if (!u) return;
      this.loading = true;
      this.info = null;
      this.error = null;

      try {
        // 1) Llamada directa a axios para evitar capas intermedias
        const res = await axios.get(u);
        // 2) swapi.tech anida en res.data.result.properties
        const props = res.data?.result?.properties;
        if (!props) throw new Error('Formato inesperado: no hay result.properties');
        console.log('▷ Detalle (properties):', props);
        this.info = props;

        // 3) Si es persona, traducir homeworld a nombre
        if (this.type === 'people' && this.info.homeworld) {
          const hwRes = await axios.get(this.info.homeworld);
          this.info.homeworld = hwRes.data.result.properties.name;
        }
      } catch (e) {
        console.error('Error loading details:', e);
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    formatKey(k) {
      return k.replace(/_/g, ' ').toUpperCase();
    }
  },
  computed: {
    // Extrae el tipo (people|planets|starships) de la URL
    type() {
      if (!this.url) return null;
      const parts = this.url.split('/').filter(Boolean);
      return parts[parts.length - 2];
    },
    // Filtra sólo los campos que definimos en fieldsByType
    displayed() {
      if (!this.info || !this.type) return {};
      const keys = fieldsByType[this.type] || [];
      return Object.fromEntries(
        Object.entries(this.info)
          .filter(([k]) => keys.includes(k))
      );
    }
  }
};
</script>

<style scoped>
.placeholder {
  font-style: italic;
  color: #aaa;
  text-align: center;
  margin: 1rem 0;
}

.details-panel {
  color: #ffe81f;
}

.details-panel h3 {
  margin-bottom: 1rem;
}

.details-panel ul {
  list-style: none;
  padding: 0;
}

.details-panel li {
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
}

strong {
  font-weight: 600;
}
</style>