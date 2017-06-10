import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | admin form', function() {
  setupComponentTest('admin-form', {
    integration: true
  })
  it('renders', function() {
    this.render(hbs`{{admin-form}}`)
    expect(this.$()).to.have.length(1)
  })
})
