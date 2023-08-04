<script setup>
import {RouterLink, RouterView} from 'vue-router'


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
          </ul>
        </div>
      </div>
    </nav>

  </header>

  <RouterView/>
</template>

