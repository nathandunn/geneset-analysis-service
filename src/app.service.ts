import { Injectable } from '@nestjs/common'

import low = require('lowdb')
import FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!asdf123'
  }

  testDB(): any {
    const defaultDb = [
      {
        method: 'BPA Gene Expression',
        geneset: 'hallmark.gmt',
        result: { value: 'hallmark results' },
      },
      {
        method: 'BPA Gene Expression',
        geneset: 'bpaAll.gmt',
        result: { value: 'bpa all gmt' },
      },
      {
        method: 'Paradigm',
        geneset: 'paradigmIPL.gmt',
        result: { value: 'bpa all gmt' },
      },
    ]
    return db.defaults({ results: defaultDb }).write()
  }

  initDB(): any {
    // Set some defaults (required if your JSON file is empty)
    return db.defaults({ results: [] }).write()
  }

  addGeneSetResult(method: string, geneset: string, result: any): any {
    const resultToAdd = {
      method: method,
      geneset: geneset,
      result: result,
    }
    db.get('results').push(resultToAdd).write()
  }

  getGeneSetResult(method: string, geneset: string): any {
    return db
      .get('results')
      .filter({ method: method, geneset: geneset })
      .value()
  }

  getGeneSets() {
    return db
      .get('results')
      .map((r) => r.geneset)
      .value()
  }

  getGeneSetsForAnalysis(method: string) {
    return db
      .get('results')
      .filter({ method: method })
      .map((r) => r.geneset)
      .value()
  }

  getGeneSet(geneset: any) {
    return db
      .get('results')
      .filter({ geneset: geneset })
      .map((r) => r.geneset)
      .value()
  }
}
