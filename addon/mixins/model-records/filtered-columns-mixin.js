import Ember from 'ember'
import { includes } from 'ember-admin/utils/array'

const {
  Mixin,
  A,
  Component,
  computed,
  computed: { filter, or },
  inject: { service },
  getOwner,
  isPresent
} = Ember

const keyIsDisabled = (serializerAttrs, key) =>
  serializerAttrs &&
  serializerAttrs[key] &&
  !serializerAttrs[key].serialize

export default Mixin.create({
  store: service(),
  admin: service(),

  includedColumns: [],
  excludedColumns: [],
  defaultColumns: [{ key: 'id', type: 'number', disabled: true }],

  recordType: null,

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
    return this.get('store').serializerFor(this.get('recordType'))
  }),

  /*
  * construct array of model columns with key:type:disabled
  */
  columns: computed('currentModel', function() {
    const cols = [].concat(this.get('defaultColumns'))
    const serializerAttrs = this.get('serializer.attrs')

    this.get('currentModel').klass.eachAttribute((key, { type }) => {
      cols.push({
        key,
        type,
        disabled: keyIsDisabled(serializerAttrs, key)})
    })

    return A(cols)
  }),

  /*
  * User setting overrides
  * Defined in admin service
  * merged with defaults
  */
  _includedColumns: computed(function() {
    return this.get('includedColumns').concat(
      this.get('admin.includedColumns') || []
    )
  }),

  _excludedColumns: computed(function() {
    return this.get('excludedColumns').concat(
      this.get('admin.excludedColumns') || []
    )
  }),

  filteredColumns: computed('columns', function() {
    const columns = this.get('columns')

    if (isPresent(this.get('_includedColumns'))) {
      return columns.filter(({ key }) =>
        includes(this.get('_includedColumns'), key))
    } else if (isPresent(this.get('_excludedColumns'))) {
      return columns.filter(({ key }) =>
        !includes(this.get('_excludedColumns'), key))
    }

    return columns
  })
})
