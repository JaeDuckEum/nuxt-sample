<template>
  <ckeditor
    :editor="editor"
    :value="value"
    :config="config"
    @input="(event) => $emit('input', event)"
  />
</template>
<script>
let FullFreeBuildEditor
let CKEditor
if (process.client) {
  FullFreeBuildEditor = require('@blowstack/ckeditor5-full-free-build')
  CKEditor = require('@ckeditor/ckeditor5-vue2')
} else {
  CKEditor = { component: { template: '<div></div>' } }
}
export default {
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      editor: FullFreeBuildEditor,
      config: {
        width: 'auto',
        plugins: [
          'TableProperties',
          'TableCellProperties',
          'Alignment',
          'Autoformat',
          'BlockQuote',
          'Bold',
          'Essentials',
          'FontColor',
          'FontSize',
          'Heading',
          'Image',
          'ImageResize',
          'ImageCaption',
          'ImageStyle',
          'ImageToolbar',
          'ImageUpload',
          'Indent',
          'IndentBlock',
          'Italic',
          'Link',
          'List',
          'MediaEmbed',
          'Paragraph',
          'PasteFromOffice',
          'SimpleUploadAdapter',
          'Table',
          'TableToolbar',
          'TextTransformation',
        ],
        mediaEmbed: {
          previewsInData: true,
        },
        toolbar: {
          items: [
            'heading',
            'fontSize',
            'fontColor',
            '|',
            'alignment',
            'bold',
            'italic',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'link',
            'undo',
            'redo',
          ],
        },
        image: {
          toolbar: [
            'imageStyle:alignLeft',
            'imageStyle:full',
            'imageStyle:alignRight',
            '|',
            'imageTextAlternative',
          ],
          styles: ['full', 'alignLeft', 'alignRight'],
          type: ['JPEG', 'JPG', 'GIF', 'PNG'],
        },
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
          ],
          // Configuration of the TableProperties plugin.
          tableProperties: {
            // ...
          },
          // Configuration of the TableCellProperties plugin.
          tableCellProperties: {
            // ...
          },
        },
        simpleUpload: {
          uploadUrl: 'http://localhost:9000/files',
          // uploadUrl: 'http://localhost:4000/uploadFile',
          // withCredentials: true,
          // headers: {
          //   'upload-folder': 'root',
          //   'upload-editor': '',
          // },
        },
      },
    }
  },
}
</script>

