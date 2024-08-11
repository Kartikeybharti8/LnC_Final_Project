import * as readline from 'readline';

class InputReader {
    private rl: readline.Interface;

    constructor() {
        try {
            this.rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
        } catch (error) {
            console.error('Failed to initialize readline interface:', error);
            throw error; // Re-throw the error if the readline interface cannot be created
        }
    }

    public getInput(promptMessage = ""): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                this.rl.question(promptMessage, (input) => {
                    resolve(input.trim());
                });
            } catch (error) {
                console.error('Error while getting input:', error);
                reject(error); // Reject the promise if an error occurs
            }
        });
    }

    public close() {
        try {
            this.rl.close();
        } catch (error) {
            console.error('Failed to close readline interface:', error);
        }
    }
}

export default InputReader;
