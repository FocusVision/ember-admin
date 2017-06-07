import Ember from 'ember'
import { includes } from 'ember-admin/utils/array'

const {
  Mixin,
  A: emberArray,
  get,
  computed,
  computed: { filter },
  getOwner
} = Ember

function columnIncludes(columnType, parameter) {
  return columnType && includes(columnType, parameter)
}

export default Mixin.create({
  modelRecord: computed('recordType', function() {
    const adapter = getOwner(this).lookup('data-adapter:main')
    const type = adapter.getModelTypes().findBy('name', get(this, 'recordType'))
    return adapter.wrapModelType(type.klass, get(this, 'recordType'))
  }),

  columns: computed('model', function() {
    const adapter = getOwner(this).lookup('data-adapter:main')
    const recordType = this.get('recordType')
    const type = adapter.getModelTypes().findBy('name', recordType)
    const { klass } = type

    const keys = emberArray(['id'])

    klass.eachAttribute(key => {
      keys.push(key)
    })

    return keys
  }),

  filteredColumns: filter('columns', function(name) {
    const modelName = get(this, 'modelRecord.name')
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
      if (!columnIncludes(adminIncludedColumns[modelName], name)) {
        allowColumn = false
      }
    }

    if (adminExcludedColumns) {
      if (columnIncludes(adminExcludedColumns[modelName], name)) {
        allowColumn = false
      }
    }

    if (columnIncludes(excludedColumns, name)) {
      allowColumn = false
    }

    if (columnIncludes(includedColumns, name)) {
      allowColumn = true
    }

    return allowColumn
  })
})
