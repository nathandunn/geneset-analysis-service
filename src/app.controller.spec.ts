import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Param } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const fse = require('fs-extra')
// import { promisify } from 'util'
import { exec } from 'child_process'
// const sleep = promisify(setTimeout)

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

  // beforeEach(async () => {
  //   const app: TestingModule = await Test.createTestingModule({
  //     controllers: [AppController],
  //     providers: [AppService],
  //   }).compile()
  //
  //   appController = app.get<AppController>(AppController)
  //   appService = app.get<AppService>(AppService)
  //   appService.testDB()
  // })

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

    // it('If gene set already exists, then fail', () => {
    //   // const TEST_GENE_SET = ['hallmark.gmt']
    //   const params = {
    //     geneset: 'h2.gmt',
    //     method: 'BPA Gene Expression',
    //     result: { data: 'data' },
    //   }
    //   appController.addGeneSetResult(params)
    //   console.log('getting gene sets ')
    //   const outputGeneSets = appService.getGeneSets()
    //   console.log(outputGeneSets)
    //   expect(appService.getGeneSets().length).toEqual(4)
    //   expect(appService.getGeneSet('h2.gmt').result.data).toEqual('data')
    // })

    // it('Update a gene set', () => {
    //   const TEST_GENE_SET = ['hallmark.gmt']
    //   expect(appController.getGeneSet({ geneset: 'hallmark.gmt' })).toEqual(
    //     TEST_GENE_SET,
    //   )
    // })
  })
})
