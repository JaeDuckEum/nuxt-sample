<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="mountain in mountains" :key="mountain.title">
        <nuxt-link :to="{ path: `/ejd/seo/${mountain.slug}` }">
          {{ mountain.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SeoSample',
  async asyncData({ $axios }) {
    let mountains
    await $axios
      .get('https://api.nuxtjs.dev/mountains')
      .then((res) => {
        mountains = res.data
      })
      .catch((e) => {
        console.log('e : ', e)
      })

    return { mountains }
  },
  data() {
    return {
      title: 'SEO SAMPLE',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'The amazing Nuxt application that teaches me all the cool features of Nuxt',
        },
      ],
    }
  },
}
</script>
