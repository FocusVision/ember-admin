import Ember from 'ember'
import RelationshipsMixin from 'ember-admin/mixins/model-records/relationships'
import ColumnsMixin from 'ember-admin/mixins/model-records/columns'
import ResourceControllerMixin
  from 'ember-admin/mixins/model-records/resource-controller-mixin'

const {
  Controller
} = Ember

export default Controller.extend(
  ColumnsMixin,
  RelationshipsMixin,
  ResourceControllerMixin,
  {
    excludedColumns: ['id']
  }
)
