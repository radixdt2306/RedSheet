import { required, maxLength, range, nested } from '@rx/annotations';
import { ProjectModule, Game, vProjectGameDetailRecord } from './'
export class ProjectGameDetail {
    constructor(projectGameDetail?: ProjectGameDetail | vProjectGameDetailRecord) {
        let properties = ["notes", "projectGameDetailId", "currentGameId", "projectModuleId", "theirCurrentGameId", "theirEventGameId", "games",];
        for (let property of properties)
            if (projectGameDetail && projectGameDetail[property])
                this[property] = projectGameDetail[property];
    }

    @required()
    @maxLength(200)
    notes: string = undefined;

    projectGameDetailId: number = 0;

    @range(0, 2147483647)
    currentGameId: number = undefined;

    @range(0, 2147483647)
    projectModuleId: number = undefined;
    projectModule: ProjectModule;

    @range(0, 2147483647)
    theirCurrentGameId: number = undefined;

    @range(0, 2147483647)
    theirEventGameId: number = undefined;
    @nested(Game)
    games: Game[];



}
