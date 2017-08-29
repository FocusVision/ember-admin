import Ember from 'ember'
import HasManyQuery from 'ember-data-has-many-query'
import {
  relationshipKind,
  inverseRelationshipName,
  inverseRelationshipKind
} from 'ember-admin/utils/relationship'

const {
  Mixin
} = Ember
const {
  RESTAdapterMixin
} = HasManyQuery

export default Mixin.create(RESTAdapterMixin, {
  removeRelated(model, relationshipName, relatedModel) {
    const {
      inverseRelationshipName,
      inverseRelationshipKind,
      relationshipKind
    } = this._relationshipInfo(model, relationshipName)
    let verb
    let data
    if (relationshipKind === 'belongsTo') {
      verb = 'PATCH'
      data = null
    } else {
      verb = 'DELETE'
      data = [{
        type: this._payloadKeyFromModel(relatedModel),
        id: relatedModel.get('id')
      }]
    }

    return this.ajax(
      this.urlForRemoveFromHasMany(model, relationshipName),
      verb,
      { data: { data }}
    ).then(() => {
      if (relationshipKind === 'belongsTo') {
        model.set(relationshipName, null)
      } else {
        model.get(relationshipName).removeObject(relatedModel)
      }

      if (inverseRelationshipKind === 'belongsTo') {
        relatedModel.set(inverseRelationshipName, null)
      } else if (inverseRelationshipKind) {
        relatedModel.get(inverseRelationshipName).removeObject(relatedModel)
      }
    })
  },
  addRelated(model, relationshipName, relatedModel) {
    const {
      inverseRelationshipName,
      inverseRelationshipKind,
      relationshipKind
    } = this._relationshipInfo(model, relationshipName)
    let verb
    let data = {
      type: this._payloadKeyFromModel(relatedModel),
      id: relatedModel.get('id')
    }
    if (relationshipKind === 'belongsTo') {
      verb = 'PATCH'
    } else {
      verb = 'POST'
      data = [data]
    }

    return this.ajax(this.urlForAddToHasMany(model, relationshipName), verb, {
      data: { data }
    }).then(() => {
      if (relationshipKind === 'belongsTo') {
        model.set(relationshipName, relatedModel)
      } else {
        model.get(relationshipName).pushObject(relatedModel)
      }

      if (inverseRelationshipKind === 'belongsTo') {
        relatedModel.set(inverseRelationshipName, model)
      } else if (inverseRelationshipKind) {
        relatedModel.get(inverseRelationshipName).pushObject(model)
      }
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
  _relationshipInfo(...args) {
    return {
      inverseRelationshipName: inverseRelationshipName(...args),
      inverseRelationshipKind: inverseRelationshipKind(...args),
      relationshipKind: relationshipKind(...args)
    }
  },
  _urlForRelationship(model, relationshipName) {
    const modelName = model.get('constructor.modelName')
    const id = model.get('id')
    const store = model.get('store')
    return `${this.urlForRelationships(id, modelName)}/` +
      `${store.serializerFor(modelName).keyForRelationship(relationshipName)}`
  },
  _payloadKeyFromModel(model) {
    const modelName = model.constructor.modelName
    return model
      .store
      .serializerFor(modelName)
      .payloadKeyFromModelName(modelName)
  }
})
