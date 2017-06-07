import DS from 'ember-data'

const {
  attr,
  Model,
  belongsTo,
  hasMany
} = DS

export default Model.extend({
  name: attr('string'),
  age: attr('number'),
  toys: hasMany('toy'),
  owner: belongsTo('owner')
})
