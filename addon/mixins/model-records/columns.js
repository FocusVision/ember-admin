import Ember from 'ember'
import { includes } from 'ember-admin/utils/array'

const {
  Mixin,
  A,
  computed,
  computed: { filter },
  inject: { service },
  getOwner
} = Ember

const columnIncludes = (columnType, parameter) =>
  columnType && includes(columnType, parameter)


const keyIsDisabled = (serializerAttrs, key) =>
  serializerAttrs && serializerAttrs[key] && !serializerAttrs[key].serialize

export default Mixin.create({
  store: service(),
  recordType: null, // Defined in consuming

  /*
  * Returns the main data adapter
  * from which we can get all registered models
  * and related info
  */
  adapter: computed(function() {
    return getOwner(this).lookup('data-adapter:main')
  }),

  serializer: computed(function() {
    return this.get('store').serializerFor(this.get('recordType'))
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
  * construct array of model columns with key:type:disabled
  */
  columns: computed('model', function() {
    const cols = [{ key: 'id', type: 'number' }]
    const serializerAttrs = this.get('serializer.attrs')

    this.get('currentModel').klass.eachAttribute((key, { type }) => {
      const disabled = keyIsDisabled(serializerAttrs, key)
      cols.push({ key, type, disabled })
    })

    return A(cols)
  }),

  filteredColumns: filter('columns', function({ key }) {
    const modelName = this.get('recordType')
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
