import auth from "@config/auth";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  nationalIdentity: string;
  password: string;
}

interface IUserResponse {
  name: string;
  nationalIdentity: string;
}

interface IResponse {
  user: IUserResponse;
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ nationalIdentity, password }: IRequest): Promise<IResponse> {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!nationalIdentity) {
      throw new AppError("National Identity is required");
    }

    if (!password) {
      throw new AppError("Password is required");
    }

    const user = await this.usersRepository.findByNationalIdentity(
      nationalIdentity
    );
    if (!user) {
      throw new AppError("User and password does not match");
    }

    const isPasswordMatched = await compare(password, user.password);
    if (!isPasswordMatched) {
      throw new AppError("User and password does not match");
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ nationalIdentity }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const tokenResponse: IResponse = {
      user: {
        name: user.fullName,
        nationalIdentity: user.nationalIdentity,
      },
      token,
      refresh_token,
    };

    return tokenResponse;
  }
}

export { AuthenticateUserUseCase };
