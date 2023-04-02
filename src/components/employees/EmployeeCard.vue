<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title mb-3">Dane pracownika #{{ employeeId }}</h5>
      <div>
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
    </div>
  </div>
</template>

<script>
export default {
  props: ["employee"],

  computed: {
    employeeId() {
      return this.employee ? this.employee.id : null;
    },

    firstName() {
      return this.employee ? this.employee.first_name : null;
    },

    lastName() {
      return this.employee ? this.employee.last_name : null;
    },

    phone() {
      return this.employee ? this.employee.phone : null;
    },

    email() {
      return this.employee ? this.employee.email : null;
    },

    address() {
      return this.employee ? this.employee.address : null;
    },
  },
};
</script>
