import axios from 'axios';
const api = axios.create({ baseURL: 'https://www.swapi.tech/api' });

// Caché en memoria para listas e ítems
const listCache = {};
const itemCache = {};

export default {
  async getList(type) {
    if (listCache[type]) {
      // Retornar datos cacheados
      return { data: { results: listCache[type] } };
    }
    const res = await api.get(`/${type}/`);
    listCache[type] = res.data.results;
    return res;
  },
  async getItem(url) {
    if (itemCache[url]) {
      return { data: itemCache[url] };
    }
    const res = await axios.get(url);
    itemCache[url] = res.data;
    return res;
  }
};