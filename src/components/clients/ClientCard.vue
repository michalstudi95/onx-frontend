<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-3">Dane klienta</h5>
      <h6 class="card-subtitle mb-2 text-muted text-capitalize">
        {{ clientType }}
      </h6>
      <div>
        <div v-if="companyName" class="mb-2">
          <span class="fw-bold me-2">Nazwa firmy :</span>
          <span> {{ companyName }} </span>
        </div>
        <div v-if="nip" class="mb-2">
          <span class="fw-bold me-2">Numer NIP :</span>
          <span>{{ nip }}</span>
        </div>
        <div v-if="firstName" class="mb-2">
          <span class="fw-bold me-2">Imię :</span>
          <span> {{ firstName }} </span>
        </div>
        <div v-if="lastName" class="mb-2">
          <span class="fw-bold me-2">Nazwisko :</span>
          <span> {{ lastName }} </span>
        </div>
        <div v-if="phone" class="mb-2">
          <span class="fw-bold me-2">Numer telefonu :</span>
          <span>{{ phone }}</span>
        </div>
        <div v-if="email" class="mb-2">
          <span class="fw-bold me-2">E-mail :</span>
          <span>{{ email }}</span>
        </div>
        <div v-if="address" class="mb-2">
          <span class="fw-bold me-2">Adres :</span>
          <span>{{ address }} </span>
        </div>
      </div>
      <a href="#" class="card-link">Przypisany pracownik</a>
      <a href="#" class="card-link">Lista zakupionych produktów</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["client"],

  computed: {
    clientType() {
      if (this.client) {
        return this.client.client_type === "company" ? "Firma" : "Indywidualny";
      } else {
        return null;
      }
    },

    companyName() {
      return this.client ? this.client.company_name : null;
    },

    nip() {
      return this.client ? this.client.nip : null;
    },

    firstName() {
      return this.client ? this.client.first_name : null;
    },

    lastName() {
      return this.client ? this.client.last_name : null;
    },

    phone() {
      return this.client ? this.client.phone : null;
    },

    email() {
      return this.client ? this.client.email : null;
    },

    address() {
      return this.client ? this.client.address : null;
    },
  },
};
</script>
