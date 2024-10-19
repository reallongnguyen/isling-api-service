import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  // PrismaHealthIndicator,
} from '@nestjs/terminus';
// import { PrismaService } from 'src/common/prisma/prisma.service';
import { CacheHealthIndicator } from './cache.health';

@Controller('health')
@ApiTags('app')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    // private prisma: PrismaHealthIndicator,
    // private prismaService: PrismaService,
    private cache: CacheHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      // () => this.prisma.pingCheck('database', this.prismaService),
      () => this.cache.isHealthy('cache'),
    ]);
  }
}
