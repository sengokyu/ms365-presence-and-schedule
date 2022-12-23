export interface UserEntity {
  get id(): string;
  get displayName(): string;
  get department(): string;
  get userPrincipalName(): string;
}
