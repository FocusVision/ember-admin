import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | admin layout/tabs link', function() {
  setupComponentTest('admin-layout/tabs-link', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#admin-layout/tabs-link}}
    //     template content
    //   {{/admin-layout/tabs-link}}
    // `);

    this.render(hbs`{{admin-layout/tabs-link}}`);
    expect(this.$()).to.have.length(1);
  });
});
