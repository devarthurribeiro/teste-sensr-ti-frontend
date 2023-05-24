<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Clientes"
      :rows="store.filteredClients"
      :columns="columns"
      row-key="id"
      :pagination="{ rowsPerPage: 10 }"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="store.filterTerm"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { QTable } from 'quasar';
import { useClientStore } from '../stores/client-store';
import { formatCurrency } from '../utils';

const store = useClientStore();

store.list();

const columns: QTable['columns'] = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: 'email',
    sortable: true,
  },
];
</script>
