import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
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

  @Get('/geneset/all/:method')
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

  @Delete('/geneset/:method/:geneset')
  removeGeneSetForAnalysis(@Param() params): any {
    return this.appService.removeGeneSetForAnalysis(
      params.method,
      params.geneset,
    )
  }

  @Post('/geneset')
  addGeneSetResult(@Body() data: any): any {
    const geneset = data.geneset
    const method = data.method
    const result = data.result
    return this.appService.addGeneSetResult(method, geneset, result)
  }

  @Put('/geneset/:method/:geneset')
  updateGeneSetResult(@Param() params, @Body() data: any): any {
    const geneset = params.geneset
    const method = params.method
    return this.appService.updateGeneSetResult(method, geneset, data)
  }
}
