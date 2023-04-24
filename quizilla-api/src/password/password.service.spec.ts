import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate correct password hash string', async () => {
    const passwordHash = await service.hash('test');
    expect(typeof passwordHash).toBe('string');
    expect(passwordHash).toHaveLength(60);
  });

  it('should return falsy value after comparing wrong password hash', async () => {
    const password = 'test';
    const passwordHash = 'wrong password hash';
    const compareResult = await service.compare(password, passwordHash);
    expect(compareResult).toBeFalsy();
  });

  it('should return truthy value after comparing generated password hash using hash method', async () => {
    const password = 'test';
    const passwordHash = await service.hash(password);
    const compareResult = await service.compare(password, passwordHash);
    expect(compareResult).toBeTruthy();
  });
});
