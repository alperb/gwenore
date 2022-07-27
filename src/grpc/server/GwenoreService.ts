import path from 'path';
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../proto.output/gwenore'
import { GRPCService } from "../../types/grpc";
import GwenoreServiceHandler from '../../service/GwenoreServiceHandler';
import ServiceLogger from '../../gwenore/logger/ServiceLogger';
import { LOGTYPE } from '../../types/log';

export default class GwenoreService implements GRPCService  {
    port: number;
	host: string;
	file: string;
	packageDefinition: protoLoader.PackageDefinition;
	grpcObj: ProtoGrpcType;
    serverPackage
    server: grpc.Server;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;

        this.file = path.join(__dirname, '../gwenore.proto');
        this.packageDefinition = protoLoader.loadSync(path.resolve(__dirname, this.file))
        this.grpcObj = (grpc.loadPackageDefinition(this.packageDefinition) as unknown) as ProtoGrpcType;
        this.serverPackage = this.grpcObj.GwenorePackage;

        this.server = new grpc.Server();
    }

    serverBind() {
        this.server.bindAsync(`${this.host}:${this.port}`, grpc.ServerCredentials.createInsecure(), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            this.server.start();
        });
    }

    addServices() {
        this.server.addService(this.serverPackage.Gwenore.service, {
            'getProgress': GwenoreServiceHandler.getProgress
        });
    }


    async start(): Promise<void> {
        this.addServices();
        ServiceLogger.log(LOGTYPE.INFO, `Starting Gwenore GRPC Service on ${this.host}:${this.port}`);
        this.serverBind();
    }

}