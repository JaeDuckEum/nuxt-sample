<template>
  <div>
    <client-only>
      <h1>excel import with vue & sheet.js!</h1>
      <div>
        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="excelImport"
        />
      </div>
      <ve-table :columns="columns" :table-data="tableData"></ve-table>
    </client-only>
  </div>
</template>

<script>
import { read, utils } from 'xlsx'
let i = 0
export default {
  data() {
    return {
      columns: [
        {
          field: 'name',
          key: '1',
          title: 'Name',
          align: 'center',
        },
        {
          field: 'date',
          key: '2',
          title: 'Date',
          align: 'left',
        },
        {
          field: 'hobby',
          key: '3',
          title: 'Hobby',
          align: 'right',
        },
        { field: 'address', key: '4', title: 'Address' },
      ],
      tableData: [
        {
          name: 'John',
          date: '1900-05-20',
          hobby: 'coding and coding repeat',
          address: 'No.1 Century Avenue, Shanghai',
        },
        {
          name: 'Dickerson',
          date: '1910-06-20',
          hobby: 'coding and coding repeat',
          address: 'No.1 Century Avenue, Beijing',
        },
        {
          name: 'Larsen',
          date: '2000-07-20',
          hobby: 'coding and coding repeat',
          address: 'No.1 Century Avenue, Chongqing',
        },
        {
          name: 'Geneva',
          date: '2010-08-20',
          hobby: 'coding and coding repeat',
          address: 'No.1 Century Avenue, Xiamen',
        },
        {
          name: 'Jami',
          date: '2020-09-20',
          hobby: 'coding and coding repeat',
          address: 'No.1 Century Avenue, Shenzhen',
        },
      ],
    }
  },
  methods: {
    excelImport(event) {
      const input = event.target
      // console.log(input.files[0])
      const reader = new FileReader()
      const ParsingOptions = { type: 'binary' }
      reader.onload = () => {
        const fileData = reader.result
        const wb = read(fileData, ParsingOptions)

        const sheetName = wb.SheetNames[0]
        const rowObj = utils.sheet_to_json(wb.Sheets[sheetName])
        this.tableData = []
        for (let i = 0; i < 6; i++) {
          this.tableData.push(rowObj[i])
        }
        this.columns = []
        for (const key in this.tableData[0]) {
          this.columns.push({
            field: key,
            key: i + '',
            title: key,
            align: 'center',
          })
          i++
        }

        // wb.SheetNames.forEach((sheetName) => {
        //   console.log(sheetName)
        //   console.log(sheetName)
        //   const rowObj = utils.sheet_to_json(wb.Sheets[sheetName])
        //   this.excelData = JSON.stringify(rowObj)
        // })
      }
      reader.readAsBinaryString(input.files[0])
    },
  },
}
</script>

<style >
</style>