import "reflect-metadata";
import { createConnection } from "typeorm";
import * as Hapi from '@hapi/hapi';
import accidentRoutes from "./routes/accident.routes";
import accountRoutes from "./routes/account.routes";
import documentRoutes from "./routes/document.routes";
import userRoutes from "./routes/user.routes";
import vehicleRoutes from "./routes/vehicle.routes";

export default createConnection().then(async connection => {

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");

    const init: any = async () => {
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

        await server.start();
        console.log('Servr running on %s', server.info.uri);
    }

    init();

}).catch(error => console.log(error));

