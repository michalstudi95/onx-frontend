<template>
  <div class="h4 mb-4">Klient</div>
  <ClientCard :client="clientValue" :showInfo="false" />

  <div class="h4 mb-4">Przypisany pracownik</div>
  <BaseAlert
    v-if="!assignedEmployee"
    message="Ten klient nie ma przypisanego pracownika."
  />
  <EmployeeCard v-else :employee="assignedEmployee" />

  <div class="h4 mb-4">Zakupy</div>
  <LoadSpinner v-if="loading" />
  <div v-else>
    <BaseAlert
      v-if="productsValue.length === 0"
      message="Ten klient jeszcze nic nie kupił w naszym sklepie."
    />
    <table v-else class="table">
      <thead>
        <tr>
          <th scope="col">#id</th>
          <th scope="col">Nazwa</th>
          <th scope="col">Opis</th>
          <th scope="col">Cena</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productsValue" :key="product.id">
          <th>{{ product.id }}</th>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useClientStore } from "../../stores/ClientStore.js";
import { useProductStore } from "../../stores/ProductStore.js";
import { mapState, mapActions } from "pinia";
import ClientCard from "../../components/clients/ClientCard.vue";
import LoadSpinner from "../../components/UI/LoadSpinner.vue";
import BaseAlert from "../../components/UI/BaseAlert.vue";
import EmployeeCard from "../../components/employees/EmployeeCard.vue";

export default {
  components: {
    ClientCard,
    LoadSpinner,
    BaseAlert,
    EmployeeCard,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState(useClientStore, ["clientValue"]),
    ...mapState(useProductStore, ["productsValue"]),

    assignedEmployee() {
      return this.clientValue.employee ? this.clientValue.employee : null;
    },
  },

  async created() {
    this.findClient(this.id);
    this.loading = true;
    await this.loadProductsForClient(this.id);
    this.loading = false;
  },

  methods: {
    ...mapActions(useClientStore, ["findClient"]),
    ...mapActions(useProductStore, ["loadProductsForClient"]),
  },
};
</script>
