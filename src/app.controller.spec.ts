import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { exec } from 'child_process'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeAll(async () => {
    exec('rm -f db.json')
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
    appService = app.get<AppService>(AppService)
    appService.testDB()
  })

  afterAll(async () => {
    exec('rm -f db.json')
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
      expect(
        appController
          .getGeneSet({ geneset: 'hallmark.gmt' })
          .map((g) => g.geneset),
      ).toEqual(TEST_GENE_SET)
    })

    it('Add a gene set', () => {
      // const TEST_GENE_SET = ['hallmark.gmt']
      const params = {
        geneset: 'h2.gmt',
        method: 'BPA Gene Expression',
        result: { data: 'data' },
      }
      const result1 = appController.addGeneSetResult(params)
      expect(result1.error).toBeUndefined()
      expect(result1.result.data).toEqual('data')
      expect(appService.getGeneSets().length).toEqual(4)
      const result2 = appController.addGeneSetResult(params)
      expect(result2.error).toBeDefined()
    })

    it('Test removing a geneset ', () => {
      const params = {
        geneset: 'h4.gmt',
        method: 'BPA Gene Expression',
        result: { data: 'data4' },
      }
      const result1 = appController.addGeneSetResult(params)
      expect(result1.error).toBeUndefined()
      expect(result1.result.data).toEqual('data4')
      const result2 = appController.getGeneSet({ geneset: 'h4.gmt' })
      expect(result2.error).toBeUndefined()
      expect(result2[0].geneset).toEqual('h4.gmt')
      expect(result2[0].result.data).toEqual('data4')
      appController.removeGeneSetForAnalysis(params)
      const result3 = appController.getGeneSet({ geneset: 'h4.gmt' })
      expect(result3.length).toEqual(0)
    })

    it('Update a gene set', () => {
      const params = {
        geneset: 'h3.gmt',
        method: 'BPA Gene Expression',
        result: { data: 'data' },
      }
      const params2 = {
        geneset: 'h3.gmt',
        method: 'BPA Gene Expression',
        result: { data: 'data2' },
      }
      const result1 = appController.addGeneSetResult(params)
      expect(result1.error).toBeUndefined()
      expect(result1.result.data).toEqual('data')
      const result2 = appController.updateGeneSetResult(params2)
      expect(result2.error).toBeUndefined()
      expect(result2.result.data).toEqual('data2')
    })
  })
})
