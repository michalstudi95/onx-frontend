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
          <router-link class="dropdown-item" :to="{ name: 'clients' }"
            >Lista klientów</router-link
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <router-link class="dropdown-item" :to="{ name: 'add-client' }"
            >Dodaj klienta</router-link
          >
        </li>
        <li><a class="dropdown-item" href="#">Edytuj klienta</a></li>
        <li>
          <router-link class="dropdown-item" :to="{ name: 'delete-client' }"
            >Usuń klienta</router-link
          >
        </li>
      </ul>
    </li>

    <li class="nav-item">
      <a class="nav-link" aria-current="page" href="#">Pracownicy</a>
    </li>

    <li class="nav-item">
      <a class="nav-link" aria-current="page" href="#">Samochody</a>
    </li>
  </ul>
</template>
