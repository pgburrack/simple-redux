var actions = require('./actions/publishers');

describe('actions', () => { // TODO: Add tests
  // [undefined, null, ''].forEach((param) =>
  // it(`should set publishers with default parameter ${param}` , () => {
  //    expect(actions.addRecipe(param)).toMatchSnapshot()
  // }));

  it('should create an action to set publishers', () => {
    const publishers = ['publisher1', 'publisher2'];

    expect(actions.setPublishers(publishers)).toMatchSnapshot();
  });
});