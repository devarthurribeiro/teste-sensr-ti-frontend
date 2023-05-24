import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import { Product } from './models';
import { formatCurrency } from '../utils';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    filterTerm: '',
    filterTermOptions: '',
  }),
  getters: {
    filteredProducts(state): Product[] {
      return state.products.filter((product) =>
        product.name.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    },
    filteredProductsOptions(state) {
      return state.products
        .map((product) => ({
          label: `${product.name} - ${formatCurrency(product.price)}`,
          value: product,
        }))
        .filter((product) =>
          product.label
            .toLowerCase()
            .includes(this.filterTermOptions.toLowerCase())
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
