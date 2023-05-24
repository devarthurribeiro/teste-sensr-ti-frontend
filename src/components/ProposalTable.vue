<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Propostas"
      :rows="store.proposals"
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
import { useProposalStore } from '../stores/proposal-store';
import { formatCurrency } from '../utils';

const store = useProposalStore();

store.list();

const columns: QTable['columns'] = [
  {
    name: 'client',
    required: true,
    label: 'Cliente',
    align: 'left',
    format: (val) => val.name,
    field: 'client',
    sortable: true,
  },
  {
    name: 'cratedAte',
    required: true,
    label: 'Criado em',
    align: 'left',
    format: (val) => new Date(val).toLocaleDateString(),
    field: 'createAt',
    sortable: true,
  },
];
</script>
