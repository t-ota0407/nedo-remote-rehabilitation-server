const syncCommunicationProtocols = [
  'UDP',
  'WEB_SOCKET',
] as const;

export type SyncCommunicationProtocol = typeof syncCommunicationProtocols[number];
