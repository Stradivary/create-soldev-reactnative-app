import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('upgrade', () => {
  it('runs upgrade cmd', async () => {
    const {stdout} = await runCommand('upgrade')
    expect(stdout).to.contain('hello world')
  })

  it('runs upgrade --name oclif', async () => {
    const {stdout} = await runCommand('upgrade --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
