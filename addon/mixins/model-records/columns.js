import Ember from 'ember'
import { includes } from 'ember-admin/utils/array'

const {
  Mixin,
  A,
  get,
  computed,
  computed: { filter },
  getOwner
} = Ember

function columnIncludes(columnType, parameter) {
  return columnType && includes(columnType, parameter)
}

export default Mixin.create({
  recordType: null, // Defined in consuming

  /*
  * Returns the main data adapter
  * from which we can get all registered models
  * and related info
  */
  adapter: computed(function() {
    return getOwner(this).lookup('data-adapter:main')
  }),

  /*
  * Returns array of registered models
  */
  registeredModels: computed(function() {
    return this.get('adapter').getModelTypes()
  }),

  /*
  * Returns the model based `recordType`
  */
  currentModel: computed('recordType', function() {
    return this.get('registeredModels').findBy('name', this.get('recordType'))
  }),

  /*
  *
  */
  columns: computed('model', function() {
    const cols = [{ key: 'id', type: 'number' }]

    this.get('currentModel').klass.eachAttribute((key, { type }) => {
      cols.push({ key, type })
    })

    return A(cols)
  }),

  filteredColumns: filter('columns', function({ key }) {
    const modelName = this.get('currentModel.name')
    let allowColumn = true

    const {
      admin: {
        includedColumns: adminIncludedColumns,
        excludedColumns: adminExcludedColumns
      },
      includedColumns,
      excludedColumns
    } = this

    if (adminIncludedColumns) {
      if (!columnIncludes(adminIncludedColumns[modelName], key)) {
        allowColumn = false
      }
    }

    if (adminExcludedColumns) {
      if (columnIncludes(adminExcludedColumns[modelName], key)) {
        allowColumn = false
      }
    }

    if (columnIncludes(excludedColumns, key)) {
      allowColumn = false
    }

    if (columnIncludes(includedColumns, key)) {
      allowColumn = true
    }

    return allowColumn
  })
})
