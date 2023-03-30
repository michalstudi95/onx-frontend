<template>
  <form @submit.prevent="validateForm" class="d-flex flex-column">
    <!-- client type -->
    <div class="mb-4">
      <div class="mb-3">Klient</div>
      <div class="d-flex">
        <div class="form-check me-3">
          <input
            v-model="clientType"
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
            v-model="clientType"
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
      <!-- company name -->
      <div class="mb-3 form-companyName">
        <label for="companyName" class="form-label">Nazwa firmy</label>
        <input
          v-model="companyName"
          type="text"
          class="form-control"
          id="companyName"
          ref="companyName"
        />
        <div class="invalid-feedback">Te pole nie może być puste.</div>
      </div>
      <!-- nip number -->
      <div class="mb-3 form-nip">
        <label for="nip" class="form-label">Numer NIP</label>
        <input
          v-model="nip"
          type="text"
          class="form-control"
          id="nip"
          ref="nip"
        />
        <div class="invalid-feedback">Te pole nie może być puste.</div>
        <div v-if="!isNipValid" class="text-danger">
          Numer NIP powinien składać się z 10 następujących po sobie cyfr.
        </div>
      </div>
      <!-- first name -->
      <div class="mb-3 form-firstName">
        <label for="firstName" class="form-label">Imię</label>
        <input
          v-model="firstName"
          type="text"
          class="form-control"
          id="firstName"
          ref="firstName"
        />
        <div class="invalid-feedback">Te pole nie może być puste.</div>
      </div>
      <!-- last name -->
      <div class="mb-3 form-lastName">
        <label for="lastName" class="form-label">Nazwisko</label>
        <input
          v-model="lastName"
          type="text"
          class="form-control"
          id="lastName"
          ref="lastName"
        />
        <div class="invalid-feedback">Te pole nie może być puste.</div>
      </div>
      <!-- phone number -->
      <div class="mb-3 form-phone">
        <label for="phone" class="form-label">Numer telefonu</label>
        <input v-model="phone" type="text" class="form-control" id="phone" />
        <div class="invalid-feedback">Te pole nie może być puste.</div>
      </div>
      <!-- email address -->
      <div class="mb-3 form-email">
        <label for="email" class="form-label">E-mail</label>
        <input v-model="email" type="text" class="form-control" id="email" />
        <div class="invalid-feedback">Te pole nie może być puste.</div>
        <div v-if="!isEmailValid" class="text-danger">
          Wpisz poprawny format adres email.
        </div>
      </div>
      <!-- home/company address -->
      <div class="mb-3 form-address">
        <label for="address" class="form-label">Adres</label>
        <textarea
          v-model="address"
          class="form-control"
          id="address"
          rows="3"
        ></textarea>
        <div class="invalid-feedback">Te pole nie może być puste.</div>
      </div>
    </div>

    <button
      ref="sendFormButton"
      type="submit"
      class="btn btn-primary align-self-end"
    >
      {{ buttonTitle }}
    </button>
  </form>
</template>

