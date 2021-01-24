import { BBCActivator } from '../src/activator/bbc/BBCActivator';
import { BaseActivator } from '../src/activator/BaseActivator';

const main = () => {
  let bbcAtivator: BaseActivator = new BBCActivator();
  bbcAtivator.invoke();
};

main();

export const person = () => {
  console.log('come in');
  return 'hello world';
};
