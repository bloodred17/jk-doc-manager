import mongoose, { Connection } from 'mongoose';
import { env } from 'node:process';
import { Injectable } from 'anti-di';

export class Mongodb extends Injectable {
  connections: Map<string, Connection> = new Map();

  initalizeClient(dbName: string) {
    return mongoose
      .createConnection(env['MONGODB_ENDPOINT'] + dbName)
      .asPromise()
      .then((connection) => {
        this.setClient('test', connection);
        return connection;
      });
  }

  getClient(dbName: string) {
    return this.connections.get(dbName);
  }

  setClient(dbName: string, connection: Connection) {
    this.connections.set(dbName, connection);
  }
}
