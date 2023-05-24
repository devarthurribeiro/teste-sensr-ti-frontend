import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import { Product } from './models';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    filterTerm: '',
  }),
  getters: {
    filteredProducts(state): Product[] {
      return state.products.filter((product) =>
        product.name.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    },
  },
  actions: {
    async create(product: Omit<Product, 'id'>) {
      const { data } = await api.post('/products', product);
      this.products.push(data);
    },

    async list() {
      const { data } = await api.get('/products');
      this.products = data;
    },
  },
});
