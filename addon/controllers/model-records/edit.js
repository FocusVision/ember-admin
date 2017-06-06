import Ember from 'ember'
import RelationshipsMixin from 'ember-admin/mixins/model-records/relationships'
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type'
import ColumnsMixin from 'ember-admin/mixins/model-records/columns'
import EditActionsMixin
  from 'ember-admin/mixins/model-records/edit-actions-mixin'

const {
  Controller
} = Ember

export default Controller.extend(
  RecordTypeMixin,
  ColumnsMixin,
  RelationshipsMixin,
  EditActionsMixin,
  {
    excludedColumns: ['id']
  }
)
