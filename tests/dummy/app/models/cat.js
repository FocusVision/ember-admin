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
  fleas: attr('boolean', { default: false }),
  bar: attr('string'),
  baz: attr('string'),
  toys: hasMany('toy', { async: true }),
  owner: belongsTo('owner', { async: true })
})
