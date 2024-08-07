import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {LeadsModule} from "./modules/leads/leads.module";
import {PrismaService} from "./prisma.service";

@Module({
  imports: [LeadsModule],
  providers: [PrismaService]
})
export class AppModule  implements NestModule{
  configure(_: MiddlewareConsumer): any {
  }
}