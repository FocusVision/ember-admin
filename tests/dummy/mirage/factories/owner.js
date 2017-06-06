import { Factory, faker } from 'ember-cli-mirage'

const {
  name: { findName }
} = faker

export default Factory.extend({
  name: findName
})
