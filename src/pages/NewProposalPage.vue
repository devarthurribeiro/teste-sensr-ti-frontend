<script setup>
import { storeToRefs } from 'pinia';
import { useProductStore } from '../stores/product-store';
import { formatCurrency } from '../utils';
import { useClientStore } from '../stores/client-store';
import { useProposalStore } from '../stores/proposal-store';
import { useQuasar } from 'quasar';

const store = useProductStore();
const clientStore = useClientStore();
const proposalStore = useProposalStore();
const $q = useQuasar();

store.list();
clientStore.list();

function filter(val, update) {
  update(() => {
    clientStore.filterTermOptions = val;
  });
}

function filterProducts(val, update) {
  update(() => {
    store.filterTermOptions = val;
  });
}

async function submit() {
  try {
    await proposalStore.saveProposal();
    $q.notify({
      message: 'Proposta enviada com sucesso!',
      color: 'positive',
      icon: 'check',
    });
  } catch (error) {
    console.log(error);
    $q.notify({
      message: 'Erro ao enviar proposta!',
      color: 'negative',
      icon: 'warning',
    });
  }
}
</script>

<template>
  <div class="flex q-pa-md justify-end">
    <q-btn
      color="primary"
      label="Enviar Proposta"
      @click="submit"
      outline
      :loading="proposalStore.loading"
    ></q-btn>
  </div>
  <div class="row">
    <div class="col-12 col-md-6 q-pa-md">
      <q-form class="q-mb-lg">
        <div class="text-h6 q-mb-md">Cliente</div>
        <q-select
          v-model="proposalStore.currentClient"
          use-input
          emit-value
          map-options
          input-debounce="0"
          label="Buscar Cliente"
          @filter="filter"
          :options="clientStore.optionsClients"
          style="max-width: 350px"
          dense
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Nenhum encontrado
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-form>
      <q-form>
        <div class="text-h6 q-mb-md">Itens</div>
        <q-select
          @update:model-value="(val) => proposalStore.addProduct(val.value)"
          use-input
          input-debounce="0"
          label="Buscar Produto"
          @filter="filterProducts"
          :options="store.filteredProductsOptions"
          style="max-width: 350px"
          dense
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Nenhum encontrado
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-form>
    </div>
    <div class="col-12 col-md-6 q-pa-md">
      <q-list bordered>
        <q-toolbar class="bg-secondary text-white shadow-2">
          <q-toolbar-title>Resumo Proposta</q-toolbar-title>
        </q-toolbar>
        <q-item>
          <q-item-section>
            <q-item-label>Cliente</q-item-label>
          </q-item-section>
          <q-item-section side class="text-bold">
            {{ proposalStore?.currentClient?.name }}
          </q-item-section>
        </q-item>

        <q-item
          v-for="p in proposalStore.currentProducts"
          v-bind:key="p.id"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="p.image" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ p.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            {{ formatCurrency(p.price) }}
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label>Total</q-item-label>
          </q-item-section>
          <q-item-section side>
            {{ formatCurrency(proposalStore.getTotalPrice) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
