<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Nuxt 테스트</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse" />

      <b-collapse id="nav_collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/board">자유게시판</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>