import Ember from 'ember'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | admin form', () => {
  setupComponentTest('admin-form', {
    integration: true
  })
  it('renders', function() {
    this.set('model', Ember.Object.create({
      id: 1,
      name: 'Bobert'
    }))

    this.render(hbs`{{admin-form
      recordType='cat'
      model=model
    }}`)
    expect(this.$()).to.have.length(1)
  })
})
