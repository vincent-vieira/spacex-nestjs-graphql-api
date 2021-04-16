import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IsString, validateSync, IsBoolean } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class Environment {
  @IsString()
  SPACEX_URL: string;

  @IsBoolean()
  IS_DEV: boolean;
}

function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(Environment, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `environments/.env.${process.env.NODE_ENV}`,
  validate,
});

@Module({
  imports: [configModule],
  exports: [configModule],
})
export class EnvironmentModule {}
