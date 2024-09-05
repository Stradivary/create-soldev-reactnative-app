import { Args, Command, Flags } from '@oclif/core';
import { execa } from 'execa';
import { createSpinner } from 'nanospinner';
import * as fs from 'node:fs';
import * as path from 'node:path';

export default class Init extends Command {
  static args = {
    name: Args.string({ description: 'Name of the project', required: true }),
    directory: Args.string({ default: '.', description: 'directory to create the project in' }),
  };

  static description = 'Initialize a new React Native or Expo project';

  static flags = {
    git: Flags.boolean({ char: 'g', description: 'Initialize a git repository' }),
    npm: Flags.boolean({ char: 'p', description: 'Install dependencies' }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Init);
    const spinner = createSpinner();

    const projectName = args.name;
    const targetDir = path.join(flags.directory, projectName);

    // Step 1: Create React Native or Expo project
    spinner.start({ text: `Creating React Native project` });
    try {
      await (this.createReactNativeProject(projectName, flags));
      spinner.success({ text: `${'React Native'} project created successfully` });
    } catch (error) {
      spinner.error({ text: `Failed to create ${'React Native'} project` });
      this.error(error as Error);
    }

    // Step 2: Add scaffold folders
    spinner.start({ text: 'Adding scaffold folders' });
    try {
      await this.addScaffoldFolders(targetDir);
      spinner.success({ text: 'Scaffold folders added successfully' });
    } catch (error) {
      spinner.error({ text: 'Failed to add scaffold folders' });
      this.error(error as Error);
    }


    this.logCompletionMessage(projectName, false);
  }

  private async addScaffoldFolders(targetDir: string) {
    const scaffoldFolders = ['components', 'screens', 'utils', 'hooks', 'services'];
    const scaffoldDir = path.join(targetDir, 'src');
    fs.mkdirSync(scaffoldDir, { recursive: true });
    for (const folder of scaffoldFolders) {
      fs.mkdirSync(path.join(scaffoldDir, folder), { recursive: true });
    }
  }


  private async createReactNativeProject(name: string, flags: Record<PropertyKey, any>) {
    const params: readonly string[] = [
      '@react-native-community/cli@latest',
      'init',
      name,
      (flags.npm ? '' : '--skip-install'),
      (flags.git ? '' : '--skip-git-init'),
      '--install-pods'
    ]
    await execa('npx', params, { cwd: flags.directory });
  }


  private logCompletionMessage(projectName: string, useExpo: boolean) {
    this.log('\n🎉 Project initialized successfully!');
    this.log(`\nTo get started, run the following commands:`);
    this.log(`  cd ${projectName}`);
    if (useExpo) {
      this.log('  npx expo start');
    } else {
      this.log('  npx react-native run-android');
      this.log('  # or');
      this.log('  npx react-native run-ios');
    }
  }
}