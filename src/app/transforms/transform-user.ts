import { User } from 'microsoft-graph';
import { UserModel } from '../models/user.model';

export const transformUser = (src: Array<User>): Array<UserModel> =>
  src.map((x) => ({
    id: x.id!,
    displayName: x.displayName!,
    department: x.department!,
    userPrincipalName: x.userPrincipalName!,
  }));
