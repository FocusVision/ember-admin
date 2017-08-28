import Ember from 'ember'

const {
  Mixin
} = Ember

export default Mixin.create({
  setupController(controller, model) {
    this._super(controller, model)

    controller.setProperties({
      parentModel: this._parentModel(),
      relationshipName: this._relationshipName(),
      recordType: this._relationshipType()
    })
  },

  _parentModel() {
    return this.modelFor('admin.model-records.show')
  },

  _relationshipName() {
    return this.paramsFor('admin.model-records.show.related').relationship_name
  },

  _relationshipType() {
    const store = this.get('admin.store')
    const parentType = this._parentModel().constructor.modelName
    return store
      .modelFor(parentType)
      .typeForRelationship(this._relationshipName(), store)
      .modelName
  }
})
