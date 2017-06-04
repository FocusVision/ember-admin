export { rowValuesEqual, inputPropertiesEqual }

function rowValuesEqual(...args) {
  const [assert, row] = [...args]

  const values = Array.prototype.slice.call(...args, 2, [...args].length)
  const columns = row.find('th, td')
  let columnText

  assert.equal(
    columns.length, values.length,
    `expected ${values.length} columns: (${values.join(', ')})`
  )

  for (let i = 0; i < columns.length; i++) {
    columnText = columns.eq(i).text().trim()
    assert.equal(
      columnText, values[i],
      `expected column(${(i + 1)}) with value: ${values[i]}`
    )
  }
}

function inputPropertiesEqual(...args) {
  const [assert, inputs] = [...args]
  const values = Array.prototype.slice.call(...args, 2, [...args].length)
  let labelText

  assert.equal(
    inputs.length, values.length,
    `expected ${values.length} inputs: (${values.join(', ')})`
  )

  for (let i = 0; i < inputs.length; i++) {
    labelText = inputs.eq(i).parent().text().trim()

    assert.equal(
      labelText, values[i],
      `expected input(${(i + 1)}) for property: ${values[i]}`
    )
  }
}
