import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import { Client, Proposal } from './models';

export const useProposalStore = defineStore('proposal', {
  state: () => ({
    proposals: [] as Proposal[],
    filterTerm: '',
  }),
  getters: {},
  actions: {
    async create(proposal: Omit<Client, 'id'>) {
      const { data } = await api.post('/proposals', proposal);
      this.proposals.push(data);
    },

    async list() {
      const { data } = await api.get('/proposals');
      this.proposals = data;
    },
  },
});
