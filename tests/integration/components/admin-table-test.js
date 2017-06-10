import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | admin table', function() {
  setupComponentTest('admin-table', {
    integration: true
  })
  it('renders', function() {
    this.render(hbs`{{admin-table}}`)
    expect(this.$()).to.have.length(1)
  })
})
