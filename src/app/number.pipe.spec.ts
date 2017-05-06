import { RoundPipe } from './number.pipe';

describe('RoundPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundPipe();
    expect(pipe).toBeTruthy();
  });
});
