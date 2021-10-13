import * as child_process from 'child_process';
import * as fs from 'fs';
import path from 'path';

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
    spawn(`tsc -p ${getTypeScriptConfigPath()}`);
}

function spawn(command: string) {
    console.log(`Running ${command}`);
    console.log(process.cwd())
    child_process.spawnSync(command);
}

execute();


