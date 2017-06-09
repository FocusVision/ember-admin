import Ember from 'ember'
import ColumnsMixin from 'ember-admin/mixins/model-records/columns'
import layout from 'ember-admin/templates/components/admin-table'

const {
  Mixin,
  A,
  Component,
  computed,
  computed: { filter },
  inject: { service },
  getOwner
} = Ember

export default Component.extend(ColumnsMixin, {
  layout,
  includedColumns: ['id'],


  // These were used to programatically show create button dependent on primary or relationship record
  // We may no longer need as it is a seperate route.

  // relationshipGiven: computed('relationshipName', 'relationshipId', function() {
  //   return get(this, 'relationshipName') && get(this, 'relationshipId')
  // }),
  //
  // hideCreate: computed('relationshipName', 'relationshipId', function() {
  //   const relationshipName = get(this, 'relationshipName')
  //   const relationshipId = get(this, 'relationshipId')
  //
  //   if (relationshipId) {
  //     if (isNone(relationshipName)) {
  //       return true
  //     }
  //     const { store } = this.admin
  //     const constructor = store.modelFor(get(this, 'recordType'))
  //     const { kind } = constructor.inverseFor(relationshipName, store)
  //
  //     if (kind === 'belongsTo' && get(this, 'records.length') > 0) {
  //       return true
  //     }
  //   }
  //
  //   return false
  // })
})
