<template>
  <section>
    <div class="d-flex mb-2">
      <PageTitle title="Usuwanie klienta" class="me-3" />
      <LoadSpinner v-if="loading" />
    </div>

    <BaseAlert v-if="alertMessage" :message="alertMessage" class="mb-3" />

    <select
      v-if="!loading"
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
      <ClientCard :client="client" />

      <button
        @click="deleteClient"
        ref="deleteClient"
        class="btn btn-danger align-self-end mt-4"
      >
        Usuń klienta
      </button>
    </div>
  </section>
</template>

<script>
import { useClientStore } from "../../stores/ClientStore.js";
import { mapState, mapStores, mapActions } from "pinia";
//components used in template
import ClientCard from "../../components/clients/CLientCard.vue";
import LoadSpinner from "../../components/UI/LoadSpinner.vue";
import BaseAlert from "../../components/UI/BaseAlert.vue";
import PageTitle from "../../components/UI/PageTitle.vue";

export default {
  components: {
    ClientCard,
    PageTitle,
  },

  data() {
    return {
      clientId: "none",
      client: null,
      loading: false,
      alertMessage: "",
    };
  },

  computed: {
    ...mapStores(useClientStore),
    ...mapState(useClientStore, ["clientList"]),
  },

  watch: {
    clientId(id) {
      if (id !== "none") {
        this.alertMessage = "";
        this.client = this.clientList.find((client) => client.id === id);
      } else {
        this.client = null;
      }
    },
  },

  async created() {
    this.loading = true;
    await this.loadClients();
    this.loading = false;
  },

  methods: {
    ...mapActions(useClientStore, ["loadClients"]),
    ...mapActions(useClientStore, ["removeClient"]),

    formatClientForSelect(client) {
      if (client.client_type === "individual") {
        return (
          client.first_name + " " + client.last_name + " - " + "indywidualny"
        );
      } else {
        //company
        return client.company_name + " - " + "firma";
      }
    },

    async deleteClient() {
      this.loading = true;
      this.$refs.deleteClient.disabled = true;
      await fetch(`http://127.0.0.1:8000/api/clients/${this.clientId}`, {
        method: "DELETE",
      })
        .then((response) => {
          console.log(response);
        })
        .then((data) => {
          //success
          this.loading = false;
          this.removeClient(this.clientId);
          this.clientId = "none";
          this.alertMessage = "Usuwanie klienta powiodło się.";
          this.$refs.deleteClient.disabled = false;
        })
        .catch((error) => {
          this.loading = false;
          this.alertMessage = "Usuwanie klienta nie powiodło się.";
          this.$refs.deleteClient.disabled = false;
          console.error("Error:", error);
        });
    },
  },
};
</script>
