import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { knexConfig } from './config/knex.config';

@Global()
@Module({
    imports: [
        KnexModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ ConfigService],
            useFactory: () => ({ config: {...knexConfig.config}}),
        })
    ]
})
export class DatabaseModule {}
