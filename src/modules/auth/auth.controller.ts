import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { SignInRequestDto } from './dto/request/sign-in.request.dto';
import { SignUpRequestDto } from './dto/request/sign-up.request.dto';
import { AuthUserResponseDto } from './dto/response/auth-user.response.dto';
import { TokenResponseDto } from './dto/response/token.response.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { IUserData } from './interfaces/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth() // щоб обходити дефолтне налаштування нашого гуарда
  @ApiOperation({ summary: 'Registration' })
  @Post('sign-up')
  public async signUp(
    @Body() dto: SignUpRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth() // пропускає базову авторизацію, не дає глобальному гуарду спрацьовувати
  @ApiOperation({ summary: 'Login' })
  @Post('sign-in')
  public async signIn(
    @Body() dto: SignInRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signIn(dto);
  }

  @ApiBearerAuth() // то є закритий ендпоінт
  @ApiOperation({ summary: 'Logout' })
  @Post('logout')
  public async logout(@CurrentUser() userData: IUserData): Promise<void> {
    //@CurrentUser() - дістає з реквесту
    await this.authService.logout(userData);
  }

  @SkipAuth() // пропускає базову авторизацію
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard) // вішаємо ґуард на ендпоінт якщо всі гуарди будуть тру то пройдемо далі
  @ApiOperation({ summary: 'Update token pair' })
  @Post('refresh') // Рефреш ендпоінт
  public async updateRefreshToken(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenResponseDto> {
    return await this.authService.refreshToken(userData);
  }
}
