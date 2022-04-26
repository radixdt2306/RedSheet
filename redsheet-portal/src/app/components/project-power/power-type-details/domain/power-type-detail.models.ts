import { 
	PowerType,
	vPowerTypeDetailRecord,
	PowerTypeDetail,
} from 'app/database-models';

export class PowerTypeDetailLookupGroup {
	powerTypes : PowerType[];
	vPowerTypeDetailRecord : vPowerTypeDetailRecord;
	powerTypeDetail : PowerTypeDetail;
}
