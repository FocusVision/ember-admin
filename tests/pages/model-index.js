/* eslint max-len: "off" */

import {
  create,
  collection,
  isVisible,
  visitable,
  text,
  clickable,
  fillable
} from 'ember-cli-page-object'

export default create({
  visit: visitable('/admin'),
  visitBirdEdit: visitable('/admin/bird/:bird_id'),
  visitDogs: visitable('/admin/dogs'),
  visitDogsEdit: visitable('/admin/dogs/:dog_id'),
  visitDogsNew: visitable('/admin/dogs/new'),

  // Model index

  modelLinks: text('[data-test=models-list] a', {
    multiple: true
  }),
  clickModelTypeCat: clickable('[data-test=models-list-item-cat] a'),

  // Cats

  visitCats: visitable('/admin/cat'),
  visitCatEdit: visitable('/admin/cat/:cat_id'),
  visitCatNew: visitable('/admin/cat/new'),
  visitCatToys: visitable('/admin/cat/:cat_id/toys'),
  clickCreateRelatedCat: clickable('a[data-test=button-create-cat]'),
  clickAddRelatedCat: clickable('a[data-test=button-add-cat]'),
  catHeaders: collection({
    scope: 'table[data-test=admin-table-cat] thead',
    itemScope: 'tr',
    item: {
      id: text('th', { at: 0 }),
      name: text('th', { at: 1 }),
      age: text('th', { at: 2 })
    }
  }),
  catsList: collection({
    scope: 'table[data-test=admin-table-cat] tbody',
    itemScope: 'tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 }),
      age: text('td', { at: 2 })
    }
  }),
  relatedCatsList: collection({
    scope: '[data-test=admin-relationship-list] table[data-test=admin-table-cat] tbody',
    itemScope: 'tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 }),
      age: text('td', { at: 2 }),
      remove: clickable('button[data-test=button-remove-resource-relationship]')
    }
  }),
  relatedCatsSelectList: collection({
    scope: '[data-test=admin-relationship-select] table[data-test=admin-table-cat] tbody',
    itemScope: 'tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 }),
      add: clickable('button[data-test=button-add-resource-relationship]')
    }
  }),

  // Owners

  visitOwnerEdit: visitable('/admin/owner/:owner_id'),
  visitOwnerDogs: visitable('/admin/owner/:owner_id/dogs'),
  visitOwnerCats: visitable('/admin/owner/:owner_id/cats'),
  visitOwnerCourses: visitable('/admin/owner/:owner_id/courses'),
  visitOwnerProfile: visitable('/admin/owner/:owner_id/profile'),
  clickOwnerRelationship: clickable('li[data-test=relationship-tab-link-owner] a'),
  owners: collection({
    itemScope: 'table[data-test=admin-table-owner] tbody tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 })
    }
  }),

  // Profile

  clickCreateRelatedProfile: clickable('a[data-test=button-create-profile]'),
  clickAddRelatedProfile: clickable('a[data-test=button-add-profile]'),
  relatedProfileList: collection({
    scope: '[data-test=admin-relationship-list]  table[data-test=admin-table-profile] tbody',
    itemScope: ' tr',
    item: {
      id: text('td', { at: 0 }),
      phoneNumber: text('td', { at: 1 }),
      remove: clickable('button[data-test=button-remove-resource-relationship]')
    }
  }),
  relatedProfilesSelectList: collection({
    scope: '[data-test=admin-relationship-select] table[data-test=admin-table-profile] tbody',
    itemScope: 'tr',
    item: {
      id: text('td', { at: 0 }),
      phoneNumber: text('td', { at: 1 }),
      add: clickable('button[data-test=button-add-resource-relationship]')
    }
  }),

  // Toys

  visitToysCats: visitable('/admin/toy/:toy_id/cat'),
  clickRelatedToys: clickable('[data-test=relationship-tab-link-toys] a'),
  clickCreateRelatedToy: clickable('a[data-test=button-create-toy]'),
  clickAddRelatedToy: clickable('a[data-test=button-add-toy]'),
  hasManyToys: isVisible('table[data-test=relationship-tab-link-toys]'), // remove this
  relatedToysList: collection({
    scope: '[data-test=admin-relationship-list] table[data-test=admin-table-toy] tbody',
    itemScope: ' tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 }),
      remove: clickable('button[data-test=button-remove-resource-relationship]')
    }
  }),
  relatedToysSelectList: collection({
    scope: '[data-test=admin-relationship-select] table[data-test=admin-table-toy] tbody',
    itemScope: 'tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 }),
      add: clickable('button[data-test=button-add-resource-relationship]')
    }
  }),

  // Courses

  clickCourses: clickable('[data-test=relationship-tab-link-courses] a'),
  clickCreateRelatedCourse: clickable('a[data-test=button-create-course]'),
  clickAddRelatedCourse: clickable('a[data-test=button-add-course]'),
  relatedCoursesList: collection({
    scope: '[data-test=admin-relationship-list] table[data-test=admin-table-course] tbody',
    itemScope: 'tr',
    item: {
      id: text('td', { at: 0 }),
      title: text('td', { at: 1 }),
      remove: clickable('button[data-test=button-remove-resource-relationship]')
    }
  }),
  relatedCoursesSelectList: collection({
    scope: '[data-test=admin-relationship-select] table[data-test=admin-table-course] tbody ',
    itemScope: 'tr',
    item: {
      id: text('td', { at: '0' }),
      title: text('td', { at: '1' }),
      add: clickable('button[data-test=button-add-resource-relationship]')
    }
  }),

  // Paginator
  paginatorCount: text('[data-test=admin-paginator] span'),
  paginator: collection({
    itemScope: '[data-test=admin-paginator]',
    item: {
      first: clickable('button', { at: 0 }),
      previous: clickable('button', { at: 1 }),
      next: clickable('button', { at: 2 }),
      last: clickable('button', { at: 3 })
    }
  }),

  // Filtering

  filterBy: fillable('input[data-test=filter-input]'),

  // Forms

  fillInName: fillable('input[data-test=admin-field-string-name]'),
  fillInAge: fillable('input[data-test=admin-field-string-age]'),
  fillInTitle: fillable('input[data-test=admin-field-string-title]'),
  clickFleas: clickable('input[data-test=admin-field-boolean-fleas]'),
  formLabelName: text('label[data-test=form-label-name]'),
  fillInRelationshipName: fillable('input[data-test=admin-field-string-name]', {
    scope: '[data-test=admin-form-for-relationship]'
  }),
  fillInRelationshipTitle: fillable('input[data-test=admin-field-string-title]',
    { scope: '[data-test=admin-form-for-relationship]' }
  ),
  fillInRelationshipPhoneNumber: fillable('input[data-test=admin-field-string-phoneNumber]',
    { scope: '[data-test=admin-form-for-relationship]' }
  ),

  // Form Actions

  clickSave: clickable('button[data-test=button-save]'),
  clickDelete: clickable('button[data-test=button-delete]'),
  clickCancel: clickable('button[data-test=button-cancel]'),
  clickCreate: clickable('a[data-test=button-create]'),
  clickSaveRelationship: clickable('button[data-test=button-save]', {
    scope: '[data-test=admin-form-for-relationship]'
  }),
  clickDoneAdding: clickable('button[data-test=button-done-adding]')
})
