import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | admin filter keyword', () => {
  setupComponentTest('admin-filter-keyword', {
    integration: true
  })
  it('renders', function() {
    this.render(hbs`{{admin-filter-keyword}}`)
    expect(this.$()).to.have.length(1)
  })
})
