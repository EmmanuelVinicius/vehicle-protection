import "reflect-metadata";
import { createConnection } from "typeorm";
import * as Hapi from '@hapi/hapi';
import accidentRoutes from "./routes/accident.routes";
import accountRoutes from "./routes/account.routes";
import documentRoutes from "./routes/document.routes";
import userRoutes from "./routes/user.routes";
import vehicleRoutes from "./routes/vehicle.routes";

 const server = Hapi.server({
    port: 3001,
    host: 'localhost'
});

server.route([
    ...accidentRoutes,
    ...accountRoutes,
    ...documentRoutes,
    ...userRoutes,
    ...vehicleRoutes
]);

export const init: any = async () => {
    await server.initialize();
    return server;
}

export const start: any = async () => {
    await createConnection();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
}
