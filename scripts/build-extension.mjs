import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const distDir = 'dist';
const zipName = 'extension.zip';

console.log('Iniciando o processo de build...');

// 1. Limpa e cria o diretório 'dist'
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir);
console.log(`Diretório '${distDir}' limpo e recriado.`);

// 2. Copia os arquivos essenciais para 'dist'
fs.copyFileSync('manifest.json', path.join(distDir, 'manifest.json'));
fs.cpSync('src', path.join(distDir, 'src'), { recursive: true });
fs.cpSync('icons', path.join(distDir, 'icons'), { recursive: true });
console.log('Arquivos da extensão copiados para a pasta dist/.');

// 3. Gera o arquivo .zip
const output = fs.createWriteStream(path.join(distDir, zipName));
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);
archive.directory(distDir, false); // Adiciona todo o conteúdo de 'dist' na raiz do zip

output.on('close', () => {
    console.log(`Arquivo ${zipName} criado com sucesso. Total: ${archive.pointer()} bytes`);
});

archive.on('error', (err) => {
    throw err;
});

await archive.finalize();
console.log('Build finalizado com sucesso!');