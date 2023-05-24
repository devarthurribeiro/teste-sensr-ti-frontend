import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import { Client } from './models';

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [] as Client[],
    filterTerm: '',
  }),
  getters: {
    filteredClients(state): Client[] {
      return state.clients.filter((client) =>
        client.name.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    },
  },
  actions: {
    async create(client: Omit<Client, 'id'>) {
      const { data } = await api.post('/clients', client);
      this.clients.push(data);
    },

    async list() {
      const { data } = await api.get('/clients');
      this.clients = data;
    },
  },
});
