import * as fs from 'fs';
import path from 'path';
import { Executable, Import } from '@rushstack/node-core-library';

console.log('STARTING BUILD');

function execute() {
    runTypeScriptCompiler();
}

function getTypeScriptConfigPath(): string {
    return doesPackageHaveTsConfig() ? '.' : getBaseTypeScriptConfigPath();
}

function doesPackageHaveTsConfig(): boolean {
    const filepath = path.join(process.cwd(), 'tsconfig.json');
    return fs.existsSync(filepath);
}

function getBaseTypeScriptConfigPath(): string {
    return path.join(__dirname, '../configs/tsconfig.json');
}

function runTypeScriptCompiler() {
    const typescriptPath: string = Import.resolvePackage({ packageName: 'typescript', baseFolderPath: __dirname });
    spawn(process.argv0 , [`${typescriptPath}/bin/tsc`, '-p', getTypeScriptConfigPath()]);
}

function spawn(command: string, args: string[]) {
    console.log(`Running ${command} ${args.join(' ')}`);
    
    Executable.spawnSync(command, args);
}

try {
    execute();
} catch (ex) {
    console.error(ex);
    process.exit(1);
}
