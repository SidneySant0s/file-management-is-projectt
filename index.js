import fileManager from'./fileManager.js';
import readlineSync from 'readline-sync';
import path from 'path';
import  url, { fileURLToPath }  from 'url';


async function main() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const baseDir = path.join(__dirname, "Myfiles");

    fileManager.createDirectory(baseDir)

    while(true){
        console.log('\n=== Menu ==='); 
        console.log('1. Criar arquivo');
        console.log('2. Listar arquivo');
        console.log('3. Ler arquivo'); 
        console.log('4. Escrever arquivo'); 
        console.log('5. Deletar arquivo'); 
        console.log('6. Sair');
        const choice = readlineSync.question('Escolha uma opcao: ');

        try{
            switch (choice) { 
            case '1':
                const fileName = readlineSync.question('Digite o nome do arquivo: ');
                const fileContent = readlineSync.question('Digite o conteúdo do novo arquivo (ou deixe em branco): ');

                const createFilePath = path.join(baseDir, fileName)
                //Users/sidneysantos/dnc/file-meneger/teste.txt
                
                const fileMessege = await fileManager.createFile(createFilePath, fileContent)

                console.log(fileMessege);

                console.log('Arquivo criado'); 
                break; 

            case '2': 
                const files = await fileManager.listFiles(baseDir);
                console.log('Arquivos no diretorio:', files); 
                break;

            case '3':
                const readFileName = readlineSync.question('Digite o nome e extensão do arquivo: ');

                const readfilePath = path.join(baseDir, readFileName);
                const content = await fileManager.readFile(readfilePath);
                console.log('Conteúdo do arquivo:', content); 
                break;
            case '4':
                const writeFileName = readlineSync.question('Digite o nome do arquivo:');

                const writeFilePath = path.join(baseDir, writeFileName);
                const newContent = readlineSync.question("Digite o conteúdo a ser escrito: ");
                const messageWrite = await fileManager.writeFile(writeFilePath, newContent);
                console.log(messageWrite); 
                break;
            case '5':
                const deleteFilename = readlineSync.question("Digite o nome do arquivos: ")
                const deleteFilePath = path.join(baseDir, deleteFilename);
                const messageDelete = await fileManager.deleteFile(deleteFilePath);
                console.log(messageDelete); 
                break;
            case '6': 
                console.log('Saindo...'); 
                return; 
            default: 
                console.log('Opção inválida'); 
            }
        } catch (err) {
            console.log(err)
        }

    }
}
main()
