import Ember from 'ember'
import layout
  from 'ember-admin/templates/components/admin-fields/admin-field-base'

const {
  Component,
  computed: { alias },
  computed
} = Ember

export default Component.extend({
  layout,
  tagName: '',
  model: null,
  column: null,

  key: alias('column.key'),
  type: alias('column.type'),
  value: computed('model', 'key', function() {
    return this.get(`model.${this.get('type')}`)
  }),

  didUpdate() {},

  templates: ['string', 'boolean'],
  fieldComponentName: computed('type', function() {
    const type = this.get('type')
    const resolvedType = this.get('templates').includes(type) ? type : 'string'
    return `admin-fields/admin-field-${resolvedType}`
  }),

  actions: {
    didUpdate(key, value) {
      debugger
      this.didUpdate(key, value)
    }
  }
})
