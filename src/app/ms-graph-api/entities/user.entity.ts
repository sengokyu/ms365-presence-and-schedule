export interface UserEntity {
  get id(): string;
  get displayName(): string;
  get department(): string;
  get mail(): string;
  get userPrincipalName(): string;
}
