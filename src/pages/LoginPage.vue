<script setup>
import { ref } from 'vue';

const user = ref({
  username: '',
  password: '',
});
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="login flex flex-center full-heigth">
        <div>
          <q-card class="login-card">
            <q-card-section>
              <div class="flex flex-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/825/825561.png"
                  width="80"
                />
              </div>
              <form @submit.prevent="login">
                <q-input v-model="user.username" label="Email" type="email">
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
                <q-input v-model="user.password" type="password" label="Senha">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
                <br />
                <br />
                <q-btn
                  type="submit"
                  icon="check_circle"
                  color="primary"
                  label="Entrar"
                  class="full-width"
                />
                <br />
                <div class="flex flex-center">
                  <p>
                    Não tem uma conta?
                    <q-btn flat @click="user.showForm = true"
                      >Cadastre-se.</q-btn
                    >
                  </p>
                </div>
              </form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.login {
  background: linear-gradient(
    45deg,
    rgb(100, 168, 121) 0%,
    rgb(53, 155, 172) 40%,
    rgb(52, 152, 185) 60%,
    rgb(71, 160, 152) 100%
  );
}
.login-card {
  background-color: #fff;
}
</style>
