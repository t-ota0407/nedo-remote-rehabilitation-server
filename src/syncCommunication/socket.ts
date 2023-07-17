import { WebSocketServer } from "ws";

export class Socket {
  private wss: WebSocketServer;

  private emissionInterval: NodeJS.Timeout | null;

  private connections = new Set();

  constructor() {
    this.wss = new WebSocketServer();
    this.emissionInterval = null;
  }

  public listen() {
    this.wss.on('connection', (ws) => {

      this.connections.add(ws);

      ws.on('error', (err) => {
        console.error(`server error:${err}`)
      });

      ws.on('message', (data) => {
        // メッセージをセーブする
        console.log();
      });

      ws.on('close', () => {
        this.connections.delete(ws);
      });
    });
  }

  public startEmission() {
    this.emissionInterval = setInterval(() => {

    })
  }

  public stopEmission() {
    if (this.emissionInterval !== null) {
      clearInterval(this.emissionInterval);
      this.emissionInterval = null;
    }
  }
}