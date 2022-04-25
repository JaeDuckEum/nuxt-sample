<template>
  <div>
    <h1>Plugin Example</h1>
    <p>
      <code>vue-notifications</code> is available anywhere once registered,
      click the button below to show an alert
    </p>
    <br />
    <button @click="showNotification">Show Notification</button>
  </div>
</template>

<script>
export default {
  name: 'PluginPage',
  methods: {
    showNotification() {
      this.$notify({
        // group: 'default',
        text: 'Hello!'
      });
    }
  }
}
</script>
