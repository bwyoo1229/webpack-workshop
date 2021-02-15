function component() {
  const element = document.createElement('div');

  // lodash is required for next line to run
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());