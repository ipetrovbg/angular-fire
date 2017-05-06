import { TestBed, inject } from '@angular/core/testing';

import { PcloudService } from './pcloud.service';

describe('PcloudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PcloudService]
    });
  });

  it('should ...', inject([PcloudService], (service: PcloudService) => {
    expect(service).toBeTruthy();
  }));
});
