import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-table'
import { includes } from 'ember-admin/utils/array'
import FilteredColumnsMixin
  from 'ember-admin/mixins/model-records/filtered-columns-mixin'

const {
  Component,
  isArray,
  computed,
  A
} = Ember

export default Component.extend(FilteredColumnsMixin, {
  layout,

  normalizedRecords: computed('records', function() {
    const records = this.get('records')

    if (isArray(records)) {
      return records
    }

    return A([records])
  })
})
