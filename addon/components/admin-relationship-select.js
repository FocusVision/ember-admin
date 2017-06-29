import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-relationship-select'

const {
  Component,
  computed,
  computed: { gt },
  inject: { service },
  A
} = Ember

export default Component.extend({
  layout,
  admin: service(),

  filterKeyword: null
})
