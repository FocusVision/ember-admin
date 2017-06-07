import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import { findAll } from 'ember-native-dom-helpers'
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
    await page.visitCatEdit({ cat_id: 1 })

    expect(page.owners().count).to.equal(1)
    expect(page.owners().text).to.include(ownerName)
    expect(page.toys().count).to.equal(2)
    expect(page.toys().text.split(' ')).to.include.members(toyNames)
  })

  it('should create new model as a relationship to parent', async () => {
    await page
      .visitCatEdit({ cat_id: 1 })
      .clickCreateToyRelationship()
      .fillInName('Bell')
      .clickSave()

    expect(page.toys().count).to.equal(3)
    expect(page.toys(2).name).to.equal('Bell')
  })

  it(
    'should not display "Create" if singular relationship model exists',
    async () => {
      await page.visitCatEdit({ cat_id: 1 })

      expect(findAll('a[data-test=button-create]')).to.have.length(0)
    }
  )

  it(
    'should not display "Create" if no inverse relationship exists',
    async () => {
      const toys = server.createList('toy', 1, { name: 'Bird toy' })
      server.create('bird', { toys })

      await page.visitBirdEdit({ bird_id: 1 })

      expect(page.toys().count).to.equal(1)
      expect(findAll('a[data-test=button-create]')).to.have.length(0)
    }
  )

  it(
    'should properly create Many-to-Many relationship with inverse',
    async () => {
      const courses = server.createList('course', 1)
      server.create('owner', { courses })

      await page.visitOwnerEdit({ owner_id: 2 })

      expect(page.courses().count).to.equal(1)

      await page
        .clickCreateCourseRelationship()
        .fillInTitle('New Course!')
        .clickSave()

      expect(page.courses().count).to.equal(2)
    }
  )
})
