<template>
  <section>
    <div class="d-flex mb-2">
      <PageTitle title="Dodawanie klienta" class="me-3" />
      <LoadSpinner v-if="loading" />
    </div>

    <BaseAlert v-if="alertMessage" :message="alertMessage" class="mb-3" />

    <ClientForm
      @send-form="addClient"
      buttonTitle="Dodaj klienta"
      :sending="loading"
    />
  </section>
</template>

<script>
import { useClientStore } from "../../../stores/ClientStore.js";
import { mapActions } from "pinia";

import PageTitle from "../../../components/UI/PageTitle.vue";
import ClientForm from "../../../components/clients/ClientForm.vue";

export default {
  components: {
    PageTitle,
    ClientForm,
  },

  data() {
    return {
      alertMessage: "",
      loading: false,
    };
  },

  methods: {
    ...mapActions(useClientStore, ["addClientToStore"]),

    async addClient(client) {
      this.loading = true;
      await fetch("http://127.0.0.1:8000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      })
        .then((response) => {})
        .then((data) => {
          //success
          this.loading = false;
          this.alertMessage = "Dodawanie klienta powiodło się.";
          this.addClientToStore(client);
        })
        .catch((error) => {
          this.loading = false;
          this.alertMessage = "Dodawanie klienta nie powiodło się.";
          console.error("Error:", error);
        });
    },
  },
};
</script>
