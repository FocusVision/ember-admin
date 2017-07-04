import Ember from 'ember'
import layout
  from 'ember-admin/templates/components/admin-table/admin-table-cell'

const {
  Component
} = Ember

export default Component.extend({
  layout,
  tagName: 'td'
})
