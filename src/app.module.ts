import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {LeadsModule} from "./modules/leads/leads.module";
import {PrismaService} from "./prisma.service";
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD} from "@nestjs/core";

@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 30,
        }]),
        LeadsModule
    ],
    providers: [
        PrismaService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule implements NestModule {
    configure(_: MiddlewareConsumer): any {
    }
}