<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand"
          >HOME</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                :to="{ name: 'pelanggan.index' }"
                class="nav-link"
                aria-current="page"
                >Pelanggan</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'membership.index' }"
                class="nav-link"
                aria-current="page"
                >Membership</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'kelas.index' }"
                class="nav-link"
                aria-current="page"
                >Kelas Gym</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'booking.index' }"
                class="nav-link"
                aria-current="page"
                >Booking</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0" role="search">
            <a href="#" target="_blank" class="btn btn-success"
              >GYM Membership</a
            >
          </ul>
        </div>
      </div>
    </nav>

    <!--- render router view -->
    <router-view></router-view>
  </div>
</template>
