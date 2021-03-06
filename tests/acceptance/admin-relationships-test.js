import { context, describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import page from '../pages/model-index'

describe('Acceptance: Admin Relationships', function() {
  this.timeout(100000)
  let application

  beforeEach(() => {
    application = startApp()

    const owner = server.create('owner', { name: 'Bob Bobert' })
    server.create('cat', { owner })
  })

  afterEach(() => destroyApp(application))

  it('should list relationships', async () => {
    await page
      .visitCatEdit({ cat_id: 1 })
      .clickOwnerRelationship()

    expect(page.owners().count).to.equal(1)
    expect(page.owners().text).to.include('Bob Bobert')
  })

  context('many to many', () => {
    it('can create', async () => {
      await page
        .visitOwnerEdit({ owner_id: 1 })
        .clickCourses()
        .clickCreateRelatedCourse()
        .fillInTitle('Dogs 101')
        .clickSaveRelationship()

      expect(page.relatedCoursesList().count).to.equal(1)
      expect(page.relatedCoursesList(0).title).to.equal('Dogs 101')
    })

    it('can add', async () => {
      server.create('course', { title: 'Dogs 102' })

      await page
        .visitOwnerEdit({ owner_id: 1 })
        .clickCourses()

      expect(page.relatedCoursesList().count).to.equal(0)

      await page
        .clickAddRelatedCourse()
        .relatedCoursesSelectList(0).add()

      await page.clickDoneAdding()

      expect(page.relatedCoursesList().count).to.equal(1)
      expect(page.relatedCoursesList(0).title).to.equal('Dogs 102')
    })

    it('can remove', async () => {
      server.create('course', {
        title: 'Dogs 103',
        owners: [
          server.schema.owners.find(1)
        ]
      })

      await page
        .visitOwnerCourses({ owner_id: 1 })

      expect(page.relatedCoursesList().count).to.equal(1)

      await page
        .relatedCoursesList(0)
        .remove()

      expect(page.relatedCoursesList().count).to.equal(0)
    })
  })

  context('one to many', () => {
    it('can create', async () => {
      await page
        .visitCatToys({ cat_id: 1 })

      expect(page.relatedToysList().count).to.equal(0)

      await page
        .clickCreateRelatedToy()
        .fillInRelationshipName('Ball')
        .clickSaveRelationship()

      expect(page.relatedToysList().count).to.equal(1)
      expect(page.relatedToysList(0).name).to.equal('Ball')
    })

    it('can add', async () => {
      server.create('toy', { name: 'Mouse' })

      await page
        .visitCatToys({ cat_id: 1 })

      expect(page.relatedToysList().count).to.equal(0)

      await page
        .clickAddRelatedToy()
        .relatedToysSelectList(0)
        .add()
      await page.clickDoneAdding()

      expect(page.relatedToysList().count).to.equal(1)
    })

    it('can remove', async () => {
      const cat = server.schema.cats.find(1)
      cat.createToy({ title: 'Yarn' })

      await page
        .visitCatToys({ cat_id: 1 })

      expect(page.relatedToysList().count).to.equal(1)

      await page
        .relatedToysList(0)
        .remove()

      expect(page.relatedToysList().count).to.equal(0)
    })
  })

  context('many to one', () => {
    it('can create', async () => {
      server.create('toy', { name: 'Bell' })

      await page
        .visitToysCats({ toy_id: 1 })

      expect(page.relatedCatsList().count).to.equal(0)

      await page
        .clickCreateRelatedCat()
        .fillInRelationshipName('Fluffy')
        .clickSaveRelationship()

      expect(page.relatedCatsList().count).to.equal(1)
      expect(page.relatedCatsList(0).name).to.equal('Fluffy')
    })

    it('can add', async () => {
      server.create('toy', { name: 'Bell' })

      await page
        .visitToysCats({ toy_id: 1 })

      expect(page.relatedCatsList().count).to.equal(0)

      await page
        .clickAddRelatedCat()
        .relatedCatsSelectList(0)
        .add()
      await page.clickDoneAdding()

      expect(page.relatedCatsList().count).to.equal(1)
      expect(page.relatedCatsList(0).name).to.equal(
        server.schema.cats.find(1).name
      )
    })

    // TODO: There is currently an issue
    // Where the relationship does not appear to
    // udpate the model binding on belongsTo relationships
    it.skip('can remove', async () => {
      const cat = server.schema.cats.find(1)
      server.create('toy', { name: 'Bell', cat })

      await page
        .visitToysCats({ toy_id: 1 })

      expect(page.relatedCatsList().count).to.equal(1)

      await page
        .relatedCatsList(0)
        .remove()

      expect(page.relatedCatsList().count).to.equal(0)
    })
  })

  context('one to one', () => {
    it('can create', async () => {
      await page
        .visitOwnerProfile({ owner_id: 1 })

      expect(page.relatedProfileList().count).to.equal(0)

      await page
        .clickCreateRelatedProfile()
        .fillInRelationshipPhoneNumber('111.111.1111')
        .clickSaveRelationship()

      expect(page.relatedProfileList().count).to.equal(1)
      expect(page.relatedProfileList(0).phoneNumber).to.equal('111.111.1111')
    })

    it('can add', async () => {
      server.create('profile', { phoneNumber: '111.111.1111' })

      await page
        .visitOwnerProfile({ owner_id: 1 })

      expect(page.relatedProfileList().count).to.equal(0)

      await page
        .clickAddRelatedProfile()
        .relatedProfilesSelectList(0)
        .add()

      await page
        .clickDoneAdding()

      expect(page.relatedProfileList().count).to.equal(1)
      expect(page.relatedProfileList(0).phoneNumber).to.equal('111.111.1111')
    })

    // TODO: There is currently an issue
    // Where the relationship does not appear to
    // udpate the model binding on belongsTo relationships
    it.skip('can remove', async () => {
      const owner = server.schema.owners.find(1)
      owner.createProfile({ phoneNumber: '111.111.1111' })

      await page
        .visitOwnerProfile({ owner_id: 1 })

      expect(page.relatedProfileList().count).to.equal(1)

      await page
        .relatedProfileList(0)
        .remove()

      expect(page.relatedProfileList().count).to.equal(0)
    })
  })

  describe('pagination', () => {
    it('shows paginator on has-many page', async () => {
      const cat = server.schema.cats.find(1)
      server.createList('toy', 30, { cat })

      await page
        .visitCatToys({ cat_id: 1 })

      expect(page.paginatorCount).to.eq('1 of 1')
    })
  })

  describe('filtering', () => {
    it('filters on has-many page', async () => {
      await page
        .visitCatEdit({ cat_id: 1 })
        .clickRelatedToys()
        .filterBy('Ball')

      expect(currentURL()).to.eq('/admin/cat/1/toys?filter%5Bkeyword%5D=Ball')
    })
  })
})
