import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | column actions relationship', () => {
  setupComponentTest('column-actions-relationship', {
    integration: true
  })
  it('renders', function() {
    this.render(hbs`{{column-actions-relationship}}`)
    expect(this.$()).to.have.length(1)
  })
})
