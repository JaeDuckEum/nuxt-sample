<template>
  <div class="navbar">
    <span @click="open = !open"> {{ open ? 'Close' : 'View' }} Links </span>
    <div class="navbar-drawer" :class="{ isOpen: open }">
      <nuxt-link
        v-for="(link, index) of links"
        :key="index"
        :to="link.to"
        exact
        v-text="link.name"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      links: [
        { to: '/', name: 'Home' },
        { to: '/about', name: 'About' },
        { to: '/products', name: 'Products' },
        { to: '/products/view', name: 'Products/View' },
        { to: '/about/ben-jones', name: 'Nested About' },
        { to: '/products/edit/64', name: 'Edit Product By Route Param' },
        { to: '/categories/2/products/3', name: 'Complex Route' },
        // {
        //   to: '/categories/2/products/someproduct',
        //   name: 'Invalid Route Param',
        // },
        { to: '/products/view', name: 'Vuex Store Example' },
        { to: '/admin', name: 'Admin Layout' },
        { to: '/plugin', name: 'Vue-Notifications Plugin' },
        { to: '/products/view-async', name: 'Async Fetch Example' },
        { to: '', name: 'EJD' },
        { to: '/ejd/todo', name: 'Vuex Store Example' },
        { to: '/ejd/axios/sample-get', name: 'AXIOS GET Example' },
        { to: '/ejd/axios/sample-post', name: 'AXIOS POST Example' },
        { to: '/ejd/axios/sample-exception', name: 'AXIOS Exception Example' },
        { to: '/ejd/loading/loading', name: 'loading Example' },
        { to: '/ejd/loading/loading-ssr', name: 'loading SSR Example' },
        { to: '/ejd/seo/seo-sample', name: 'SEO Example' },
      ],
    }
  },
  watch: {
    '$route.name'() {
      this.open = false
    },
  },
}
</script>
<style scoped>
.navbar {
  position: relative;
  background: #333333;
  color: white;
  padding: 10px;
}
.navbar-drawer {
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  width: 250px;
  top: 100%;
  left: -500px;
  padding: 0 10px 20px;
  background: #333333;
  text-align: center;
  transition: left 0.35s;
}
.isOpen {
  left: 0;
}
span,
a {
  padding: 10px;
  color: white;
  cursor: pointer;
  text-decoration: none;
}
span:hover,
a:hover {
  background: white;
  color: #333333;
}
a.nuxt-link-active {
  cursor: default;
  background: #41b883;
  color: #333333;
}
</style>
