<template>
  <div id="app">
    <ckeditor
      :value="value"
      :config="config"
      @input="(event) => $emit('input', event)"
    ></ckeditor>
  </div>
</template>

<script>
let CKEidtor
if (process.client) {
  CKEidtor = require('ckeditor4-vue').component
}

export default {
  name: 'IndexPage',
  components: {
    ckeditor: CKEidtor,
  },
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      editorData: '<p>Content of the editor.</p>',
      config: {
        language: 'ko',
        extraPlugins: 'uploadfile,embed,autoembed',
        height: 500,
        removeButtons: 'PasteFromWord',

        // The configuration of the editor.
        filebrowserImageUploadUrl: 'http://localhost:9000/files?type=Images',
        filebrowserUploadUrl: 'http://localhost:9000/files?type=Files',

        embed_provider:
          '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',
      },
    }
  },
}
</script>