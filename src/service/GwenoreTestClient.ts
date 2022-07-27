import path from 'path';
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from '../grpc/proto.output/gwenore'
import { GwenoreClient } from '../grpc/proto.output/GwenorePackage/Gwenore';
import { GetProgressResponse } from '../grpc/proto.output/GwenorePackage/GetProgressResponse';
import { GetProgressRequest } from '../grpc/proto.output/GwenorePackage/GetProgressRequest';
import ServiceLogger from '../gwenore/logger/ServiceLogger';
import { LOGTYPE } from '../types/log';

export default class GwenoreTestClient {
    file: string;
    packageDefinition: protoLoader.PackageDefinition;
    grpcObj: ProtoGrpcType;
    client: GwenoreClient;

    constructor(){
        this.file = path.join(__dirname, '../grpc/gwenore.proto');
        this.packageDefinition = protoLoader.loadSync(path.resolve(__dirname, this.file))
        this.grpcObj = (grpc.loadPackageDefinition(this.packageDefinition) as unknown) as ProtoGrpcType;
        this.client = new this.grpcObj.GwenorePackage.Gwenore(`localhost:${process.env.GRPC_PORT as string}`, grpc.credentials.createInsecure());
    }

    testGetProgress(){
        return new Promise<GetProgressResponse>((resolve, reject) => {
            const data: GetProgressRequest = {
                snowflake: '181348050436882432'
            }
            this.client.getProgress(data, (err, response) => {
                if(err) {
                    reject(err);
                } else {
                    ServiceLogger.log(LOGTYPE.DEBUG, `Result received for call getProgress(${data.snowflake}) :`, response);
                    resolve((response as GetProgressResponse));
                }
            })
        }) 
    }

    
}