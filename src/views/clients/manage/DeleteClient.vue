<template>
  <section>
    <div class="d-flex mb-2">
      <PageTitle title="Usuwanie klienta" class="me-3" />
      <LoadSpinner v-if="loading" />
    </div>

    <BaseAlert v-if="alertMessage" :message="alertMessage" class="mb-3" />

    <ClientSelect
      @select-client="selectClient"
      @update-select="setUpdateClientSelectToFalse"
      :updateSelect="updateClientSelect"
    />

    <div v-if="clientId" class="d-flex flex-column">
      <ClientCard :client="client" />

      <button
        @click="deleteClient"
        ref="deleteClient"
        class="btn btn-danger align-self-end"
      >
        Usuń klienta
      </button>
    </div>
  </section>
</template>

<script>
import { useClientStore } from "../../../stores/ClientStore.js";
import { mapActions } from "pinia";
//components used in template
import ClientSelect from "../../../components/clients/ClientSelect.vue";
import ClientCard from "../../../components/clients/ClientCard.vue";
import LoadSpinner from "../../../components/UI/LoadSpinner.vue";
import BaseAlert from "../../../components/UI/BaseAlert.vue";
import PageTitle from "../../../components/UI/PageTitle.vue";

export default {
  components: {
    ClientSelect,
    ClientCard,
    PageTitle,
  },

  data() {
    return {
      client: null,
      loading: false,
      alertMessage: "",
      updateClientSelect: false,
    };
  },

  computed: {
    clientId() {
      return this.client ? this.client.id : null;
    },
  },

  methods: {
    ...mapActions(useClientStore, ["deleteClientFromStore"]),

    selectClient(client) {
      this.client = client;
      this.alertMessage = "";
    },

    setUpdateClientSelectToFalse() {
      this.updateClientSelect = false;
    },

    async deleteClient() {
      this.loading = true;
      this.$refs.deleteClient.disabled = true;
      await fetch(`http://127.0.0.1:8000/api/clients/${this.clientId}`, {
        method: "DELETE",
      })
        .then((response) => {})
        .then((data) => {
          //success
          this.loading = false;
          this.deleteClientFromStore(this.clientId);
          this.updateClientSelect = true;
          this.alertMessage = "Usuwanie klienta powiodło się.";
          this.$refs.deleteClient.disabled = false;
          this.client = null;
        })
        .catch((error) => {
          this.loading = false;
          this.alertMessage = "Usuwanie klienta nie powiodło się.";
          this.$refs.deleteClient.disabled = false;
          this.client = null;
          console.error("Error:", error);
        });
    },
  },
};
</script>
