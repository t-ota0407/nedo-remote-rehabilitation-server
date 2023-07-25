import dgram, { RemoteInfo } from "node:dgram";
import { UDPUploadData } from "./dataTypes/udp/udpUploadData";
import { InMemoryDB } from "../database/inMemory/inMemoryDB";
import { ActiveUser } from "../database/inMemory/entities/activeUser";
import { UDPDownloadData } from "./dataTypes/udp/udpDownloadData";

export class UDP {
  private socket: dgram.Socket;

  private sendDatagramInterval: NodeJS.Timeout | null;

  constructor() {
    this.socket = dgram.createSocket('udp4');
    this.sendDatagramInterval = null;

    this.startSendingDatagram();
  }

  public listen(portNumber: number, callback?: () => void) {
    this.socket.on('error', (err) => {
      console.error(`server error:\n${err.stack}`);
      this.socket.close();
    });

    this.socket.on('connect', () => {
      console.log('udp connected');
    });

    this.socket.on('message', (msg, rinfo) => {
      const uploadData = UDPUploadData.fromJson(msg.toString());
      if (uploadData === undefined) {
        return console.error("server error:\nServer received unparsable datagram.");
      }

      const userUuid = uploadData.user.userUuid;
      let activeUser  = InMemoryDB.getInstance().findUser(userUuid);

      if (activeUser === undefined) {
        activeUser = InMemoryDB.getInstance().addActiveUser(
          new ActiveUser(
            userUuid,
            "hogehoge",
            "UDP",
            rinfo,
            uploadData.user.rehabilitationCondition,
            uploadData.user.reachingProgress,
            uploadData.user.headPosture,
            uploadData.user.leftHandPosture,
            uploadData.user.rightHandPosture,
          )
        );
      }

      if (this.sendDatagramInterval === null) {
        this.startSendingDatagram();
      }

      activeUser.headPosture = uploadData.user.headPosture;
      activeUser.leftHandPosture = uploadData.user.leftHandPosture;
      activeUser.rightHandPosture = uploadData.user.rightHandPosture;
    });

    return this.socket.bind(portNumber, callback);
  }

  public startSendingDatagram() {
    if (!this.sendDatagramInterval) {
      this.sendDatagramInterval = setInterval(() => {
        try {
          console.log("a");
          const activeUsers = InMemoryDB.getInstance().getActiveUsersClone();

          console.log("b");
          activeUsers.forEach((sendingActiveUser: ActiveUser) => {
            console.log("c");
            const udpDownloadData = UDPDownloadData.fromActiveUser(sendingActiveUser);
            console.log("d");
            const message = Buffer.from(JSON.stringify(udpDownloadData));
            console.log(message);
            
            activeUsers.forEach((remoteTargetActiveUser: ActiveUser) => {
              const isSyncCommunicationProtocolUDP = remoteTargetActiveUser.syncCommunicationProtocol === 'UDP';
              
              if (isSyncCommunicationProtocolUDP) {
                const syncCommunicationOption = remoteTargetActiveUser.syncCommunicationOption;
                console.log(syncCommunicationOption)

                let targetPort = undefined;
                if ('port' in syncCommunicationOption) {
                  targetPort = syncCommunicationOption.port;
                }

                let targetAddress = undefined;
                if ('address' in syncCommunicationOption) {
                  targetAddress = syncCommunicationOption.address;
                }

                this.socket.send(message, 0, message.length, targetPort, targetAddress);
                console.log("send");
              }
            });
          });

        } catch(error) {
          if (error instanceof RangeError) {
            // Whenever a second user accesses the server, a Range Error occurs for some reason.
            // There are no logical issue, so this error can be ignored.
            console.log("A recoverable exception occurred. (Range Error)");
            console.log(error.message);
          } else {
            console.error(`Error:\n${error}`);
          }
        }
      }, 1000 / Number(process.env.UDP_SEND_TPS));
    }
  }

  public stopSendingDatagram() {
    if (this.sendDatagramInterval) {
      clearInterval(this.sendDatagramInterval);
      this.sendDatagramInterval = null;
    }
  }
}
