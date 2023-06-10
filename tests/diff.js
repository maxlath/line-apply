import 'should'
import { readFileSync } from 'fs'
import { promisify } from 'util'
import { exec as _exec } from 'node:child_process'

const exec = promisify(_exec)

const sampleSyncTransformerDiff = readFileSync('./tests/assets/sample.sync_transformer.diff').toString()
const sampleAsyncTransformerDiff = readFileSync('./tests/assets/sample.async_transformer.diff').toString()

describe('diff', () => {
  it('should output a diff for a sync function', async () => {
    const { stdout } = await exec('head -n 2 ./tests/assets/sample.txt | ./bin/line-apply.js --diff ./tests/assets/function_collection.cjs uppercase')
    stdout.should.equal(sampleSyncTransformerDiff)
  })

  it('should output a diff for an async function', async () => {
    const { stdout } = await exec('head -n 2 ./tests/assets/sample.txt | ./bin/line-apply.js --diff ./tests/assets/function_collection.cjs lowercaseAsync')
    stdout.should.equal(sampleAsyncTransformerDiff)
  })
})
