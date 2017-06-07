import { Factory, faker } from 'ember-cli-mirage'

const {
  lorem: { words }
} = faker

export default Factory.extend({
  title: () => words(5)
})
