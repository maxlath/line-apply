import 'should'
import { promisify } from 'node:util'
import { exec as _exec } from 'node:child_process'

const exec = promisify(_exec)

const shouldntGetHere = () => { throw new Error("shouldn't get here") }

describe('apply', () => {
  it('should reject an invalid function module', async () => {
    try {
      await exec('./bin/line-apply')
      shouldntGetHere()
    } catch (err) {
      err.message.should.startWith('Command failed')
    }
  })

  it('should accept a sync function', async () => {
    const { stdout } = await exec('./bin/line-apply.js ./tests/assets/sync_transformer.js < ./tests/assets/sample.txt')
    stdout.should.equal('26\n28\n65\n23\n81\n101\n46\n62\n')
  })

  it('should accept an async function', async () => {
    const { stdout } = await exec('./bin/line-apply.js ./tests/assets/async_transformer.js < ./tests/assets/sample.txt')
    stdout.should.equal('126\n128\n165\n123\n181\n201\n146\n162\n')
  })

  it('should filter-out lines returning empty', async () => {
    const { stdout } = await exec('./bin/line-apply.js ./tests/assets/even_only_transformer.js < ./tests/assets/sample.txt')
    stdout.trim().split('\n').length.should.equal(4)
  })

  it('should use additional argument to find sub function', async () => {
    const { stdout } = await exec('./bin/line-apply.js ./tests/assets/function_collection.js bonus < ./tests/assets/sample.txt')
    stdout.should.equal('27\n29\n66\n24\n82\n102\n47\n63\n')
  })

  it('should pass remaining arguments to function', async () => {
    const { stdout } = await exec('./bin/line-apply.js ./tests/assets/function_collection.js 100 < ./tests/assets/sample.txt')
    stdout.should.equal('126\n128\n165\n123\n181\n201\n146\n162\n')
  })

  it('should pass remaining arguments to sub function', async () => {
    const { stdout } = await exec('./bin/line-apply.js ./tests/assets/function_collection.js bonus 100 < ./tests/assets/sample.txt')
    stdout.should.equal('126\n128\n165\n123\n181\n201\n146\n162\n')
  })

  it('should pass remaining arguments to async function', async () => {
    const { stdout } = await exec('./bin/line-apply.js ./tests/assets/async_transformer.js 20 < ./tests/assets/sample.txt')
    stdout.should.equal('146\n148\n185\n143\n201\n221\n166\n182\n')
  })

  it('should pass remaining arguments to async sub function', async () => {
    const { stdout } = await exec('./bin/line-apply.js ./tests/assets/function_collection.js bonusAsync 100 < ./tests/assets/sample.txt')
    stdout.should.equal('126\n128\n165\n123\n181\n201\n146\n162\n')
  })

  describe('CommonJS', () => {
    it('should accept a CommonJS file', async () => {
      const { stdout } = await exec('./bin/line-apply.js ./tests/assets/sync_transformer.cjs 10 < ./tests/assets/sample.txt')
      stdout.should.equal('26\n28\n65\n23\n81\n101\n46\n62\n')
    })

    it('should accept a CommonJS subfunction', async () => {
      const { stdout } = await exec('./bin/line-apply.js ./tests/assets/function_collection.cjs bonus 10 < ./tests/assets/sample.txt')
      stdout.should.equal('36\n38\n75\n33\n91\n111\n56\n72\n')
    })
  })
})
