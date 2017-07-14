import Ember from 'ember'
import { includes } from 'ember-admin/utils/array'
import layout from 'ember-admin/templates/components/admin-filter-columns'

const {
  Component,
  A,
  computed,
  inject: { service },
  getWithDefault,
  getOwner,
  isPresent
} = Ember

const keyIsDisabled = (serializerAttrs, key) =>
  serializerAttrs &&
  serializerAttrs[key] &&
  !serializerAttrs[key].serialize

export default Component.extend({
  layout,
  tagName: '',
  store: service(),
  admin: service(),

  includedColumns: [],
  excludedColumns: [],
  defaultColumns: [{ key: 'id', type: 'number', disabled: true }],

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
    return this.get('registeredModels').findBy(
      'name', this.get('recordType')
    )
  }),

  /*
  * Returns the serializer for current record type
  * from which we can get the `attrs` property to determine
  * serialize setting per prop
  */
  serializer: computed('recordType', function() {
    const recordType = this.get('recordType')

    if (recordType) {
      return this.get('store').serializerFor(this.get('recordType'))
    }
  }),

  /*
  * construct array of model columns with key:type:disabled
  */
  columns: computed('currentModel', function() {
    const cols = [].concat(this.get('defaultColumns'))
    const serializerAttrs = this.get('serializer.attrs')
    const model = this.get('currentModel')

    if (!model) {
      return []
    }

    model.klass.eachAttribute((key, { type }) => {
      cols.push({
        key,
        type,
        disabled: keyIsDisabled(serializerAttrs, key)
      })
    })

    return A(cols)
  }),

  /*
  * User setting overrides
  * Defined in admin service
  * merged with defaults
  */

  _includedColumns: computed(function() {
    const adminIncludedColumns = this.get('admin.includedColumns') || {}

    return this.get('includedColumns').concat(
      getWithDefault(adminIncludedColumns, this.get('recordType'), [])
    )
  }),

  _excludedColumns: computed(function() {
    const adminExcludedColumns = this.get('admin.excludedColumns') || {}

    return this.get('excludedColumns').concat(
      getWithDefault(adminExcludedColumns, this.get('recordType'), [])
    )
  }),

  filteredColumns: computed('columns', function() {
    const columns = this.get('columns')

    if (isPresent(this.get('_includedColumns'))) {
      return columns.filter(({ key }) =>
        includes(this.get('_includedColumns'), key) &&
        !includes(this.get('_excludedColumns'), key)
      )
    } else if (isPresent(this.get('_excludedColumns'))) {
      return columns.filter(({ key }) =>
        !includes(this.get('_excludedColumns'), key)
      )
    }

    return columns
  })
})
