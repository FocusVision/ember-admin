import { context, describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import page from '../pages/model-index'

describe('Acceptance: Admin Relationships', () => {
  let application

  const toyNames = ['Ball', 'Mouse']
  const ownerName = 'Pat Sullivan'

  beforeEach(() => {
    application = startApp()

    const owner = server.create('owner', { name: ownerName })
    const toys = toyNames.map(
      toy => server.create('toy', { name: toy })
    )
    server.create('cat', { owner, toys })
  })
  afterEach(() => destroyApp(application))

  it('should list relationships', async () => {
    await page
      .visitCatEdit({ cat_id: 1 })
      .clickOwnerRelationship()

    expect(page.owners().count).to.equal(1)
    expect(page.owners().text).to.include(ownerName)
  })

  context('many to many', () => {
    it('can create', async () => {
      await page
        .visitOwnerEdit({ owner_id: 1 })
        .clickCourses()
        .clickCreateRelatedCourse()
        .fillInTitle('Dogs 101')
        .clickSaveRelationship()

      expect(page.courses().count).to.equal(1)
      expect(page.courses(0).title).to.equal('Dogs 101')
    })

    it('can add', async () => {
      server.create('course', { title: 'Dogs 102' })

      await page
        .visitOwnerEdit({ owner_id: 1 })
        .clickCourses()
        .clickAddRelatedCourse()
        .relationshipCourses(0)
        .add()

      expect(page.courses().count).to.equal(1)
      expect(page.courses(0).title).to.equal('Dogs 102')
    })

    it('can remove', async () => {
      server.create('course', { title: 'Dogs 103', owners: [
        server.schema.owners.find(1)
      ]})

      await page
        .visitOwnerEdit({ owner_id: 1 })
        .clickCourses()

      expect(page.courses().count).to.equal(1)

      await page
        .courses(0)
        .remove()

      expect(page.courses().count).to.equal(0)
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

  context('one to many', () => {
    it('can create', async () => {
    })

    it('can add', async () => {
    })

    it('can remove', async () => {
    })
  })

  context('many to one', () => {
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
  //     .clickToys()
  //     .clickCreateRelatedToy()
  //     .fillInRelationshipName('Bell')
  //     .clickSaveRelationship()
  //
  //   expect(page.toys().count).to.equal(3)
  //   expect(page.toys(2).name).to.equal('Bell')
  // })
  //
  // it(
  //   'should properly create Many-to-Many relationship with inverse',
  //   async () => {
  //     const courses = server.createList('course', 1)
  //     server.create('owner', { courses })
  //
  //     await page
  //       .visitOwnerEdit({ owner_id: 2 })
  //       .clickCourses()
  //
  //     expect(page.courses().count).to.equal(1)
  //
  //     await page
  //       .clickCreateRelatedCourse()
  //       .fillInRelationshipTitle('New Course!')
  //       .clickSaveRelationship()
  //
  //     expect(page.courses().count).to.equal(2)
  //   }
  // )

  describe('pagination', () => {
    it('shows paginator on has-many page', async () => {
      await page
        .visitCatEdit({ cat_id: 1 })
        .clickToys()

      expect(page.paginatorIsVisible).to.be.true
      expect(page.paginatorPages().count).to.eq(1)
    })
  })

  describe('filtering', () => {
    it('filters on has-many page', async () => {
      await page
        .visitCatEdit({ cat_id: 1 })
        .clickToys()
        .filterBy('Ball')

      expect(currentURL()).to.eq('/admin/cat/1/toys?filter%5Bkeyword%5D=Ball')
    })
  })
})
