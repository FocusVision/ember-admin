import Ember from 'ember'
import HasManyQuery from 'ember-data-has-many-query'

const {
  Mixin
} = Ember
const {
  RESTAdapterMixin
} = HasManyQuery

export default Mixin.create(RESTAdapterMixin, {
  removeRelated(model, relationshipName, relatedModel, kind) {
    const modelName = model.get('constructor.modelName')
    const url = this.urlForRemoveFromHasMany(
      model.get('id'),
      modelName,
      relationshipName,
      model.store
    )
    const relatedId = relatedModel.get('id')
    const relatedType = relatedModel.get('constructor.modelName')
    const relatedResourceType = relatedModel
      .store
      .serializerFor(relatedType)
      .payloadKeyFromModelName(relatedType)
    let verb
    let data
    if (kind === 'belongsTo') {
      verb = 'PATCH'
      data = null
    } else {
      verb = 'DELETE'
      data = [{ type: relatedResourceType, id: relatedId }]
    }

    return this.ajax(url, verb, {
      data: { data }
    })
  },
  urlForAddToHasMany(...args) {
    return this._urlForRelationship(...args)
  },
  urlForRemoveFromHasMany(...args) {
    return this._urlForRelationship(...args)
  },
  urlForRelationships(id, modelName) {
    return `${this._buildURL(modelName, id)}/relationships`
  },
  _urlForRelationship(id, modelName, relationshipName, store) {
    return `${this.urlForRelationships(id, modelName)}/` +
      `${store.serializerFor(modelName).keyForRelationship(relationshipName)}`
  },
  addRelated(model, relationshipName, relatedModel, kind) {
    const modelName = model.get('constructor.modelName')
    const url = this.urlForAddToHasMany(
      model.get('id'),
      modelName,
      relationshipName,
      model.store
    )
    const relatedId = relatedModel.get('id')
    const relatedType = relatedModel.get('constructor.modelName')
    const relatedResourceType = relatedModel
      .store
      .serializerFor(relatedType)
      .payloadKeyFromModelName(relatedType)
    let verb
    let data = { type: relatedResourceType, id: relatedId }
    if (kind === 'belongsTo') {
      verb = 'PATCH'
    } else {
      verb = 'POST'
      data = [data]
    }

    return this.ajax(url, verb, {
      data: { data }
    })
  }
})
