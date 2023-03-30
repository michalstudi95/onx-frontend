<template>
  <section>
    <div class="h4 mb-3">Usuwanie klienta</div>

    <select
      v-model="clientId"
      class="form-select mb-5"
      aria-label="Default select example"
    >
      <option selected value="none">...</option>
      <option
        v-for="client in clientStore.clients"
        :key="client.id"
        :value="client.id"
      >
        {{ formatClientForSelect(client) }}
      </option>
    </select>

    <div v-if="clientId !== 'none'" class="d-flex flex-column">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-3">Dane klienta</h5>
          <div>
            <div class="mb-2">
              <span class="fw-bold">Nazwa firmy :</span>
              <span> </span>
            </div>
            <div class="mb-2">
              <span class="fw-bold">Numer NIP :</span>
              <span> </span>
            </div>
            <div class="mb-2">
              <span class="fw-bold">Imię :</span>
              <span> Test </span>
            </div>
            <div class="mb-2">
              <span class="fw-bold">Nazwisko :</span>
              <span> </span>
            </div>
            <div class="mb-2">
              <span class="fw-bold">Numer telefonu :</span>
              <span> </span>
            </div>
            <div class="mb-2">
              <span class="fw-bold">E-mail :</span>
              <span> </span>
            </div>
            <div class="mb-2">
              <span class="fw-bold">Adres :</span>
              <span> </span>
            </div>
          </div>
          <a href="#" class="card-link">Przypisany pracownik</a>
          <a href="#" class="card-link">Lista zakupionych produktów</a>
        </div>
      </div>

      <button class="btn btn-danger align-self-end mt-4">Usuń klienta</button>
    </div>
  </section>
</template>

<script>
import { useClientStore } from "../../stores/ClientStore.js";
import { mapStores, mapActions } from "pinia";

export default {
  data() {
    return {
      clientId: "none",
      client: null,
    };
  },

  computed: {
    ...mapStores(useClientStore),
  },

  watch: {
    clientId(id) {
      console.log(id);
    },
  },

  async created() {
    await this.loadClients();
  },

  methods: {
    ...mapActions(useClientStore, ["loadClients"]),

    formatClientForSelect(client) {
      return client.first_name
        ? client.first_name +
            " " +
            client.last_name +
            " - " +
            client.client_type
        : client.company_name + " - " + client.client_type;
    },
  },
};
</script>
