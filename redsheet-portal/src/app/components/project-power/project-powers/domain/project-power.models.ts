import { 
	vProjectPowerRecord,
	ProjectPower,
	PowerType,
} from 'app/database-models';

export class ProjectPowerLookupGroup {
	vProjectPowerRecord : vProjectPowerRecord;
	projectPower : ProjectPower;
	powerTypes:Array<PowerType>
}
