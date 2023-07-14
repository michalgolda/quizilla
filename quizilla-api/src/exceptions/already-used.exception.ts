import { DomainException } from './domain.exception';

export class AlreadyUsedException extends DomainException {
  constructor(fieldName: string) {
    super(`${fieldName} is already used`, 400);
  }
}
