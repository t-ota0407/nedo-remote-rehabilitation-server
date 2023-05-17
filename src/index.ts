import express from "express";

class Server {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.start();
    }

    private async start(): Promise<void> {
        const portNumber = process.env.PORT || 3000;
        this.app.listen(portNumber, () => {
            console.log(`Application is listening on port ${portNumber}`);
        }).setTimeout(10 * 1000);
    }
}

const server = new Server();
