import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | admin resource list', function() {
  setupComponentTest('admin-resource-list', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#admin-resource-list}}
    //     template content
    //   {{/admin-resource-list}}
    // `);

    this.render(hbs`{{admin-resource-list}}`);
    expect(this.$()).to.have.length(1);
  });
});
