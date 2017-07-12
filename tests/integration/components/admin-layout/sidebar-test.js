import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | admin layout/sidebar', function() {
  setupComponentTest('admin-layout/sidebar', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#admin-layout/sidebar}}
    //     template content
    //   {{/admin-layout/sidebar}}
    // `);

    this.render(hbs`{{admin-layout/sidebar}}`);
    expect(this.$()).to.have.length(1);
  });
});
