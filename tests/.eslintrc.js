module.exports = {
  extends: 'focusvision/ember',
  env: {
    embertest: true
  },
  globals: {
    server: true,
    '$': true,
    'afterEach': true,
    'beforeEach': true,
    'server': true
  },
  rules: {
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2
  }
}
