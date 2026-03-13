export interface CityData {
  name: string;
  slug: string;
  population?: string;
}

export interface StateData {
  name: string;
  slug: string;
  abbreviation: string;
  cities: CityData[];
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function city(name: string, population?: string): CityData {
  return { name, slug: toSlug(name), population };
}

export const locations: StateData[] = [
  {
    name: 'Alabama', slug: 'alabama', abbreviation: 'AL',
    cities: [
      city('Birmingham', '200,733'), city('Montgomery', '200,603'), city('Huntsville', '215,006'),
      city('Mobile', '187,041'), city('Tuscaloosa', '101,129'), city('Hoover', '92,606'),
      city('Dothan', '71,072'), city('Auburn', '76,143'), city('Decatur', '57,938'),
      city('Madison', '56,933'), city('Florence', '40,184'), city('Gadsden', '33,945'),
      city('Vestavia Hills', '39,121'), city('Prattville', '36,599'), city('Phenix City', '36,311'),
      city('Alabaster', '34,755'), city('Bessemer', '26,019'), city('Enterprise', '28,711'),
      city('Opelika', '30,346'), city('Homewood', '25,708'),
    ],
  },
  {
    name: 'Alaska', slug: 'alaska', abbreviation: 'AK',
    cities: [
      city('Anchorage', '291,247'), city('Fairbanks', '32,515'), city('Juneau', '32,255'),
      city('Wasilla', '12,256'), city('Sitka', '8,458'), city('Ketchikan', '8,368'),
      city('Kenai', '7,424'), city('Kodiak', '5,983'), city('Bethel', '6,325'),
      city('Palmer', '7,306'), city('Homer', '5,515'), city('Soldotna', '4,830'),
      city('Valdez', '3,985'), city('Nome', '3,699'), city('Barrow', '4,581'),
    ],
  },
  {
    name: 'Arizona', slug: 'arizona', abbreviation: 'AZ',
    cities: [
      city('Phoenix', '1,608,139'), city('Tucson', '542,629'), city('Mesa', '504,258'),
      city('Chandler', '275,987'), city('Scottsdale', '241,361'), city('Glendale', '248,325'),
      city('Gilbert', '267,918'), city('Tempe', '180,587'), city('Peoria', '190,985'),
      city('Surprise', '141,664'), city('Yuma', '95,548'), city('Avondale', '89,862'),
      city('Goodyear', '95,294'), city('Flagstaff', '73,319'), city('Buckeye', '91,502'),
      city('Lake Havasu City', '55,345'), city('Casa Grande', '55,477'), city('Maricopa', '50,563'),
      city('Prescott', '45,827'), city('Sierra Vista', '43,888'), city('San Luis', '35,257'),
      city('Bullhead City', '40,885'), city('Queen Creek', '52,520'), city('Kingman', '32,352'),
    ],
  },
  {
    name: 'Arkansas', slug: 'arkansas', abbreviation: 'AR',
    cities: [
      city('Little Rock', '202,591'), city('Fort Smith', '89,142'), city('Fayetteville', '93,949'),
      city('Springdale', '80,433'), city('Jonesboro', '78,576'), city('North Little Rock', '64,591'),
      city('Conway', '67,336'), city('Rogers', '68,669'), city('Pine Bluff', '41,253'),
      city('Bentonville', '54,164'), city('Hot Springs', '38,797'), city('Benton', '36,820'),
      city('Texarkana', '30,259'), city('Russellville', '29,612'), city('Sherwood', '32,350'),
      city('Jacksonville', '28,364'), city('Cabot', '26,352'), city('Paragould', '29,174'),
      city('Searcy', '23,768'), city('Van Buren', '23,600'),
    ],
  },
  {
    name: 'California', slug: 'california', abbreviation: 'CA',
    cities: [
      city('Los Angeles', '3,898,747'), city('San Diego', '1,386,932'), city('San Jose', '1,013,240'),
      city('San Francisco', '873,965'), city('Fresno', '542,107'), city('Sacramento', '524,943'),
      city('Long Beach', '466,742'), city('Oakland', '433,031'), city('Bakersfield', '403,455'),
      city('Anaheim', '350,365'), city('Santa Ana', '309,441'), city('Riverside', '314,998'),
      city('Stockton', '320,804'), city('Irvine', '307,670'), city('Chula Vista', '275,487'),
      city('Fremont', '230,504'), city('San Bernardino', '222,101'), city('Modesto', '218,464'),
      city('Moreno Valley', '212,477'), city('Fontana', '214,547'), city('Santa Clarita', '228,673'),
      city('Glendale', '196,543'), city('Huntington Beach', '198,711'), city('Garden Grove', '172,646'),
      city('Oceanside', '176,193'), city('Rancho Cucamonga', '177,603'), city('Ontario', '175,265'),
      city('Santa Rosa', '178,127'), city('Elk Grove', '176,124'), city('Corona', '157,136'),
      city('Lancaster', '173,516'), city('Palmdale', '169,450'), city('Salinas', '163,542'),
      city('Pomona', '151,713'), city('Hayward', '162,954'), city('Escondido', '151,038'),
      city('Sunnyvale', '155,805'), city('Torrance', '143,592'), city('Pasadena', '138,699'),
      city('Orange', '139,911'), city('Roseville', '147,773'), city('Fullerton', '139,640'),
      city('Visalia', '141,384'), city('Concord', '129,295'), city('Thousand Oaks', '126,966'),
      city('Simi Valley', '126,871'), city('Santa Clara', '127,647'), city('Victorville', '134,810'),
      city('Vallejo', '121,253'), city('Berkeley', '124,321'),
    ],
  },
  {
    name: 'Colorado', slug: 'colorado', abbreviation: 'CO',
    cities: [
      city('Denver', '715,522'), city('Colorado Springs', '478,961'), city('Aurora', '386,261'),
      city('Fort Collins', '169,810'), city('Lakewood', '155,984'), city('Thornton', '141,867'),
      city('Arvada', '124,402'), city('Westminster', '116,317'), city('Pueblo', '111,876'),
      city('Centennial', '108,418'), city('Boulder', '105,673'), city('Greeley', '108,795'),
      city('Longmont', '98,885'), city('Broomfield', '74,112'), city('Castle Rock', '73,158'),
      city('Commerce City', '61,904'), city('Parker', '57,706'), city('Littleton', '46,208'),
      city('Northglenn', '39,847'), city('Brighton', '41,175'), city('Loveland', '76,378'),
      city('Grand Junction', '65,560'), city('Erie', '30,234'), city('Windsor', '32,896'),
    ],
  },
  {
    name: 'Connecticut', slug: 'connecticut', abbreviation: 'CT',
    cities: [
      city('Bridgeport', '148,529'), city('New Haven', '134,023'), city('Stamford', '135,470'),
      city('Hartford', '121,054'), city('Waterbury', '114,403'), city('Norwalk', '91,184'),
      city('Danbury', '86,518'), city('New Britain', '73,206'), city('Bristol', '60,833'),
      city('Meriden', '60,850'), city('Milford', '55,014'), city('West Haven', '55,584'),
      city('Middletown', '47,717'), city('Norwich', '40,125'), city('Shelton', '41,164'),
      city('Torrington', '36,383'), city('New London', '27,367'), city('Ansonia', '18,918'),
      city('Derby', '12,902'), city('Groton', '39,907'),
    ],
  },
  {
    name: 'Delaware', slug: 'delaware', abbreviation: 'DE',
    cities: [
      city('Wilmington', '70,898'), city('Dover', '39,403'), city('Newark', '33,398'),
      city('Middletown', '22,350'), city('Bear', '21,298'), city('Glasgow', '15,517'),
      city('Brookside', '13,671'), city('Hockessin', '13,527'), city('Smyrna', '11,694'),
      city('Milford', '11,463'), city('Seaford', '8,225'), city('Georgetown', '7,436'),
      city('Elsmere', '6,125'), city('New Castle', '5,378'), city('Lewes', '3,266'),
    ],
  },
  {
    name: 'Florida', slug: 'florida', abbreviation: 'FL',
    cities: [
      city('Jacksonville', '949,611'), city('Miami', '442,241'), city('Tampa', '384,959'),
      city('Orlando', '307,573'), city('St. Petersburg', '258,308'), city('Hialeah', '223,109'),
      city('Port St. Lucie', '204,851'), city('Cape Coral', '194,016'), city('Tallahassee', '196,169'),
      city('Fort Lauderdale', '182,760'), city('Pembroke Pines', '171,178'), city('Hollywood', '153,627'),
      city('Gainesville', '141,085'), city('Miramar', '134,721'), city('Coral Springs', '134,394'),
      city('Palm Bay', '119,760'), city('Clearwater', '117,295'), city('West Palm Beach', '117,415'),
      city('Lakeland', '112,641'), city('Pompano Beach', '112,118'), city('Davie', '105,691'),
      city('Miami Gardens', '111,640'), city('Sunrise', '97,335'), city('Boca Raton', '97,422'),
      city('Deltona', '91,747'), city('Plantation', '91,750'), city('Fort Myers', '92,245'),
      city('Palm Coast', '86,726'), city('Kissimmee', '79,226'), city('Ocala', '63,591'),
      city('Sarasota', '57,738'), city('Daytona Beach', '68,866'), city('Pensacola', '52,975'),
      city('Naples', '19,537'), city('Destin', '14,615'),
    ],
  },
  {
    name: 'Georgia', slug: 'georgia', abbreviation: 'GA',
    cities: [
      city('Atlanta', '498,715'), city('Augusta', '202,081'), city('Columbus', '206,922'),
      city('Macon', '157,346'), city('Savannah', '147,780'), city('Athens', '127,064'),
      city('Sandy Springs', '108,080'), city('Roswell', '92,833'), city('Johns Creek', '82,453'),
      city('Albany', '69,647'), city('Warner Robins', '80,308'), city('Alpharetta', '65,818'),
      city('Marietta', '60,972'), city('Valdosta', '56,457'), city('Smyrna', '56,666'),
      city('Dunwoody', '51,683'), city('Brookhaven', '55,554'), city('Peachtree City', '35,364'),
      city('Newnan', '40,495'), city('Dalton', '34,234'), city('Gainesville', '42,464'),
      city('Milton', '39,252'), city('Hinesville', '33,437'), city('Statesboro', '33,664'),
    ],
  },
  {
    name: 'Hawaii', slug: 'hawaii', abbreviation: 'HI',
    cities: [
      city('Honolulu', '350,964'), city('Pearl City', '47,698'), city('Hilo', '45,703'),
      city('Kailua', '40,514'), city('Waipahu', '38,216'), city('Kaneohe', '34,597'),
      city('Mililani Town', '27,629'), city('Kahului', '26,337'), city('Ewa Gentry', '24,724'),
      city('Kihei', '22,749'), city('Kapolei', '21,541'), city('Aiea', '9,338'),
      city('Wailuku', '17,697'), city('Lahaina', '12,702'), city('Schofield Barracks', '16,370'),
    ],
  },
  {
    name: 'Idaho', slug: 'idaho', abbreviation: 'ID',
    cities: [
      city('Boise', '235,684'), city('Meridian', '117,635'), city('Nampa', '100,200'),
      city('Idaho Falls', '64,820'), city('Caldwell', '59,155'), city('Pocatello', '56,320'),
      city('Coeur d\'Alene', '53,890'), city('Twin Falls', '51,807'), city('Post Falls', '38,926'),
      city('Lewiston', '33,220'), city('Eagle', '30,255'), city('Rexburg', '28,693'),
      city('Moscow', '25,435'), city('Kuna', '24,895'), city('Star', '12,395'),
    ],
  },
  {
    name: 'Illinois', slug: 'illinois', abbreviation: 'IL',
    cities: [
      city('Chicago', '2,693,976'), city('Aurora', '180,542'), city('Naperville', '149,540'),
      city('Joliet', '150,362'), city('Rockford', '148,655'), city('Springfield', '114,394'),
      city('Elgin', '112,456'), city('Peoria', '113,150'), city('Champaign', '88,302'),
      city('Waukegan', '89,078'), city('Cicero', '83,891'), city('Bloomington', '78,680'),
      city('Arlington Heights', '75,101'), city('Evanston', '78,110'), city('Schaumburg', '78,723'),
      city('Bolingbrook', '73,922'), city('Palatine', '69,350'), city('Skokie', '67,824'),
      city('Des Plaines', '60,675'), city('Orland Park', '58,590'), city('Tinley Park', '56,703'),
      city('Oak Lawn', '56,690'), city('Berwyn', '56,657'), city('Normal', '54,264'),
      city('Wheaton', '53,648'), city('Mount Prospect', '56,503'),
    ],
  },
  {
    name: 'Indiana', slug: 'indiana', abbreviation: 'IN',
    cities: [
      city('Indianapolis', '887,642'), city('Fort Wayne', '263,886'), city('Evansville', '117,429'),
      city('South Bend', '103,453'), city('Carmel', '99,757'), city('Fishers', '99,220'),
      city('Bloomington', '79,168'), city('Hammond', '77,879'), city('Gary', '69,093'),
      city('Lafayette', '70,783'), city('Muncie', '65,194'), city('Terre Haute', '58,389'),
      city('Noblesville', '69,604'), city('Greenwood', '61,028'), city('Westfield', '46,410'),
      city('Kokomo', '58,066'), city('Anderson', '54,878'), city('Elkhart', '53,923'),
      city('Mishawaka', '49,473'), city('Lawrence', '49,272'),
    ],
  },
  {
    name: 'Iowa', slug: 'iowa', abbreviation: 'IA',
    cities: [
      city('Des Moines', '214,133'), city('Cedar Rapids', '137,710'), city('Davenport', '101,724'),
      city('Sioux City', '85,797'), city('Iowa City', '74,828'), city('Waterloo', '67,314'),
      city('Ames', '66,258'), city('West Des Moines', '68,723'), city('Council Bluffs', '62,230'),
      city('Ankeny', '67,355'), city('Dubuque', '59,667'), city('Urbandale', '45,580'),
      city('Cedar Falls', '40,713'), city('Marion', '39,910'), city('Bettendorf', '36,543'),
      city('Mason City', '27,023'), city('Marshalltown', '27,552'), city('Clinton', '24,473'),
      city('Burlington', '24,321'), city('Fort Dodge', '24,871'),
    ],
  },
  {
    name: 'Kansas', slug: 'kansas', abbreviation: 'KS',
    cities: [
      city('Wichita', '397,532'), city('Overland Park', '197,238'), city('Kansas City', '156,607'),
      city('Olathe', '141,290'), city('Topeka', '126,587'), city('Lawrence', '94,934'),
      city('Shawnee', '67,311'), city('Manhattan', '54,100'), city('Lenexa', '55,625'),
      city('Salina', '46,994'), city('Hutchinson', '40,006'), city('Leavenworth', '36,210'),
      city('Leawood', '34,659'), city('Garden City', '28,451'), city('Emporia', '24,724'),
      city('Derby', '24,210'), city('Junction City', '22,932'), city('Prairie Village', '22,368'),
      city('Hays', '20,845'), city('Liberal', '19,826'),
    ],
  },
  {
    name: 'Kentucky', slug: 'kentucky', abbreviation: 'KY',
    cities: [
      city('Louisville', '633,045'), city('Lexington', '322,570'), city('Bowling Green', '72,294'),
      city('Owensboro', '60,183'), city('Covington', '40,640'), city('Richmond', '36,479'),
      city('Georgetown', '34,932'), city('Florence', '32,305'), city('Hopkinsville', '30,089'),
      city('Nicholasville', '30,553'), city('Elizabethtown', '30,289'), city('Henderson', '28,757'),
      city('Frankfort', '28,602'), city('Jeffersontown', '27,715'), city('Independence', '28,804'),
      city('Paducah', '27,137'), city('Radcliff', '22,898'), city('Ashland', '20,591'),
      city('Madisonville', '19,591'), city('Murray', '19,254'),
    ],
  },
  {
    name: 'Louisiana', slug: 'louisiana', abbreviation: 'LA',
    cities: [
      city('New Orleans', '383,997'), city('Baton Rouge', '227,470'), city('Shreveport', '187,593'),
      city('Metairie', '138,481'), city('Lafayette', '121,374'), city('Lake Charles', '77,565'),
      city('Kenner', '66,702'), city('Bossier City', '68,159'), city('Monroe', '47,702'),
      city('Alexandria', '47,723'), city('Houma', '33,727'), city('Marrero', '33,141'),
      city('New Iberia', '30,617'), city('Laplace', '29,872'), city('Slidell', '27,639'),
      city('Central', '29,153'), city('Ruston', '22,188'), city('Sulphur', '21,601'),
      city('Hammond', '20,019'), city('Natchitoches', '18,323'),
    ],
  },
  {
    name: 'Maine', slug: 'maine', abbreviation: 'ME',
    cities: [
      city('Portland', '68,408'), city('Lewiston', '36,221'), city('Bangor', '31,753'),
      city('South Portland', '25,665'), city('Auburn', '23,203'), city('Biddeford', '21,277'),
      city('Sanford', '21,028'), city('Saco', '19,712'), city('Augusta', '19,136'),
      city('Westbrook', '18,935'), city('Waterville', '16,254'), city('Scarborough', '20,352'),
      city('Brunswick', '20,278'), city('Windham', '18,328'), city('Gorham', '17,644'),
    ],
  },
  {
    name: 'Maryland', slug: 'maryland', abbreviation: 'MD',
    cities: [
      city('Baltimore', '585,708'), city('Frederick', '78,171'), city('Rockville', '68,401'),
      city('Gaithersburg', '67,417'), city('Bowie', '58,025'), city('Hagerstown', '44,758'),
      city('Annapolis', '40,812'), city('College Park', '32,303'), city('Salisbury', '32,899'),
      city('Laurel', '30,346'), city('Greenbelt', '23,511'), city('Cumberland', '20,095'),
      city('Westminster', '18,671'), city('Hyattsville', '18,267'), city('Takoma Park', '17,703'),
      city('Easton', '16,834'), city('Elkton', '15,924'), city('Aberdeen', '16,456'),
      city('Havre de Grace', '13,589'), city('Cambridge', '12,326'),
    ],
  },
  {
    name: 'Massachusetts', slug: 'massachusetts', abbreviation: 'MA',
    cities: [
      city('Boston', '675,647'), city('Worcester', '206,518'), city('Springfield', '155,929'),
      city('Cambridge', '118,403'), city('Lowell', '115,554'), city('Brockton', '105,643'),
      city('New Bedford', '101,079'), city('Quincy', '101,636'), city('Lynn', '101,253'),
      city('Fall River', '93,885'), city('Newton', '88,923'), city('Lawrence', '89,143'),
      city('Somerville', '81,045'), city('Framingham', '72,032'), city('Haverhill', '67,130'),
      city('Waltham', '62,227'), city('Malden', '66,263'), city('Medford', '63,896'),
      city('Taunton', '57,464'), city('Chicopee', '55,298'), city('Weymouth', '57,437'),
      city('Revere', '62,186'), city('Peabody', '54,354'), city('Plymouth', '61,217'),
    ],
  },
  {
    name: 'Michigan', slug: 'michigan', abbreviation: 'MI',
    cities: [
      city('Detroit', '639,111'), city('Grand Rapids', '198,917'), city('Warren', '139,387'),
      city('Sterling Heights', '134,346'), city('Ann Arbor', '123,851'), city('Lansing', '112,644'),
      city('Flint', '95,943'), city('Dearborn', '109,976'), city('Livonia', '94,721'),
      city('Troy', '87,294'), city('Canton', '98,659'), city('Farmington Hills', '83,986'),
      city('Kalamazoo', '73,598'), city('Wyoming', '76,068'), city('Westland', '84,094'),
      city('Southfield', '73,208'), city('Rochester Hills', '76,134'), city('Taylor', '63,131'),
      city('Pontiac', '60,332'), city('St. Clair Shores', '59,715'), city('Royal Oak', '59,277'),
      city('Novi', '60,489'), city('Dearborn Heights', '55,137'), city('Battle Creek', '51,084'),
    ],
  },
  {
    name: 'Minnesota', slug: 'minnesota', abbreviation: 'MN',
    cities: [
      city('Minneapolis', '429,954'), city('St. Paul', '311,527'), city('Rochester', '121,395'),
      city('Duluth', '90,884'), city('Bloomington', '89,987'), city('Brooklyn Park', '86,478'),
      city('Plymouth', '81,026'), city('Woodbury', '75,102'), city('Maple Grove', '70,253'),
      city('St. Cloud', '68,881'), city('Eagan', '68,855'), city('Eden Prairie', '64,198'),
      city('Blaine', '65,319'), city('Lakeville', '69,490'), city('Burnsville', '64,317'),
      city('Minnetonka', '53,781'), city('Apple Valley', '55,135'), city('Edina', '53,494'),
      city('St. Louis Park', '49,904'), city('Moorhead', '44,505'), city('Mankato', '44,488'),
      city('Shakopee', '41,866'), city('Maplewood', '41,008'), city('Cottage Grove', '37,166'),
    ],
  },
  {
    name: 'Mississippi', slug: 'mississippi', abbreviation: 'MS',
    cities: [
      city('Jackson', '153,701'), city('Gulfport', '72,926'), city('Southaven', '54,944'),
      city('Biloxi', '46,212'), city('Hattiesburg', '48,628'), city('Olive Branch', '42,606'),
      city('Tupelo', '38,300'), city('Meridian', '33,161'), city('Pearl', '27,132'),
      city('Oxford', '27,662'), city('Madison', '28,079'), city('Ridgeland', '24,047'),
      city('Greenville', '29,938'), city('Horn Lake', '27,658'), city('Clinton', '25,216'),
      city('Brandon', '24,869'), city('Starkville', '25,495'), city('Columbus', '23,640'),
      city('Vicksburg', '21,536'), city('Pascagoula', '21,813'),
    ],
  },
  {
    name: 'Missouri', slug: 'missouri', abbreviation: 'MO',
    cities: [
      city('Kansas City', '508,090'), city('St. Louis', '301,578'), city('Springfield', '169,176'),
      city('Columbia', '126,254'), city('Independence', '123,011'), city('Lee\'s Summit', '101,108'),
      city('O\'Fallon', '91,316'), city('St. Joseph', '72,473'), city('St. Charles', '70,493'),
      city('St. Peters', '57,728'), city('Blue Springs', '56,481'), city('Florissant', '51,443'),
      city('Joplin', '51,762'), city('Chesterfield', '47,749'), city('Jefferson City', '43,079'),
      city('Cape Girardeau', '40,100'), city('Wildwood', '35,517'), city('University City', '34,436'),
      city('Ballwin', '30,404'), city('Wentzville', '40,791'), city('Raymore', '21,676'),
      city('Liberty', '31,507'), city('Gladstone', '27,560'), city('Raytown', '29,176'),
    ],
  },
  {
    name: 'Montana', slug: 'montana', abbreviation: 'MT',
    cities: [
      city('Billings', '117,116'), city('Missoula', '73,489'), city('Great Falls', '60,442'),
      city('Bozeman', '53,293'), city('Butte', '34,494'), city('Helena', '32,020'),
      city('Kalispell', '24,558'), city('Havre', '9,362'), city('Anaconda', '9,153'),
      city('Miles City', '8,410'), city('Belgrade', '10,435'), city('Livingston', '7,696'),
      city('Laurel', '7,027'), city('Whitefish', '7,751'), city('Lewistown', '5,952'),
    ],
  },
  {
    name: 'Nebraska', slug: 'nebraska', abbreviation: 'NE',
    cities: [
      city('Omaha', '486,051'), city('Lincoln', '291,082'), city('Bellevue', '64,176'),
      city('Grand Island', '51,390'), city('Kearney', '33,464'), city('Fremont', '26,397'),
      city('Hastings', '25,078'), city('Norfolk', '24,210'), city('North Platte', '23,665'),
      city('Columbus', '23,291'), city('Papillion', '24,313'), city('La Vista', '17,081'),
      city('Scottsbluff', '14,488'), city('South Sioux City', '12,975'), city('Beatrice', '12,282'),
      city('Lexington', '10,230'), city('Gering', '8,500'), city('Alliance', '8,100'),
      city('Blair', '7,990'), city('York', '7,810'),
    ],
  },
  {
    name: 'Nevada', slug: 'nevada', abbreviation: 'NV',
    cities: [
      city('Las Vegas', '641,903'), city('Henderson', '320,189'), city('Reno', '264,165'),
      city('North Las Vegas', '262,527'), city('Sparks', '108,445'), city('Carson City', '58,639'),
      city('Fernley', '21,599'), city('Elko', '20,078'), city('Mesquite', '18,951'),
      city('Boulder City', '15,977'), city('Fallon', '9,127'), city('Winnemucca', '8,282'),
      city('West Wendover', '4,410'), city('Ely', '4,255'), city('Yerington', '3,115'),
      city('Lovelock', '1,894'), city('Caliente', '1,130'), city('Pahrump', '36,441'),
    ],
  },
  {
    name: 'New Hampshire', slug: 'new-hampshire', abbreviation: 'NH',
    cities: [
      city('Manchester', '115,644'), city('Nashua', '91,322'), city('Concord', '43,976'),
      city('Derry', '33,109'), city('Dover', '31,922'), city('Rochester', '31,366'),
      city('Salem', '29,549'), city('Merrimack', '25,494'), city('Hudson', '25,378'),
      city('Londonderry', '24,129'), city('Keene', '23,047'), city('Bedford', '22,141'),
      city('Portsmouth', '21,956'), city('Goffstown', '18,127'), city('Laconia', '16,871'),
    ],
  },
  {
    name: 'New Jersey', slug: 'new-jersey', abbreviation: 'NJ',
    cities: [
      city('Newark', '311,549'), city('Jersey City', '292,449'), city('Paterson', '159,732'),
      city('Elizabeth', '137,298'), city('Lakewood', '135,158'), city('Edison', '107,588'),
      city('Woodbridge', '103,639'), city('Toms River', '95,438'), city('Hamilton', '92,297'),
      city('Trenton', '90,871'), city('Clifton', '89,460'), city('Camden', '71,791'),
      city('Brick', '75,495'), city('Cherry Hill', '74,553'), city('Passaic', '72,647'),
      city('Middletown', '65,042'), city('Union City', '71,879'), city('Old Bridge', '68,381'),
      city('Gloucester Township', '64,634'), city('East Orange', '64,270'),
      city('Bayonne', '65,268'), city('Franklin', '67,506'), city('North Bergen', '63,659'),
      city('Vineland', '60,724'),
    ],
  },
  {
    name: 'New Mexico', slug: 'new-mexico', abbreviation: 'NM',
    cities: [
      city('Albuquerque', '564,559'), city('Las Cruces', '111,385'), city('Rio Rancho', '104,046'),
      city('Santa Fe', '87,505'), city('Roswell', '48,366'), city('Farmington', '45,877'),
      city('Clovis', '39,860'), city('Hobbs', '40,208'), city('Alamogordo', '31,384'),
      city('Carlsbad', '29,613'), city('Gallup', '21,678'), city('Deming', '14,488'),
      city('Los Lunas', '16,143'), city('Sunland Park', '16,317'), city('Las Vegas', '13,166'),
      city('Artesia', '12,044'), city('Lovington', '11,365'), city('Portales', '11,989'),
      city('Silver City', '9,556'), city('Espanola', '9,688'),
    ],
  },
  {
    name: 'New York', slug: 'new-york', abbreviation: 'NY',
    cities: [
      city('New York City', '8,336,817'), city('Buffalo', '278,349'), city('Rochester', '211,328'),
      city('Yonkers', '211,569'), city('Syracuse', '148,620'), city('Albany', '99,224'),
      city('New Rochelle', '79,726'), city('Mount Vernon', '73,893'), city('Schenectady', '67,878'),
      city('Utica', '65,284'), city('White Plains', '58,109'), city('Hempstead', '55,361'),
      city('Troy', '51,401'), city('Niagara Falls', '48,671'), city('Binghamton', '47,969'),
      city('Freeport', '43,167'), city('Valley Stream', '37,511'), city('Long Beach', '33,275'),
      city('Spring Valley', '32,603'), city('Rome', '32,148'), city('Ithaca', '32,027'),
      city('North Tonawanda', '30,125'), city('Saratoga Springs', '28,491'),
      city('Poughkeepsie', '30,341'),
    ],
  },
  {
    name: 'North Carolina', slug: 'north-carolina', abbreviation: 'NC',
    cities: [
      city('Charlotte', '874,579'), city('Raleigh', '467,665'), city('Greensboro', '299,035'),
      city('Durham', '283,506'), city('Winston-Salem', '249,545'), city('Fayetteville', '208,501'),
      city('Cary', '174,721'), city('Wilmington', '115,451'), city('High Point', '112,791'),
      city('Concord', '105,240'), city('Greenville', '92,156'), city('Asheville', '94,589'),
      city('Gastonia', '80,411'), city('Jacksonville', '74,629'), city('Chapel Hill', '61,960'),
      city('Huntersville', '62,268'), city('Apex', '63,445'), city('Hickory', '43,490'),
      city('Mooresville', '38,498'), city('Rocky Mount', '54,994'), city('Burlington', '57,303'),
      city('Kannapolis', '53,227'), city('Matthews', '32,580'), city('Sanford', '30,067'),
    ],
  },
  {
    name: 'North Dakota', slug: 'north-dakota', abbreviation: 'ND',
    cities: [
      city('Fargo', '125,990'), city('Bismarck', '73,529'), city('Grand Forks', '56,500'),
      city('Minot', '48,743'), city('West Fargo', '36,566'), city('Williston', '27,096'),
      city('Dickinson', '22,186'), city('Mandan', '22,752'), city('Jamestown', '15,427'),
      city('Wahpeton', '7,766'), city('Devils Lake', '7,141'), city('Valley City', '6,585'),
      city('Grafton', '4,071'), city('Beulah', '3,201'), city('Rugby', '2,724'),
    ],
  },
  {
    name: 'Ohio', slug: 'ohio', abbreviation: 'OH',
    cities: [
      city('Columbus', '905,748'), city('Cleveland', '372,624'), city('Cincinnati', '309,317'),
      city('Toledo', '270,871'), city('Akron', '190,469'), city('Dayton', '137,644'),
      city('Parma', '78,103'), city('Canton', '70,872'), city('Youngstown', '60,068'),
      city('Lorain', '65,211'), city('Hamilton', '62,082'), city('Springfield', '58,662'),
      city('Kettering', '57,502'), city('Elyria', '54,533'), city('Lakewood', '50,002'),
      city('Cuyahoga Falls', '51,114'), city('Dublin', '49,328'), city('Beavercreek', '47,741'),
      city('Middletown', '48,694'), city('Newark', '49,934'), city('Mentor', '47,437'),
      city('Mansfield', '46,454'), city('Strongsville', '44,750'), city('Fairfield', '42,510'),
    ],
  },
  {
    name: 'Oklahoma', slug: 'oklahoma', abbreviation: 'OK',
    cities: [
      city('Oklahoma City', '681,054'), city('Tulsa', '413,066'), city('Norman', '128,026'),
      city('Broken Arrow', '113,540'), city('Edmond', '94,054'), city('Lawton', '93,714'),
      city('Moore', '62,793'), city('Midwest City', '57,732'), city('Enid', '49,379'),
      city('Stillwater', '50,401'), city('Muskogee', '37,126'), city('Owasso', '38,093'),
      city('Bartlesville', '36,495'), city('Shawnee', '31,521'), city('Yukon', '28,555'),
      city('Ardmore', '24,698'), city('Ponca City', '24,467'), city('Bixby', '27,400'),
      city('Duncan', '22,442'), city('Del City', '21,332'),
    ],
  },
  {
    name: 'Oregon', slug: 'oregon', abbreviation: 'OR',
    cities: [
      city('Portland', '652,503'), city('Salem', '175,535'), city('Eugene', '176,654'),
      city('Gresham', '113,103'), city('Hillsboro', '106,447'), city('Beaverton', '97,590'),
      city('Bend', '99,178'), city('Medford', '85,824'), city('Springfield', '62,256'),
      city('Corvallis', '59,922'), city('Albany', '56,828'), city('Tigard', '55,767'),
      city('Lake Oswego', '40,090'), city('Keizer', '39,824'), city('Grants Pass', '38,563'),
      city('Oregon City', '37,473'), city('McMinnville', '35,158'), city('Tualatin', '27,907'),
      city('West Linn', '26,764'), city('Woodburn', '26,080'), city('Redmond', '32,421'),
      city('Ashland', '21,360'), city('Milwaukie', '21,119'), city('Roseburg', '24,820'),
    ],
  },
  {
    name: 'Pennsylvania', slug: 'pennsylvania', abbreviation: 'PA',
    cities: [
      city('Philadelphia', '1,603,797'), city('Pittsburgh', '302,971'), city('Allentown', '126,092'),
      city('Reading', '95,112'), city('Erie', '94,831'), city('Scranton', '76,997'),
      city('Bethlehem', '75,781'), city('Lancaster', '63,069'), city('Harrisburg', '50,099'),
      city('York', '44,747'), city('Wilkes-Barre', '44,328'), city('Chester', '33,927'),
      city('State College', '42,034'), city('Easton', '28,203'), city('Norristown', '34,324'),
      city('Williamsport', '28,356'), city('Pottstown', '22,670'), city('Hazleton', '25,340'),
      city('Johnstown', '19,147'), city('West Chester', '20,012'), city('Chambersburg', '21,017'),
      city('Butler', '13,757'), city('New Castle', '22,554'), city('Lebanon', '25,477'),
    ],
  },
  {
    name: 'Rhode Island', slug: 'rhode-island', abbreviation: 'RI',
    cities: [
      city('Providence', '190,934'), city('Cranston', '82,934'), city('Warwick', '82,823'),
      city('Pawtucket', '75,604'), city('East Providence', '47,139'), city('Woonsocket', '43,240'),
      city('Newport', '24,672'), city('Central Falls', '22,583'), city('Westerly', '22,787'),
      city('North Providence', '34,149'), city('Cumberland', '35,569'), city('West Warwick', '30,289'),
      city('Coventry', '35,688'), city('North Kingstown', '26,486'), city('South Kingstown', '30,639'),
    ],
  },
  {
    name: 'South Carolina', slug: 'south-carolina', abbreviation: 'SC',
    cities: [
      city('Charleston', '150,227'), city('Columbia', '136,632'), city('North Charleston', '114,852'),
      city('Mount Pleasant', '89,338'), city('Rock Hill', '74,372'), city('Greenville', '70,720'),
      city('Summerville', '50,213'), city('Goose Creek', '46,320'), city('Hilton Head Island', '40,000'),
      city('Florence', '39,467'), city('Spartanburg', '37,647'), city('Myrtle Beach', '35,682'),
      city('Sumter', '39,758'), city('Greer', '32,229'), city('Aiken', '30,869'),
      city('Anderson', '27,387'), city('Mauldin', '25,829'), city('North Augusta', '23,585'),
      city('Easley', '21,237'), city('Simpsonville', '22,728'),
    ],
  },
  {
    name: 'South Dakota', slug: 'south-dakota', abbreviation: 'SD',
    cities: [
      city('Sioux Falls', '192,517'), city('Rapid City', '74,703'), city('Aberdeen', '28,324'),
      city('Brookings', '24,062'), city('Watertown', '22,655'), city('Mitchell', '15,660'),
      city('Yankton', '15,411'), city('Huron', '13,099'), city('Pierre', '14,091'),
      city('Vermillion', '11,695'), city('Spearfish', '11,545'), city('Box Elder', '10,518'),
      city('Brandon', '10,273'), city('Sturgis', '7,094'), city('Madison', '7,053'),
    ],
  },
  {
    name: 'Tennessee', slug: 'tennessee', abbreviation: 'TN',
    cities: [
      city('Nashville', '689,447'), city('Memphis', '633,104'), city('Knoxville', '190,740'),
      city('Chattanooga', '181,099'), city('Clarksville', '166,722'), city('Murfreesboro', '152,769'),
      city('Franklin', '83,454'), city('Jackson', '68,205'), city('Johnson City', '66,027'),
      city('Bartlett', '58,226'), city('Hendersonville', '58,113'), city('Kingsport', '53,699'),
      city('Collierville', '51,111'), city('Smyrna', '50,820'), city('Cleveland', '45,076'),
      city('Brentwood', '43,511'), city('Germantown', '39,375'), city('Spring Hill', '41,402'),
      city('Columbia', '40,339'), city('La Vergne', '35,653'), city('Gallatin', '40,262'),
      city('Mount Juliet', '37,768'), city('Cookeville', '33,922'), city('Lebanon', '36,440'),
    ],
  },
  {
    name: 'Texas', slug: 'texas', abbreviation: 'TX',
    cities: [
      city('Houston', '2,304,580'), city('San Antonio', '1,547,253'), city('Dallas', '1,304,379'),
      city('Austin', '978,908'), city('Fort Worth', '918,915'), city('El Paso', '678,815'),
      city('Arlington', '394,266'), city('Corpus Christi', '317,863'), city('Plano', '285,494'),
      city('Laredo', '255,205'), city('Lubbock', '257,141'), city('Garland', '239,928'),
      city('Irving', '239,798'), city('Frisco', '200,509'), city('McKinney', '199,177'),
      city('Amarillo', '200,393'), city('Grand Prairie', '194,543'), city('Brownsville', '186,738'),
      city('Killeen', '153,095'), city('Pasadena', '151,227'), city('McAllen', '142,212'),
      city('Mesquite', '140,937'), city('Midland', '132,950'), city('Denton', '139,869'),
      city('Waco', '138,486'), city('Carrollton', '133,168'), city('Round Rock', '133,372'),
      city('Abilene', '123,420'), city('Pearland', '122,149'), city('Richardson', '121,323'),
      city('Odessa', '114,426'), city('Sugar Land', '111,026'), city('Beaumont', '118,296'),
      city('The Woodlands', '114,436'), city('Allen', '104,627'), city('League City', '106,830'),
      city('Tyler', '105,995'), city('Edinburg', '101,170'), city('Lewisville', '111,822'),
      city('College Station', '120,511'), city('San Marcos', '67,553'), city('Pflugerville', '65,191'),
      city('Cedar Park', '79,462'), city('Temple', '82,073'), city('Flower Mound', '79,920'),
      city('New Braunfels', '90,209'), city('North Richland Hills', '69,204'),
      city('Conroe', '82,286'), city('Mansfield', '73,055'), city('Georgetown', '67,176'),
      city('Wichita Falls', '104,683'),
    ],
  },
  {
    name: 'Utah', slug: 'utah', abbreviation: 'UT',
    cities: [
      city('Salt Lake City', '199,723'), city('West Valley City', '140,230'), city('Provo', '115,162'),
      city('West Jordan', '116,961'), city('Orem', '97,499'), city('Sandy', '96,904'),
      city('Ogden', '87,321'), city('St. George', '95,342'), city('Layton', '78,014'),
      city('South Jordan', '77,487'), city('Lehi', '75,907'), city('Millcreek', '60,811'),
      city('Taylorsville', '60,448'), city('Logan', '52,778'), city('Murray', '50,637'),
      city('Draper', '49,657'), city('Bountiful', '44,204'), city('Riverton', '44,635'),
      city('Herriman', '55,144'), city('Spanish Fork', '40,590'), city('Roy', '38,218'),
      city('Pleasant Grove', '37,807'), city('Tooele', '35,742'), city('Springville', '34,365'),
    ],
  },
  {
    name: 'Vermont', slug: 'vermont', abbreviation: 'VT',
    cities: [
      city('Burlington', '44,743'), city('South Burlington', '19,486'), city('Rutland', '15,807'),
      city('Barre', '8,491'), city('Montpelier', '8,074'), city('Winooski', '7,997'),
      city('St. Albans', '6,918'), city('Newport', '4,589'), city('Vergennes', '2,588'),
      city('St. Johnsbury', '5,607'), city('Bennington', '15,764'), city('Brattleboro', '12,184'),
      city('Essex Junction', '10,761'), city('Milton', '10,723'), city('Hartford', '10,686'),
    ],
  },
  {
    name: 'Virginia', slug: 'virginia', abbreviation: 'VA',
    cities: [
      city('Virginia Beach', '459,470'), city('Norfolk', '238,005'), city('Chesapeake', '249,422'),
      city('Richmond', '226,610'), city('Newport News', '186,247'), city('Alexandria', '159,467'),
      city('Hampton', '137,148'), city('Roanoke', '100,011'), city('Portsmouth', '97,915'),
      city('Suffolk', '92,108'), city('Lynchburg', '82,168'), city('Harrisonburg', '53,016'),
      city('Leesburg', '53,727'), city('Charlottesville', '46,553'), city('Blacksburg', '44,826'),
      city('Danville', '40,044'), city('Manassas', '41,085'), city('Petersburg', '33,458'),
      city('Fredericksburg', '28,118'), city('Winchester', '28,078'), city('Salem', '25,301'),
      city('Staunton', '24,932'), city('Herndon', '24,554'), city('Hopewell', '22,529'),
    ],
  },
  {
    name: 'Washington', slug: 'washington', abbreviation: 'WA',
    cities: [
      city('Seattle', '737,015'), city('Spokane', '228,989'), city('Tacoma', '219,346'),
      city('Vancouver', '190,915'), city('Bellevue', '151,854'), city('Kent', '136,588'),
      city('Everett', '110,629'), city('Renton', '106,785'), city('Spokane Valley', '102,976'),
      city('Federal Way', '99,037'), city('Kirkland', '92,175'), city('Yakima', '96,968'),
      city('Bellingham', '92,314'), city('Kennewick', '84,347'), city('Auburn', '87,368'),
      city('Pasco', '77,100'), city('Marysville', '70,714'), city('Lakewood', '65,524'),
      city('Redmond', '73,256'), city('Shoreline', '57,027'), city('Richland', '57,303'),
      city('Olympia', '55,605'), city('Sammamish', '65,892'), city('Burien', '51,850'),
    ],
  },
  {
    name: 'West Virginia', slug: 'west-virginia', abbreviation: 'WV',
    cities: [
      city('Charleston', '48,006'), city('Huntington', '46,842'), city('Morgantown', '30,855'),
      city('Parkersburg', '29,675'), city('Wheeling', '27,062'), city('Weirton', '19,276'),
      city('Fairmont', '18,443'), city('Martinsburg', '17,227'), city('Beckley', '16,919'),
      city('Clarksburg', '16,578'), city('South Charleston', '12,368'), city('St. Albans', '10,588'),
      city('Vienna', '10,261'), city('Bluefield', '10,032'), city('Bridgeport', '8,582'),
    ],
  },
  {
    name: 'Wisconsin', slug: 'wisconsin', abbreviation: 'WI',
    cities: [
      city('Milwaukee', '577,222'), city('Madison', '269,840'), city('Green Bay', '107,395'),
      city('Kenosha', '99,889'), city('Racine', '77,816'), city('Appleton', '75,644'),
      city('Waukesha', '72,489'), city('Oshkosh', '66,816'), city('Eau Claire', '68,339'),
      city('Janesville', '65,615'), city('West Allis', '60,328'), city('La Crosse', '52,680'),
      city('Sheboygan', '49,929'), city('Wauwatosa', '48,387'), city('Fond du Lac', '43,021'),
      city('New Berlin', '39,584'), city('Wausau', '39,106'), city('Brookfield', '38,626'),
      city('Beloit', '36,966'), city('Greenfield', '37,117'), city('Fitchburg', '30,003'),
      city('Mount Pleasant', '27,008'), city('Sun Prairie', '35,000'), city('Manitowoc', '32,547'),
    ],
  },
  {
    name: 'Wyoming', slug: 'wyoming', abbreviation: 'WY',
    cities: [
      city('Cheyenne', '64,235'), city('Casper', '58,313'), city('Laramie', '32,158'),
      city('Gillette', '32,649'), city('Rock Springs', '23,036'), city('Sheridan', '17,844'),
      city('Green River', '12,515'), city('Evanston', '11,507'), city('Riverton', '10,616'),
      city('Jackson', '10,429'), city('Cody', '9,836'), city('Rawlins', '8,838'),
      city('Lander', '7,651'), city('Torrington', '6,501'), city('Powell', '6,314'),
    ],
  },
];

export function getStateBySlug(slug: string): StateData | undefined {
  return locations.find(s => s.slug === slug);
}

export function getCityBySlug(stateSlug: string, citySlug: string): { state: StateData; city: CityData } | undefined {
  const state = getStateBySlug(stateSlug);
  if (!state) return undefined;
  const c = state.cities.find(c => c.slug === citySlug);
  if (!c) return undefined;
  return { state, city: c };
}

export function getTotalCityCount(): number {
  return locations.reduce((sum, state) => sum + state.cities.length, 0);
}
