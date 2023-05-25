import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthRequestDto, SignUpDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { IAuthResponse } from '../../Common/Interfaces/auth/IAuthResponse';
import { IAuthMessage } from '../../Common/Interfaces/auth/IAuthMessage';
import { IJwtPayload } from '../../Common/Interfaces/auth/IJwtPayload';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description User Sign Up
   * @param signUpDto
   */
  // public async signUp(signUpDto: SignUpDto) {
  //   const { email, password } = signUpDto;
  //   const user = await this.userRepository.create({
  //     email,
  //     password: password || null,
  //   });
  //   return true;
  // }
  public async signUp(signUpDto: SignUpDto): Promise<boolean> {
    const { password, ...rest } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return true;
  }
  /**
   * @description Main Auth Service & Return access_token
   * @param loginInfo
   */
  public async auth(
    loginInfo: AuthRequestDto,
  ): Promise<IAuthResponse | IAuthMessage> {
    const user = await this.userService.getUserByEmail(loginInfo.email);
    if (user?.verifyPassword(loginInfo.password)) {
      return await this.login(user);
    } else {
      throw new BadRequestException('Incorrect Credentials');
    }
  }

  public async login(user: User): Promise<IAuthResponse | any> {
    if (!user) throw new NotFoundException('User not Found');
    const userInfo = await this.userService.getUserByEmail(user.email);

    const jwtPayload: IJwtPayload = {
      id: user.id,
      email: user.email,
      iat: new Date().getTime() / 1000,
    };
    const accessToken = this.jwtService.sign(jwtPayload, {
      expiresIn: '1h',
    });
    if (!accessToken) throw new BadRequestException('Incorrect Credentials');
    const refreshToken = this.jwtService.sign(jwtPayload, {
      expiresIn: '30d',
    });
    return {
      authorized: true,
      access_token: accessToken,
      refresh_token: refreshToken,
      userInfo,
    };
  }

  /**
   * @description  Validate User Decoded From JWT
   */
  public async validateUser(payload: IJwtPayload): Promise<User> {
    return await this.userService.validateUser(payload.id);
  }
  // /**
  //  * @description  Validate JWT
  //  */
  // public async verifyJwt(token: string): Promise<any> {
  //   return this._jwtService.verifyAsync(token);
  // }
}
