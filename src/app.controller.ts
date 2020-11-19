import { Controller, Get, Param, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/geneset/')
  getGeneSets(): any {
    return this.appService.getGeneSets()
  }

  @Get('/geneset/:method')
  getGeneSetsForAnalysis(@Param() params): any {
    const method: string = params.method
    return this.appService.getGeneSetsForAnalysis(method)
  }

  @Get('/geneset/:geneset')
  getGeneSet(@Param() params): any {
    return this.appService.getGeneSet(params.geneset)
  }

  @Get('/geneset/:method/:geneset')
  getGeneSetForAnalysis(@Param() params): any {
    return this.appService.getGeneSetResult(params.method, params.geneset)
  }

  @Post('/geneset/:method/:geneset')
  addGeneSetResult(@Param() params): any {
    const geneset = params.geneset
    const method = params.method
    const result = params.result
    return this.appService.addGeneSetResult(method, geneset, result)
  }
}
