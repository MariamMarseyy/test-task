import { Body, Controller, Patch, Post, Put, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthRequestDto, SignUpDto } from './dto/auth.dto';
import { IAuthResponse } from '../../Common/Interfaces/auth/IAuthResponse';
import { IAuthMessage } from '../../Common/Interfaces/auth/IAuthMessage';
import { IsPublic } from '../../Common/Decorators/is-public.decorator';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * user sign up
   * @param signUpDto
   */
  @Post('sign-up')
  @IsPublic()
  @ApiOperation({ summary: 'Registration' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  /**
   * @description Log in
   * @param credential
   */

  @Post('login')
  @IsPublic()
  @ApiOperation({ summary: 'Log in to system' })
  public async login(
    @Body() credential: AuthRequestDto,
  ): Promise<IAuthResponse | IAuthMessage> {
    return await this.authService.auth(credential);
  }
}
