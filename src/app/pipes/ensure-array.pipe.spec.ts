import { EnsureArrayPipe } from './ensure-array.pipe';

describe('EnsureArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new EnsureArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
