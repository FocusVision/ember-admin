import { context, describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import page from '../pages/model-index'

describe('Acceptance: Admin Relationships', function() {
  this.timeout(10000)
  let application

  beforeEach(() => {
    application = startApp()

    const owner = server.create('owner', { name: 'Bob Boberson' })
    server.create('cat', { owner })
  })

  afterEach(() => destroyApp(application))

  it('should list relationships', async () => {
    await page
      .visitCatEdit({ cat_id: 1 })
      .clickOwnerRelationship()

    expect(page.owners().count).to.equal(1)
    expect(page.owners().text).to.include('Bob Boberson')
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
    // udpate the model binding
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
    })

    it('can add', async () => {
    })

    it('can remove', async () => {
    })
  })

  // it('should create new model as a relationship to parent', async () => {
  //   await page
  //     .visitCatEdit({ cat_id: 1 })
  //     .clickRelatedToys()
  //     .clickCreateRelatedToy()
  //     .fillInRelationshipName('Bell')
  //     .clickSaveRelationship()
  //
  //   expect(page.relatedToysList().count).to.equal(3)
  //   expect(page.relatedToysList(2).name).to.equal('Bell')
  // })
  //
  // it(
  //   'should properly create Many-to-Many relationship with inverse',
  //   async () => {
  //     const relatedCoursesList = server.createList('course', 1)
  //     server.create('owner', { relatedCoursesList })
  //
  //     await page
  //       .visitOwnerEdit({ owner_id: 2 })
  //       .clickCourses()
  //
  //     expect(page.relatedCoursesList().count).to.equal(1)
  //
  //     await page
  //       .clickCreateRelatedCourse()
  //       .fillInRelationshipTitle('New Course!')
  //       .clickSaveRelationship()
  //
  //     expect(page.relatedCoursesList().count).to.equal(2)
  //   }
  // )

  describe('pagination', () => {
    it('shows paginator on has-many page', async () => {
      await page
        .visitCatEdit({ cat_id: 1 })
        .clickRelatedToys()

      expect(page.paginatorIsVisible).to.be.true
      expect(page.paginatorPages().count).to.eq(1)
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
