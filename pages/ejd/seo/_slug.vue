<template>
  <article>
    <SocialHead
      :title="mountain.title"
      :description="mountain.description"
      :image="mountain.image"
    />
    <h1>{{ mountain.title }}</h1>
    <section>
      <img :src="mountain.image" :alt="mountain.title" />
      <p>{{ mountain.description }}</p>
    </section>
    <button @click="goBack">Back</button>
  </article>
</template>
<script>
export default {
  name: 'SeoSnsSample',
  async asyncData({ $axios, params }) {
    let mountain
    await $axios
      .get(`https://api.nuxtjs.dev/mountains/${params.slug}`)
      .then((res) => {
        mountain = res.data
      })
      .catch((e) => {
        console.log('e : ', e)
      })

    return { mountain }
  },
  data() {
    return {
      title: 'SEO SNS SAMPLE',
    }
  },
  head() {
    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://localhost:3000/ejd/seo/${this.$route.params.slug}`,
        },
      ],
    }
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
  },
}
</script>
<style scoped>
article {
  max-width: 600px;
  margin: 0 auto;
}
img {
  height: 200px;
}
p {
  text-align: left;
}
</style>
