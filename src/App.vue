<script setup>
import {RouterLink, RouterView} from 'vue-router'
import "../bootstrap-5.3.1-dist/css/bootstrap.min.css";

</script>

<template>
  <header>

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/"  class="nav-link active" >Список клиентов</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/carsParked"  class="nav-link active" >Машины на парковке</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </header>

  <RouterView/>
</template>

