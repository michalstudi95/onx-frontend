<template>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <router-link class="nav-link active" :to="{ name: 'home' }"
        >Witam !</router-link
      >
    </li>
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        href="#"
        role="button"
        aria-expanded="false"
        >Klienci</a
      >
      <ul class="dropdown-menu">
        <li>
          <router-link
            class="dropdown-item"
            :to="{
              name: 'client-list',
              query: { type: 'all', sort: 'desc', page: '1' },
            }"
            >Lista klientów</router-link
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <router-link class="dropdown-item" :to="{ name: 'add-client' }"
            >Dodaj klienta</router-link
          >
        </li>
        <li>
          <router-link class="dropdown-item" :to="{ name: 'edit-client' }"
            >Edytuj klienta</router-link
          >
        </li>
        <li>
          <router-link class="dropdown-item" :to="{ name: 'delete-client' }"
            >Usuń klienta</router-link
          >
        </li>
      </ul>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'employees' }"
        >Pracownicy
      </router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'cars' }"
        >Samochody
      </router-link>
    </li>
  </ul>
</template>
