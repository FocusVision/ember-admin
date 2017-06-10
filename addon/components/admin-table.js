import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-table'
import { includes } from 'ember-admin/utils/array'
import FilteredColumnsMixin
  from 'ember-admin/mixins/model-records/filtered-columns-mixin'

const {
  Component
} = Ember

export default Component.extend(FilteredColumnsMixin, {
  layout
})
