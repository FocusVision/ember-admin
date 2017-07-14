import Ember from 'ember'

const {
  Mixin,
  String: { singularize }
} = Ember

export default Mixin.create({
  setupController(controller, model) {
    this._super(controller, model)

    controller.setProperties({
      parentModel: this.modelFor('admin.model-records.show'),
      recordName: this._relationshipName(),
      recordType: this._relationshipType()
    })
  },

  _relationshipName() {
    return this.paramsFor('admin.model-records.show.related').relationship_name
  },

  _relationshipType() {
    return singularize(this._relationshipName())
  }
})
