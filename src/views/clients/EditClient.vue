<template>
  <section>
    <div class="d-flex mb-2">
      <PageTitle title="Edycja klienta" class="me-3" />
      <LoadSpinner v-if="loading" />
    </div>

    <ClientSelect
      @select-client="selectClient"
      :toUpdateSelect="toUpdateSelect"
    />

    <BaseAlert v-if="alertMessage" :message="alertMessage" class="mb-3" />

    <ClientForm
      @send-form="editClient"
      buttonTitle="Edytuj klienta"
      :client="client"
      :sending="loading"
    />
  </section>
</template>

<script>
import PageTitle from "../../components/UI/PageTitle.vue";
import ClientSelect from "../../components/clients/ClientSelect.vue";
import ClientForm from "../../components/clients/ClientForm.vue";

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
      toUpdateSelect: false,
    };
  },

  methods: {
    selectClient(client) {
      this.client = client;
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
        .then((response) => {
          console.log(response);
        })
        .then((data) => {
          //success
          this.loading = false;
          this.alertMessage = "Edycja klienta powiodła się.";
          this.toUpdateSelect = true;
        })
        .catch((error) => {
          this.loading = false;
          this.alertMessage = "Edycja klienta nie powiodła się.";
          console.error("Error:", error);
        });
    },
  },
};
</script>
