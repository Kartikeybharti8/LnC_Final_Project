import WebSocket from 'ws';
import { CustomMessage } from '../server/web-socket-server';
import { MessageHandler } from './client-message-handler/message-handler';
import InputReader from './input-handler';

export class WebSocketClient {
    private ws: WebSocket;
    private messageHandler: MessageHandler;
    private inputReader: InputReader;


    constructor(url: string) {
        this.ws = new WebSocket(url);
        this.inputReader = new InputReader();

        this.messageHandler = new MessageHandler(this.ws, this.inputReader);
        
        this.ws.on('open', this.onOpen.bind(this));
        this.ws.on('message', this.onMessage.bind(this));
        this.ws.on('close', this.onClose.bind(this));
    }

    private onOpen() {
        console.log('Connected to the server');
        this.messageHandler.promptUserForLogin();
    }

    private onMessage(message: string) {
        try {
            const parsedMessage: CustomMessage = JSON.parse(message);
            this.messageHandler.handleServerMessage(parsedMessage);
        } catch (error) {
            console.log('Received invalid message format from server.');
        }
    }

    private onClose() {
        console.log('Disconnected from the server');
    }
}

console.log('WebSocket client is running');
new WebSocketClient('ws://localhost:8090');
