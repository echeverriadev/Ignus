import { TypeContactModule } from './typecontact.module';

describe('PerfilModule', () => {
  let recaudoModule: TypeContactModule;

  beforeEach(() => {
    recaudoModule = new TypeContactModule();
  });

  it('should create an instance', () => {
    expect(recaudoModule).toBeTruthy();
  });
});
