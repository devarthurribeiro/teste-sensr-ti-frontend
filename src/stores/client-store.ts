import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import { Client } from './models';

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [] as Client[],
    filterTerm: '',
    filterTermOptions: '',
  }),
  getters: {
    filteredClients(state): Client[] {
      return state.clients.filter((client) =>
        client.name.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    },
    optionsClients(state) {
      return state.clients
        .map((client) => ({
          label: client.name,
          value: client,
        }))
        .filter((client) =>
          client.label
            .toLowerCase()
            .includes(this.filterTermOptions.toLowerCase())
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
