import DS from 'ember-data'
import HasManyQuery from 'ember-data-has-many-query'

const {
  attr,
  belongsTo,
  hasMany,
  Model
} = DS
const { ModelMixin } = HasManyQuery

export default Model.extend(ModelMixin, {
  name: attr('string'),
  age: attr('number'),
  owner: belongsTo('owner'),
  toys: hasMany('toy', { async: true })
})
