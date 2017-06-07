import DS from 'ember-data'

const {
  attr,
  belongsTo,
  hasMany,
  Model
} = DS

export default Model.extend({
  name: attr('string'),
  age: attr('number'),
  owner: belongsTo('owner'),
  toys: hasMany('toy', { async: true })
})
