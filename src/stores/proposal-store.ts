import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import { Client, Product, Proposal } from './models';

export const useProposalStore = defineStore('proposal', {
  state: () => ({
    loading: false,
    proposals: [] as Proposal[],
    filterTerm: '',
    currentProducts: [] as Product[],
    currentProduct: null as Product | null,
    currentClient: null as Client | null,
  }),
  getters: {
    getTotalPrice(state): number {
      return state.currentProducts.reduce((acc, product) => {
        return acc + product.price;
      }, 0);
    },
  },
  actions: {
    async create(proposal: Omit<Client, 'id'>) {
      const { data } = await api.post('/proposals', proposal);
      this.proposals.push(data);
    },

    async list() {
      const { data } = await api.get('/proposals');
      this.proposals = data;
    },

    addProduct(product: Product) {
      this.currentProducts.push(product);
    },

    async saveProposal() {
      this.loading = true;
      try {
        const proposal = {
          client: this.currentClient,
          products: this.currentProducts,
          createAt: new Date(),
        };

        await api.post('/proposals', proposal);

        this.currentProducts = [];
        this.currentClient = null;
      } catch (e) {
        throw e;
      } finally {
        this.loading = false;
      }
    },
  },
});
