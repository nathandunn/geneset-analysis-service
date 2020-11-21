import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
// const fs = require('fs')

// import low = require('lowdb')
// import FileSync = require('lowdb/adapters/FileSync')
// const adapter = new FileSync('db.json')
// const db = low(adapter)

let memoryDb = { results: [] }

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
    // return db.defaults({ results: defaultDb }).write()
    memoryDb = { results: defaultDb }
  }

  initDB(): any {
    // Set some defaults (required if your JSON file is empty)
    // return db.defaults({ results: [] }).write()
    memoryDb = { results: [] }
    return memoryDb
  }

  addGeneSetResult(method: string, geneset: string, result: any): any {
    // console.log('adding gene set result', method, geneset, result)
    const existingResult = this.getGeneSetResult(method, geneset)
    if (existingResult.length > 0) {
      return {
        error: `Result with method: ${method} and geneset: ${geneset} already exists.`,
      }
    }
    const resultToAdd = {
      method: method,
      geneset: geneset,
      result: result,
    }
    // db.get('results').push(resultToAdd).write()
    memoryDb['results'].push(resultToAdd)
    return resultToAdd
  }

  updateGeneSetResult(method: string, geneset: string, result: any): any {
    const existingResult = this.getGeneSetResult(method, geneset)
    if (existingResult.length > 0) {
      this.removeGeneSetForAnalysis(method, geneset)
    }
    const found = this.getGeneSetResult(method, geneset).length > 0
    if (found) {
      return {
        error: `Unable to remove geneset ${geneset} for method: ${method}.`,
      }
    }
    return this.addGeneSetResult(method, geneset, result)
  }

  removeGeneSetForAnalysis(method: string, geneset: string) {
    memoryDb['results'] = memoryDb['results'].filter(
      (r) => r.method !== method || r.geneset != geneset,
    )
  }

  getGeneSetResult(method: string, geneset: string): any {
    return memoryDb['results'].filter(
      (r) => r.method == method && r.geneset == geneset,
    )
  }

  getGeneSets() {
    return memoryDb['results'].map((r) => r.geneset)
  }

  getGeneSetsForAnalysis(method: string) {
    return memoryDb['results']
      .filter((r) => r.method == method)
      .map((r) => r.geneset)
  }

  getGeneSet(geneset: string) {
    return memoryDb['results'].filter((r) => r.geneset == geneset)
  }

  loadGeneSetState(path: string): any {
    try {
      const rawData = fs.readFileSync(path)
      memoryDb = JSON.parse(rawData.toString())
      return memoryDb
    } catch (e) {
      console.error(e)
    }
  }

  saveGeneSetState(path: string): any {
    fs.writeFileSync(path, JSON.stringify(memoryDb))
    return memoryDb
  }
}
