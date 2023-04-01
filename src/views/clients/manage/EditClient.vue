<template>
  <section>
    <div class="d-flex mb-2">
      <PageTitle title="Edycja klienta" class="me-3" />
      <LoadSpinner v-if="loading" />
    </div>

    <BaseAlert v-if="alertMessage" :message="alertMessage" class="mb-3" />

    <ClientSelect @select-client="selectClient" />

    <ClientForm
      v-if="clientId"
      @send-form="editClient"
      buttonTitle="Edytuj klienta"
      :client="client"
      :sending="loading"
    />
  </section>
</template>

<script>
import PageTitle from "../../../components/UI/PageTitle.vue";
import ClientSelect from "../../../components/clients/ClientSelect.vue";
import ClientForm from "../../../components/clients/ClientForm.vue";

export default {
  components: {
    PageTitle,
    ClientSelect,
    ClientForm,
  },

  data() {
    return {
      client: null,
      alertMessage: "",
      loading: false,
    };
  },

  computed: {
    clientId() {
      return this.client ? this.client.id : null;
    },
  },

  methods: {
    selectClient(client) {
      this.client = client;
      this.alertMessage = "";
    },

    async editClient(client) {
      this.loading = true;
      this.toUpdateSelect = false;
      await fetch(`http://localhost:8000/api/clients/${this.client.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      })
        .then((response) => {})
        .then((data) => {
          //success
          this.loading = false;
          this.alertMessage = "Edycja klienta powiodła się.";
          this.toUpdateSelect = true;
          this.client = null;
        })
        .catch((error) => {
          this.loading = false;
          this.alertMessage = "Edycja klienta nie powiodła się.";
          this.client = null;
          console.error("Error:", error);
        });
    },
  },
};
</script>
