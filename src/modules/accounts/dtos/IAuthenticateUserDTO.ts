interface IUser {
  name: string;
  nationalIdentity: string;
}

interface IAuthenticatedUserDTO {
  user: IUser;
  token: string;
  refresh_token: string;
}

export { IAuthenticatedUserDTO };
