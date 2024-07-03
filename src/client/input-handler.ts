import * as readline from 'readline';

class InputReader {
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    public getInput(promptMessage = ""): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(promptMessage, (input) => {
                resolve(input.trim());
            });
        });
    }

    public close() {
        this.rl.close();
    }
}

export default InputReader;
