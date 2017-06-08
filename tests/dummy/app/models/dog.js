import DS from 'ember-data'
import HasManyQuery from 'ember-data-has-many-query'

const {
  attr,
  hasMany,
  belongsTo,
  Model
} = DS
const { ModelMixin } = HasManyQuery

export default Model.extend(ModelMixin, {
  name: attr('string'),
  age: attr('number'),
  toys: hasMany('toy'),
  owner: belongsTo('owner')
})
