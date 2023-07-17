import dgram, { RemoteInfo } from "node:dgram";
import WebSocket from "ws";

export type SyncCommunicationOption = RemoteInfo | WebSocket;