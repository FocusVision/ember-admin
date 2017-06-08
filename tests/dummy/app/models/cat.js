import DS from 'ember-data'

const {
  attr,
  hasMany,
  belongsTo,
  Model
} = DS

export default Model.extend({
  name: attr('string'),
  age: attr('number'),
  fleas: attr('boolean', { default: false }),
  bar: attr('string'),
  baz: attr('string'),
  toys: hasMany('toy', { async: true }),
  owner: belongsTo('owner', { async: true })
})
