<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Produtos"
      :rows="store.filteredProducts"
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
import { useProductStore } from '../stores/product-store';
import { formatCurrency } from '../utils';

const store = useProductStore();

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
    name: 'price',
    required: true,
    label: 'Preço',
    align: 'left',
    format: (val) => formatCurrency(val),
    field: 'price',
    sortable: true,
  },
];
</script>
