import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | admin layout', function() {
  setupComponentTest('admin-layout', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#admin-layout}}
    //     template content
    //   {{/admin-layout}}
    // `);

    this.render(hbs`{{admin-layout}}`);
    expect(this.$()).to.have.length(1);
  });
});
