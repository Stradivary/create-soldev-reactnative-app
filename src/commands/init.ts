import { Args, Command, Flags } from '@oclif/core';
import { execa } from 'execa';
import { createSpinner } from 'nanospinner';
import * as fs from 'node:fs';
import * as path from 'node:path';

export default class Init extends Command {
  static args = {
    name: Args.string({ description: 'Name of the project', required: true }),
  };

  static description = 'Initialize a new React Native or Expo project';

  static flags = {
    directory: Flags.string({ char: 'd', default: '.', description: 'Directory to create the project in' }),
    expo: Flags.boolean({ char: 'e', default: false, description: 'Use Expo framework' }),
    template: Flags.string({ char: 't', description: 'Template to use' }),
    typescript: Flags.boolean({ default: false, description: 'Use TypeScript template' }),
    version: Flags.string({ char: 'v', description: 'Version of React Native or Expo to use' }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Init);
    const spinner = createSpinner();

    const projectName = args.name;
    const useExpo = flags.expo;
    const useTypeScript = flags.typescript;
    const version = flags.version || 'latest';
    const targetDir = path.join(flags.directory, projectName);

    // Step 1: Create React Native or Expo project
    spinner.start({ text: `Creating ${useExpo ? 'Expo' : 'React Native'} project` });
    try {
      await (useExpo ? this.createExpoProject(projectName, useTypeScript, version, flags.directory) : this.createReactNativeProject(projectName, useTypeScript, version, flags.directory));
      spinner.success({ text: `${useExpo ? 'Expo' : 'React Native'} project created successfully` });
    } catch (error) {
      spinner.error({ text: `Failed to create ${useExpo ? 'Expo' : 'React Native'} project` });
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

    // Step 3: Install additional dependencies
    spinner.start({ text: 'Installing additional dependencies' });
    try {
      await this.installAdditionalDependencies(targetDir, useExpo);
      spinner.success({ text: 'Additional dependencies installed successfully' });
    } catch (error) {
      spinner.error({ text: 'Failed to install additional dependencies' });
      this.error(error as Error);
    }

    this.logCompletionMessage(projectName, useExpo);
  }

  private async addScaffoldFolders(targetDir: string) {
    const scaffoldFolders = ['components', 'screens', 'utils', 'hooks', 'services'];
    const scaffoldDir = path.join(targetDir, 'src');
    fs.mkdirSync(scaffoldDir, { recursive: true });
    for (const folder of scaffoldFolders) {
      fs.mkdirSync(path.join(scaffoldDir, folder), { recursive: true });
    }
  }

  private async createExpoProject(name: string, useTypeScript: boolean, version: string, directory: string) {
    const template = useTypeScript ? 'expo-template-blank-typescript' : 'expo-template-blank';
    await execa('npx', [
      'create-expo-app',
      name,
      '--template',
      template,
      '--version',
      version,
    ], { cwd: directory });
  }

  private async createReactNativeProject(name: string, useTypeScript: boolean, version: string, directory: string) {

    await execa('npx', [
      '@react-native-community/cli@latest',
      'init',
      name
    ], { cwd: directory });
  }

  private async installAdditionalDependencies(targetDir: string, useExpo: boolean) {
    const dependencies = ['@react-navigation/native', '@react-navigation/stack'];
    if (useExpo) {
      dependencies.push('react-native-gesture-handler');
    }

    await execa('npm', ['install', ...dependencies], { cwd: targetDir });
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