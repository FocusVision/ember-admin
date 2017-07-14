import Ember from 'ember'
import layout
  from 'ember-admin/templates/components/admin-relationship-select/list'

const {
  Component
} = Ember

export default Component.extend({
  layout,
  classNames: ['admin-relationship-select-list admin-resource-list']
})
