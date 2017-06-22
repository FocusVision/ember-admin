import Ember from 'ember'
import IndexControllerMixin
  from 'ember-admin/mixins/model-records/index-controller-mixin'
import RelationshipControllerMixin
  from 'ember-admin/mixins/model-records/relationship-controller-mixin'

const {
  Controller
} = Ember

export default Controller.extend(
  IndexControllerMixin,
  RelationshipControllerMixin,
  {
    actions: {
      remove(model) {
        const parentModel = this.get('parentModel')

        if (this.get('relationshipKind') === 'belongsTo') {
          parentModel.set(this.get('recordName'), null)
        } else {
          parentModel.get(this.get('recordName')).removeObject(model)
        }

        parentModel.save().then(
          () => {},
          error => {}
        )
      }
    }
  }
)
