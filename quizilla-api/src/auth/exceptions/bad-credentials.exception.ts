import { DomainException } from '@/exceptions/domain.exception';

export class BadCredentialsException extends DomainException {
  constructor() {
    super('Email or password is incorrect', 400);
  }
}
