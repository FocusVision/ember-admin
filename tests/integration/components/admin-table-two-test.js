import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | admin table two', function() {
  setupComponentTest('admin-table-two', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#admin-table-two}}
    //     template content
    //   {{/admin-table-two}}
    // `);

    this.render(hbs`{{admin-table-two}}`);
    expect(this.$()).to.have.length(1);
  });
});
