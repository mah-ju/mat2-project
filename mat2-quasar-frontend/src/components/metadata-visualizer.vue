<template>
  <q-menu cover>
    <q-list>
      <q-item
        clickable
        @click="showDialog()"
      >
        <q-item-section
          data-cy="metadata-dialog-menu-entry-show"
        >
          {{ $t('show_removed_metadata') }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
  <q-dialog
    v-model="isDialogOpen"
    transition-show="rotate"
    transition-hide="rotate"
  >
    <q-card>
      <q-card-section
        class="row justify-end"
      >
        <q-btn
          v-close-popup="2"
          icon="close"
          flat
          round
          dense
          data-cy="metadata-dialog-close-button"
        />
      </q-card-section>

      <q-card-section
        v-if="getRemovedMetadataTableData.length < 1 && getRemainingMetadataTableData.length < 1"
      >
        {{ $t('no_removed_no_remaining_metadata') }}
      </q-card-section>
      <q-card-section>
        <q-table
          v-if="getRemovedMetadataTableData.length > 0"
          :title="$t('removed_metadata')"
          :rows="getRemovedMetadataTableData"
          :columns="columns"
          row-key="name"
          :pagination-label="getPaginationLabel"
          :rows-per-page-label="$t('records_per_page')"
          data-cy="metadata-removed-table"
        >
          <template #header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                <b>{{ col.label }}</b>
              </q-th>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>

      <q-card-section>
        <q-table
          v-if="getRemainingMetadataTableData.length > 0"
          :title="$t('remaining_metadata')"
          :rows="getRemainingMetadataTableData"
          :columns="columns"
          row-key="name"
          :pagination-label="getPaginationLabel"
          :rows-per-page-label="$t('records_per_page')"
          data-cy="metadata-remaining-table"
        >
          <template #header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                <b>{{ col.label }}</b>
              </q-th>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>

export default {
  name: 'MetadataVisualizer',
  props: {
    deletedMetadata: {
      type: Object,
      default: function () {
        return {}
      }
    },
    remainingMetadata: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return {
      isDialogOpen: false,
      columns: [
        { name: 'label', label: this.$t('label'), field: 'label', sortable: true },
        { name: 'value', label: this.$t('value'), field: 'value', sortable: true }
      ]
    }
  },
  mounted () {
  },
  computed: {
    getRemovedMetadataTableData () {
      return this.restructureTableData(this.deletedMetadata)
    },
    getRemainingMetadataTableData () {
      return this.restructureTableData(this.remainingMetadata)
    }
  },
  methods: {
    showDialog () {
      this.isDialogOpen = true
    },
    restructureTableData (data) {
      const tmpMeta = []
      for (const key in data) {
        const tmpObj = {}
        tmpObj.label = key
        tmpObj.value = data[key]
        tmpMeta.push(tmpObj)
      }

      return tmpMeta
    },
    getPaginationLabel (firstRowIndex, endRowIndex, totalRowsNumber) {
      return firstRowIndex + '-' + endRowIndex + ' ' + this.$t('of') + ' ' + totalRowsNumber
    }
  }
}
</script>
