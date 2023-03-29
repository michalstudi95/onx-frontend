<template>
  <form @submit.prevent="validateForm" class="d-flex flex-column">
    <!-- client type -->
    <div class="mb-4">
      <div class="h5 mb-3">Zaznacz typ klienta</div>
      <div class="d-flex">
        <div class="form-check me-3">
          <input
            v-model="client"
            value="individual"
            class="form-check-input"
            type="radio"
            id="individual"
          />
          <label class="form-check-label" for="individual">
            Indywidualny
          </label>
        </div>
        <div class="form-check">
          <input
            v-model="client"
            value="company"
            class="form-check-input"
            type="radio"
            id="company"
          />
          <label class="form-check-label" for="company"> Firma </label>
        </div>
      </div>
    </div>

    <!-- client information -->
    <div>
      <div class="mb-3">
        <label for="companyName" class="form-label">Nazwa firmy</label>
        <input
          v-model="companyName"
          type="text"
          class="form-control"
          id="companyName"
          ref="companyName"
        />
      </div>
      <div class="mb-3">
        <label for="nip" class="form-label">Numer NIP</label>
        <input
          v-model="nip"
          type="text"
          class="form-control"
          id="nip"
          ref="nip"
        />
      </div>
      <div class="mb-3">
        <label for="firstName" class="form-label">Imię</label>
        <input
          v-model="firstName"
          type="text"
          class="form-control"
          id="firstName"
          ref="firstName"
        />
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Nazwisko</label>
        <input
          v-model="lastName"
          type="text"
          class="form-control"
          id="lastName"
          ref="lastName"
        />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Numer telefonu</label>
        <input v-model="phone" type="text" class="form-control" id="phone" />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Adres email</label>
        <input v-model="email" type="text" class="form-control" id="email" />
      </div>
    </div>

    <button
      @click="validateForm"
      type="submit"
      class="btn btn-primary align-self-end"
    >
      Dodaj klienta
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      client: "individual",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      nip: "",
    };
  },

  watch: {
    client(client) {
      if (client === "individual") {
        this.$refs.companyName.disabled = true;
        this.$refs.nip.disabled = true;
        this.$refs.firstName.disabled = false;
        this.$refs.lastName.disabled = false;
      } else {
        //company
        this.$refs.companyName.disabled = false;
        this.$refs.nip.disabled = false;
        this.$refs.firstName.disabled = true;
        this.$refs.lastName.disabled = true;
      }
    },
  },

  mounted() {
    this.$refs.companyName.disabled = true;
    this.$refs.nip.disabled = true;
  },

  methods: {
    validateForm() {},
  },
};
</script>
