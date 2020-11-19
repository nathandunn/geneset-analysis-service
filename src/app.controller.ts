import { Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/geneset/:geneset')
  getGeneSet(@Param() params): any {
    return {
      geneset: params.geneset,
    }
  }

  @Get('/geneset/:analysis/:geneset')
  getGeneSetForAnalysis(@Param() params): any {
    return {
      analysis: params.analysis,
      geneset: params.geneset,
    }
  }
}
