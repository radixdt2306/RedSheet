import { 
	Country,
	CultureCountry,
	vProjectCultureRecord,
	ProjectCulture,
} from 'app/database-models';

export class ProjectCultureLookupGroup {
	countries : Country[];
	cultureCountries : CultureCountry[];
	vProjectCultureRecord : vProjectCultureRecord;
	projectCulture : ProjectCulture;
}
