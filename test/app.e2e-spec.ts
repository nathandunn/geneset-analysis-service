import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    // remove db.json
    // add empty db.som
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!asdf123')
  })

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/geneset/asdf/lkjklj')
      .send({ data: 'data' })
      .expect(201)
      .expect({ method: 'asdf', geneset: 'lkjklj', result: { data: 'data' } })
  })
})
