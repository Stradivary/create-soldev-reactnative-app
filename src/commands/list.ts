import { select } from '@inquirer/prompts';
import { Command } from '@oclif/core';

export default class List extends Command {

  static override description = 'list template versions from repository';

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ];

  public async run(): Promise<void> {

    await this.listVersions();


  }

  private async listVersions() {
    const versions = [
      '0.1.0',
    ];

    await select({
      choices: versions.map(v => ({ title: v, value: v })),
      message: 'ℹ️ listing template versions from repository [alpha]',
    });
  }

}