<script>
export default {
  emits: ["send-form"],

  props: ["buttonTitle", "client", "sending"],

  data() {
    return {
      clientType: "individual",
      companyName: "",
      nip: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      isEmailValid: true,
      isNipValid: true,
      alertMessage: "",
      loading: false,
    };
  },

  watch: {
    sending(sending) {
      sending
        ? (this.$refs.sendFormButton.disabled = true)
        : (this.$refs.sendFormButton.disabled = false);
    },

    clientType(type) {
      if (type === "individual") {
        this.clearAllValidationMessages();
        this.$refs.companyName.disabled = true;
        this.$refs.nip.disabled = true;
        this.$refs.firstName.disabled = false;
        this.$refs.lastName.disabled = false;
        this.companyName = null;
        this.nip = null;
      } else {
        //company
        this.clearAllValidationMessages();
        this.$refs.companyName.disabled = false;
        this.$refs.nip.disabled = false;
        this.$refs.firstName.disabled = true;
        this.$refs.lastName.disabled = true;
        this.firstName = null;
        this.lastName = null;
      }
    },

    companyName(companyName) {
      if (companyName !== "")
        document.getElementById("companyName").classList.remove("is-invalid");
    },

    nip(nip) {
      if (nip !== "")
        document.getElementById("nip").classList.remove("is-invalid");
    },

    firstName(firstName) {
      if (firstName !== "")
        document.getElementById("firstName").classList.remove("is-invalid");
    },

    lastName(lastName) {
      if (lastName !== "")
        document.getElementById("lastName").classList.remove("is-invalid");
    },

    email(email) {
      if (email !== "")
        document.getElementById("email").classList.remove("is-invalid");
    },

    phone(phone) {
      if (phone !== "")
        document.getElementById("phone").classList.remove("is-invalid");
    },

    address(address) {
      if (address !== "")
        document.getElementById("address").classList.remove("is-invalid");
    },

    client(client) {
      if (client) {
        this.clientType = this.client.client_type;
        this.companyName = this.client.company_name;
        this.nip = this.client.nip;
        this.firstName = this.client.first_name;
        this.lastName = this.client.last_name;
        this.email = this.client.email;
        this.phone = this.client.phone;
        this.address = this.client.address;
      }
    },
  },

  mounted() {
    this.$refs.companyName.disabled = true;
    this.$refs.nip.disabled = true;
  },

  methods: {
    clearAllValidationMessages() {
      const formControls = document.getElementsByClassName("form-control");
      for (let item of formControls) {
        item.classList.remove("is-invalid");
      }
    },

    validateForm() {
      let validation = true;
      let clientData = {};

      if (this.clientType === "individual") {
        if (this.firstName === "") {
          document.getElementById("firstName").classList.add("is-invalid");
          validation = false;
        }
        if (this.lastName === "") {
          validation = false;
          document.getElementById("lastName").classList.add("is-invalid");
        }

        if (validation) {
          clientData = {
            client_type: this.clientType,
            first_name: this.firstName,
            last_name: this.lastName,
          };
        }
      } else {
        //company
        if (this.companyName === "") {
          validation = false;
          document.getElementById("companyName").classList.add("is-invalid");
        }
        if (this.nip === "") {
          validation = false;
          document.getElementById("nip").classList.add("is-invalid");
        } else {
          const pattern = /^[0-9]{10}$/;
          const regex = new RegExp(pattern);

          if (!regex.test(this.nip)) {
            validation = false;
            this.isNipValid = false;
          } else {
            clientData.nip = this.nip;
            this.isNipValid = true;
          }
        }

        if (validation) {
          clientData = {
            client_type: this.clientType,
            company_name: this.companyName,
            nip: this.nip,
          };
        }
      }

      if (this.phone === "") {
        validation = false;
        document.getElementById("phone").classList.add("is-invalid");
      } else {
        clientData.phone = this.phone;
      }

      if (this.email === "") {
        validation = false;
        document.getElementById("email").classList.add("is-invalid");
      } else {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regex = new RegExp(pattern);

        if (!regex.test(this.email)) {
          validation = false;
          this.isEmailValid = false;
        } else {
          clientData.email = this.email;
          this.isEmailValid = true;
        }
      }

      if (this.address === "") {
        validation = false;
        document.getElementById("address").classList.add("is-invalid");
      } else {
        clientData.address = this.address;
      }

      if (validation) {
        //adds new client
        this.alertMessage = "";
        this.emitFormData();
      } else {
        this.alertMessage = "Uzupełnij poprawnie dane formularza.";
      }
    },

    emitFormData() {
      const client = {
        client_type: this.clientType,
        company_name: this.companyName ? this.companyName : null,
        nip: this.nip ? this.nip : null,
        first_name: this.firstName ? this.firstName : null,
        last_name: this.lastName ? this.lastName : null,
        phone: this.phone,
        email: this.email,
        address: this.address,
      };

      this.$emit("send-form", client);
    },

    resetForm() {
      this.clientType = "individual";
      this.companyName = "";
      this.nip = "";
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.phone = "";
      this.address = "";
    },
  },
};
</script>
