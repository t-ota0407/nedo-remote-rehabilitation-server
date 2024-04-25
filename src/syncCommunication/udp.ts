import dgram from "node:dgram";
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

    this.socket.on('message', async (msg, rinfo) => {
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
            uploadData.user.userName,
            "UDP",
            rinfo,
            uploadData.user.rehabilitationCondition,
            uploadData.user.avatarType,
            uploadData.user.avatarState,
            uploadData.user.rehabilitatingProgress,
            uploadData.user.usersRehabilitationScore,
            uploadData.user.headPosture,
            uploadData.user.leftHandPosture,
            uploadData.user.rightHandPosture,
            uploadData.user.leftLegPosture,
            uploadData.user.rightLegPosture,
            uploadData.user.pelvisPosture,
            uploadData.user.rehabilitationObjectPosture,
          )
        );
      } else {
        activeUser.avatarState = uploadData.user.avatarState;
        activeUser.reachingProgress = uploadData.user.rehabilitatingProgress;
        activeUser.usersRehabilitationScore = uploadData.user.usersRehabilitationScore;
        activeUser.headPosture = uploadData.user.headPosture;
        activeUser.leftHandPosture = uploadData.user.leftHandPosture;
        activeUser.rightHandPosture = uploadData.user.rightHandPosture;
        activeUser.leftLegPosture = uploadData.user.leftLegPosture;
        activeUser.rightLegPosture = uploadData.user.rightLegPosture;
        activeUser.pelvisPosture = uploadData.user.pelvisPosture;
        activeUser.rehabilitationObjectPosture = uploadData.user.rehabilitationObjectPosture;
      }

      if (this.sendDatagramInterval === null) {
        this.startSendingDatagram();
      }
    });

    return this.socket.bind(portNumber, callback);
  }

  public startSendingDatagram() {
    if (!this.sendDatagramInterval) {
      this.sendDatagramInterval = setInterval(() => {
        try {
          const activeUsers = InMemoryDB.getInstance().getActiveUsersClone();
          

          activeUsers.forEach((sendingActiveUser: ActiveUser) => {
            const udpDownloadData = UDPDownloadData.fromActiveUser(sendingActiveUser);
            const message = Buffer.from(JSON.stringify(udpDownloadData));
            
            activeUsers.forEach((remoteTargetActiveUser: ActiveUser) => {
              const isSyncCommunicationProtocolUDP = remoteTargetActiveUser.syncCommunicationProtocol === 'UDP';
              const isMyUserInformation = sendingActiveUser.uuid === remoteTargetActiveUser.uuid
              
              if (isSyncCommunicationProtocolUDP && !isMyUserInformation) {
                const syncCommunicationOption = remoteTargetActiveUser.syncCommunicationOption;
                const targetPort = ('port' in syncCommunicationOption) ? syncCommunicationOption.port : undefined;
                const targetAddress = ('address' in syncCommunicationOption) ? syncCommunicationOption.address : undefined;

                this.socket.send(message, 0, message.length, targetPort, targetAddress);
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
    if (this.sendDatagramInterval !== null) {
      clearInterval(this.sendDatagramInterval);
      this.sendDatagramInterval = null;
    }
  }
}
