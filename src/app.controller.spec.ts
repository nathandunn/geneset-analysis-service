import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Param } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra')

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    if (fs.existsSync('db.json')) {
      fs.removeSync('db.son')
    }
    fs.ensureFileSync('db.json')
    appController = app.get<AppController>(AppController)
    appService = app.get<AppService>(AppService)
    appService.testDB()
  })

  describe('root', () => {
    it('should return "Hello World stuff!"', () => {
      expect(appController.getHello()).toBe('Hello World!asdf123')
    })
  })

  describe('Handling database', () => {
    it('Get all gene sets', () => {
      const TEST_GENE_SET = ['hallmark.gmt', 'bpaAll.gmt', 'paradigmIPL.gmt']
      expect(appController.getGeneSets()).toEqual(TEST_GENE_SET)
    })

    it('Get all gene sets for analysis', () => {
      const TEST_GENE_SET = ['hallmark.gmt', 'bpaAll.gmt']
      // let param = new Param()
      const param = {}
      param['method'] = 'BPA Gene Expression'
      expect(appController.getGeneSetsForAnalysis(param)).toEqual(TEST_GENE_SET)
    })

    it('Get one gene set', () => {
      const TEST_GENE_SET = ['hallmark.gmt']
      expect(appController.getGeneSet({ geneset: 'hallmark.gmt' })).toEqual(
        TEST_GENE_SET,
      )
    })
  })
})
