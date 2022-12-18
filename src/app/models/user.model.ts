export interface UserModel {
  get id(): string;
  get displayName(): string;
  get department(): string;
  get userPrincipalName(): string;
}
