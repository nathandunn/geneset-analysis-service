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

  initDB(): any {
    // Set some defaults (required if your JSON file is empty)
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
    ]
    return db.defaults({ results: defaultDb }).write()
  }

  addGeneSetResult(method: string, geneset: string, result: any): any {
    // const results = db.get(geneset)
    // if(results===undefined){
    //
    // }
    db.get(geneset).push({ result: result })
  }

  getGeneSetResult(method: string, geneset: string): any {
    return db.get(geneset)
    db.set('method')
  }
}
