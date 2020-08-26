import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,TouchableHighlight} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Form,Textarea,Title,Badge} from 'native-base';
import RNPicker from "rn-modal-picker";

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import * as firebase from 'firebase';
import {  Picker } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
import Loading from './Loadingpage';
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
const headerImage = __DEV__ ? 'rabbitDev' : 'rabbitProd';
import Carousel from '../components/carousel';
import Avatar from '../components/avatar/Avatar';
import Team from '../components/teamimage';
import Feature from '../components/feature';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Door from '../components/Door';
import FeaturedTile from '../components/tile/FeaturedTile';
import ClassCarousel from '../components/ClassCarousel';
import { Input } from 'react-native-elements';

import { Button,Header,Item,Icon,Label } from 'native-base';


import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';
import NavigationBack from '../components/NavigationBack';
const colors = [

'red',
'steelblue',
'yellow',
'purple',
'black'
];
const weekdays = [


];
var colorsString="Abbey,Aboriginal and Torres Strait Islander Organisation,Aboriginal Art Gallery,Abortion Clinic,Abrasives Supplier,Abundant Life Church,Accountant,Accounting Firm,Accounting School,Accounting Software Company,Acoustical Consultant,Acrobatic Diving Pool,Acrylic Store,Acupuncture Clinic,Acupuncture School,Acupuncturist,Acura Dealer,Addiction Treatment Center,Administrative Attorney,Adoption Agency,Adult Day Care Center,Adult DVD Store,Adult Education School,Adult Entertainment Club,Adult Entertainment Store,Adult Foster Care Service,Adventure Sports,Adventure Sports Center,Advertising Agency,Commercial Photographer,Advertising Service,Aerated Drinks Supplier,Antenna Service,Aerial Photographer,Aerial Sports Center,Aero Dance Class,Aerobics Instructor,Aeroclub,Aeromodel Shop,Aeronautical Engineer,Aerospace Company,Afghani Restaurant,African Goods Store,African Restaurant,After School Program,Agenzia Entrate,Aggregate Supplier,Agistment Service,Agricultural Association,Agricultural Cooperative,Agricultural Engineer,Agricultural High School,Agricultural Machinery Manufacturer,Agricultural Organization,Agricultural Product Wholesaler,Agricultural Production,Agricultural Service,Agricultural Service Supply Agency,Agriculture Cooperative,Agrochemicals Supplier,Aikido Club,Aikido School,Air Compressor Repair Service,Air Compressor Supplier,Air Conditioning Contractor,Air Conditioning Repair Service,Air Conditioning Store,Air Conditioning System Supplier,Air Duct Cleaning Service,Air Filter Supplier,Air Force Base,Air Taxi,Airbrushing Service,Airbrushing Supply Store,Aircraft Maintenance Company,Aircraft Manufacturer,Aircraft Rental Service,Aircraft Supply Store,Airline,Airline Ticket Agency,Airplane,Airport,Airport Hotel,Airport Shuttle Service,Airsoft Supply Store,Airstrip,Alcohol Manufacturer,Alcohol Retail Monopoly,Alcoholic Beverage Wholesaler,Alcoholism Treatment Program,Allergist,Alliance Church,Alsace Restaurant,Alternative Fuel Station,Alternative Medicine Practitioner,Alternator Supplier,Aluminum Supplier,Aluminum Frames Supplier,Aluminum Welder,Aluminum Window,Amateur theater,Ambulance Service,American Restaurant,Amish Furniture Store,Ammunition Supplier,Amphitheater,Amusement Center,Amusement Machine Supplier,Amusement Park,Amusement Park Ride,Amusement Ride Supplier,An Hui Restaurant,Anago Restaurant,Andalusian Restaurant,Anesthesiologist,Angler Fish Restaurant,Anglican Church,Animal Control Service,Animal Hospital,Animal Park,Animal Protection Organization,Animal Rescue Service,Animal Shelter,Animation Studio,Anime Club,Anodizer,Antique Furniture Restoration Service,Antique Furniture Store,Antique Store,Apartment Building,Apartment Complex,Apartment Rental Agency,Apostolic Church,Appliance Parts Supplier,Appliance Rental Service,Appliance Repair Service,Appliance Store,Appliances Customer Service,Appraiser,Apprenticeship Center,Aquaculture Farm,Aquarium,Aquarium Shop,Aquatic Centre,Arboretum,Arborist and Tree Surgeon,Archaeological Museum,Archery Club,Archery Event,Archery Hall,Archery Range,Archery Store,Architect,Architects Association,Architectural and Engineering Model Maker,Architectural Designer,Architectural Salvage Store,Architecture Firm,Architecture School,Archive,Arena,Argentinian Restaurant,Armed Forces Association,Armenian Church,Armenian Restaurant,Army & Navy Surplus Shop,Army Barracks,Army Facility,Army Museum,Aromatherapy Class,Aromatherapy Service,Aromatherapy Supply Store,Art Cafe,Art Center,Art Dealer,Art Gallery,Art Handcraft,Art Museum,Art Restoration Service,Art School,Art Studio,Art Supply Store,Artificial Plant Supplier,Artist,Artistic Painting School,Arts Organization,Grill,Asbestos Testing Service,Ashram,Asian Fusion Restaurant,Asian Grocery Store,Asian Household Goods Store,Asian Massage Therapist,Asian Restaurant,Asphalt Contractor,Asphalt Mixing Plant,Assemblies of God Church,Assembly Room,Assistante Maternelle,Assisted Living Facility,Association or Organization,Astrologer,Asturian Restaurant,Athletic Club,Athletic Field,Athletic Park,Athletic Track,ATM,Attorney Referral Service,ATV Dealer,ATV Rental Service,ATV Repair Shop,Auction House,Audi Dealer,Audio Visual Consultant,Audio Visual Equipment Rental Service,Audio Visual Equipment Repair Service,Audio Visual Equipment Supplier,Audiologist,Auditor,Auditorium,Australian Goods Store,Australian Restaurant,Austrian Restaurant,Auto Accessories Wholesaler,Auto Air Conditioning Service,Auto Auction,Auto Body Parts Supplier,Auto Body Shop,Auto Broker,Auto Chemistry Shop,Auto Dent Removal Service,Auto Electrical Service,Auto Glass Shop,Auto Insurance Agency,Auto Machine Shop,Auto Market,Auto Parts Manufacturer,Auto Parts Market,Auto Parts Store,Auto Radiator Repair Service,Auto Repair Shop,Auto Restoration Service,Auto Spring Shop,Auto Sunroof Shop,Auto Tag Agency,Auto Tune Up Service,Auto Upholsterer,Auto Wrecker,Automation Company,Automobile Storage Facility,Aviation Consultant,Aviation Training Institute,Awning Supplier,Baby Clothing Store,Baby Store,Baby Swimming School,Childminder,Badminton Club,Badminton Complex,Badminton Court,Bag Shop,Bagel Shop,Bahá’í House of Worship,Bail Bonds Service,Bailiff,Bait Shop,Bakery,Bakery Equipment,Baking Supply Store,Ballet School,Ballet Theater,Balloon Artist,Balloon Ride Tour Agency,Balloon Store,Ballroom,Ballroom Dance Instructor,Band,Bangladeshi Restaurant,Bank,Bankruptcy Attorney,Bankruptcy Service,Banner Store,Banquet Hall,Baptist Church,Bar,Bar & Grill,Bar PMU,Bar Restaurant Furniture Store,Bar Stool Supplier,Bar Tabac,Barbecue Restaurant,Barbecue area,Barber School,Barber Shop,Barber Supply Store,Bark Supplier,Barrel Supplier,Barrister,Bartending School,Baseball,Baseball Club,Baseball Field,Baseball Goods Store,Basilica,Basket Supplier,Basketball Club,Basketball Court,Basketball Court Contractor,Basque Restaurant,Bathroom Remodeler,Bathroom Supply Store,Battery Manufacturer,Battery Store,Battery Wholesaler,Batting Cage Center,Bazar,BBQ Area,Beach Cleaning Service,Beach Clothing Store,Beach Entertainment Shop,Beach Pavillion,Beach Resort,Beach Volleyball Club,Beach Volleyball Court,Bead Store,Bead Wholesaler,Bearing Supplier,Beauty Product Supplier,Beauty Products Vending Machine,Beauty Products Wholesaler,Beauty Salon,Beauty School,Beauty Supply Store,Bed & Breakfast,Bed Shop,Bedding Store,Bedroom Furniture Store,Gyudon Restaurant,Beer Distributor,Beer Garden,Beer Hall,Beer Store,Belgian Restaurant,Belt Shop,Berry Restaurant,Betting Agency,Beverage Distributor,Bible Church,Bicycle Club,Bicycle Rack,Bicycle Rental Service,Bicycle Repair Shop,Bike Sharing Station,Bicycle Store,Bicycle Wholesale,Bikram Yoga Studio,Bilingual School,Billiards Supply Store,Bingo Hall,Biochemical Supplier,Biochemistry Lab,Biofeedback Therapist,Biotechnology Company,Biotechnology Engineer,Bird Control Service,Bird Shop,Bird Watching Area,Birth Center,Birth Certificate Service,Birth Control Center,Bistro,Blacksmith,Blast Cleaning Service,Blind School,Blinds Shop,Blood Bank,Blood Donation Center,Blood Testing Service,Blueprint Service,Blues Club,BMW Dealer,BMW Motorcycle Dealer,BMX Club,BMX Park,BMX Track,Board Game Club,Board of Education,Board of Trade,Boarding House,Boarding School,Boat Accessories Supplier,Boat Builders,Boat Club,Boat Cover Supplier,Boat Dealer,Boat Ramp,Boat Rental Service,Boat Repair Shop,Boat Storage Facility,Boat Tour Agency,Boat Trailer Dealer,Boatel,Boating Instructor,Bocce Ball Court,Body Piercing Shop,Body Shaping Class,Boiler Manufacturer,Boiler Supplier,Bonesetting House,Bonsai Plant Supplier,Book Publisher,Book Store,Bookbinder,Bookkeeping Service,Bookmaker,Books Wholesaler,Boot Camp,Boot Repair Shop,Boot Store,Border Crossing Station,Border Guard,Botanical Garden,Bottle & Can Redemption Center,Bottled Water Supplier,Bouncy Castle Hire,Boutique,Boutique Hotel,Bowling Alley,Bowling Club,Bowling Supply Shop,Box Lunch Supplier,Boxing Club,Boxing Gym,Boxing Ring,Boys’ High School,BPO Company,BPO Placement Agency,Brake Shop,Brazilian Restaurant,Breakfast Restaurant,Brewery,Brewing Supply Store,Brewpub,Brick Manufacturer,Bricklayer,Bridal Shop,Bridge,Bridge Club,British Restaurant,Brunch Restaurant,Bubble Tea,Buddhist Supplies Store,Buddhist Temple,Budget Hotel,Budget Japanese Inn,Buffet Restaurant,Buick Dealer,Building Consultant,Building Design Company,Building Equipment Hire Service,Building Firm,Building Inspector,Building Materials Market,Building Materials Store,Building Materials Supplier,Building Restoration Service,Building Society,Chartered Surveyor,Bulgarian Restaurant,Bullring,Bungee Jumping Center,Burglar Alarm Store,Burmese Restaurant,Burrito Restaurant,Bus and Coach Company,Bus Charter,Bus Company,Bus Ticket Agency,Bus Tour Agency,Business Administration Service,Business Broker,Business Center,Business Development Service,Business Hotel,Business Management Consultant,Business Networking Company,Business Park,Business School,Business to Business Service,Butane Gas Supplier,Butcher Shop,Butcher Shop Deli,Butsudan Store,Cabaret Club,Cabin Rental Agency,Cabinet Maker,Cabinet Store,Cable Company,Cadillac Dealer,Cafe,Cafeteria,Cajun Restaurant,Cake Decorating Equipment Shop,Cake Shop,Californian Restaurant,Call Center,Call Shop,Calligraphy Lesson,Calvary Chapel Church,Cambodian Restaurant,Camera Repair Shop,Camera Store,Camp,Camper Shell Supplier,Campground,Camping Farm,Camping Store,Pacific Northwest Restaurant (Canada),Canadian Restaurant,Cancer Treatment Center,Candle Store,Candy Store,Cane Furniture Store,Cannabis store,Cannery,Canoe and Kayak Club,Canoe & Kayak Rental Service,Canoe & Kayak Store,Canoe & Kayak Tour Agency,Canoeing Area,Cantabrian Restaurant,Cantonese Restaurant,Cape Verdean Restaurant,Capital,Capoeira School,Capsule Hotel,Car Accessories Store,Car Alarm Supplier,Car Battery Store,Car Dealer,Car Detailing Service,Car Factory,Car Finance and Loan Company,Car Inspection Station,Car Leasing Service,Car Manufacturer,Car Racing Track,Car Rental Agency,Car Repair and Maintenance,Car Security System Installer,Car Service,Car Sharing Location,Car Stereo Store,Car Wash,Carabinieri Police,Cardiologist,Career Guidance Service,Caribbean Restaurant,Carnival Club,Carpenter,Carpet Cleaning Service,Carpet Installer,Carpet Manufacturer,Carpet Store,Carpet Wholesaler,Carpool,Carport and Pergola Builder,Carriage Ride Service,Carvery,Cash and Carry Wholesaler,Casino,Casket Service,Castilian Restaurant,Castle,Castle Hotel,Syokudo and Teishoku Restaurant,Conveyor Belt Sushi Restaurant,Cat Hostel,Catalonian Restaurant,Catering Food and Drink Supplier,Caterer,Cathedral,Catholic Cathedral,Catholic Church,Catholic School,Cattery,Cattle Farm,Cattle Market,CBSE School,CD Store,Ceiling Supplier,Cell Phone Accessory Store,Cell Phone Store,Cement Manufacturer,Cement Supplier,Cemetery,Central American Restaurant,Central Authority,Central Bank,Ceramic Manufacturer,Ceramics Wholesaler,Certification Agency,Certified Public Accountant,Chalet,Chamber of Agriculture,Chamber of Commerce,Chamber of Handicrafts,Champon Noodle Restaurant,Chanko Restaurant,Chapel,Charcuterie,Charity,Charter School,Chartered Accountant,Check Cashing Service,Cheese Manufacturer,Cheese Shop,Cheesesteak Restaurant,Chemical Engineer,Chemical Exporter,Chemical Manufacturer,Chemical Plant,Chemical Wholesaler,Chemistry Faculty,Chemistry Lab,Chesapeake Restaurant,Chess and Card Club,Chess Club,Chess Instructor,Chevrolet Dealer,Chicken Hatchery,Chicken Restaurant,Chicken Shop,Chicken Wings Restaurant,Child Care Agency,Child Health Care Centre,Child Psychologist,Childbirth Class,Children’s Amusement Center,Children Hall,Children Policlinic,Childrens Book Store,Childrens Cafe,Children’s Clothing Store,Childrens Club,Childrens Farm,Children’s Furniture Store,Childrens Home,Children’s Hospital,Childrens Library,Children’s Museum,Childrens Party Buffet,Children’s Party Service,Childrens Store,Childrens Theater,Chilean Restaurant,Chimney Services,Chimney Sweep,Chinaware Store,Chinese Language Instructor,Chinese Language School,Chinese Medical Hospital,Chinese Medicine Clinic,Chinese Medicine Store,Chinese Noodle Restaurant,Chinese Pastry,Chinese Restaurant,Chinese Supermarket,Chinese Takeaway,Chinese Tea House,Chiropractor,Chocolate Artisan,Chocolate Cafe,Chocolate Factory,Chocolate Shop,Choir,Chophouse Restaurant,Christian Book Store,Christian Church,Christian College,Christmas Market,Christmas Store,Christmas Tree Farm,Chrysler Dealer,Church,Church of Christ,Church of Jesus Christ of Latter-day Saints,Church of the Nazarene,Church Supply Store,Churreria,Cider Bar,Cider Mill,Cigar Shop,Cinema Equipment Supplier,Circular Distribution Service,Circus,Citizen Information Bureau,Citizens Advice Bureau,City Administration,City Clerk’s Office,City Courthouse,City Department of Environment,City Department of Public Safety,City Department of Transportation,City District Office,City Employment Department,City Government Office,City or Town Hall,City Hospital,City Park,City pillar shrine,City Tax Office,Civic Center,Civil Defence,Civil Engineer,Civil Engineering Company,Civil Examinations Academy,Civil Law Attorney,Civil Police,Civil Registry,Class,Classified Ads Newspaper Publisher,Cleaners,Cleaning Products Supplier,Cleaning Service,Clergyman,Clock Repair Service,Clock Watch Maker,Closed Circuit Television,Clothes and Fabric Manufacturer,Clothes and Fabric Wholesaler,Clothes Market,Clothing Alteration Service,Clothing Store,Clothing Supplier,Clothing Wholesale Market Place,Clothing Wholesaler,Club,CNG Fittment Center,Coaching Center,Coal Exporter,Coal Supplier,Coalfield,Coast Guard Station,Coat Wholesaler,Cocktail Bar,Co-ed School,Coffee Machine Supplier,Coffee Roasters,Coffee Shop,Coffee Store,Coffee Vending Machine,Coffee Wholesaler,Coffin Supplier,Coin Dealer,Coin Operated Laundry Equipment Supplier,Coin Operated Locker,Cold Cut Store,Cold Noodle Restaurant,Cold Storage Facility,Collectibles Store,College,College of Agriculture,Colombian Restaurant,Comedy Club,Comic Book Store,Comic Cafe,Commercial Agent,Commercial Cleaning Service,Commercial Printer,Commercial Real Estate Agency,Commercial Real Estate Inspector,Commercial Refrigeration,Commercial Refrigerator Supplier,Commissioner for Oaths,Communications Central,Community Center,Community College,Community Garden,Community Health Centre,Community School,Company Registry,Computer Accessories Store,Computer Club,Computer Consultant,Computer Desk Store,Computer Hardware Manufacturer,Computer Networking Center,Computer Repair Service,Computer Security Service,Computer Service,Computer Software Store,Computer Store,Computer Support and Services,Computer Training School,Computer Wholesaler,Concert Hall,Concrete Contractor,Concrete Factory,Concrete Metal Framework Supplier,Concrete Product Supplier,Condiments Supplier,Condominium Complex,Condominium Rental Agency,Confectionery,Confectionery Wholesaler,Conference Center,Conference Hotel,Congregation,Conservation Department,Conservative Club,Conservative Synagogue,Conservatory Construction Contractor,Conservatory of Music,Conservatory Supply & Installation,Consignment Shop,Construction and Maintenance Office,Construction Company,Construction Equipment Supplier,Construction Machine Dealer,Construction Machine Rental Service,Construction Material Wholesaler,Consultant,Consumer Advice Center,Contact Lenses Supplier,Container Service,Container Supplier,Container Terminal,Containers Supplier,Contemporary Louisiana Restaurant,Continental Restaurant,Contractor,Convenience Store,Convenience Stores Organization,Convention Center,Convention Information Bureau,Conveyancer,Cookie Shop,Cooking Class,Cooking School,Cooling Plant,Copier Repair Service,Copper Supplier,Coppersmith,Copy Shop,Copying Supply Store,Corporate Campus,Corporate Entertainment Service,Corporate Gift Supplier,Corporate Office,Correctional Services Department,Cosmetic Dentist,Cosmetic Products Manufacturer,Cosmetics and Parfumes Supplier,Cosmetics Industry,Cosmetics Store,Cosmetics Wholesaler,Cosplay Cafe,Costa Rican Restaurant,Costume Jewelry Shop,Costume Rental Service,Costume Store,Cottage,Cottage Rental,Cottage Village,Cotton Exporter,Cotton Mill,Cotton Supplier,Council,Counselor,Countertop Store,Country Club,Country Food Restaurant,Country House,Country Park,County Government Office,Courier Service,Cours de Capoeira,Cours de Surf,Court Executive Officer,Court Reporter,Couscous Restaurant,Couture Store,Coworking Space,Crab House,Craft Centre,Craft Store,Cramming School,Crane Dealer,Crane Rental Agency,Crane Service,Craniosacral Therapy,Creche,Credit Counseling Service,Credit Reporting Agency,Credit Union,Cremation Service,Creole Restaurant,Crêperie,Cricket Club,Cricket Ground,Cricket Shop,Crime Victim Service,Criminal Justice Attorney,Croatian Restaurant,Crop Grower,Croquet Club,Cruise Agency,Cruise Line Company,Cruise Terminal,Crushed Stone Supplier,Cuban Restaurant,Culinary School,Cultural Association,Cultural Center,Cupcake Shop,Cured Ham Bar,Cured Ham Store,Cured Ham Warehouse,Curling Club,Curling Hall,Currency Exchange Service,Curtain and Upholstery Cleaning Service,Curtain Store,Curtain Supplier and Maker,Custom Confiscated Goods Store,Custom Home Builder,Custom Label Printer,Custom T-shirt Store,Custom Tailor,Customs Broker,Customs Consultant,Customs Department,Customs Office,Customs Warehouse,Cutlery Store,Cycling Park,Czech Restaurant,Dairy,Dairy Farm,Dairy Farm Equipment Supplier,Dairy Store,Dairy Supplier,Dan Dan Noodle Restaurant,Dance Club,Dance Company,Dance Conservatory,Dance Hall,Dance Pavillion,Dance Restaurant,Dance School,Dance Store,Danish Restaurant,Dart Bar,Dart Supply Store,Data Entry Service,Data Recovery Service,Database Management Company,Dating Service,Day Care Center,Day Spa,Deaf Church,Deaf School,Deaf Service,Debris Removal Service,Debt Collecting,Debt Collection Agency,Decal Supplier,Deck Builder,Deli,Delivery Chinese Restaurant,Delivery Service,Demolition Contractor,Jeans Shop,Dental Clinic,Dental Hygienist,Dental Implants Periodontist,Dental Insurance Agency,Dental Laboratory,Dental Radiology,Dental School,Dental Supply Store,Dentist,Denture Care Center,Department for Regional Development,Department of Education,Department of Finance,Department of Housing,Department of Motor Vehicles,Department of Public Safety,Department of Social Services,Department of Transportation,Department Store,Dept of City Treasure,Dept of State Treasure,Dermatologist,Desalination Plant,Design Agency,Design Engineer,Design Institute,Desktop Publishing Service,Sweets and Dessert Buffet,Dessert Restaurant,Dessert Shop,Detective,Detention Center,Diabetes Center,Diabetes Equipment Supplier,Diabetologist,Diagnostic Center,Dialysis Center,Diamond Buyer,Diamond Dealer,Diaper Service,Diesel Engine Dealer,Diesel Engine Repair Service,Diesel Fuel Supplier,Digital Printer,Digital Printing Service,Dim Sum Restaurant,Diner,Dinner Theater,Direct Mail Advertising,Dirt Supplier,Disability Equipment Supplier,Disability Services & Support Organisation,Disabled Sports Center,Disc Golf Course,Disciples of Christ Church,Disco Club,Discount Store,Discount Supermarket,Display Home Centre,Display Stand Manufacturer,Disposable Tableware Supplier,Distance Learning Center,Distillery,Distribution Service,District Attorney,District Council,District Government Office,District Justice,District Office,Dive Club,Dive Shop,Diving Center,Diving Contractor,Divorce Lawyer,Divorce Service,DJ Service,DJ Supply Store,Do-it-Yourself Shop,Dock Builder,Doctor,Dodge Dealer,Dog Breeder,Dog Cafe,Dog Day Care Center,Dog Hostel,Dog Park,Dog Sitter,Dog Trainer,Dog Walker,Dogsled Ride Service,Dojo Restaurant,Doll Restoration Service,Doll Store,Dollar Store,Domestic Abuse Treatment Center,Domestic Airport,Dominican Restaurant,Donations Center,Donut Shop,Door Manufacturer,Door Shop,Door Supplier,Door Warehouse,Double Glazing Installer,Down Home Cooking Restaurant,Drafting Equipment Supplier,Drafting Service,Drainage Service,Drama School,Drama Theater,Drawing Lessons,Dress and Tuxedo Rental Service,Dress Store,Dressmaker,Dried Flower Shop,Dried Seafood Store,Drilling Contractor,Drilling Equipment Supplier,Drinking Water Fountain,Drive-in Movie Theater,Driver and Vehicle Licensing Agency,Driver’s License Office,Drivers License Training School,Driveshaft Shop,Driving School,Driving Test Centre,Drug Addiction Treatment Center,Drug Testing Service,Drug Store,Drum School,Drum Store,Dry Cleaner,Dry Fruit Store,Dry Ice Supplier,Dry Wall Contractor,Dry Wall Supply Store,Ducati Dealer,Dude Ranch,Dump Truck Dealer,Dump Truck Service,Dumpling Restaurant,Dutch Restaurant,Duty Free Store,DVD Store,Dye Store,Dyeworks,Dynamometer Supplier,E Commerce Agency,E-commerce Service,Ear Piercing Service,Earth Works Company,East African Restaurant,Eastern European Restaurant,Eastern Orthodox Church,Eating Disorder Treatment Center,Eclectic Restaurant,Ecological Park,Ecologists Association,Economic Consultant,Economic Development Agency,Ecuadorian Restaurant,Education Center,Educational Consultant,Educational Institution,Educational Supply Store,Educational Testing Service,Eftpos Equipment Supplier,Egg Supplier,Egyptian Restaurant,Elder Law Attorney,Electric Motor Repair Shop,Electric Motor Store,Electric Utility Company,Electric Utility Manufacturer,Electric Vehicle Charging Station,Electrical Appliance Wholesaler,Electrical Engineer,Electrical Equipment Supplier,Electrical Installation Service,Electrical Repair Shop,Electrical Substation,Electrical Supply Store,Electrical Wholesaler,Electrician,Electrolysis Hair Removal Service,Electronic Engineer,Electronic Parts Supplier,Electronics Accessories Wholesaler,Electronics Company,Electronics Engineer,Electronics Exporter,Electronics Hire Shop,Electronics Manufacturer,Electronics Repair Shop,Electronics Store,Electronics Vending Machine,Electronics Wholesaler,Elementary School,Elevator Manufacturer,Elevator Service,Embassy,Embossing Service,Embroidery Service,Embroidery Shop,Emergency Call Booth,Emergency Care Physician,Emergency Care Service,Emergency Dental Service,Emergency Locksmith Service,Emergency Management Ministry,Emergency Room,Emergency Training,Emergency Training School,Emergency Veterinarian Service,Employment Agency,Employment Attorney,Employment Center,Employment Consultant,Employment Search Service,Endocrinologist,Endodontist,Endoscopist,Energy Equipment and Solutions,Energy Supplier,Engine Rebuilding Service,Engineer,Engineering Consultant,Engineering School,English Language Camp,English Language Instructor,English Language School,English Restaurant,Engraver,Entertainer,Entertainment Agency,Envelope Supplier,Environment Office,Environment Renewable Natural Resources,Environmental Consultant,Environmental Engineer,Environmental Health Service,Environmental Organization,Environmental Protection Organization,Episcopal Church,Equestrian Club,Equestrian Facility,Equestrian Resort,Equestrian Store,Equipment Exporter,Equipment Importer,Equipment Rental Agency,Equipment Supplier,Eritrean Restaurant,Erotic Massage,Escrow Service,Espresso Bar,Estate Appraiser,Estate Liquidator,Estate Planning Attorney,Ethiopian Restaurant,Ethnic Restaurant,Ethnographic Museum,European Institution,European Restaurant,Evangelical Church,Evening Dress Rental Service,Evening School,Event Management Company,Event Planner,Event Technology Service,Event Ticket Seller,Event Venue,Excavating Contractor,Executive Search Firm,Executive Suite Rental Agency,Executor,Exhibit,Exhibition and Trade Centre,Exhibition Planner,Exporter,Extended Stay Hotel,Eye Care Center,Fabric Product Manufacturer,Fabric Store,Fabric Wholesaler,Fabrication Engineer,Facial Spa,Factory Equipment Supplier,Faculty of Arts,Faculty of Law,Faculty of Pharmacy,Faculty of Psychology,Faculty of Science,Faculty of Sports,Fair Trade Organization,Fairground,Falafel Restaurant,Family Counselor,Family Day Care Service,Family Hotel,Family Law Attorney,Family Planning Center,Family Planning Counselor,Family Practice Physician,Family Restaurant,Family Service Center,Farm,Farm Bureau,Farm Equipment Repair Service,Farm Equipment Supplier,Farm Household Tour,Farm School,Farm Shop,Farmers’ Market,Farmstay,Fashion Accessories Store,Fashion Design School,Fashion Designer,Fast Food Restaurant,Fastener Supplier,Favela,Fax Service,Federal Agency for Technical Relief,Federal Credit Union,Federal Government Office,Federal Police,Federal Reserve Bank,Feed Manufacturer,Animal Feed Store,Felt Boots Store,Fence Contractor,Fence Supply Store,Fencing Salon,Fencing School,Feng Shui Consultant,Feng Shui Shop,Ferris wheel,Ferry Service,Fertility Clinic,Fertility Physician,Fertilizer Supplier,Festival,Festival Hall,Fiat dealer,Fiber Optic Products Supplier,Fiberglass Repair Service,Fiberglass Supplier,Figurine Shop,Filipino Restaurant,Film and Photograph Library,Film Production Company,Filtration Plant,Finance Broker,Financial Audit,Financial Consultant,Financial Institution,Financial Planner,Fine Dining Restaurant,Fingerprinting Service,Finishing Materials Supplier,Finnish Restaurant,firebaseApp Alarm Supplier,firebaseApp Damage Restoration Service,firebaseApp Department Equipment Supplier,firebaseApp Fighters Academy,firebaseApp Protection Consultant,firebaseApp Protection Equipment Supplier,firebaseApp Protection Service,firebaseApp Protection System Supplier,firebaseApp Station,firebaseApparms Academy,firebaseAppplace Manufacturer,firebaseAppplace Store,firebaseAppwood Supplier,firebaseAppworks Store,firebaseAppworks Supplier,First Aid Station,Fish & Chips Restaurant,Fish and Chips Takeaway,Fish Farm,Fish Processing,Fish Spa,Fish Store,Fishing Camp,Fishing Charter,Fishing Club,Fishing Pier,Fishing Pond,Fishing Store,Health Club,Exercise Equipment Store,Fitness Equipment Wholesaler,Fitted Furniture Supplier,Flag Store,Flamenco Dance Store,Flamenco School,Flamenco Theater,Flavours Fragrances and Aroma Supplier,Flea Market,Flight School,Floating Market,Floor Refinishing Service,Floor Sanding and Polishing Service,Flooring Contractor,Flooring Store,Floridian Restaurant,Florist,Flour Mill,Flower Delivery,Flower Designer,Flower Market,FMCG Goods Wholesaler,FMCG Manufacturer,Foam Rubber Producer,Foam Rubber Supplier,Folk High School,Fondue Restaurant,Food and Beverage Consultant,Food and Beverage Exporter,Food Bank,Food Broker,Food Court,Food Machinery Supplier,Food Manufacturer,Food Manufacturing Supply,Food Processing Company,Food Processing Equipment,Food Producer,Food Products Supplier,Food Seasoning Manufacturer,Foot Bath,Foot Care,Foot Massage Parlor,Football Club,American Football Field,Ford Dealer,Foreclosure Service,Foreign Consulate,Foreign Exchange Students Organization,Foreign Languages Program School,Foreign Trade Consultant,Foreman Builders Association,Forensic Consultant,Forestry Service,Forklift Dealer,Forklift Rental Service,Formal Wear Store,Fortress,Fortune Telling Services,Foster Care Service,Foundation,Foundry,Fountain Contractor,Foursquare Church,Fraternal Organization,Free Clinic,Free Parking Lot,Freestyle Wrestling,Freight Forwarding Service,French Language School,French Restaurant,French Steakhouse Restaurant,Fresh Food Market,Fried Chicken Takeaway,Friends Church,Frituur,Frozen Dessert Supplier,Frozen Food Manufacturer,Frozen Food Store,Frozen Yogurt Shop,Fruit and Vegetable Processing,Fruit and Vegetable Store,Fruit and Vegetable Wholesaler,Fruit Parlor,Fruit Wholesaler,Fruits Wholesaler,Fu Jian Restaurant,Fuel Supplier,Fugu Restaurant,Full Dress Rental Service,Full Gospel Church,Function Room Facility,Fund Management Company,Funeral Director,Funeral Home,Fur Coat Shop,Fur Manufacturer,Fur Service,Furnace Parts Supplier,Furnace Repair Service,Furnace Store,Furnished Apartment Building,Furniture Accessories,Furniture Accessories Supplier,Furniture Maker,Furniture Manufacturer,Furniture Rental Service,Furniture Repair Shop,Furniture Store,Furniture Wholesaler,Fusion Restaurant,Futon Store,Futsal Court,Galician Restaurant,Gambling House,Gambling Instructor,Game Store,Garage Builder,Garage Door Supplier,Garbage Collection Service,Garbage Dump,Garbage Dump Service,Garden,Garden Building Supplier,Garden Center,Garden Furniture Shop,Garden Machinery Supplier,Gardener,Garment Exporter,Gas Company,Gas Cylinders Supplier,Gas Engineer,Gas Installation Service,Gas Logs Supplier,Gas Shop,Gas Station,Gasfitter,Gasket Manufacturer,Gastroenterologist,Gastrointestinal Surgeon,Gastropub,Gay & Lesbian Organization,Gay Bar,Gay Night Club,Gay Sauna,Gazebo Builder,Gemologist,Genealogist,General Contractor,General Hospital,General Practice Attorney,General Practitioner,General Register Office,General Store,Generator Shop,Geography and History Faculty,Geological Research Company,Geological Service,Geologist,Georgian Restaurant,Geotechnical Engineer,German Language School,German Restaurant,Ghost Town,Gift Basket Store,Gift Shop,Gift Wrap Store,Girl Bar,Girls’ High School,Glass & Mirror Shop,Glass Block Supplier,Glass Blower,Glass Cutting Service,Glass Engraver,Glass Etching Service,Glass Industry,Glass Manufacturer,Glass Merchant,Glass Repair Service,Glass Shop,Glassware Manufacturer,Glassware Store,Glassware Wholesaler,Glazier,Gluten-Free Restaurant,GMC Dealer,Go-Kart Track,Gold Dealer,Gold Mining Company,Goldfish Store,Goldsmith,Golf Cart Dealer,Golf Club,Golf Course,Golf Course Builder,Golf Driving Range,Golf Instructor,Golf Resort,Gospel Church,Gourmet Grocery Store,Government College,Government Economic Program,Government Hospital,Government Office,Government School,GPS Supplier,Graduate School,Graffiti Removal Service,Grain Elevator,Grammar School,Grand Cafe,Grande Ecole,Granite Supplier,Graphic Designer,Gravel Pit,Gravel Plant,Greco Roman Wrestling,Greek Orthodox Church,Greek Restaurant,Green Energy Supplier,Greengrocer,Greenhouse,Greeting Card Shop,Greyhound Stadium,Grill Store,Grocery Delivery Service,Grocery Store,Ground Self Defense Force,Group Accommodation,Group Home,Guardia Civil,Guardia Di Finanza Police,Guatemalan Restaurant,Guest House,Gui Zhou Restaurant,Guitar Instructor,Guitar Store,Gun Club,Gun Shop,Offal Barbecue Restaurant,Gutter Cleaning Service,Gym,Gymnasium Cz,Gymnasium School,Gymnastics Center,Gymnastics Club,Obstetrician-Gynecologist,Gypsum Product Supplier,Gyro Restaurant,Haberdashery,Hair Extension Technician,Hair Extensions Supplier,Hair Removal Service,Hair Replacement Service,Hair Salon,Hair Transplantation Clinic,Haitian Restaurant,Hakka Restaurant,Halal Restaurant,Halfway House,Ham Shop,Hamburger Restaurant,Hammam,Hand Surgeon,Handbags Shop,Handball Club,Handball Court,Handicapped Transportation Service,Handicraft,Handicraft Exporter,Handicraft Fair,Handicraft Museum,Handicraft School,Handicrafts Wholesaler,Handyman,Hang Gliding Center,Hardware Store,Hardware Training Institute,Harley-Davidson Dealer,Hat Shop,Haunted House,Haute Couture Fashion House,Haute French Restaurant,Hawaiian Goods Store,Hawaiian Restaurant,Hawker Centre,Hawker Stall,Hay Supplier,Head Start Center,Health and Beauty Shop,Health Consultant,Health Food Restaurant,Health Food Store,Health Insurance Agency,Health Resort,Health Spa,Hearing Aid Repair Service,Hearing Aid Store,Heart Hospital,Heating Contractor,Heating Equipment Supplier,Heating Oil Supplier,Height Works,Helicopter Charter,Helicopter Tour Agency,Heliport,Helium Gas Supplier,Helpline,Hematologist,Herb Shop,Herbal Medicine Store,Herbalist,Heritage Building,Heritage Museum,Heritage Preservation,High Ropes Course,High School,Higher Secondary School,Highway Patrol,Hiking Area,Hindu Priest,Hindu Temple,Hip Hop Dance Class,Hispanic Church,Historical Landmark,Historical Place Museum,Historical Society,History Museum,HIV Testing Center,Hoagie Restaurant,Hobby Store,Hockey Club,Hockey Field,Hockey Rink,Hockey Supply Store,Holding Company,Holiday Accommodation Service,Holiday Apartment Rental,Holiday Home,Holiday Park,Holistic Medicine Practitioner,Home Automation Company,Home Builder,Home Cinema Installation,Home Goods Store,Home Hairdresser,Home Health Care Service,Home Help,Home Help Service Agency,Home Improvement Store,Home Inspector,Home Insurance Agency,Home Theater Store,Homekill Service,Homeless Service,Homeless Shelter,Homeopath,Homeopathic Pharmacy,Homeowners’ Association,Honda Dealer,Honduran Restaurant,Honey Farm,Hong Kong Style Fast Food Restaurant,Hookah Bar,Hookah Store,Horse Boarding Stable,Horse Breeder,Horse Rental Service,Horse Riding Field,Horse Riding School,Horse Trailer Dealer,Horse Trainer,Horseback Riding Service,Horse Transport Supplier,Horseshoe Smith,Horsestable Studfarm,Hose Supplier,Hospice,Hospital,Hospital Equipment and Supplies,Hospital Department,Hospitality and Tourism School,Hospitality High School,Host Club,Hostel,Hot Bedstone Spa,Hot Dog Restaurant,Hot Dog Stand,Hot Pot Restaurant,Hot Spring Hotel,Hot Tub Repair Service,Hot Tub Store,Hot Water System Supplier,Hotel,Hotel Management School,Hotel Supply Store,House Cleaning Service,House Clearance Service,House Sitter,House Sitter Agency,Houseboat Rental Service,Household Chemicals Supplier,Household Goods Wholesaler,Housing Association,Housing Authority,Housing Complex,Housing Cooperative,Housing Development,Housing Society,Housing Utility Company,Hua Gong Shop,Hua Hui Market Place,Hua Niao Market Place,Hub Cap Supplier,Huissier,Human Resource Consulting,Hunan Restaurant,Hungarian Restaurant,Hunting and Fishing Store,Hunting Area,Hunting Club,Hunting Preserve,Hunting Store,HVAC Contractor,Hydraulic Engineer,Hydraulic Equipment Supplier,Hydraulic Repair Service,Hydroelectric Power Plant,Hydroponics Equipment Supplier,Hygiene Articles Wholesaler,Hygiene Station,Hypermarket,Hypnotherapy Service,Hyundai Dealer,Ice Cream Equipment Supplier,Ice Cream Shop,Ice Hockey Club,Ice Skating Club,Ice Skating Instructor,Ice Skating Rink,Ice Supplier,Icelandic Restaurant,Icse School,Idol Manufacturer,Image Consultant,Imax Theater,Immigration & Naturalization Service,Immigration Attorney,Immigration Detention Centre,Immunologist,Impermeabilization Service,Import Export Company,Importer,Incense Supplier,Incineration Plant,Income Protection Insurance,Income Tax Help Association,Indian Grocery Store,Indian Muslim Restaurant,Indian Restaurant,Indonesian Restaurant,Indoor Cycling,Indoor Golf Course,Indoor Lodging,Indoor Playground,Indoor Snowcenter,Indoor Swimming Pool,Industrial Area,Industrial Chemicals Wholesaler,Industrial Consultant,Industrial Design Company,Industrial Door Supplier,Industrial Engineer,Industrial Engineers Association,Industrial Equipment Supplier,Industrial Framework Supplier,Industrial Gas Supplier,Industrial Real Estate Agency,Industrial Supermarket,Industrial Technical Engineers Association,Industrial Vacuum Equipment Supplier,Infectious Disease Physician,Infiniti Dealer,Information Bureau,Information Services,Inn,Insolvency Service,Institute of Geography and Statistics,Instrumentation Engineer,Insulation Contractor,Insulation Materials Store,Insulator Supplier,Insurance Agency,Insurance Attorney,Insurance Broker,Insurance Company,Insurance School,Intellectual Property Registry,Interior Architect Office,Interior Construction Contractor,Interior Designer,Interior Door,Interior Fitting Contractor,Interior Plant Service,Internal Medicine Ward,International Airport,International School,International Trade Consultant,Internet Cafe,Internet Marketing Service,Internet Service Provider,Internet Shop,Internist,Investment Bank,Investment Company,Investment Service,Invitation Printing Service,Irish Goods Store,Irish Pub,Irish Restaurant,Iron Steel Contractor,Iron Ware Dealer,Iron Works,Irrigation Equipment Supplier,Israeli Restaurant,Isuzu Dealer,Italian Grocery Store,Italian Restaurant,IUP,Institute of Technology,Jaguar Dealer,Jain Temple,Jamaican Restaurant,Janitorial Equipment Supplier,Janitorial Service,Authentic Japanese Restaurant,Japanese Cheap Sweets Shop,Japanese Confectionary Shop,Japanese Curry Restaurant,Japanese Delicatessen,Japanese Grocery Store,Ryotei Restaurant,Japanese Hot Pot Restaurant,Japanese Inn With Hot Spring,Japanese Inns,Izakaya Restaurant,Japanese Language Instructor,Japanese Regional Restaurant,Japanese Restaurant,Japanese Steakhouse,Japanese Sweets Restaurant,Japanized Western Restaurant,Jazz Club,Jeep Dealer,Jehovah’s Witness Kingdom Hall,Jeweler,Jewelry Appraiser,Jewelry Buyer,Jewelry Designer,Jewelry Engraver,Jewelry Equipment Supplier,Jewelry Exporter,Jewellery Manufacturer,Jewelry Repair Service,Jewelry Store,Jewish Restaurant,Jiang Su Restaurant,Joiner,Judicial Auction,Judicial Scrivener,Judo Club,Judo School,Juice Shop,Jujitsu School,Junior College,Junk Dealer,Junk Store,Junkyard,Justice Department,Jute Exporter,Jute Mill,Juvenile Detention Center,Kabaddi Club,Kaiseki Restaurant,Karaoke,Karaoke Bar,Karaoke Equipment Rental Service,Karate Club,Karate School,Kashmiri Restaurant,Kawasaki Motorcycle Dealer,Kazakhstani Restaurant,Kebab Shop,Kennel,Kerosene Supplier,Key Duplication Service,Kia Dealer,Kickboxing School,Kilt Shop and Hire,Kimono Store,Kindergarten,Kinesiologist,Kiosk,Kitchen Furniture Store,Kitchen Remodeler,Kitchen Supply Store,Kite Shop,Knife Manufacturing,Knife Store,Knit Shop,Knitting Instructor,Knitwear Manufacturer,Korean Barbecue Restaurant,Korean Beef Restaurant,Korean Church,Korean Grocery Store,Korean Restaurant,Korean Rib Restaurant,Kosher Grocery Store,Kosher Restaurant,Kung Fu School,Kushiyaki Restaurant,Kyoto Style Japanese Restaurant,Labor Relations Attorney,Labor Union,Laboratory,Laboratory Equipment Supplier,Labour Club,Ladder Supplier,Laminating Equipment Supplier,Lamination Service,Lamp Repair Service,Lamp Shade Supplier,Land Allotment,Land Planning Authority,Land Reform Institute,Land Rover Dealer,Land Surveying Office,Land Surveyor,Landscape Architect,Landscape Designer,Landscape Lighting Designer,Landscaper,Landscaping Supply Store,Language School,Laotian Restaurant,Lapidary,Laser Cutting Service,Laser Equipment Supplier,Laser Hair Removal Service,Laser Tag Center,LASIK Surgeon,Latin American Restaurant,Laundromat,Laundry,Laundry Service,Law Book Store,Law Firm,Law Library,Law School,Lawn Bowls Club,Lawn Care Service,Lawn Equipment Rental Service,Lawn Irrigation Equipment Supplier,Lawn Mower Repair Service,Lawn Mower Store,Lawn Sprinkler System Contractor,Lawyer,Lawyers Association,Leagues Club,Learner Driver Training Area,Learning Center,Leasing Service,Leather Cleaning Service,Leather Coats Store,Leather Exporter,Leather Goods Manufacturer,Leather Goods Store,Leather Goods Supplier,Leather Goods Wholesaler,Leather Repair Service,Leather Wholesaler,Lebanese Restaurant,Legal Affairs Bureau,Legal Aid Office,Legal Services,Leisure Centre,Lexus Dealer,Library,License Bureau,License Plate Frames Supplier,Lido,Life Coach,Life Insurance Agency,Light Bulb Supplier,Lighting Consultant,Lighting Contractor,Lighting Manufacturer,Lighting Store,Lighting Wholesaler,Limousine Service,Lincoln Mercury Dealer,Line Marking Service,Linens Store,Lingerie Manufacturer,Lingerie Store,Lingerie Wholesaler,Linoleum Store,Lion Dance Troupe,Liquidator,Liquor Store,Liquor Wholesaler,Literacy Program,Lithuanian Restaurant,Little League Club,Little League Field,Live Music Bar,Live Music Venue,Livery Company,Livestock Auction House,Livestock Breeder,Livestock Dealer,Livestock Producer,Loan Agency,Lobster Restaurant,Local Government Office,Local History Museum,Local Medical Services,Locks Supplier,Locksmith,Lodge,Lodging,Log Cabins,Log Home Builder,Logging Contractor,Logistics Service,Loss Adjuster,Lost Property Office,Lottery Retailer,Lottery Shop,Lounge,Love Hotel,Low Emission Zone,Low Income Housing Program,LPG Conversion,Luggage Repair Service,Luggage Store,Luggage Wholesaler,Lumber Store,Lunch Restaurant,Lutheran Church,Luxury Hotel,Lyceum,Lymph Drainage Therapist,Machine Construction,Machine Knife Supplier,Machine Maintenance,Machine Repair Service,Machine Shop,Machine Workshop,Machinery Parts Manufacturer,Machining Manufacturer,Macrobiotic Restaurant,Madrilian Restaurant,Magazine Publisher,Magazine Store,Magic Store,Magician,Mah Jong House,Mailbox Rental Service,Mailbox Supplier,Mailing Machine Supplier,Mailing Service,Main Customs Office,Make-up Artist,Malaysian Restaurant,Male Hospital,Maltese Restaurant,Mammography Service,Management School,Mandarin Restaurant,Manor House,Manufactured Home Transporter,Manufacturer,Maori Organization,Map Store,Mapping Service,Marae,Marble Contractor,Marble Supplier,Marche Restaurant,Marina,Marine Engineer,Marine Self Defense Force,Marine Supply Store,Marine Surveyor,Maritime Museum,Market,Market Operator,Market Researcher,Marketing Agency,Marketing Consultant,Markmens Clubhouse,Marquee Hire Service,Marriage Celebrant,Marriage Counselor,Marriage License Bureau,Martial Arts Club,Martial Arts School,Martial Arts Supply Store,Masonic Center,Masonry Contractor,Masonry Supply Store,Massage School,Massage Spa,Massage Supply Store,Massage Therapist,Match Box Manufacturer,Material Handling Equipment Supplier,Maternity Hospital,Maternity Store,Mathematics School,Mattress Store,Mausoleum Builder,Mazda Dealer,Meal Delivery,Meal Takeaway,Measuring Instruments Supplier,Meat Packer,Meat Processor,Meat Products,Meat Dish Restaurant,Meat Wholesaler,Mechanic,Mechanical Contractor,Mechanical Engineer,Mechanical Plant,Media and Information Sciences Faculty,Media Company,Media Consultant,Media House,Mediation Service,Medical Billing Service,Medical Book Store,Medical Center,Medical Certificate Service,Medical Clinic,Medical Diagnostic Imaging Center,Medical Equipment Manufacturer,Medical Equipment Supplier,Medical Examiner,Medical Group,Medical Laboratory,Medical Office,Medical School,Medical Spa,Medical Supply Store,Medical Technology Manufacturer,Medical Transcription Service,Medicine Exporter,Meditation Center,Meditation Instructor,Mediterranean Restaurant,Meeting Planning Service,Mehandi Class,Mehndi Designer,Memorial Estate,Memorial Park,Mennonite Church,Men’s Clothing Store,Mens Tailor,Mental Health Clinic,Mental Health Service,Mercantile Development,Mercedes Benz Dealer,Messianic Synagogue,Metal Construction Company,Metal Detecting Equipment Supplier,Metal Fabricator,Metal Finisher,Metal Heat Treating Service,Metal Industry Suppliers,Metal Machinery Supplier,Metal Polishing Service,Metal Processing Company,Metal Stamping Service,Metal Supplier,Metal Working Shop,Metal Workshop,Metallurgy Company,Metalware Dealer,Metalware Producer,Metaphysical Supply Store,Methodist Church,Metropolitan Train Company,Mexican Goods Store,Mexican Grocery Store,Mexican Restaurant,Mfr,Microbiologist,Microwave Oven Repair Service,Mid-Atlantic Restaurant (US),Middle Eastern Restaurant,Middle School,Midwife,Militar Archive,Militar Residence,Military Barracks,Military Base,Military Board,Military Cemetery,Military Hospital,Military Recruiting Office,Military School,Military Town,Milk Delivery Service,Mill,Millwork Shop,Mine,Mineral Water Company,Mineral Water Wholesale,Miniature Golf Course,Miniatures Store,Minibus Taxi Service,Mining Company,Mining Consultant,Mining Engineer,Mining Equipment,Ministry of Education,Mirror Shop,Miso Cutlet Restaurant,Missing Persons Organization,Mission,Mitsubishi Dealer,Mobile Caterer,Mobile Disco,Mobile Hairdresser,Mobile Home Dealer,Mobile Home Park,Mobile Home Rental Agency,Mobile Home Supply Store,Mobile Money Agent,Mobile Network Operator,Mobile Phone Repair Shop,Mobility Equipment Supplier,Model Car Play Area,Model Design Company,Model Portfolio Studio,Model Train Store,Modeling Agency,Modeling School,Modern Art Museum,Modern British Restaurant,Modern European Restaurant,Modern French Restaurant,Modular Home Builder,Modular Home Dealer,Mold Maker,Molding Supplier,Monastery,Money Order Service,Money Transfer Service,Mongolian Barbecue Restaurant,Monjayaki Restaurant,Monogramming Service,Montessori School,Monument Maker,Moped Dealer,Moravian Church,Modern Izakaya Restaurants,Moroccan Restaurant,Mortgage Broker,Mortgage Lender,Mortuary,Mosque,Motel,Motor Scooter Dealer,Motor Scooter Repair Shop,Motor Vehicle Dealer,Motorcycle Dealer,Motorcycle Driving School,Motorcycle Insurance Agency,Motorcycle Parts Store,Motorcycle Rental Agency,Motorcycle Repair Shop,Motorcycle Shop,Motoring Club,Motorsports Store,Mountain Cable Car,Mountain Cabin,Mountaineering Class,Movie Rental Kiosk,Movie Rental Store,Movie Studio,Movie Theater,Moving and Storage Service,Moving Company,Moving Supply Store,MRI Center,Muay Thai Boxing Gym,Muffler Shop,Mulch Supplier,Multimedia and Electronic Book Publisher,Municipal Administration Office,Municipal Corporation,Municipal Department Agricultural Development,Municipal Department Agriculture Food Supply,Municipal Department Civil Defense,Municipal Department Communication,Municipal Department Finance,Municipal Department Housing and Urban Development,Municipal Department of Culture,Municipal Department of Sports,Municipal Department of Tourism,Municipal Department Science Technology,Municipal Department Social Defense,Municipal Guard,Municipal Health Department,Municipal Office Education,Municipal Social Development,Museum,Museum of Space History,Museum of Zoology,Music Box Store,Music College,Music Conservatory,Music Instructor,Music Management and Promotion,Music Producer,Music Publisher,Music School,Music Store,Musical Club,Musical Instrument Manufacturer,Musical Instrument Rental Service,Musical Instrument Repair Shop,Musical Instrument Store,Musician,Musician and Composer,Mutton Barbecue Restaurant,Nail Salon,Nanny,Nanotechnology Engineer,National Forest,National Health Foundation,National Library,National Museum,National Park,National Reserve,Native American Goods Store,Native American Restaurant,Natural Foods Store,Natural Gas Supplier,Natural History Museum,Natural Stone Exporter,Natural Stone Supplier,Natural Stone Wholesaler,Nature Preserve,Naturopathic Practitioner,Naval Base,Navarraise Restaurant,Neapolitan Restaurant,Needlework Shop,Neon Sign Shop,Neonatal Physician,Nepalese Restaurant,Nephrologist,Netball Club,Neurologist,Neurosurgeon,New Age Church,New England Restaurant,New American Restaurant,New Years Tree Market,New Zealand Restaurant,News Service,Newspaper Advertising Department,Newspaper Distribution,Newspaper Publisher,Newsstand,Nicaraguan Restaurant,Night Club,Night Market,Nissan Dealer,Non-Denominational Church,Non-Governmental Organization,Non-Profit Organization,Non Smoking Holiday Home,Noodle Shop,North African Restaurant,Northern Italian Restaurant,Norwegian Restaurant,Notaries Association,Notary Public,Notions Store,Novelties Wholesaler,Novelty Store,Nuclear Engineer,Nuclear Power Company,Nuclear Power Plant,Nudist Club,Nudist Park,Nuevo Latino Restaurant,Numerologist,Convent,Nursery School,Nursing Agency,Nursing Association,Nursing Home,Nursing School,Nut Store,Nutritionist,Nyonya Restaurant,Obanzai Restaurant,Observation Deck,Observatory,Women’s Health Clinic,Occupational Health Service,Occupational Medical Physician,Occupational Safety and Health,Occupational Therapist,Oden Restaurant,Off-road Race Track,Off Roading Area,Off Track Betting Shop,Offal Pot Cooking Restaurant,Office Accessories Wholesaler,Office Equipment Rental Service,Office Equipment Repair Service,Office Equipment Supplier,Office Furniture Store,Office of Vital Records,Office Refurbishment Service,Office Space Rental Agency,Office Supply Store,Office Supply Wholesaler,Oil and Gas Exploration Service,Oil Change Service,Oil & Natural Gas Company,Oil Field Equipment Supplier,Oil Refinery,Oil Store,Oil Wholesaler,Oilfield,Okonomiyaki Restaurant,Oldsmobile Dealer,Olive Oil Bottling Company,Olive Oil Cooperative,Olive Oil Manufacturer,Oncologist,Opel dealer,Open Air Museum,Open University,Opera Company,Opera House,Ophthalmologist,Ophthalmology Clinic,Optical Products Manufacturer,Optical Wholesaler,Optician,Optometrist,Oral Surgeon,Orchard,Orchestra,Orchid Farm,Orchid Grower,Organ Donation and Tissue Bank,Organic Drug Store,Organic Farm,Organic Food Store,Organic Restaurant,Organic Shop,Oriental Art Museum,Oriental Goods Store,Oriental Medicine Clinic,Oriental Medicine Store,Oriental Rug Store,Orphan Asylum,Orphanage,Orthodontist,Orthodox Church,Orthodox Synagogue,Orthopedic Clinic,Orthopedic Shoe Store,Orthopedic Surgeon,Orthoptist,Orthotics & Prosthetics Service,Osteopath,Otolaryngologist,Otolaryngology Clinic,Otolaryngology Hospital,Outboard Motor Store,Outdoor Activity Organiser,Outdoor Bath,Outdoor Clothing and Equipment Shop,Outdoor Equestrian Facility,Outdoor Furniture Store,Outdoor movie theater,Outdoor Sports Store,Outdoor Swimming Pool,Outerwear Store,Outlet Mall,Outlet Store,Oxygen Cocktail Spot,Oxygen Equipment Supplier,Oyster Bar Restaurant,Oyster Supplier,Pachinko Parlor,Pacific Rim Restaurant,Packaging Company,Packaging Machinery,Packaging Supply Store,Padel Club,Padel Court,Pagoda,Pain Control Clinic,Pain Management Physician,Paint Manufacturer,Paint Store,Paint Stripping Company,Paintball Center,Paintball Store,Painter,Painting,Painting Lessons,Painting Studio,Paintings Store,Pakistani Restaurant,Pallet Supplier,Pan-Asian Restaurant,Pan-Latin Restaurant,Pancake Restaurant,Paper Bag Supplier,Paper Distributor,Paper Exporter,Paper Mill,Paper Shredding Machine Supplier,Paper Store,Paraguayan Restaurant,Paralegal Services Provider,Parasailing Ride Service,Parish,Park,Park & Ride,Parking Garage,Parking Lot,Parking Lot for Bicycles,Parking Lot for Motorcycles,Parkour Spot,Parochial School,Parsi Temple,Part Time Daycare,Party Equipment Rental Service,Party Planner,Party Store,Passport Agent,Passport Office,Passport Photo Processor,Pasta Shop,Pastry Shop,Patent Attorney,Patent Office,Paternity Testing Service,Pathologist,Patients Support Association,Patio Enclosure Supplier,Patisserie,Paving Contractor,Paving Materials Supplier,Pawn Shop,Payphone,Payroll Service,Public Call Office Booth,Pedestrian Zone,Pediatric Cardiologist,Pediatric Dentist,Pediatric Ophthalmologist,Pediatrician,Pen Store,Pennsylvania Dutch Restaurant,Pension Office,Pentecostal Church,People S House,Performing Arts Group,Performing Arts Theater,Perfume Store,Perinatal Center,Periodontist,Permanent Make-up Clinic,Persian Restaurant,Personal Injury Attorney,Personal Trainer,Peruvian Restaurant,Pest Control Service,Pet Adoption Service,Pet Boarding Service,Pet Cemetery,Pet Friendly Accommodation,Pet Funeral Service,Pet Groomer,Pet Moving Service,Pet Sitter,Pet Store,Pet Supply Store,Pet Trainer,Petrochemical Engineer,Petroleum Products Company,Pharmaceutical Company,Pharmaceutical Lab,Pharmaceutical Products Wholesaler,Pharmacy,Philharmonic Hall,Pho Restaurant,Phone Repair Service,Photo Agency,Photo Lab,Photo Restoration Service,Photo Shop,Photocopiers Supplier,Photographer,Photography Class,Photography School,Photography Service,Photography Studio,Physiatrist,Physical Examination Center,Physical Fitness Program,Physician Referral Service,Physical Therapist,Physical Therapy Clinic,Physiotherapy Equip Supplier,Piano Bar,Piano Instructor,Piano Maker,Piano Moving Service,Piano Repair Service,Piano Store,Piano Tuning Service,Pick Your Own Farm Produce,Picnic Ground,Picture Frame Renovating and Restoring Service,Picture Frame Shop,Pie Shop,Pilates Studio,Pile Driver,Pilgrimage Place,Pinatas Supplier,Pinball Machine Supplier,Pine Furniture Shop,Pipe Supplier,Piste Vtt,Pizza Delivery,Pizza Restaurant,Pizza Takeaway,Place of Worship,Planetarium,Plant and Machinery Hire,Plant Nursery,Plast Window Store,Plasterer,Plastic Bag Supplier,Plastic Bags Wholesaler,Plastic Fabrication Company,Plastic Injection Molding Service,Plastic Products Supplier,Plastic Resin Manufacturer,Plastic Surgeon,Plastic Surgery Clinic,Plastic Wholesaler,Plating Service,Play School,Playground,Playground Equipment Supplier,Playgroup,Plumber,Plumbing Supply Store,Plus Size Clothing Store,Plywood Supplier,Pneumatic Tools Supplier,Po’ Boys Restaurant,Podiatrist,Police Academy,Police Supply Store,Polish Restaurant,Political Party,Polo Club,Polygraph Service,Polymer Supplier,Polynesian Restaurant,Polytechnic,Polythene and Plastic Sheeting Supplier,Pond Contractor,Pond Fish Supplier,Pond Supply Store,Pontiac Dealer,Pony Club,Pony Ride Service,Pool Academy,Pool Billard Club,Pool Cleaning Service,Pool Hall,Popcorn Store,Katsudon Restaurant,Porridge Restaurant,Porsche Dealer,Port Authority,Port Operating Company,Portable Building Manufacturer,Portable Toilet Supplier,Portrait Studio,Portuguese Restaurant,Post Office,Poster Store,Pottery Classes,Pottery Manufacturer,Pottery Store,Poultry Farm,Poultry Store,Powder Coating Service,Power Station,Power Plant Consultant,Power Plant Equipment Supplier,Prawn Fishing,Pre Gymnasium School,Precision Engineer,Prefabricated House Companies,Prefecture,Japanese Prefecture Government Office,Pregnancy Care Center,Preparatory School,Presbyterian Church,Preschool,Press Advisory,Pressure Washing Service,Pretzel Store,Priest,Primary School,Print Shop,Printed Music Publisher,Printer Ink Refill Store,Printer Repair Service,Printing Equipment and Supplies,Printing Equipment Supplier,Prison,Private College,Private Equity Firm,Private Golf Course,Homestay,Private Hospital,Private Investigator,Private School,Private Sector Bank,Private Tutor,Private University,Probation Office,Process Server,Proctologist,Produce Market,Produce Wholesaler,Producteur de Champagne,Producteur de Foie Gras,Producteur Eau Minerale,Professional and Hobby Associations,Professional Organizer,Promenade,Promotional Products Supplier,Propane Supplier,Propeller Shop,Property Administrator,Property Investment,Property Maintenance,Property Management Company,Land Registry Office,Prosthetics,Protective Clothing Supplier,Protestant Church,Provence Restaurant,Provincial Council,Psychiatric Hospital,Psychiatrist,Psychic,Psychoanalyst,Psychologist,Psychoneurological Specialized Clinic,Psychopedagogy Clinic,Psychosomatic Medical Practitioner,Psychotherapist,Pub,Public Amenity House,Public Bath,Public Bathroom,Public Defender’s Office,Public Female Bathroom,Public Golf Course,Public Health Department,Public Housing,Public Library,Public Male Bathroom,Public Medical Center,Public Parking Space,Public Prosecutors Office,Public Relations Firm,Public Safety Office,Public Sauna,Public School,Public Sector Bank,Public Swimming Pool,Public University,Public Webcam,Public Wheelchair-Accessible Bathroom,Public Works Department,Publisher,Puerto Rican Restaurant,Pulmonologist,Pump Supplier,Pumping Equipment and Service,Pumpkin Patch,Punjabi Restaurant,Puppet Theater,PVC Industry,PVC Windows Supplier,Qing Fang Market Place,Quad Rental Service,Quaker Church,Quantity Surveyor,Quarry,Québécois Restaurant,Quilt Shop,Race Car Dealer,Racecourse,Racing Car Parts Store,Raclette Restaurant,Racquetball Club,Radiator Repair Service,Radiator Shop,Radio Broadcaster,Radiologist,Raft Trip Outfitter,Rafting,Rail Museum,Railing Contractor,Railroad Company,Railroad Contractor,Railroad Equipment Supplier,Railroad Ties Supplier,Railway Services,Rainwater Tank Supplier,Ramen Restaurant,Ranch,Rare Book Store,Raw Food Restaurant,Ready Mix Concrete Supplier,Real Estate Agency,Real Estate Agents,Real Estate Appraiser,Real Estate Attorney,Real Estate Auctioneer,Real Estate Consultant,Real Estate Developer,Real Estate Fair,Real Estate Rental Agency,Real Estate School,Real Estate Surveyor,Reclamation Centre,Record Company,Records Storage Facility,Record Store,Recording Studio,Recreation Center,Recruiter,Rectory,Recycling Center,Reenactment Site,Reflexologist,Reform Synagogue,Reformed Church,Refrigerated Transport Service,Refrigerator Repair Service,Refrigerator Store,Refugee Camp,Regional Airport,Regional Council,Regional Government Office,Registered General Nurse,Registration Chamber,Registration Office,Registry Office,Rehabilitation Center,Reiki Therapist,Religious Book Store,Religious Destination,Religious Goods Store,Religious Institution,Religious Organization,Religious School,Religious Seminary,Remodeler,Renault dealer,Renter’s Insurance Agency,Repair Service,Reproductive Health Clinic,Reptile Store,Research and Product Development,Research Engineer,Research Foundation,Research Institute,Resident Registration Office,Residential College,Residents Association,Resort,Rest Stop,Restaurant,Brasserie,Restaurant Supply Store,Resume Service,Retail Space Rental Agency,Retaining Wall Supplier,Retirement Community,Retirement Home,Retreat Center,Rheumatologist,Rice Cracker Shop,Rice Mill,Rice Restaurant,Rice Shop,Rice Wholesaler,River Port,Road Construction Company,Road Construction Machine Repair Service,Road Cycling,Road Safety Town,Roads Ports and Canals Engineers Association,Rock Climbing,Rock Climbing Gym,Rock Climbing Instructor,Rock Landscaping Contractor,Rock Music Club,Rock Shop,Rodeo,Rolled Metal Products Supplier,Roller Coaster,Roller Skating Club,Roller Skating Rink,Roman Restaurant,Romanian Restaurant,Roofing Contractor,Roofing Supply Store,Roommate Referral Service,Rowing Area,Rowing Club,Rsl Club,Rubber Products Supplier,Rubber Stamp Store,Rug Store,Rugby,Rugby Club,Rugby Field,Rugby League Club,Rugby Store,Running Store,Russian Orthodox Church,Russian Restaurant,Rustic Furniture Store,RV Dealer,RV Park,Recreational Vehicle Rental Agency,RV Repair Shop,RV Storage Facility,RV Supply Store,Saab Dealer,Sacem,Saddlery,Safe & Vault Shop,Safety Equipment Supplier,Sailing Club,Sailing Event Area,Sailing School,Sailmaker,Sake Brewery,Salad Shop,Salsa Bar,Salsa Classes,Salvadoran Restaurant,Salvage Dealer,Salvage Yard,Samba School,Sambo School,Sambodrome,Sand & Gravel Supplier,Sand Plant,Sandblasting Service,Sandwich Shop,Sanitary Inspection,Sanitation Service,Satellite Communication Service,Saturn Dealer,Sauna,Sauna Club,Sauna Store,Savings Bank,Saw Mill,Saw Sharpening Service,Scaffolder,Scaffolding Rental Service,Scale Model Club,Model Shop,Scale Repair Service,Scale Supplier,Scandinavian Restaurant,Scenic Spot,School,School Administrator,School Bus Service,School Center,School District Office,School For The Deaf,School House,School Lunch Center,School Supply Store,School Youth Hostel,Science Academy,Science Museum,Scientific Equipment Supplier,Scooter Rental Service,Scooter Repair Shop,Scout Hall,Scout Home,Scouting,Scrap Metal Dealer,Scrapbooking Store,Screen Printer,Screen Printing Shop,Screen Printing Supply Store,Screen Repair Service,Screen Store,Screw Supplier,SCUBA Instructor,SCUBA Tour Agency,Sculptor,Sculpture,Sculpture Museum,Seafood Donburi Restaurant,Seafood Farm,Seafood Market,Seafood Restaurant,Seafood Wholesaler,Seal Shop,Seaplane Base,Seasonal Goods Store,Second Hand Store,Secondary School Three,Security Guard Service,Security Service,Security System Installer,Security System Supplier,Seed Supplier,Seitai,Self-Catering Accommodation,Self Defense School,Self Service Car Wash,Self Service Restaurant,Self-Storage Facility,Semi Conductor Supplier,Seminary,Senior Citizen Center,Aged Care,Senior High School,Septic System Service,Serbian Restaurant,Serviced Accommodation,Seventh-day Adventist Church,Sewage Disposal Service,Sewage Treatment Plant,Sewing Company,Sewing Machine Repair Service,Sewing Machine Store,Sewing Shop,Sexologist,Seychelles Restaurant,Sukiyaki and Shabu Shabu Restaurant,Shabu-shabu Restaurant,Shan Dong Restaurant,Shanghainese Restaurant,Sharpening Service,Shed Builder,Sheep Shearer,Sheepskin and Wool Products Supplier,Sheepskin Coat Store,Sheet Metal Contractor,Sheet Music Store,Shelter,Sheltered Housing,Shelving Store,Sheriff’s Department,Shinkin Bank,Shinto Shrine,Ship Building,Shipbuilding and Repair Company,Shipping and Mailing Service,Shipping Company,Shipping Equipment Industry,Shipping Service,Shipyard,Shochu Brewery,Shoe Factory,Shoe Repair Shop,Shoe Shining Service,Shoe Store,Footwear Wholesaler,Shogi Lesson,Shooting Event Area,Shooting Range,Shop Supermarket Furniture Store,Shopfitter,Shopping Mall,Short Term Apartment Rental Agency,Shower Door Shop,Shower Door Supplier,Shredding Service,Shrimp Farm,Shrine,Sichuan Restaurant,Sicilian Restaurant,Siding Contractor,Sightseeing Tour Agency,Sign Shop,Gurudwara,Silk Plant Shop,Silk Store,Silversmith,Singaporean Restaurant,Singing Telegram Service,Single Sex Secondary School,Singles Organization,Sixth Form College,Skate Sharpening Service,Skate Shop,Skateboard Park,Skateboard Shop,Skating Instructor,Skeet Shooting Range,Kushiage and Kushikatsu Restaurant,Ski Club,Ski Rental Service,Ski Repair Service,Ski Resort,Ski School,Ski Shop,Skin Care Clinic,Skin Care Products Vending Machine,Skittle Alley,Skittle Club,Skydiving Center,Skylight Contractor,Slaughterhouse,Sleep Clinic,Small Appliance Repair Service,Small Claims Assistance Service,Small Engine Repair Service,Small Plates Restaurant,Smart Shop,Smog Inspection Station,Snack Bar,Snow Removal Service,Snowboard Rental Service,Snowboard Shop,Snowmobile Dealer,Snowmobile Rental Service,Soapland,Soba Noodle Shop,Soccer Club,Soccer Field,Soccer Practice,Soccer Store,Social Club,Social Security Attorney,Social Security Financial Department,Social Security Office,Social Services Organization,Social Welfare Center,Social Worker,Societe de Flocage,Sod Supplier,Sofa Store,Soft Drinks Shop,Suppon Restaurant,Softball Club,Softball Field,Software Company,Software Training Institute,Soil Testing Service,Sokol House,Solar Energy Company,Solar Energy Contractor,Solar Energy Equipment Supplier,Solar Hot Water System Supplier,Solar Photovoltaic Power Plant,Solid Fuel Company,Solid Waste Engineer,Soul Food Restaurant,Soup Kitchen,Soup Restaurant,Soup Shop,South African Restaurant,South American Restaurant,South Asian Restaurant,Southeast Asian Restaurant,Southern Italian Restaurant,Southern Restaurant (US),Southwest France Restaurant,Southwestern Restaurant (US),Souvenir Manufacturer,Souvenir Store,Soy Sauce Maker,Spa,Spa and Health Club,Spa Garden,Spa Resort,Spa Town,Spanish Language School,Spanish Restaurant,Special Education School,Specialist Hospital,Specialized Clinic,Specialized hospital,Speech Pathologist,Sperm Bank,Spice Store,Spices Exporter,Spices Wholesalers,Spiritist Center,Sport Tour Agency,Sporting Goods Store,Sports Accessories Wholesaler,Sports Bar,Sports Card Store,Sports Club,Sports Complex,Sports Equipment Rental Service,Sports Massage Therapist,Sports Medicine Clinic,Sports Medicine Physician,Sports Memorabilia Store,Sports Nutrition Store,Sports School,Sportswear Store,Sportwear Manufacturer,Spring Supplier,Squash Club,Squash Court,Sri Lankan Restaurant,Stable,Stadium,Stage,Stage Lighting Equipment Supplier,Stained Glass Studio,Stainless Steel Plant,Stair Contractor,Stall Installation Service,Stamp Collectors Club,Stamp Shop,Stand Bar,Staple Food Package,State,State Archive,State Department Agricultural Development,State Department Agriculture Food Supply,State Department Civil Defense,State Department Communication,State Department Finance,State Department for Social Development,State Department Housing and Urban Development,State Department of Environment,State Department of Tourism,State Department of Transportation,State Department Science Technology,State Department Social Defense,State Dept of Culture,State Dept of Sports,State Employment Department,State Government Office,State Liquor Store,State Office of Education,State Owned Farm,State Park,State Police,State Social Development,Stationery Manufacturer,Stationery Store,Stationery Wholesaler,Statuary,Std Clinic,STD Testing Service,Steak House,Steamboat Restaurant,Steamed Bun Shop,Steel Construction Company,Steel Distributor,Steel Drum Supplier,Steel Erector,Steel Fabricator,Steel Framework Contractor,Steelwork Design Company,Steelwork Manufacturer,Stereo Rental Store,Stereo Repair Service,Home Audio Store,Sticker Manufacturer,Stitching Class,Stock Broker,Stock Exchange Building,Stone Carving,Stone Cutter,Stone Supplier,Storage Facility,Store,Store Equipment Supplier,Stove Builder,Stringed instrument maker,Structural Engineer,Stucco Contractor,Student Career Counseling Office,Student Dormitory,Student Housing Center,Student Union,Students Parents Association,Students Support Association,Study at Home School,Studying Center,Stylist,Subaru Dealer,Suburban Train Line,Sugar Factory,Sugar Shack,Sukiyaki Restaurant,Summer Camp,Summer Toboggan Run,Sundae Restaurant,Sunglasses Store,Sunroom Contractor,Super Public Bath,Superannuation Consultant,Superfund Site,Supermarket,Surf Lifesaving Club,Surf School,Surf Shop,Surgeon,Surgical Center,Surgical Products Wholesaler,Surgical Supply Store,Surinamese Restaurant,Surplus Store,Surveyor,Sushi Restaurant,Suzuki Dealer,Suzuki Motorcycle Dealer,Swedish Restaurant,Swim Club,Swimming Basin,Swimming Competition,Swimming Facility,Swimming Instructor,Swimming Lake,Swimming Pool,Swimming Pool Contractor,Swimming Pool Repair Service,Swimming Pool Supply Store,Swimming School,Swimwear Store,Swiss Restaurant,Synagogue,Synchronized Swimming,Syrian Restaurant,T-shirt Company,T-shirt Store,Table & Chair Rental Service,Table Tennis Club,Table Tennis Facility,Table Tennis Supply Store,Tack Shop,Taco Restaurant,Tae Kwon Do Comp Area,Taekwondo School,Tag Agency,Tai Chi School,Tailor,Taiwanese Restaurant,Takoyaki Restaurant,Talent Agency,Tamale Shop,Tannery,Tanning Salon,Taoist Temple,Tapas Bar,Tapas Restaurant,Tatami Store,Tattoo and Piercing Shop,Tattoo Removal Service,Tattoo Shop,Tax Assessor,Tax Attorney,Tax Collector’s Office,Tax Consultant,Tax Department,Tax Preparation,Tax Preparation Service,Taxi Service,Taxi Stand,Taxidermist,Tb Clinic,Tea Exporter,Tea House,Tea Manufacturer,Tea Market Place,Tea Store,Tea Wholesaler,Teacher College,Technical School,Technical Service,Technical University,Technology Museum,Technology Park,Teeth Whitening Service,Telecommunication School,Telecommunications Contractor,Telecommunications Engineer,Telecommunications Equipment Supplier,Telecommunications Service Provider,Telemarketing Service,Telephone Answering Service,Telephone Company,Telephone Exchange,Telescope Store,Television Repair Service,Television Station,Temp Agency,Tempura Donburi Restaurant,Tempura Restaurant,Tenant Ownership,Tenant’s Union,Tennis Club,Tennis Court,Tennis Court Construction Company,Tennis Instructor,Tennis Store,Tent Rental Service,Teppanyaki Restaurant,Tex-Mex Restaurant,Textile Engineer,Textile Exporter,Textile Mill,Thai Massage Therapist,Thai Restaurant,Theater Company,Theater Production,Theater Supply Store,Theatrical Costume Supplier,Theme Park,Thermal Baths,Thermal Energy Company,Thread Supplier,Threads and Yarns Wholesaler,Thrift Store,Tile Contractor,Tile Manufacturer,Tile Store,Time and Temperature Announcement Service,Timeshare Agency,Tyre Manufacturer,Tire Shop,Title Company,Tobacco Exporter,Tobacco Shop,Tobacco Supplier,Tofu Restaurant,Tofu Shop,Toiletries Store,Toll Road Rest Stop,Toll Booth,Toner Cartridge Supplier,Tongue Restaurant,Tonkatsu Restaurant,Tool & Die Shop,Tool Grinding Service,Tool Manufacturer,Tool Rental Service,Tool Repair Shop,Tool Store,Tool Wholesaler,Toolroom,Topography Company,Topsoil Supplier,Tour Agency,Tour Operator,Tourist Attraction,Tourist Information Center,Tower Communication Service,Towing Equipment Provider,Towing Service,Townhouse Complex,Toy and Game Manufacturer,Toy Library,Toy Manufacturer,Toy Museum,Toy Store,Toyota Dealer,Tractor Dealer,Tractor Equipment Supplier,Tractor Repair Shop,Trade Fair Construction Company,Trade School,Trading Card Store,Traditional Costume Club,Traditional Kostume Store,Traditional Market,Traditional Restaurant,Traditional Teahouse,Traditional American Restaurant,Traffic Officer,Traffic Police Station,Trailer Dealer,Trailer Hitch Supplier,Trailer Manufacturer,Trailer Rental Service,Trailer Repair Shop,Trailer Supply Store,Train Repairing Center,Train Ticket Agency,Train Ticket Counter,Train yard,Training Centre,Training School,Transcription Service,Translator,Transmission Shop,Transportation Escort Service,Transportation Service,Travel Agency,Travel Clinic,Travellers Lodge,Tree Farm,Tree Service,Trial Attorney,Tribal Headquarters,Trinity Church,Triumph Motorcycle Dealer,Trophy Shop,Tropical Fish Store,Truck Accessories Store,Truck Dealer,Truck Farmer,Truck Parts Supplier,Truck Rental Agency,Truck Repair Shop,Truck Stop,Truck Topper Supplier,Truck Wash,Trucking Company,Trucking School,Truss Manufacturer,Trust Bank,Tsukigime Parking Lot,Tune Up Supplier,Tuning Automobile,Tunisian Restaurant,Turf Supplier,Turkish Restaurant,Turkmen Restaurant,Turnery,Tuscan Restaurant,Tutoring Service,Tuxedo Shop,Typewriter Repair Service,Typewriter Supplier,Typing Service,Udon Noodle Restaurant,Ukrainian Restaurant,Unagi Restaurant,Underwear Store,Unemployment Insurance Consultant,Unemployment Office,Unfinished Furniture Store,Uniform Store,Hairdresser,Unitarian Universalist Church,United Church of Canada,United Church of Christ,United Methodist Church,United States Armed Forces Base,Unity Church,University,University Department,University Hospital,University Library,Upholstery Cleaning Service,Upholstery Shop,Urban Planning Department,Urgent care center,Urologist,Urology Clinic,Uruguayan Restaurant,Pacific Northwest Restaurant (US),Used Appliance Store,Used Auto Parts Store,Used Bicycle Shop,Used Book Store,Used Car Dealer,Used CD Store,Used Clothing Store,Used Computer Store,Used Furniture Store,Used Game Store,Used Motorcycle Dealer,Used Musical Instrument Store,Used Office Furniture Store,Used Store Fixture Supplier,Used Tire Shop,Used Truck Dealer,Utility Contractor,Utility Trailer Dealer,Uzbeki Restaurant,Holiday Apartment,Vacation Home Rental Agency,Vacuum Cleaner Repair Shop,Vacuum Cleaner Store,Vacuum Cleaning System Supplier,Valencian Restaurant,Valet Parking Service,Van Rental Agency,Vaporizer Store,Variety Store,Vascular Surgeon,Vastu Consultant,VCR Repair Service,Vegan Restaurant,Vegetable Wholesale Market,Vegetable Wholesaler,Vegetarian Cafe and Deli,Vegetarian Restaurant,Vehicle Examination Office,Vehicle Exporter,Vehicle Inspection,Vehicle Shipping Agent,Velodrome,Vending Machine Supplier,Venereologist,Venetian Restaurant,Venezuelan Restaurant,Ventilating Equipment Manufacturer,Venture Capital Company,Veterans Affairs Department,Veterans Center,Veterans Hospital,Veterans Organization,Veterinarian,Veterinary Pharmacy,Video Arcade,Video Camera Repair Service,Video Conferencing Equipment Supplier,Video Conferencing Service,Video Duplication Service,Video Editing Service,Video Equipment Repair Service,Video Game Rental Kiosk,Video Game Rental Service,Video Game Rental Store,Video Game Store,Video Karaoke,Video Production Service,Video Store,Vietnamese Restaurant,Villa,Village Hall,Vineyard,Vineyard Church,Vintage Clothing Store,Violin Shop,Virtual Office Rental,Visa and Passport Office,Visa Consultant,Visitor Center,Vitamin & Supplements Store,Vocal Instructor,Vocational College,Vocational School One,Vocational School,Volkswagen Dealer,Volleyball Club,Volleyball Court,Volleyball Instructor,Volunteer Organization,Volvo Dealer,Voter Registration Office,Voting Facility,Waldorf Kindergarten,Waldorf School,Walk-In Clinic,Wallpaper Store,War Museum,Warehouse,Warehouse club,Warehouse store,Washer & Dryer Repair Service,Washer & Dryer Store,Waste Management Service,Watch Manufacturer,Watch Repair Service,Watch Store,Water Cooler Supplier,Water Damage Restoration Service,Water Filter Supplier,Water Jet Cutting Service,Water Mill,Water Park,Water Polo Pool,Water Pump Supplier,Water Purification Company,Water Ski Shop,Water Skiing Club,Water Skiing Instructor,Water Skiing Service,Water Softening Equipment Supplier,Water Sports Equipment Rental Service,Water Tank Cleaning Service,Water Testing Service,Water Treatment Plant,Water Treatment Supplier,Water Utility Company,Water Works,Water Works Equipment Supplier,Waterbed Repair Service,Waterbed Store,Waterproofing Company,Wax Museum,Wax Supplier,Waxing Hair Removal Service,Weather Forecast Service,Weaving Mill,Web Hosting Company,Website Designer,Wedding Bakery,Wedding Buffet,Wedding Chapel,Wedding Dress Rental Service,Wedding Photographer,Wedding Planner,Wedding Service,Wedding Souvenir Shop,Wedding Store,Wedding Venue,Weigh Station,Weight Loss Service,Weightlifting Area,Weir,Welder,Welding Gas Supplier,Welding Supply Store,Well Drilling Contractor,Wellness Center,Wellness Hotel,Wellness Program,Welsh Restaurant,Wesleyan Church,West African Restaurant,Western Apparel Store,Western Restaurant,Whale Watching Tour Agency,Wheel Alignment Service,Wheel Store,Wheelchair Rental Service,Wheelchair Repair Service,Wheelchair Store,Wholesale Bakery,Wholesale Drugstore,Wholesale Florist,Wholesale Food Store,Wholesale Grocer,Wholesale Jeweler,Wholesale Market,Wholesale Plant Nursery,Wholesaler,Wholesaler Household Appliances,Wi-Fi Spot,Wicker Store,Wig Shop,Wildlife and Safari Park,Wildlife Park,Wildlife Refuge,Wildlife Rescue Service,Willow Basket Manufacturer,Wind Farm,Wind Turbine Builder,Window Cleaning Service,Window Installation Service,Window Supplier,Window Tinting Service,Window Treatment Store,Windsurfing Store,Wine Bar,Wine Cellar,Wine Club,Wine Storage Facility,Wine Store,Wine Wholesaler and Importer,Winemaking Supply Store,Winery,Wing Chun School,Wok Restaurant,Women’s Clothing Store,Womens College,Women’s Organization,Womens Personal Trainer,Womens Protection Service,Women’s Shelter,Wood and Laminate Flooring Supplier,Wood Floor Installation Service,Wood Floor Refinishing Service,Wood Frame Supplier,Wood Stove Shop,Wood Supplier,Wood Working Class,Woodworker,Woodworking Supply Store,Wool Store,Work Clothes Store,Workers’ Club,Working Womens Hostel,Wrestling School,X-ray Equipment Supplier,X-ray Lab,Xiang Cuisine Restaurant,Yacht Broker,Yacht Club,Yakatabune,Yakiniku Restaurant,Yakitori Restaurant,Yamaha Motorcycle Dealer,Yarn Store,Yemenite Restaurant,Yeshiva,Yoga Instructor,Yoga Retreat Center,Yoga Studio,Youth Care,Youth Center,Youth Clothing Store,Youth Club,Youth Group,Youth Hostel,Youth Organization,Youth Social Services Organization,Zac,Zhe Jiang Restaurant,Zoo,Mobile App Development";
var colorsArray=colorsString.split(","); //split colorsString into array;
var iis="دير,منظمة السكان الأصليين وسكان جزر مضيق توريس,معرض فنون السكان الأصليين,عيادة الاجهاض,مورد المواد الكاشطة,كنيسة الحياة الوفيرة,محاسب,شركة محاسبة,مدرسة المحاسبة,شركة برامج محاسبة,استشاري صوتيات,بركة الغوص البهلوانية,متجر اكريليك,عيادة الوخز بالابر,مدرسة الوخز بالإبر,أخصائي الوخز بالإبر,تاجر أكورا,مركز علاج الادمان,محامي إداري,وكالة التبني,مركز الرعاية النهارية للكبار,متجر DVD للبالغين,مدرسة تعليم الكبار,نادي ترفيه الكبار,متجر ترفيه للبالغين,خدمة رعاية التبني للبالغين,رياضات المغامرة,مركز المغامرات الرياضي,وكالة إعلانات,مصور تجاري,خدمة الإعلان,مورد المشروبات الغازية,خدمة الهوائي,مصور جوي,مركز الرياضات الجوية,درس الرقص الايرو,مدرب التمارين الرياضية,Aeroclub,متجر نماذج الطيران,مهندس طيران,شركة طيران,مطعم أفغاني,متجر البضائع الأفريقية,مطعم أفريقي,برنامج مابعد التخرج,Agenzia Entrate,المورد الكلي,خدمة Agistment,الرابطة الزراعية,تعاونية زراعية,مهندس زراعي,الثانوية الزراعية,الشركة المصنعة للآلات الزراعية,المنظمة الزراعية,تاجر جملة للمنتجات الزراعية,إنتاج زراعي,الخدمة الزراعية,وكالة توريد الخدمات الزراعية,تعاونية زراعية,مورد الكيماويات الزراعية,نادي أيكيدو,مدرسة أيكيدو,خدمة إصلاح ضواغط الهواء,مورد ضاغط الهواء,مقاول تكييف هواء,خدمة إصلاح مكيفات الهواء,متجر مكيفات,مورد نظام تكييف الهواء,خدمة تنظيف مجاري الهواء,مورد فلاتر الهواء,قاعدة سلاح الجو,التاكسي الجوي,خدمة البخاخة,متجر مستلزمات البخاخة,شركة صيانة الطائرات,مصنع الطائرات,خدمة تأجير الطائرات,متجر مستلزمات الطائرات,شركة طيران,وكالة تذاكر الطيران,مطار,مطار,فندق المطار,خدمة نقل المطار,متجر توريد الادسنس,مهبط الطائرات,الشركة المصنعة للكحول,احتكار بيع الكحول بالتجزئة,تاجر جملة للمشروبات الكحولية,برنامج علاج إدمان الكحول,الحساسية,كنيسة التحالف,مطعم الألزاس,محطة وقود بديلة,ممارس الطب البديل,مورد المولد,مورد ألمنيوم,مورد إطارات الألمنيوم,لحام الألمنيوم,نافذة الومنيوم,مسرح الهواة,خدمة الاسعاف,مطعم أمريكي,متجر أثاث الأميش,مورد ذخيرة,مدرج,مركز تسلية,مورد آلة تسلية,متنزه,ركوب متنزه,مزود ألعاب تسلية,مطعم آن هوي,مطعم أناجو,مطعم أندلسي,طبيب التخدير,مطعم انجلر فيش,الكنيسة الأنجليكانية,خدمة مراقبة الحيوان,مستشفى الحيوان,حديقة الحيوان,منظمة حماية الحيوان,خدمة إنقاذ الحيوانات,مأوى للحيوانات,استوديو الرسوم المتحركة,نادي أنيمي,أنودة,خدمة ترميم الأثاث العتيق,محل أثاث أنتيك,متجر الأنتيكات,مبنى سكني,مجمع سكني,وكالة تأجير شقق,الكنيسة الرسولية,مورد قطع غيار الأجهزة,خدمة تأجير الأجهزة,خدمة إصلاح الأجهزة,متجر الأجهزة,خدمة عملاء الأجهزة,المثمن,مركز التلمذة الصناعية,مزرعة تربية الأحياء المائية,حوض سمك,متجر أكواريوم,المركز المائي,المشتل,جراح الأشجار وجراح الأشجار,المتحف الأثري,نادي الرماية,حدث الرماية,صالة الرماية,ميدان الرماية,متجر الرماية,مهندس معماري,نقابة المهندسين المعماريين,صانع النماذج المعمارية والهندسية,مصمم المعماري,متجر الإنقاذ المعماري,شركة الهندسة المعمارية,مدرسة العمارة,أرشيف,ارينا,مطعم أرجنتيني,جمعية القوات المسلحة,الكنيسة الأرمنية,مطعم ارمني,متجر فائض الجيش والبحرية,ثكنات الجيش,مرفق الجيش,متحف الجيش,فئة العلاج بالروائح,خدمة العلاج بالروائح,متجر مستلزمات العلاج العطري,مقهى الفن,مركز الفنون,وسيط فنى - ريجيسير,معرض الفنون,فن الحرف اليدوية,متحف الفن,خدمة ترميم الفن,مدرسة الفنون,الفن التشكيلي,متجر مستلزمات فنية,مورد نباتات اصطناعية,فنان,مدرسة الرسم الفني,منظمة الفنون,شواية,خدمة اختبار الاسبستوس,أشرم,مطعم آسيوي فيوجن,بقالة آسيوية,متجر السلع المنزلية الآسيوية,معالج تدليك آسيوي,مطعم آسيوي,مقاول اسفلت,مصنع خلط الأسفلت,جمعيات كنيسة الله,غرفة التجمع,Assistante Maternelle,مرفق المعيشة المساعدة,جمعية أو منظمة,منجم,مطعم أستوريان,النادي الرياضي,المجال الرياضي,اتلتيك بارك,المسار الرياضي,ماكينة الصراف الآلي,خدمة إحالة المحامين,تاجر ATV,خدمة تأجير ATV,محل تصليح ATV,مبنى المزاد,تاجر أودي,مستشار سمعي بصري,خدمة تأجير المعدات السمعية والبصرية,خدمة إصلاح المعدات السمعية والبصرية,مورد المعدات السمعية والبصرية,السمعيات,مدقق حسابات,قاعة محاضرات,متجر البضائع الأسترالية,مطعم استرالي,مطعم نمساوي,تاجر جملة لأكسسوارات السيارات,خدمة تكييف هواء السيارات,مزاد السيارات,مورد أجزاء جسم السيارة,ورشة هياكل السيارات,سمسار سيارات,متجر كيمياء السيارات,خدمة إزالة انبعاجات السيارات,خدمة السيارات الكهربائية,محل زجاج سيارات,وكالة تأمين على السيارات,ورشة ماكينات السيارات,سوق السيارات,الشركة المصنعة لقطع غيار السيارات,سوق قطع غيار السيارات,متجر قطع غيار السيارات,خدمة إصلاح مبرد السيارات,محل تصليح السيارات,خدمة استعادة السيارات,متجر الربيع للسيارات,محل فتحة سقف السيارات,وكالة Auto Tag,خدمة ضبط السيارات,منجد السيارات,هادم السيارات,شركة أتمتة,مرفق تخزين السيارات,مستشار طيران,معهد تدريب الطيران,مورد المظلة,محل ملابس اطفال,متجر اطفال,مدرسة سباحة للأطفال,جليسة أطفال,نادي كرة الريشة,مجمع تنس الريشة,تنس الريشة,متجر الحقائب,محل باجل,دار العبادة البهائية,خدمة سندات الكفالة,بيليف,متجر الطعم,مخبز,معدات المخابز,متجر مستلزمات الخبز,مدرسة الباليه,مسرح الباليه,فنان بالون,وكالة جولة بالون ركوب,متجر البالونات,قاعة رقص,مدرب رقص,فرقة,مطعم بنجلاديشي,مصرف,محامي الإفلاس,خدمة الإفلاس,متجر بانر,قاعة الولائم,الكنيسة المعمدانية,شريط,بار اند جريل,شريط PMU,متجر أثاث بار مطعم,مورد بار البراز,بار تاباك,مطعم باربيكيو,منطقة شواء,مدرسة الحلاقة,صالون حلاقة,متجر مستلزمات الحلاقة,مورد النباح,مورد برميل,محامي,مدرسة السقاة,البيسبول,نادي البيسبول,ملعب البيسبول,متجر سلع البيسبول,بازيليكا,مورد سلة,نادي كرة السلة,ملعب كرة السلة,مقاول ملاعب كرة السلة,مطعم الباسك,معيد تشكيل الحمام,متجر مستلزمات حمامات,الشركة المصنعة للبطارية,متجر بطاريات,تاجر بطاريات بالجملة,مركز قفص الضرب,بازار,منطقة الشواء,خدمة تنظيف الشاطئ,متجر ملابس الشاطئ,متجر الترفيه على الشاطئ,جناح الشاطئ,منتجع الشاطئ,نادي الكرة الطائرة الشاطئية,ملعب كرة الطائرة الشاطئية,متجر خرز,تاجر جملة للخرز,مورد تحمل,مورد منتجات التجميل,آلة بيع منتجات التجميل,تاجر جملة لمنتجات التجميل,صالون تجميل,مدرسة جمال,متجر مستلزمات التجميل,سرير و فطور,متجر السرير,متجر مفروشات,متجر أثاث غرف النوم,مطعم جيودون,موزع بيرة,حديقة البيرة,قاعة البيرة,متجر البيرة,مطعم بلجيكي,متجر الحزام,مطعم بيري,وكالة المراهنات,موزع المشروبات,كنيسة الكتاب المقدس,نادي الدراجات,رف دراجة,خدمة تأجير الدراجات,محل تصليح دراجات,محطة مشاركة الدراجة,متجر دراجات,دراجات بالجملة,استوديو بيكرام يوجا,مدرسة ثنائية اللغة,متجر مستلزمات البلياردو,قاعة البنغو,مورد الكيمياء الحيوية,معمل الكيمياء الحيوية,معالج الارتجاع البيولوجي,شركة التكنولوجيا الحيوية,مهندس التكنولوجيا الحيوية,خدمة مراقبة الطيور,متجر الطيور,منطقة مراقبة الطيور,مركز الولادة,خدمة شهادة الميلاد,مركز تحديد النسل,حانة صغيرة,حداد,خدمة تنظيف الانفجار,مدرسة المكفوفين,متجر الستائر,بنك الدم,مركز التبرع بالدم,خدمة فحص الدم,خدمة المخطط,نادي البلوز,وكيل BMW,تاجر دراجات بخارية من BMW,نادي البي ام اكس,حديقة بي ام اكس,مسار BMX,نادي لعبة المجلس,مجلس التعليم,مجلس التجارة,مأوى,مدرسة داخلية,مورد إكسسوارات القوارب,بناة القوارب,نادي القوارب,مورد غطاء القارب,تاجر قوارب,منحدر القارب,خدمة تأجير القوارب,محل إصلاح القوارب,مرفق تخزين القوارب,وكالة رحلات القوارب,تاجر مقطورات القوارب,بوتيل,مدرب قوارب,ملعب كرة البوتشي,محل ثقب الجسم,فئة تشكيل الجسم,مصنع المرجل,مورد غلايات,بيت العظام,مورد مصنع بونساي,كتاب الناشر,مكتبة لبيع الكتب,تجليد الكتب,خدمة مسك الدفاتر,المراهنات,تاجر كتب بالجملة,مخيم التدريب,محل إصلاح الأحذية,متجر التمهيد,محطة عبور الحدود,حرس الحدود,حديقة نباتات,مركز استرداد الزجاجات والعلب,مورد المياه المعبأة,تأجير قلعة نطاط,متجر,فندق بوتيك,صالة بولينج,نادي البولينغ,محل مستلزمات البولينج,مورد غداء صندوق,نادي الملاكمة,صالة ملاكمة,خاتم الملاكمة,المدرسة الثانوية للبنين,شركة ببو,وكالة التنسيب BPO,محل الفرامل,مطعم برازيلي,مطعم الإفطار,مصنع الجعة,متجر مستلزمات الجعة,حانة,مصنع الطوب,كبناء,متجر الزفاف,جسر,نادي بريدج,مطعم بريطاني,مطعم برنش,الشاي فقاعة,متجر اللوازم البوذية,معبد بوذي,فندق الميزانية,نزل ياباني اقتصادي,مطعم بوفيه,تاجر بويك,استشاري بناء,شركة تصميم المباني,خدمة تأجير معدات البناء,شركة البناء,بناء مفتش,سوق مواد البناء,متجر مواد البناء,مورد مواد البناء,خدمة ترميم المباني,بناء المجتمع,مساح قانوني,مطعم بلغاري,حلبة مصارعة الثيران,مركز القفز بالحبال,متجر أجهزة الإنذار ضد السرقة,مطعم بورمي,مطعم بوريتو,شركة الحافلات والمدربين,ميثاق الحافلات,شركة الحافلات,وكالة تذاكر الحافلات,وكالة جولات الحافلات,خدمة إدارة الأعمال,وسيط أعمال,مركز أعمال,خدمة تطوير الأعمال,فندق رجال الأعمال,مستشار إدارة الأعمال,شركة شبكات الأعمال,مجمع الأعمال,كلية إدارة الأعمال,خدمة الأعمال إلى الأعمال,مورد غاز البوتان,محل القصاب,محل الجزار ديلي,متجر بوتسودان,نادي الكباريه,وكالة تأجير المقصورة,صانع الخزائن,متجر الخزائن,شركة الكابلات,تاجر كاديلاك,كافيه,كافيتريا,مطعم كاجون,محل معدات تزيين الكيك,متجر الكعك,مطعم كاليفورنيا,مركز الاتصال,اتصل بالمحل,درس الخط,كنيسة الجلجلة تشابل,مطعم كمبودي,محل إصلاح الكاميرا,متجر الكاميرا,معسكر,مورد شل العربة,المخيم,مزرعة التخييم,متجر التخييم,مطعم شمال غرب المحيط الهادئ (كندا),مطعم كندي,مركز علاج السرطان,متجر الشموع,متجر حلويات,متجر أثاث القصب,متجر القنب,التعليب,نادي قوارب الكانوي والكاياك,خدمة تأجير الزوارق والكاياك,متجر الكانوي والكاياك,وكالة رحلات الكانوي والكاياك,منطقة التجديف,مطعم كانتابريان,مطعم كانتونيز,مطعم كيب فيردان,رأس المال,مدرسة كابويرا,فندق كبسولة,متجر اكسسوارات السيارات,مزود أجهزة إنذار للسيارة,متجر بطاريات السيارات,تاجر سيارات,خدمة العناية بالسيارة,مصنع سيارة,شركة تمويل وإقراض السيارات,محطة فحص السيارات,خدمة تأجير السيارات,مصنع سيارات,مسار سباق السيارات,وكالة تأجير السيارات,إصلاح وصيانة السيارات,مُثبِّت نظام أمان السيارة,خدمة السيارات,موقع مشاركة السيارة,متجر استريو سيارات,غسيل سيارة,شرطة Carabinieri,طبيب قلب,خدمة التوجيه المهني,مطعم كاريبي,نادي الكرنفال,النجار,خدمة تنظيف السجاد,عامل تركيب سجاد,مصنع سجاد,متجر سجاد,تاجر سجاد بالجملة,كاربول,منشئ مرآب وعريشة,خدمة النقل,كارفيري,تاجر جملة للنقد والحمل,كازينو,خدمة النعش,مطعم قشتالية,قلعة,فندق القلعة,مطعم سيوكودو وتيشوكو,مطعم سوشي بحزام ناقل,بيت شباب كات,مطعم كاتالوني,تموين طعام وشراب مورد,متعهد,كاتدرائية,كاتدرائية كاثوليكية,الكنيسة الكاثوليكية,مدرسة كاثوليكية,قطط,مزرعة ماشية,سوق الماشية,مدرسة CBSE,متجر الأقراص المضغوطة,مورد السقف,متجر ملحقات الهاتف الخليوي,متجر الهواتف المحمولة,مصنع الاسمنت,مورد أسمنت,مقبرة,مطعم أمريكا الوسطى,السلطة المركزية,البنك المركزي,مصنع سيراميك,تاجر سيراميك بالجملة,وكالة التصديق,محاسب عام معتمد,شاليه,غرفة الزراعة,الغرفة التجارية,غرفة الحرف اليدوية,مطعم شامبون نودل,مطعم شانكو,كنيسة صغيرة,شاركوتيري,الاعمال الخيرية,مدرسة مستقلة,محاسب قانوني,خدمة صرف الشيكات,مصنع الجبن,سوق الاجبان,مطعم تشيزستيك,مهندس كيميائي,مصدر كيميائي,الشركة المصنعة للمواد الكيميائية,نبات كيميائى,تاجر جملة للمواد الكيميائية,كلية الكيمياء,مختبر الكيمياء,مطعم تشيسابيك,نادي الشطرنج والبطاقات,نادي شطرنج,مدرس الشطرنج,تاجر شيفروليه,تفريخ الدجاج,مطعم دجاج,متجر الدجاج,مطعم أجنحة الدجاج,وكالة رعاية الطفل,مركز رعاية صحة الطفل,علم نفس الأطفال,فئة الولادة,مركز تسلية للأطفال,صالة اطفال,عيادة الأطفال,متجر كتب الأطفال,مقهى الأطفال,متجر ملابس الأطفال,نادي الأطفال,مزرعة الأطفال,متجر أثاث الأطفال,بيت الاطفال,مستشفى الأطفال,مكتبة الأطفال,متحف الأطفال,بوفيه حفلات الأطفال,خدمة حفلات الأطفال,متجر الأطفال,مسرح الأطفال,مطعم تشيلي,خدمات المداخن,منظف ​​المداخن,متجر الأواني الخزفية,مدرس لغة صينية,مدرسة اللغة الصينية,المستشفى الطبى الصينى,عيادة الطب الصيني,مخزن الأدوية الصينية,مطعم المعكرونة الصينية,معجنات صينية,مطعم صيني,سوبر ماركت صيني,الوجبات الصينية,بيت الشاي الصيني,مقوم العظام,صانع الشوكولاتة,مقهى الشوكولاتة,مصنع شوكولاتة,متجر الشوكولاته,الكورال,مطعم تشوب هاوس,متجر الكتب المسيحية,كنيسية مسيحية,الكلية المسيحية,سوق عيد الميلاد,متجر عيد الميلاد,مزرعة شجرة عيد الميلاد,تاجر كرايسلر,كنيسة,كنيسة المسيح,كنيسة يسوع المسيح لقديسي الأيام الأخيرة,كنيسة الناصري,متجر مستلزمات الكنيسة,كوريريا,بار عصير التفاح,مطحنة عصير التفاح,محل سيجار,مورد معدات السينما,خدمة التوزيع الدائري,سيرك,مكتب معلومات المواطن,مكتب نصيحة المواطنين,إدارة المدينة,مكتب كاتب المدينة,محكمة المدينة,دائرة البيئة بالمدينة,إدارة السلامة العامة بالمدينة,دائرة النقل بالمدينة,مكتب حي المدينة,قسم التوظيف بالمدينة,مكتب حكومة المدينة,قاعة المدينة أو البلدية,مستشفى المدينة,حديقة المدينة,ضريح عمود المدينة,مكتب ضرائب المدينة,مركز المدينة,الدفاع المدني,مهندس مدني,شركة الهندسة المدنية,أكاديمية الامتحانات المدنية,محامي قانون مدني,الشرطة المدنية,السجل المدني,صف دراسي,ناشر جريدة الإعلانات المبوبة,عمال النظافة,مورد منتجات التنظيف,خدمة التنظيف,قس,خدمة إصلاح على مدار الساعة,صانع الساعات على مدار الساعة,الدوائر التلفزيونية المغلقة,مصنع الملابس والأقمشة,تاجر جملة للملابس والأقمشة,سوق الملابس,خدمة تعديل الملابس,محل الملابس,مورد ملابس,سوق الملابس بالجملة,تاجر ملابس بالجملة,النادي,مركز تركيب الغاز الطبيعي المضغوط,مركز التدريب,مصدر فحم,مورد فحم,كولفيلد,محطة خفر السواحل,تاجر معطف بالجملة,كوكتيل بار,مدرسة مختلطة,مورد ماكينات القهوة,محامص بن,مقهى,متجر القهوة,آلة بيع القهوة,تاجر البن بالجملة,مورد نعش,تاجر عملة,تعمل بقطع النقود المعدنية مورد معدات الغسيل,خزانة تعمل بقطع النقود المعدنية,متجر قطع باردة,مطعم المعكرونة الباردة,مرفق التخزين البارد,متجر المقتنيات,كلية,كلية الزراعة,مطعم كولومبي,نادي الفكاهة,متجر الكتب المصورة,مقهى كوميدي,وكيل تجاري,خدمة التنظيف التجارية,طابعة تجارية,وكالة عقارات تجارية,مفتش عقارات تجارية,التبريد التجاري,مورد ثلاجات تجارية,مفوض القسم,مركز الاتصالات,مركز اجتماعي,كلية المجتمع,حديقة المجتمع,مركز صحة المجتمع,المجتمع المدرسي,سجل الشركة,متجر ملحقات الكمبيوتر,نادي الكمبيوتر,مستشار كمبيوتر,متجر كمبيوتر مكتبي,الشركة المصنعة لأجهزة الكمبيوتر,مركز شبكات الحاسوب,خدمة إصلاح الكمبيوتر,خدمة أمن الكمبيوتر,خدمة الكمبيوتر,متجر برامج الكمبيوتر,متجر للكمبيوتر,دعم وخدمات الكمبيوتر,مدرسة تدريب الكمبيوتر,تاجر كمبيوتر بالجملة,قاعة الحفلات الموسيقية,مقاول خرسانة,مصنع خرسانة,مورد الإطار المعدني الخرساني,مورد المنتجات الخرسانية,مورد توابل,مجمع عمارات,وكالة تأجير عمارات,الحلويات,تاجر الحلويات بالجملة,مركز المؤتمرات,فندق المؤتمرات,مجمع,قسم الحفظ,نادي المحافظين,كنيس محافظ,مقاول إنشاء معهد كونسرفتوار,معهد الموسيقى,توريد وتركيب الكونسرفتوار,متجر شحنة,مكتب البناء والصيانة,شركة بناء,مورد معدات البناء,تاجر آلات البناء,خدمة تأجير آلات البناء,تاجر جملة لمواد البناء,استشاري,مركز استشارات المستهلك,مورد العدسات اللاصقة,خدمة الحاويات,مورد حاويات,محطة الحاويات,مورد حاويات,مطعم معاصر لويزيانا,مطعم كونتيننتال,مقاول,محل بقالة,منظمة المتاجر الصغيرة,مركز المؤتمرات,مكتب معلومات الاتفاقية,ناقل,متجر ملفات تعريف الارتباط,حصة الطبخ,مدرسة الطبخ,محطة تبريد,خدمة إصلاح الناسخة,مورد النحاس,النحاس,محل نسخ,مخزن مستلزمات النسخ,حرم الشركة,خدمة ترفيه الشركات,مورد هدايا الشركات,مكتب الشركة,دائرة الخدمات الإصلاحية,طبيب أسنان تجميلي,مصنع مستحضرات التجميل,مورد مستحضرات التجميل والعطور,صناعة مستحضرات التجميل,متجر مستحضرات التجميل,تاجر مستحضرات التجميل بالجملة,مقهى تأثيري,مطعم كوستاريكا,محل مجوهرات مقلدة,خدمة تأجير الأزياء,متجر أزياء,كوخ,تأجير كوخ,قرية الكوخ,مصدر قطن,معمل القطن,مورد قطن,مجلس,مستشار,متجر كونترتوب,نادي ريفي,مطعم كونتري فود,بيت ريفي,حديقة البلاد,مكتب حكومة المقاطعة,خدمة الساعي,كور دي كابويرا,Cours de Surf,موظف تنفيذي للمحكمة,كاتب تقارير المحكمة,مطعم الكسكس,متجر كوتور,ساحة للعمل الجماعي,بيت السلطعون,مركز الحرف,متجر الحرفية,مدرسة الحشر,تاجر كرين,وكالة تأجير الرافعات,خدمة كرين,العلاج القحفي العجزي,الحضانة,خدمة الاستشارة الائتمانية,وكالة التقارير الائتمانية,اتحاد الائتمان,خدمة الحرق,مطعم كريول,كريبري,نادي الكريكيت,أرض الكريكيت,متجر الكريكيت,خدمة ضحايا الجرائم,محامي العدالة الجنائية,مطعم كرواتي,مزارع المحاصيل,نادي الكروكيه,وكالة الرحلات البحرية,شركة كروز لاين,محطة الرحلات البحرية,مورد الحجر المكسر,مطعم كوبي,مدرسة تعليم الطبخ,الجمعية الثقافية,مركز ثقافي,محل كب كيك,بار لحم الشفاء,متجر لحم الخنزير المقدد,مستودع لحم الخنزير المعالج,نادي الكيرلنج,صالة الكيرلنج,خدمة صرف العملات,خدمة تنظيف الستائر والمفروشات,متجر ستائر,مورد وصانع الستائر,متجر البضائع المصادرة المخصص,مصمم المنزل المخصص,طابعة ملصقات مخصصة,متجر قمصان مخصصة,خياط مخصص,المخلص الجمركي,مستشار جمركي,إدارة الجمارك,مكتب الجمارك,مستودع الجمارك,متجر أدوات المائدة,حديقة الدراجات,مطعم تشيكي,الألبان,مزرعة البان,مورد معدات مزارع الألبان,متجر الألبان,مورد ألبان,مطعم المعكرونة دان دان,نادي رقص,فرقة رقص,معهد الرقص,صالة الرقص,جناح الرقص,مطعم رقص,مدرسة الرقص,متجر الرقص,مطعم دنماركي,دارت بار,متجر دارت للتوريدات,خدمة إدخال البيانات,خدمة استعادة البيانات,شركة إدارة قواعد البيانات,خدمة التعارف,مركز الرعاية النهارية,منتجع اليوم,كنيسة الصم,مدرسة الصم,خدمة الصم,خدمة إزالة الحطام,تحصيل الديون,وكالة تحصيل الديون,مورد شارات,منشئ سطح السفينة,أطعمة لذيذة,مطعم التوصيل الصيني,خدمة التوصيل,مقاول هدم,محل الجينز,عيادة اسنان,صحة الأسنان,اخصائي زراعة الاسنان,وكالة تأمين الأسنان,مختبر الأسنان,أشعة الأسنان,مدرسة طب الاسنان,متجر مستلزمات طب الأسنان,دكتورالاسنان,مركز العناية بالأسنان,دائرة التنمية الإقليمية,قسم التربية,دائرة المالية,دائرة الإسكان,قسم المركبات المحركة,قسم السلامة العامة,قسم الخدمات الاجتماعية,قسم النقل,قسم التخزين,قسم كنز المدينة,قسم كنز الدولة,طبيب الجلدية,محطة تحلية,وكالة تصميم,مهندس تصميم,معهد التصميم,خدمة النشر المكتبي,بوفيه حلويات وحلويات,مطعم حلويات,محل حلاويات,المحقق,مركز احتجاز,مركز السكري,مورد معدات مرض السكري,طبيب سكري,مركز التشخيص,مركز غسيل الكلى,مشتري الماس,تاجر الماس,خدمة حفاضات,تاجر محركات ديزل,خدمة إصلاح محرك الديزل,مورد وقود الديزل,طابعة رقمية,خدمة الطباعة الرقمية,مطعم ديم سوم,العشاء,مسرح العشاء,الإعلان بالبريد المباشر,مورد الأوساخ,مورد معدات الإعاقة,منظمة خدمات ودعم الإعاقة,مركز رياضي للمعاقين,ملعب جولف,تلاميذ كنيسة المسيح,نادي ديسكو,متجر التخفيضات,سوبر ماركت الخصم,عرض Home Center,الشركة المصنعة لحامل العرض,مورد أدوات المائدة المتاح,مركز التعلم عن بعد,تقطير,خدمة التوزيع,النائب العام,المجلس المحلي,مكتب حكومة المنطقة,قضاء المقاطعة,مكتب المقاطعة,نادي الغوص,متجر الغوص,مركز الغوص,مقاول غطس,محامي الطلاق,خدمة الطلاق,خدمة دي جي,متجر مستلزمات دي جي,متجر افعل ذلك بنفسك,Dock Builder,طبيب,تاجر دودج,مربي الكلاب,مقهى الكلب,مركز رعاية الكلاب اليومية,بيت شباب الكلاب,حديقة الكلب,جليس للكلاب,مدرب الكلاب,كلب ووكر,خدمة ركوب الكلاب,مطعم دوجو,خدمة ترميم الدمية,متجر الدمى,متجر الدولار,مركز علاج العنف المنزلي,طيران داخلي,مطعم دومينيكان,مركز التبرعات,محل دونات,الشركة المصنعة للأبواب,متجر الباب,مورد الباب,مستودع الباب,مثبت زجاج مزدوج,مطعم داون هوم للطبخ,مورد معدات الصياغة,خدمة الصياغة,خدمة الصرف الصحي,مدرسة الدراما,مسرح الدراما,دروس الرسم,خدمة تأجير الملابس والبدلة الرسمية,متجر الملابس,خياطة,محل زهور مجففة,متجر المأكولات البحرية المجففة,مقاول حفر,مورد معدات الحفر,نافورة مياه الشرب,مسرح السينما بالسيارة,وكالة ترخيص السائقين والمركبات,مكتب رخصة القيادة,مدرسة تدريب رخصة السائقين,متجر Driveshaft,مدرسة لتعليم القيادة,مركز اختبار القيادة,مركز علاج ادمان المخدرات,خدمة اختبار المخدرات,متجر أدوية,مدرسة الطبل,مخزن الطبل,منظف ​​جاف,متجر فواكه مجففة,مورد ثلج جاف,مقاول الجدار الجاف,متجر مستلزمات الحوائط الجافة,تاجر دوكاتي,دود رانش,تاجر شاحنات قلابة,خدمة الشاحنة القلابة,مطعم زلابية,مطعم هولندي,متجر السوق الحرة,متجر DVD,متجر الصبغ,صباغة,مزود دينامومتر,وكالة التجارة الإلكترونية,خدمة التجارة الإلكترونية,خدمة ثقب الأذن,شركة أعمال الأرض,مطعم شرق افريقيا,مطعم أوروبا الشرقية,الكنيسة الأرثوذكسية الشرقية,مركز علاج اضطرابات الأكل,مطعم انتقائي,حديقة بيئية,جمعية علماء البيئة,مستشار اقتصادي,وكالة التنمية الاقتصادية,مطعم إكوادوري,مركز تعليمي,مستشار تعليمي,مؤسسة تعليمية,متجر مستلزمات تعليمية,خدمة الاختبارات التعليمية,مورد معدات Eftpos,مورد بيض,مطعم مصري,محامي قانوني كبير,محل إصلاح المحركات الكهربائية,متجر محركات كهربائية,شركة المرافق الكهربائية,الشركة المصنعة للمرافق الكهربائية,محطة شحن السيارات الكهربائية,تاجر جملة للأجهزة الكهربائية,مهندس كهرباء,مورد المعدات الكهربائية,خدمة التركيب الكهربائي,محل التصليح الكهربائي,محطة كهرباء فرعية,متجر توريدات كهربائية,تاجر جملة للأجهزة الكهربائية,عامل الكهرباء,خدمة إزالة الشعر بالتحليل الكهربائي,مهندس الكتروني,مورد قطع غيار إلكترونية,تاجر جملة لمستلزمات الإلكترونيات,شركة إلكترونيات,مهندس الكترونيات,مصدر إلكترونيات,متجر تأجير الإلكترونيات,الشركة المصنعة للإلكترونيات,محل إصلاح الإلكترونيات,متجر للالكترونيات,آلة بيع الإلكترونيات,تاجر جملة للإلكترونيات,مدرسة ابتدائية,مصنع المصاعد,خدمة المصعد,السفارة,خدمة النقش,خدمة التطريز,محل تطريز,كشك نداء الطوارئ,طبيب رعاية الطوارئ,خدمة رعاية الطوارئ,خدمة طوارئ طب الأسنان,خدمة اقفال الطوارئ,وزارة إدارة الطوارئ,غرفة الطوارئ,تدريب الطوارئ,مدرسة تدريب الطوارئ,خدمة الطوارئ البيطرية,وكالة توظيف,محامي توظيف,مركز التوظيف,مستشار توظيف,خدمة البحث عن عمل,أخصائي الغدد الصماء,أخصائي عصب الاسنان,التنظير,معدات وحلول الطاقة,مزود الطاقة,خدمة إعادة بناء المحرك,مهندس,استشاري هندسي,كلية الهندسة,معسكر اللغة الإنجليزية,مدرس لغة انجليزية,مدرسة اللغة الإنجليزية,مطعم إنجليزي,حفارة,الفنان,وكالة ترفيه,مورد مغلفات,مكتب البيئة,بيئة الموارد الطبيعية المتجددة,مستشار بيئي,مهندس بيئي,خدمة الصحة البيئية,منظمة بيئية,منظمة حماية البيئة,الكنيسة الأسقفية,نادي الفروسية,مرفق الفروسية,منتجع الفروسية,متجر الفروسية,مصدر المعدات,مستورد معدات,وكالة تأجير المعدات,مورد المعدات,مطعم اريتري,التدليك المثيرة,خدمة الضمان,اسبريسو بار,المثمن العقاري,المصفي العقاري,محامي التخطيط العقاري,مطعم إثيوبي,مطعم عرقي,المتحف الإثنوغرافي,المؤسسة الأوروبية,مطعم أوروبي,الكنيسة الإنجيلية,خدمة تأجير فساتين السهرة,المدرسة المسائية,شركة إدارة الأحداث,مخطط الاحداث,خدمة تكنولوجيا الأحداث,بائع تذاكر الأحداث,مكان الحدث,مقاول حفر,شركة البحث التنفيذي,وكالة تأجير الأجنحة التنفيذية,المنفذ,عرض,معرض ومركز التجارة,مخطط المعرض,مصدر,فندق الإقامة الممتدة,مركز العناية بالعيون,الشركة المصنعة للمنتجات النسيجية,مخزن قماش,تاجر أقمشة بالجملة,مهندس تلفيق,سبا للوجه,مورد معدات المصانع,كلية الفنون,كلية الحقوق,كلية الصيدلة,كلية علم النفس,كلية العلوم,كلية الرياضة,منظمة التجارة العادلة,أرض معارض,مطعم فلافل,مستشار الأسرة,خدمة رعاية الأسرة النهارية,فندق عائلي,محامي قانون الأسرة,مركز تنظيم الأسرة,مستشار تنظيم الأسرة,طبيب ممارسة الأسرة,مطعم عائلي,مركز خدمة الأسرة,مزرعة,مكتب المزرعة,خدمة إصلاح معدات المزارع,مورد معدات زراعية,جولة المزرعة المنزلية,مدرسة المزرعة,محل الأدوات الزراعية,سوق المزارعين,مزرعة,محل اكسسوارات الموضة,مدرسة تصميم الأزياء,مصمم أزياء,مطعم وجبات سريعة,مورد السحابة,فافيلا,خدمة الفاكس,الوكالة الاتحادية للإغاثة الفنية,الاتحاد الائتماني الفيدرالي,مكتب الحكومة الفيدرالية,الشرطة الاتحادية,البنك الإحتياطي الفيدرالي,الشركة المصنعة للأعلاف,متجر أعلاف الحيوانات,متجر أحذية فيلت,مقاول سياج,متجر مستلزمات سياج,صالون المبارزة,مدرسة المبارزة,مستشار فنغ شوي,متجر فنغ شوي,عجلة فيريس,خدمة العبارات,عيادة الخصوبة,طبيب خصوبة,مورد الأسمدة,مهرجان,قاعة المهرجان,تاجر فيات,مورد منتجات الألياف البصرية,خدمة إصلاح الألياف الزجاجية,مورد الألياف الزجاجية,متجر التماثيل,مطعم فلبيني,مكتبة الأفلام والصور,شركة إنتاج الأفلام,مصنع الترشيح,وسيط تمويل,محاسبه ماليه,المستشار المالي,مؤسسة مالية,مخطط مالي,مطعم فاخر,خدمة البصمات,مورد مواد التشطيب,مطعم فنلندي,مزود إنذار firebaseApp,firebaseApp خدمة استعادة الضرر,firebaseApp قسم مورد المعدات,FirebaseApp Fighters Academy,مستشار حماية تطبيقات firebase,firebaseApp مورد معدات الحماية,FirebaseApp Protection Service,firebaseApp مورد نظام الحماية,محطة تطبيقات firebase,أكاديمية FirebaseApparms,firebaseAppplace الشركة المصنعة,متجر FirebaseAppplace,مورد firebaseAppwood,متجر FirebaseAppworks,firebaseAppworks المورد,مركز للإسعافات الأولية,مطعم فيش اند شيبس,فيش اند شيبس تيك اواي,مزرعة الأسماك,معالجة الأسماك,فيش سبا,متجر سمك,معسكر الصيد,ميثاق الصيد,نادي الصيد,رصيف الصيد,بركة الصيد,متجر الصيد,نادي صحي,متجر معدات التمرين,تاجر جملة لأجهزة اللياقة البدنية,مورد أثاث جاهز,متجر العلم,متجر رقص الفلامنكو,مدرسة الفلامنكو,مسرح الفلامنكو,مُورِّد النكهات والعطور والنكهات,سوق متجول,مدرسة الطيران,السوق العائمة,خدمة صقل الأرضيات,خدمة صنفرة وتلميع الأرضيات,مقاول أرضيات,متجر أرضيات,مطعم فلوريديان,منسق زهور,طاحونة,توصيل الزهور,مصمم الزهور,محل زهور,تاجر سلع بالجملة,الشركة المصنعة FMCG,منتج رغوة المطاط,مورد المطاط الإسفنجي,المدرسة الشعبية العليا,مطعم فوندو,استشاري أغذية ومشروبات,مصدر أغذية ومشروبات,بنك الطعام,سمسار أغذية,محكمة الغذاء,مورد ماكينات الغذاء,مصنع المواد الغذائية,توريد تصنيع المواد الغذائية,شركة الصناعات الغذائية,معدات تجهيز الأغذية,منتج غذاء,مورد المنتجات الغذائية,مصنع توابل الطعام,حمام القدم,العناية بالقدم,صالون تدليك القدم,نادي كرة قدم,ملعب كرة القدم الأمريكية,وكيل فورد,خدمة التعويق,قنصلية أجنبية,منظمة طلاب الصرف الأجنبي,مدرسة برنامج اللغات الأجنبية,مستشار التجارة الخارجية,جمعية فورمان بناة,استشاري الطب الشرعي,خدمة الغابات,تاجر رافعة شوكية,خدمة تأجير الرافعات الشوكية,متجر ملابس رسمية,قلعة,خدمات تحصيل الثروة,خدمة رعاية التبني,مؤسسة,مسبك,مقاول نافورة,كنيسة فورسكوير,منظمة أخوية,عيادة مجانية,موقف سيارات مجاني,المصارعة الحرة,خدمة شحن البضائع,مدرسة اللغة الفرنسية,مطعم فرنسي,مطعم ستيك هاوس فرنسي,سوق الأطعمة الطازجة,فرايد تشيكن تيك اواي,كنيسة الأصدقاء,فريتور,مورد حلويات مجمدة,مصنع اغذية مجمدة,متجر أطعمة مجمدة,محل زبادي مثلج,معالجة الفاكهة والخضروات,متجر فواكه وخضروات,تاجر جملة للخضروات والفواكه,صالون الفاكهة,تاجر فواكه بالجملة,تاجر فواكه بالجملة,مطعم فو جيان,مورد وقود,مطعم فوجو,خدمة تأجير فستان كامل,كنيسة الإنجيل الكامل,مرفق غرفة الفعاليات,شركة إدارة الصناديق,مدير الجنازة,مكان الدفن,متجر معطف الفرو,مصنع الفراء,خدمة الفراء,مورد قطع غيار الفرن,خدمة إصلاح الفرن,متجر أفران,عمارة سكنية مفروشة,اكسسوارات الأثاث,مورد اكسسوارات الأثاث,مصنع الأثاث,الشركة المصنعة للأثاث,خدمة تأجير الأثاث,محل إصلاح الأثاث,محل أثاث,تاجر أثاث بالجملة,مطعم فيوجن,متجر فوتون,محكمة كرة الصالات,مطعم الجاليكية,بيت القمار,مدرب القمار,متجر الألعاب,باني المرآب,مورد باب المرآب,خدمة جمع القمامة,مكب نفايات,خدمة تفريغ القمامة,حديقة,مورد بناء الحدائق,مركز الحديقة,محل أثاث الحدائق,مورد ماكينات الحدائق,بستاني,مصدر الملابس,شركة الغاز,مورد اسطوانات الغاز,مهندس غاز,خدمة تركيب الغاز,مورد سجلات الغاز,محل غاز,محطة غاز,مجرب الغاز,مصنع حشية,أخصائي أمراض الجهاز الهضمي,جراح الجهاز الهضمي,حانة,منظمة المثليين والمثليات,حانة للمثليين,النادي الليلي للمثليين,ساونا مثلي الجنس,منشئ الجازيبو,عالم الأحجار الكريمة,عالم الأنساب,المقاول العام,مستشفى عام,محامي عام,طبيب عام,مكتب السجل العام,مخزن عام,محل المولدات,كلية الجغرافيا والتاريخ,شركة البحوث الجيولوجية,الخدمة الجيولوجية,جيولوجي,مطعم جورجي,مهندس تقنية جغرافية,مدرسة اللغة الألمانية,مطعم المانى,مدينة الأشباح,متجر سلة الهدايا,متجر الهدايا,متجر تغليف الهدايا,بار الفتاة,المدرسة الثانوية للبنات,محل زجاج ومرايا,مورد بلوك زجاجي,منفاخ زجاج,خدمة قطع الزجاج,حفارة الزجاج,خدمة النقش على الزجاج,صناعة الزجاج,مصنع الزجاج,تاجر زجاج,خدمة إصلاح الزجاج,محل زجاج,مصنع الأواني الزجاجية,متجر الأواني الزجاجية,تاجر جملة للأواني الزجاجية,زجاج,مطعم خالي من الغلوتين,تاجر GMC,Go-Kart Track,تاجر ذهب,شركة تعدين الذهب,متجر السمك الذهبي,صائغ,تاجر عربات الجولف,نادي جولف,درس لتعليم الجولف,منشئ ملعب الجولف,ميدان قيادة الجولف,مدرب غولف,منتجع الجولف,كنيسة الإنجيل,بقالة الذواقة,كلية حكومية,البرنامج الاقتصادي الحكومي,مستشفى حكومي,مكتب حكومي,مدرسة حكومية,مزود GPS,تخرج من المدرسه,خدمة إزالة الكتابة على الجدران,مصعد الحبوب,مدرسة القواعد,جراند كافيه,المدرسة الكبرى,مورد جرانيت,مصمم جرافيك,حفرة من الحصى,مصنع الحصى,المصارعة الرومانية اليونانية,الكنيسة الأرثوذكسية اليونانية,مطعم يوناني,مورد الطاقة الخضراء,بائع خضار,البيت الأخضر,متجر بطاقات المعايدة,ملعب Greyhound,متجر الشواء,خدمة توصيل البقالة,بقالة,قوة الدفاع الذاتي البرية,السكن الجماعي,دار جماعية,Guardia Civil,شرطة Guardia Di Finanza,مطعم غواتيمالي,منزل الضيف,مطعم Gui Zhou,مدرس الغيتار,متجر الجيتار,نادي البندقية,متجر اسلحة,مطعم شواء فضلات الذبائح,خدمة تنظيف المزراب,نادي رياضي,جمنازيوم تشيكوسلوفاكيا,مدرسة الجمنازيوم,مركز الجمباز,نادى الجمباز,طبيب أمراض النساء والتوليد,مورد منتجات الجبس,مطعم جيرو,الخردوات,فني وصلات شعر,مورد وصلات الشعر,خدمة إزالة الشعر,خدمة استبدال الشعر,صالون الشعر,عيادة زراعة الشعر,مطعم هاييتي,مطعم هاكا,مطعم حلال,منتصف الطريق البيت,متجر لحم الخنزير,مطعم هامبورجر,همام,جراح اليد,محل حقائب اليد,نادي كرة اليد,ملعب كرة اليد,خدمة نقل المعوقين,حرفي - حرفة يدوية,مصدر الأشغال اليدوية,معرض الحرف اليدوية,متحف الحرف اليدوية,مدرسة الحرف اليدوية,تاجر جملة للحرف اليدوية,عامل يدوي,مركز الطيران الشراعي المعلق,محل معدات,معهد التدريب على الأجهزة,تاجر هارلي ديفيدسون,متجر قبعة,منزل مسكون,دار أزياء الهوت كوتور,مطعم هوت فرنسي,متجر بضائع هاواي,مطعم هاواي,مركز هوكر,هوكر ستال,مورد القش,مركز هيد ستارت,متجر الصحة والجمال,مستشار صحي,مطعم اكل صحي,محل غذاء صحي,وكالة التأمين الصحي,منتجع صحي,منتجع صحي,خدمة إصلاح السمع,متجر السمع,مستشفى القلب,مقاول تدفئة,مورد معدات التدفئة,مورد زيت التدفئة,الارتفاع يعمل,ميثاق الهليكوبتر,وكالة جولات طائرات الهليكوبتر,مهبط للطائرات العمودية,مورد غاز الهليوم,خط المساعدة,أخصائي أمراض الدم,متجر الأعشاب,متجر الأدوية العشبية,المعالج بالأعشاب,مبنى التراث,متحف التراث,الحفاظ على التراث,دورة الحبال العالية,المدرسة الثانوية,مدرسه ثانويه عليا,دوريات الطرق السريعة,منطقة التنزه,كاهن هندوسي,معبد هندوسي,دروس رقص الهيب هوب,الكنيسة الاسبانية,معلم تاريخي,متحف المكان التاريخي,المجتمع التاريخي,متحف التاريخ,مركز اختبار فيروس نقص المناعة البشرية,مطعم هواجي,متجر الهوايات,نادي هوكي,هوكي فيلد,تزلج الهوكي,متجر مستلزمات الهوكي,شركة قابضة,خدمة الإقامة في العطلات,تأجير شقة عطلة,بيت اصطياف,عطلة بارك,ممارس الطب الشمولي,شركة أتمتة المنازل,باني منازل,تركيب سينما منزلية,متجر سلع منزلية,كوافير المنزل,خدمة الرعاية الصحية المنزلية,المساعدة المنزلية,وكالة خدمة المساعدة المنزلية,متجر تحسين المنزل,مفتش منزل,وكالة تأمين على المنزل,متجر المسرح المنزلي,خدمة Homekill,خدمة المشردين,ملجأ مشردين,المعالجة المثلية,صيدلية المعالجة المثلية,جمعية أصحاب المنازل,تاجر هوندا,مطعم هندوراس,مزرعة العسل,مطعم وجبات سريعة على طراز هونج كونج,شريط الشيشة,متجر الشيشة,إسطبل ركوب الخيل,مربي الخيول,خدمة تأجير الخيول,ميدان ركوب الخيل,مدرسة ركوب الخيل,تاجر مقطوره حصان,مدرب الخيل,خدمة ركوب الخيل,مورد نقل الخيول,حدوة الحصان سميث,مزرعة الخيول,مورد خراطيم,هوسبيس,مستشفى,معدات ومستلزمات المستشفيات,قسم المستشفى,مدرسة الضيافة والسياحة,مدرسة الضيافة الثانوية,نادي الضيافة,نزل,هوت بيدستون سبا,مطعم هوت دوج,عربة نقانق,مطعم هوت بوت,فندق هوت سبرينج,خدمة إصلاح أحواض المياه الساخنة,متجر الأحواض الساخنة,مورد نظام الماء الساخن,الفندق,مدرسة إدارة الفنادق,متجر مستلزمات الفنادق,خدمة تنظيف المنزل,خدمة تخليص المنازل,جليسة البيت,وكالة حاضنة المنزل,خدمة تأجير المركب,مورد كيماويات منزلية,تاجر السلع المنزلية بالجملة,جمعيات الاسكان,الهيئة العامة للإسكان,مجمع سكني,تعاونية الإسكان,تطوير المساكن,جمعية الإسكان,شركة مرافق الإسكان,متجر هوا قونغ,سوق هوا هوي,سوق هوا نياو,مورد غطاء المحور,هويسير,استشارات الموارد البشرية,مطعم هونان,مطعم مجري,متجر صيد وصيد,منطقة الصيد,نادي الصيد,محمية الصيد,متجر الصيد,مقاول HVAC,مهندس هيدروليك,مورد المعدات الهيدروليكية,خدمة الإصلاح الهيدروليكي,محطة توليد الطاقة الكهرمائية,مورد معدات الزراعة المائية,تاجر جملة لمواد النظافة,محطة النظافة,سوق ضخمة,خدمة العلاج بالتنويم المغناطيسي,وكيل هيونداي,مورد معدات الآيس كريم,محل مثلجات,نادي هوكي الجليد,نادي التزلج على الجليد,مدرب تزلج على الجليد,حلبة التزلج على الجليد,مورد ثلج,مطعم آيسلندي,مدرسة Icse,الصانع المعبود,مستشار صور,مسرح إيماكس,دائرة الهجرة والجنسية,محامي الهجرة,مركز احتجاز المهاجرين,اختصاصي المناعة,خدمة عدم التسرب,شركة استيراد وتصدير,المستورد,مورد البخور,مصنع حرق,تأمين حماية الدخل,جمعية مساعدة ضريبة الدخل,بقالة هندية,مطعم هندي مسلم,مطعم هندي,مطعم اندونيسي,ركوب الدراجات في الأماكن المغلقة,ملعب جولف داخلي,سكن داخلي,ملعب داخلي,مركز ثلج داخلي,حوض سباحة داخلي,منطقة صناعية,تاجر جملة للكيماويات الصناعية,مستشار صناعي,شركة التصميم الصناعي,مورد أبواب صناعية,مهندس صناعي,نقابة المهندسين الصناعيين,مورد المعدات الصناعية,مورد الإطار الصناعي,مورد الغاز الصناعي,وكالة عقارات صناعية,سوبر ماركت صناعي,نقابة المهندسين التقنيين الصناعيين,مورد معدات الفراغ الصناعية,طبيب الأمراض المعدية,تاجر إنفينيتي,مكتب المعلومات,خدمات المعلومات,خمارة,خدمة الإعسار,معهد الجغرافيا والإحصاء,أجهزة المهندس,مقاول عزل,مخزن مواد عازلة,مورد عوازل,وكالة تامين,محامي تأمين,وسيط التأمين,شركة تأمين,مدرسة التأمين,سجل الملكية الفكرية,مكتب مهندس داخلي,مقاول البناء الداخلي,مصمم داخلي,باب داخلي,مقاول تركيبات داخلية,خدمة المصنع الداخلي,جناح الطب الباطني,مطار دولي,مدرسة دولية,مستشار التجارة الدولية,مقهى انترنت,خدمة التسويق عبر الإنترنت,مزود خدمة الإنترنت,مقهى للانترنت,طبيب باطني,بنك الاستثمار,شركة استثمار,خدمة الاستثمار,خدمة طباعة الدعوة,متجر البضائع الأيرلندية,حانة الأيرلندية,مطعم ايرلندي,مقاول حديد صلب,تاجر حديد,اعمال الحديد,مورد معدات الري,مطعم إسرائيلي,تاجر ايسوزو,بقالة إيطالية,مطعم إيطالي,IUP,معهد التكنولوجيا,تاجر جاكوار,معبد جاين,مطعم جامايكي,مورد معدات النظافة,خدمة الحراسة,مطعم ياباني أصيل,متجر الحلويات الرخيصة اليابانية,محل الحلويات اليابانية,مطعم كاري يابانى,أطعمة شهية يابانية,بقالة يابانية,مطعم ريوتي,مطعم هوت بوت الياباني,نزل ياباني مع ينابيع ساخنة,نزل يابانية,مطعم Izakaya,مدرس لغة يابانية,مطعم إقليمي ياباني,مطعم ياباني,ستيك هاوس ياباني,مطعم الحلويات اليابانية,مطعم غربي ياباني,نادي الجاز,تاجر جيب,قاعة الملكوت لشهود يهوه,الجواهري,مثمن مجوهرات,مشتري مجوهرات,مصمم مجوهرات,حفارة المجوهرات,مورد معدات المجوهرات,مصدر مجوهرات,مصنع المجوهرات,خدمة إصلاح المجوهرات,متجر مجوهرات,مطعم يهودي,مطعم جيانغ سو,نجار,المزاد القضائي,مراقب قضائي,نادي الجودو,مدرسة الجودو,محل عصير,مدرسة جوجيتسو,كلية المبتدئين,تاجر غير المرغوب فيه,متجر البريد العشوائي,Junkyard,قسم العدل,مصدر الجوت,مطحنة الجوت,مركز احتجاز الأحداث,نادي كبادي,مطعم كايسيكي,كاريوكي,ملهى لغناء كايروكى,خدمة تأجير معدات الكاريوكي,نادي الكاراتيه,مدرسة الكاراتيه,مطعم كشميري,تاجر دراجات بخارية كاواساكي,مطعم كازاخستاني,محل كباب,بيت الكلب,مورد الكيروسين,خدمة نسخ المفاتيح,تاجر كيا,مدرسة الكيك بوكسينغ,متجر النقبة والاستئجار,متجر الكيمونو,روضة أطفال,عالم الحركة,كشك,متجر أثاث المطبخ,معيد تشكيل المطبخ,متجر مستلزمات مطابخ,متجر الطائرات الورقية,صناعة السكاكين,متجر السكاكين,متجر متماسك,مدرب حياكة,مصنع تريكو,مطعم باربكيو كوري,مطعم لحم كوري,الكنيسة الكورية,بقالة كورية,مطعم كوري,مطعم الضلع الكوري,بقالة كوشير,مطعم كوشير,مدرسة الكونغ فو,مطعم كوشياكي,مطعم ياباني على طراز كيوتو,محامي علاقات العمل,إتحاد العمال,مختبر,مورد معدات المختبرات,نادي العمل,مورد سلم,مورد معدات الترقق,خدمة التصفيح,خدمة إصلاح المصباح,مورد مصباح الظل,تخصيص الأرض,هيئة تخطيط الأراضي,معهد الإصلاح الزراعي,تاجر لاند روفر,مكتب المساحة,مساح الأراضي,مهندس المناظر الطبيعية,مصمم المناظر الطبيعية,مصمم إضاءة المناظر الطبيعية,تنسيق الحدائق,متجر مستلزمات تنسيق حدائق,مدرسة لغة,مطعم لاوسي,جواهري,خدمة القطع بالليزر,مورد معدات الليزر,خدمة إزالة الشعر بالليزر,مركز تاج الليزر,جراح ليزك,مطعم أمريكا اللاتينية,مغسلة,غسيل ملابس,خدمة غسيل الملابس,متجر كتب القانون,شركة محاماة,مكتبة القانون,مدرسة القانون,نادي السلطانيات,خدمة رعاية الحديقة,خدمة تأجير معدات العشب,مورد معدات ري العشب,خدمة إصلاح جزازة العشب,متجر جزازة العشب,مقاول نظام رش العشب,محامي,نقابة المحامين,نادي الدوريات,منطقة تدريب السائق المتعلم,مركز التعلم,خدمة التأجير,خدمة تنظيف الجلود,متجر المعاطف الجلدية,مصدر جلود,الشركة المصنعة للمنتجات الجلدية,متجر سلع جلدية,مورد السلع الجلدية,تاجر السلع الجلدية بالجملة,خدمة إصلاح الجلود,تاجر جلود بالجملة,مطعم لبناني,مكتب الشؤون القانونية,مكتب المساعدة القانونية,خدمات قانونية,مركز ترفيه,تاجر سيارات لكزس,مكتبة,مكتب الترخيص,مورد إطارات لوحة الترخيص,ليدو,مدرب الحياة,وكالة التأمين على الحياة,مورد المصباح الكهربائي,مستشار اضاءة,مقاول إنارة,مصنع الإضاءة,متجر الإضاءة,تاجر إضاءة بالجملة,خدمة الليموزين,تاجر لينكولن ميركوري,خدمة تعليم الخط,متجر بياضات,الشركة المصنعة للملابس الداخلية,متجر الملابس الداخلية,تاجر الملابس الداخلية بالجملة,متجر مشمع,فرقة الأسد الراقص,المصفي,محل الخمور,تاجر الخمور بالجملة,برنامج محو الأمية,مطعم ليتواني,نادي الدوري الصغير,ميدان الدوري الصغير,شريط الموسيقى الحية,مكان للموسيقى الحية,شركة كسوة,دار مزاد الماشية,مربي ماشية,تاجر ماشية,منتج الثروة الحيوانية,وكالة القروض,مطعم لوبستر,مكتب الحكومة المحلية,متحف التاريخ المحلي,الخدمات الطبية المحلية,مزود أقفال,قفال,النزل,إقامة,كبائن الخشب,Log Home Builder,مقاول قطع الأشجار,الخدمة اللوجستية,مقوي الخسارة,مكتب الممتلكات المفقودة,بائع اليانصيب بالتجزئة,متجر اليانصيب,صالة,أحب فندق,منطقة منخفضة الانبعاثات,برنامج الإسكان لذوي الدخل المنخفض,تحويل غاز البترول المسال,خدمة إصلاح الأمتعة,محل امتعة,تاجر الحقائب بالجملة,متجر الأخشاب,مطعم غداء,الكنيسة اللوثرية,فندق فخم,صالة حفلات,معالج الصرف اللمفاوي,بناء الآلة,مورد آلة سكين,صيانة الجهاز,خدمة إصلاح الجهاز,ورشة الآلات,ورشة الآلة,مصنع قطع غيار الماكينات,الشركة المصنعة للآلات,مطعم ماكروبيوتيك,مطعم مادريليان,ناشر مجلة,متجر المجلات,ماجيك ستور,ساحر,ماه جونغ هاوس,خدمة تأجير صندوق البريد,مورد صندوق البريد,مورد آلة البريد,خدمة البريد,مكتب الجمارك الرئيسي,خبيرة تجميل,مطعم ماليزي,مستشفى الذكور,مطعم مالطي,خدمة التصوير الشعاعي للثدي,مدرسة الإدارة,مطعم ماندرين,قصر مالك العزبة,مصنع نقل المنزل,الصانع,منظمة الماوري,متجر الخرائط,خدمة رسم الخرائط,مارى,مقاول رخام,مورد رخام,مطعم ماركي,مارينا,مهندس بحري,قوة الدفاع عن النفس البحرية,متجر التوريدات البحرية,المساح البحري,المتحف البحري,سوق,مشغل السوق,باحث سوق,وكالة التسويق,مستشار تسويق,نادي ماركمينز,خدمة تأجير سرادق,الكاهن الزواج,مستشار زواج,مكتب ترخيص الزواج,نادى فنون القتال,مدرسة فنون قتالية,متجر مستلزمات فنون قتالية,المركز الماسوني,مقاول بناء,متجر مستلزمات البناء,مدرسة التدليك,مساج سبا,متجر مستلزمات التدليك,معالج بالتدليك,مصنع علب الثقاب,مورد معدات مناولة المواد,مستشفى الولادة,متجر أمومة,مدرسة الرياضيات,متجر مراتب,باني الضريح,موزع Mazda,توصيل الوجبات,الوجبات الجاهزة,مورد أجهزة القياس,باكر اللحوم,معالج اللحوم,منتجات اللحوم,مطعم طبق لحم,تاجر لحوم بالجملة,ميكانيكي,مقاول ميكانيكي,مهندس ميكانيكي,مصنع ميكانيكي,كلية الإعلام وعلوم المعلومات,شركة إعلامية,مستشار اعلامي,دار الإعلام,خدمة الوساطة,خدمة الفواتير الطبية,متجر كتب طبية,مركز طبي,خدمة الشهادات الطبية,عيادة طبية,مركز التصوير التشخيصي الطبي,الشركة المصنعة للمعدات الطبية,مورد المعدات الطبية,فاحص طبي,المجموعة الطبية,المختبرات الطبية,مكتب طبي,كلية الطب,سبا طبي,متجر مستلزمات طبية,الشركة المصنعة للتكنولوجيا الطبية,خدمة النسخ الطبي,مصدر دواء,مركز التأمل,مدرب التأمل,مطعم متوسطي,خدمة تخطيط الاجتماعات,فئة مهندي,مصمم موقع قران,الحوزة التذكارية,الحديقة التذكارية,كنيسة مينونايت,متجر ملابس رجالية,خياط رجالي,عيادة الصحة النفسية,خدمة الصحة العقلية,التطوير التجاري,تاجر مرسيدس بنز,كنيس يهودي مسيحي,شركة الإنشاءات المعدنية,مورد معدات الكشف عن المعادن,صانع المعادن,صقل المعادن,خدمة المعالجة الحرارية للمعادن,موردو الصناعات المعدنية,مورد ماكينات المعادن,خدمة تلميع المعادن,شركة تصنيع المعادن,خدمة ختم المعادن,مورد المعادن,ورشة عمل المعادن,ورشة المعادن,شركة التعدين,تاجر أدوات معدنية,منتج المعادن,متجر التوريدات الميتافيزيقية,الكنيسة الميثودية,شركة قطار متروبوليتان,متجر البضائع المكسيكية,بقالة مكسيكية,مطعم مكسيكي,Mfr,عالم الأحياء الدقيقة,خدمة إصلاح أفران الميكروويف,مطعم ميد أتلانتيك (الولايات المتحدة),مطعم شرق اوسطي,المدرسة المتوسطة,قابلة,أرشيف ميليتار,سكن ميليتار,ثكنات عسكرية,قاعدة عسكرية,المجلس العسكري,مقبرة عسكرية,المستشفى العسكري,مكتب التجنيد العسكري,مدرسة عسكرية,المدينة العسكرية,خدمة توصيل الحليب,مطحنة,متجر المطاحن,الخاص بي,شركة المياه المعدنية,المياه المعدنية بالجملة,ملعب جولف مصغر,متجر المنمنمات,خدمة تاكسي الميني باص,شركة التعدين,استشاري تعدين,مهندس تعدين,ادوات المنجم,وزارة التربية والتعليم,محل المرايا,مطعم ميسو كتليت,منظمة الأشخاص المفقودين,مهمة,تاجر ميتسوبيشي,متعهد المحمول,موبايل ديسكو,كوافير موبايل,تاجر منزل متنقل,موبايل هوم بارك,وكالة تأجير منازل متنقلة,متجر مستلزمات المنزل المحمول,وكيل المال المحمول,مشغل شبكة المحمول,محل إصلاح الهواتف المحمولة,مورد معدات التنقل,منطقة لعب السيارات النموذجية,شركة تصميم النموذج,استوديو المحفظة النموذجية,متجر نموذج القطار,وكالة النمذجة,مدرسة النمذجة,متحف الفن الحديث,مطعم بريطاني حديث,مطعم أوروبي حديث,مطعم فرنسي حديث,وحدات بناء المنزل,تاجر منزل معياري,صانع القالب,مورد صب,ديرصومعة,خدمة حوالة بريدية,خدمة تحويل الأموال,مطعم الشواء المنغولي,مطعم Monjayaki,خدمة الكتابة بالأحرف,مدرسة مونتيسوري,صانع النصب,تاجر دراجات بخارية,كنيسة مورافيا,مطاعم إيزاكايا الحديثة,مطعم مغربي,وسيط عقارات,مقرض عقاري,ثلاجة الموتى,مسجد,فندق صغير,تاجر دراجات بخارية,محل تصليح سكوتر,تاجر سيارات,تاجر دراجات بخارية,مدرسة لتعليم قيادة الدراجات النارية,وكالة تأمين الدراجات النارية,متجر قطع غيار الدراجات النارية,وكالة تأجير الدراجات النارية,محل تصليح دراجات بخارية,محل دراجات بخارية,نادي السيارات,متجر رياضة السيارات,تلفريك الجبل,المقصورة الجبل,فئة تسلق الجبال,كشك تأجير الأفلام,متجر تأجير الأفلام,إستيديو الأفلام,مسرح فيلم,خدمة النقل والتخزين,شركة نقل,متجر مستلزمات النقل,مركز التصوير بالرنين المغناطيسي,صالة الملاكمة التايلاندية,متجر كاتم الصوت,مورد نشارة,ناشر للوسائط المتعددة والكتب الإلكترونية,مكتب إدارة البلدية,المجالس البلدية,دائرة التنمية الزراعية بالبلدية,قسم البلدية للأغذية الزراعية,إدارة الدفاع المدني بالبلدية,قسم الاتصال البلدي,تمويل دائرة البلدية,إدارة البلدية للإسكان والتنمية الحضرية,دائرة الثقافة البلدية,دائرة الرياضة البلدية,دائرة السياحة البلدية,قسم العلوم البلدية,وزارة البلدية الدفاع الاجتماعي,حرس البلدية,دائرة الصحة البلدية,مكتب البلدية التعليم,التنمية الاجتماعية البلدية,متحف,متحف تاريخ الفضاء,متحف علم الحيوان,متجر صندوق الموسيقى,كلية الموسيقى,معهد الموسيقى,مدرس موسيقى,إدارة الموسيقى والترويج,منتج موسيقى,ناشر موسيقى,مدرسة موسيقى,متجر الموسيقى,نادي موسيقي,الشركة المصنعة للآلات الموسيقية,خدمة تأجير الآلات الموسيقية,محل إصلاح الآلات الموسيقية,متجر الآلات الموسيقية,موسيقي او عازف,موسيقي وملحن,مطعم لحم الضأن المشوي,صالون الأظافر,مربية,مهندس تقنية النانو,غابة وطنية,مؤسسة الصحة الوطنية,مكتبة الوطنية,متحف الوطني,متنزه قومي,محمية وطنية,متجر البضائع الأمريكية الأصلية,مطعم أمريكي أصلي,متجر الأطعمة الطبيعية,مورد الغاز الطبيعي,متحف التاريخ الطبيعي,مصدر الحجر الطبيعي,مورد الحجر الطبيعي,تاجر جملة للحجر الطبيعي,محمية طبيعية,ممارس العلاج الطبيعي,قاعدة بحرية,مطعم نافارايز,مطعم نابوليتان,محل تطريز,متجر لافتات النيون,طبيب حديثي الولادة,مطعم نيبالي,طبيب كلى,نادي كرة الشبكة,طبيب أعصاب,جراح الأعصاب,كنيسة العصر الجديد,مطعم نيو انجلاند,مطعم أمريكي جديد,سوق شجرة السنة الجديدة,مطعم نيوزيلندا,خدمة الأخبار,قسم اعلان الصحف,توزيع الصحف,ناشر جريدة,الصحف والمجلات,مطعم نيكاراغوا,ملهى ليلي,سوق ليلي,وكيل نيسان,الكنيسة غير المذهبية,منظمة غير حكومية,منظمة غير ربحية,بيت عطلات لغير المدخنين,محل معكرونة,مطعم شمال افريقيا,مطعم شمال ايطالي,مطعم نرويجي,جمعية كتاب العدل,كاتب العدل,متجر مفاهيم,تاجر جملة للتحف,متجر الجدة,مهندس نووي,شركة الطاقة النووية,محطة طاقة نووية,نادي العراة,Nudist Park,مطعم نويفو لاتينو,عالم الأعداد,دير,مدرسة حضانة,وكالة تمريض,جمعية التمريض,البيت,مدرسة التمريض,متجر البندق,اخصائي تغذيه,مطعم نيونيا,مطعم أوبانزاي,ملاحظة ظهر السفينة,مرصد,عيادة صحة المرأة,خدمة الصحة المهنية,طبيب الطب المهني,السلامة والصحة المهنية,أخصائي العلاج الوظيفي,مطعم اودين,مضمار السباق على الطرق الوعرة,منطقة الطرق الوعرة,متجر الرهان خارج المسار,مطعم أوفال بوت للطبخ,تاجر جملة للأكسسوارات المكتبية,خدمة تأجير المعدات المكتبية,خدمة إصلاح المعدات المكتبية,مورد معدات المكاتب,متجر أثاث مكتبي,مكتب السجلات الحيوية,خدمة تجديد المكاتب,وكالة تأجير المساحات المكتبية,متجر مستلزمات المكاتب,تاجر جملة للتوريدات المكتبية,خدمة التنقيب عن النفط والغاز,خدمة تغيير الزيت,شركة النفط والغاز الطبيعي,مورد معدات حقول النفط,مصفى نفط,مخزن الزيت,تاجر زيت بالجملة,حقل نفط,مطعم أوكونومياكي,تاجر أولدزموبيل,شركة تعبئة زيت الزيتون,جمعية زيت الزيتون التعاونية,مصنع زيت الزيتون,دكتور اورام,تاجر أوبل,متحف في الهواء الطلق,جامعة مفتوحة,شركة أوبرا,دار الأوبرا,اخصائي بصريات,عيادة طب وجراحة العيون,الشركة المصنعة للمنتجات البصرية,تاجر جملة للبصريات,اخصائي نظارات,طبيب العيون,جراح الفم,بستان,أوركسترا,مزرعة الأوركيد,مزارع الأوركيد,التبرع بالأعضاء وبنك الأنسجة,متجر الأدوية العضوية,مزرعة عضوية,متجر أغذية عضوية,مطعم عضوي,متجر عضوي,متحف الفن الشرقي,متجر البضائع الشرقية,عيادة الطب الشرقي,مخزن الطب الشرقي,متجر سجاد شرقي,ملجأ أيتام,دار الأيتام,تقويم الأسنان,الكنيسة الأرثوذكسية,كنيس أرثوذكسي,عيادة العظام,متجر أحذية تقويم العظام,جراح العظام,مقوم البصر,خدمة تقويم العظام والأطراف الصناعية,تقويم العظام,أخصائي أنف وأذن وحنجرة,عيادة الأنف والأذن والحنجرة,مستشفى الأنف والأذن والحنجرة,متجر خارجي للسيارات,منظم النشاط في الهواء الطلق,حمام خارجي,محل ملابس ومعدات خارجية,مرفق الفروسية في الهواء الطلق,متجر أثاث خارجي,سينما في الهواء الطلق,متجر الرياضة في الهواء الطلق,حمام سباحة خارجي,متجر ملابس خارجية,منافذ التسوق,أوتليت ستور,بقعة كوكتيل الأكسجين,مورد معدات الأكسجين,مطعم أويستر بار,مورد المحار,صالون باتشينكو,مطعم باسيفيك ريم,شركة تغليف,آلات التعبئة والتغليف,متجر مستلزمات التعبئة والتغليف,نادي البادل,محكمة باديل,باغودة,عيادة السيطرة على الآلام,طبيب علاج الألم,مصنع الطلاء,متجر الدهانات,شركة كشط الدهان,مركز بينت بول,متجر كرات الطلاء,دهان,لوحة,دروس الرسم,استوديو الرسم,متجر اللوحات,مطعم باكستاني,مورد البليت,مطعم بان آسيوي,مطعم بان لاتين,مطعم بان كيك,مورد اكياس ورقية,موزع الورق,مصدر ورق,مطحنة الورق,مورد آلة تمزيق الورق,تخزين الورق,مطعم باراجواي,مزود خدمات شبه قانوني,خدمة ركوب التزحلق الهوائي,أبرشية,منتزه,ركوب حديقة,مرآب للسيارات,ساحة لانتظار السيارات,ساحة انتظار للدراجات,ساحة انتظار للدراجات النارية,بقعة باركور,مدرسة الضيقة,معبد بارسي,رعاية نهارية بدوام جزئي,خدمة تأجير معدات الحفلات,مخطط حفلات,متجر الحفلات,وكيل الجوازات,مكتب الجوازات,معالج صور جواز السفر,محل باستا,متجر الحلويات,محامي براءات الاختراع,مكتب براءات الاختراع,خدمة اختبار الأبوة,أخصائي علم الأمراض,جمعية دعم المرضى,مورد الضميمة الفناء,المعجنات,مقاول رصف,مورد مواد الرصف,دكان البيدق,هاتف عمومي,خدمة الرواتب,مكتب الاتصال العام,منطقة مشاة,طبيب قلب الأطفال,طبيب أسنان الأطفال,اخصائي عيون الاطفال,طبيب الأطفال,متجر الأقلام,مطعم بنسلفانيا الهولندي,مكتب التقاعد,الكنيسة الخمسينية,بيت الناس إس,مجموعة الفنون المسرحية,مسرح الفنون المسرحية,متجر عطور,مركز فترة ما حول الولادة,اللثة,عيادة المكياج الدائم,مطعم فارسي,محامي الاصابة الشخصية,مدرب شخصي,مطعم بيروفي,خدمة مكافحة الحشرات,خدمة تبني الحيوانات الأليفة,خدمة استضافة الحيوانات الأليفة,الحيوانات الأليفة مقبرة,إقامة صديقة للحيوانات الأليفة,خدمة جنازة الحيوانات الأليفة,الحيوانات الأليفة مربية,خدمة نقل الحيوانات الأليفة,جليسة الحيوانات الأليفة,متجر للحيوانات الأليفة,متجر مستلزمات الحيوانات الأليفة,مدرب الحيوانات الأليفة,مهندس بتروكيماويات,شركة المنتجات البترولية,شركة الأدوية,مختبر صيدلاني,تاجر جملة للمنتجات الصيدلانية,مقابل,قاعة أوركسترا,مطعم فو,خدمة إصلاح الهاتف,وكالة الصور,مختبر الصور,خدمة استعادة الصور,محل تصوير,مورد ماكينات تصوير,مصور فوتوغرافي,حصة التصوير,مدرسة التصوير,خدمة التصوير,استوديو تصوير,طبيب فيزيائي,مركز الفحص البدني,برنامج اللياقة البدنية,خدمة الإحالة إلى الطبيب,معالج فيزيائي,عيادة العلاج الطبيعي,مورد معدات العلاج الطبيعي,بار البيانو,مدرس البيانو,صانع البيانو,خدمة نقل البيانو,خدمة إصلاح البيانو,متجر البيانو,خدمة ضبط البيانو,اختر منتج المزارع الخاص بك,أرض للنزهة,خدمة تجديد واستعادة إطار الصورة,محل إطارات الصور,متجر الفطيرة,استوديو بيلاتيس,سائق كوم,مكان الحج,مورد بيناتاس,مورد آلة الكرة والدبابيس,محل أثاث الصنوبر,مورد مواسير,الزحلقة Vtt,توصيل البيتزا,مطعم بيتزا,بيتزا تيك اواى,مكان للعبادة,القبة السماوية,تأجير المصانع والآلات,العناية بالنباتات,متجر نوافذ بلاست,الجص,مورد أكياس بلاستيكية,تاجر جملة للأكياس البلاستيكية,شركة تصنيع البلاستيك,خدمة صب حقن البلاستيك,مورد المنتجات البلاستيكية,مصنع راتنج البلاستيك,جراحة تجميلية,عيادة جراحة التجميل,تاجر بلاستيك بالجملة,خدمة الطلاء,العب المدرسة,ملعب,مورد معدات الملاعب,مجموعة اللعب,سباك,متجر مستلزمات السباكة,متجر ملابس زائد الحجم,مورد خشب رقائقي,مورد أدوات تعمل بالهواء المضغوط,مطعم بو بويز,طبيب الأرجل,اكاديمية الشرطة,متجر مستلزمات الشرطة,مطعم بولندي,حزب سياسي,نادي بولو,خدمة جهاز كشف الكذب,مورد بوليمر,مطعم بولينيزيا,البوليتكنيك,مزود الأغطية البلاستيكية والبوليثين,مقاول البركة,مورد أسماك البرك,متجر مستلزمات البركة,تاجر بونتياك,نادي المهر,خدمة ركوب المهر,أكاديمية البلياردو,نادي البلياردو,خدمة تنظيف المسبح,قاعة البلياردو,متجر الفشار,مطعم كاتسودون,مطعم عصيدة,تاجر بورش,سلطة الميناء,شركة تشغيل الموانئ,الشركة المصنعة للمباني المحمولة,مورد المراحيض المحمولة,ستوديو بورتريه,مطعم برتغالي,مكتب البريد,متجر الملصقات,فئات الفخار,مصنع الفخار,متجر فخار,مزرعة دواجن,متجر دواجن,خدمة مسحوق الطلاء,محطة طاقة,استشاري محطة توليد كهرباء,مورد معدات محطات توليد الطاقة,صيد الجمبري,المدرسة التمهيدية للألعاب الرياضية,مهندس دقيق,شركات البيوت الجاهزة,محافظة,مكتب حكومة المحافظة اليابانية,مركز رعاية الحمل,مدرسة اعدادية,الكنيسة المشيخية,مرحلة ما قبل المدرسة,الصحافة الاستشارية,خدمة الغسيل بالضغط,متجر بريتزل,كاهن,مدرسة ابتدائية,محل طباعة,ناشر موسيقى مطبوع,متجر إعادة تعبئة حبر الطابعة,خدمة إصلاح الطابعة,معدات ومستلزمات الطباعة,مورد معدات الطباعة,السجن,كلية خاصة,شركة الاسهم الخاصة,ملعب جولف خاص,الإقامة,مستشفى خاص,محقق خاص,مدرسة خاصة,بنك القطاع الخاص,مدرس خاص,جامعة خاصة,مكتب المراقبة,خادم العملية,طبيب المستقيم,إنتاج السوق,تاجر الجملة,برودوكتور دي الشمبانيا,برودوكتور دي فوا جرا,Producteur Eau Minerale,الجمعيات المهنية والهواة,منظم محترف,ممشى منتزه,مورد المنتجات الترويجية,مورد البروبان,متجر المروحة,مسؤول الملكية,استثمار الملكيه,صيانة الممتلكات,شركة إدارة الممتلكات,مكتب تسجيل الأراضي,الأطراف الصناعية,مورد ملابس واقية,الكنيسة البروتستانتية,مطعم بروفانس,مجلس المحافظة,مستشفى للأمراض النفسية,طبيب نفسي,نفسية,محلل نفسي,الطبيب النفسي,عيادة تخصصية نفسية وعصبية,عيادة علم النفس,ممارس طبي نفسي,معالج نفسي,حانة,دار وسائل الراحة العامة,حمام عام,حمام عام,مكتب المحامي العام,حمام نسائي عام,ملعب جولف عام,دائرة الصحة العامة,الإسكان العام,مكتبة عامة,حمام عام للذكور,مركز طبي عام,مساحة عامة لوقوف السيارات,مكتب النائب العام,شركة علاقات عامة,مكتب السلامة العامة,ساونا عامة,مدرسة عامة,بنك القطاع العام,حمام سباحة عام,الجامعات الحكومية,كاميرا الويب العامة,حمام عام للكراسي المتحركة,دائرة الأشغال العامة,الناشر,مطعم بورتوريكو,أخصائي أمراض الرئة,مورد مضخة,معدات الضخ والخدمات,اليقطين التصحيح,مطعم بنجابي,مسرح الدمى,صناعة PVC,مورد نوافذ PVC,سوق تشينغ فانغ,خدمة تأجير رباعية,كنيسة كويكر,مساح الكميات,مقلع,مطعم Québécois,متجر لحاف,تاجر سيارات السباق,مضمار,متجر قطع غيار سيارات السباق,مطعم راكليت,نادي كرة المضرب,خدمة إصلاح المبرد,محل المبرد,بث اذاعي,أخصائي أشعة,طوف رحلة Outfitter,التجديف,متحف السكك الحديدية,مقاول حديدي,شركة السكك الحديدية,مقاول سكة حديد,مورد معدات السكك الحديدية,مورد روابط السكك الحديدية,خدمات السكك الحديدية,مورد خزان مياه الأمطار,مطعم رامين,مزرعة,متجر الكتب النادرة,مطعم رو فود,مورد خرسانة جاهزة,وكالة عقارات,وكلاء عقارات,المثمن العقاري,محامي عقارات,بائع بالمزاد العقاري,المستشار العقاري,مطور عقارات,معرض العقارات,وكالة تأجير عقارات,مدرسة عقارات,مساح عقارات,مركز الاستصلاح,شركة الأسطوانات,مرفق تخزين السجلات,متجر التسجيلات,أستديو التسجيل,مركز ترفيهي,المجند,قيصرية,مركز إعادة التدوير,موقع إعادة تمثيل,ريفليكسولوجيست,كنيس الإصلاح,الكنيسة الإصلاحية,خدمة النقل المبرد,خدمة إصلاح الثلاجات,متجر ثلاجات,مخيم لاجئين,مطار إقليمي,المجلس الإقليمي,مكتب الحكومة الإقليمية,ممرض عام مسجل,غرفة التسجيل,مكتب التسجيل,مكتب التسجيل,مركز إعادة التأهيل,معالج ريكي,متجر الكتب الدينية,الوجهة الدينية,محل بضائع دينية,مؤسسة دينية,منظمة دينية,مدرسة دينية,مدرسة دينية,معيد التصميم,تاجر رينو,وكالة تأمين المستأجر,خدمة الصيانة,عيادة الصحة الإنجابية,متجر الزواحف,البحث وتطوير المنتجات,مهندس أبحاث,مؤسسة البحث,معهد البحوث,مكتب تسجيل المقيمين,كلية السكنية,جمعية المقيمين,منتجع,توقف الراحة,مطعم,براسيري,متجر مستلزمات مطاعم,استئناف الخدمة,وكالة تأجير مساحات البيع بالتجزئة,مورد جدار داعم,مجتمع التقاعد,دار للمتقاعدين,مركز ريتريت,أخصائي أمراض الروماتيزم,محل كسارة الأرز,طاحونه الأرز,مطعم رايس,محل الأرز,تاجر الأرز بالجملة,ميناء النهر,شركة إنشاءات الطرق,خدمة إصلاح آلة بناء الطرق,ركوب الدراجات على الطرق,مدينة السلامة على الطريق,جمعية مهندسي الطرق والموانئ والقنوات,تسلق الجبال,صالة ألعاب تسلق الصخور,مدرب تسلق الصخور,مقاول تنسيق حدائق الصخور,نادي موسيقى الروك,روك شوب,روديو,مورد المنتجات المعدنية المدرفلة,السفينة الدوارة,نادي التزلج,حلبة تزلج,مطعم روماني,مطعم روماني,مقاول تسقيف,متجر مستلزمات الأسقف,خدمة إحالة الحجرة,منطقة التجديف,نادي التجديف,نادي Rsl,مورد منتجات المطاط,متجر أختام مطاطية,متجر سجاد,كرة القدم الامريكية,نادي الرجبي,ملعب الرجبي,نادي دوري الرجبي,متجر الرجبي,متجر الجري,الكنيسة الأرثوذكسية الروسية,مطعم روسي,متجر أثاث ريفي,تاجر المركبات الترفيهية,آر في بارك,وكالة تأجير المركبات الترفيهية,محل إصلاح المركبات الترفيهية,مرفق تخزين المركبات الترفيهية,متجر توريد المركبات الترفيهية,تاجر صعب,Sacem,السروج,متجر Safe & Vault,مورد معدات السلامة,نادي الإبحار,منطقة فعاليات الإبحار,مدرسة الإبحار,صانع الشراع,مصنع الجعة ساكي,محل سلطة,بار الصلصا,دروس السالسا,مطعم سلفادوري,تاجر إنقاذ,باحة الانقاذ,مدرسة سامبا,مدرسة سامبو,سامبودروم,مورد الرمل والحصى,مصنع الرمل,خدمة السفع الرملي,متجر شطيرة,التفتيش الصحي,خدمة الصرف الصحي,خدمة الاتصالات عبر الأقمار الصناعية,تاجر ساتورن,ساونا,نادي ساونا,متجر ساونا,بنك التوفير,مطحنة المنشار,خدمة شحذ المنشار,سقالة,خدمة تأجير السقالات,مقياس نموذج النادي,متجر النماذج,خدمة إصلاح الميزان,مورد مقياس,مطعم اسكندنافي,بقعة ذات مناظر خلابة,مدرسة,مدير المدرسة,خدمة الحافلات المدرسية,مركز المدرسة,مكتب منطقة المدرسة,مدرسة للصم,مبنى المدرسة,مركز الغداء المدرسي,متجر مستلزمات المدرسة,نزل شباب المدرسة,أكاديمية العلوم,متحف العلوم,مورد أجهزة علمية,خدمة تأجير السكوتر,محل تصليح السكوتر,القاعة الكشفية,الرئيسية الكشفية,الكشافة,تاجر خردة المعادن,متجر سكرابوكينغ,طابعة الشاشة,محل طباعة الشاشة,متجر مستلزمات طباعة الشاشة,خدمة إصلاح الشاشة,متجر الشاشة,مورد المسمار,مدرب الغوص,وكالة رحلات الغوص,نحات,النحت,متحف النحت,مطعم دونبوري للمأكولات البحرية,مزرعة المأكولات البحرية,سوق المأكولات البحرية,مطعم للمأكولات البحرية,تاجر المأكولات البحرية بالجملة,متجر الختم,قاعدة الطائرة المائية,متجر البضائع الموسمية,متجر ادوات مستعملة,المدرسة الثانوية الثالثة,خدمة حراسة أمنية,خدمات الأمن,مثبت نظام الأمان,مورد نظام الأمن,مورد البذور,سيتاي,إقامة ذاتية الخدمة,مدرسة الدفاع عن النفس,غسيل سيارات الخدمة الذاتية,مطعم الخدمة الذاتية,مرفق التخزين الذاتي,مورد أشباه الموصلات,مدرسة,مركز كبار السن,رعاية المسنين,مدرسة ثانوية عليا,خدمة نظام الصرف الصحي,مطعم صربي,الإقامة المخدومة,الكنيسة السبتية,خدمة الصرف الصحي,نبات معالجة مياه المجاري,شركة خياطة,خدمة إصلاح ماكينة الخياطة,متجر ماكينات الخياطة,محل خياطة,المتخصص في علم الجنس,مطعم سيشل,مطعم سوكيياكي وشابو شابو,مطعم شابو شابو,مطعم شان دونغ,مطعم شنغهاي,خدمة شحذ,سقيفة البناء,شيرر الأغنام,مورد منتجات جلد الغنم والصوف,متجر معطف جلد الغنم,مقاول صفائح معدنية,متجر الموسيقى ورقة,مأوى,مسكن الإيواء,متجر رفوف,قسم الشريف,بنك شينكين,ضريح شنتو,بناء السفن,شركة بناء وإصلاح السفن,خدمة الشحن والبريد,شركة شحن,صناعة معدات الشحن,خدمة الشحن,حوض بناء السفن,مصنع الجعة شوتشو,مصنع احذية,محل تصليح الأحذية,خدمة تلميع الأحذية,متجر الأحذية,تاجر الأحذية بالجملة,درس شوغي,منطقة أحداث الرماية,الرماية,متجر أثاث سوبر ماركت,تسوق مجرب,مركز تسوق,وكالة تأجير شقق قصيرة الأمد,محل دش الباب,مورد باب الحمام,خدمة التقطيع,مزرعة الروبيان,مزار,مطعم سيتشوان,مطعم صقلية,مقاول انحياز,وكالة الجولات السياحية,تسجيل متجر,جورودوارا,محل مصنع الحرير,متجر الحرير,الفضة,مطعم سنغافوري,خدمة الغناء برقية,مدرسة ثانوية أحادية الجنس,منظمة الفردي,كلية السادسة النموذج,خدمة شحذ التزلج,متجر تزلج,حديقة لوح التزلج,متجر لوح التزلج,مدرب تزلج,ميدان رماية السكيت,مطعم كوشيغي وكوشيكاتسو,نادي التزلج,خدمة تأجير معدات التزلج,خدمة إصلاح التزلج,منتجع للتزلج,مدرسة التزلج,متجر التزلج,عيادة العناية بالبشرة,آلة بيع منتجات العناية بالبشرة,سكيتل آلي,نادي سكيتل,مركز القفز بالمظلات,مقاول كوة,مسلخ,عيادة النوم,خدمة إصلاح الأجهزة الصغيرة,خدمة المساعدة في المطالبات الصغيرة,خدمة إصلاح المحركات الصغيرة,مطعم سمول بليتس,متجر ذكي,محطة فحص الضباب الدخاني,مطعم الوجبات الخفيفة,خدمة إزالة الثلج,خدمة تأجير لوح التزلج,متجر على الجليد,تاجر الثلج,خدمة تأجير عربات الثلج,Soapland,سوبا نودل شوب,نادي كرة القدم,ملعب كرة القدم,ممارسة كرة القدم,مخزن لكرة القدم,نادي اجتماعي,محامي الضمان الاجتماعي,دائرة مالية الضمان الاجتماعي,مكتب الضمان الاجتماعي,منظمة الخدمات الاجتماعية,مركز الرعاية الاجتماعية,عامل اجتماعي,Societe de Flocage,مورد Sod,متجر صوفا,محل مشروبات غازية,مطعم سوبون,نادي الكرة اللينة,ملعب الكرة اللينة,شركة برمجيات,معهد تدريب البرمجيات,خدمة اختبار التربة,منزل سوكول,شركة الطاقة الشمسية,مقاول طاقة شمسية,مورد معدات الطاقة الشمسية,مورد نظام تسخين المياه بالطاقة الشمسية,محطة الطاقة الشمسية الكهروضوئية,شركة الوقود الصلب,مهندس نفايات صلبة,مطعم سول فود,مطعم للفقراء,مطعم شوربة,محل حساء,مطعم جنوب أفريقي,مطعم أمريكا الجنوبية,مطعم جنوب آسيا,مطعم جنوب شرق آسيا,مطعم جنوب إيطاليا,مطعم الجنوب (الولايات المتحدة),مطعم جنوب غرب فرنسا,مطعم الجنوب الغربي (الولايات المتحدة),مصنع الهدايا التذكارية,متجر للهدايا التذكارية,صانع صلصة الصويا,منتجع صحي,سبا ونادي صحي,حديقة سبا,منتجع,مدينة الحمامات,مدرسة اللغة الاسبانية,مطعم إسباني,مدرسة التربية الخاصة,المستشفى التخصصي,عيادة تخصصية,مستشفى تخصصي,أخصائي النطق,بنك الحيوانات المنوية,متجر التوابل,مصدر توابل,تجار جملة التوابل,مركز الروحاني,وكالة الرحلات الرياضية,محل ادوات الرياضة,تاجر جملة للأكسسوارات الرياضية,نادي ليلي رياضي,متجر البطاقات الرياضية,نادي رياضي,مجمع رياضي,خدمة تأجير المعدات الرياضية,معالج تدليك رياضي,عيادة الطب الرياضي,طبيب الطب الرياضي,متجر التذكارات الرياضية,متجر التغذية الرياضية,مدرسة رياضية,متجر الملابس الرياضية,الشركة المصنعة للملابس الرياضية,مورد الربيع,نادي الاسكواش,ملعب الاسكواش,مطعم سريلانكي,مستقر,ملعب,المسرح,مورد معدات إضاءة المسرح,استوديو الزجاج المعشق,مصنع الفولاذ المقاوم للصدأ,مقاول درج,خدمة تركيب الكشك,نادي جامعي الطوابع,متجر الطوابع,شريط الوقوف,حزمة المواد الغذائية الأساسية,حالة,أرشيف الدولة,وزارة الخارجية للتنمية الزراعية,وزارة الخارجية للأغذية الزراعية,وزارة الخارجية الدفاع المدني,وزارة الخارجية للاتصال,وزارة الخارجية المالية,وزارة الخارجية للتنمية الاجتماعية,وزارة الإسكان والتنمية الحضرية,وزارة الدولة للبيئة,وزارة الدولة للسياحة,وزارة الدولة للنقل,تكنولوجيا علوم وزارة الخارجية,وزارة الخارجية الدفاع الاجتماعي,وزارة الدولة للثقافة,وزارة الدولة للرياضة,وزارة التوظيف الحكومية,مكتب حكومة الولاية,متجر الخمور الحكومية,مكتب الدولة للتعليم,مزرعة مملوكة للدولة,حديقة الدولة,شرطة الولاية,التنمية الاجتماعية للدولة,مصنع القرطاسية,متجر القرطاسية,تاجر القرطاسية بالجملة,التماثيل,عيادة الأمراض المنقولة جنسيا,خدمة اختبار الأمراض المنقولة بالاتصال الجنسي,بيت شرائح اللحم,مطعم ستيمبوت,متجر كعكة على البخار,شركة الإنشاءات الفولاذية,موزع صلب,مورد براميل الصلب,نصب الصلب,صانع الصلب,مقاول هياكل الصلب,شركة تصميم الصلب,الشركة المصنعة لأعمال الصلب,متجر تأجير أجهزة الاستريو,خدمة إصلاح الاستريو,متجر الصوتيات المنزلية,الشركة المصنعة للملصقات,فئة الخياطة,سمسار الأوراق المالية,مبنى البورصة,نحت على الحجر,قطع الحجر,مورد الحجر,منشأة تخزين,متجر,مورد معدات المتجر,باني موقد,صانع الآلات الوترية,مهندس إنشائي,مقاول جص,مكتب الإرشاد الوظيفي للطلاب,مهجع الطلاب,مركز إسكان الطلاب,اتحاد الطلاب,رابطة أولياء أمور الطلاب,جمعية دعم الطلاب,ادرس في Home School,مركز الدراسة,حلاق,تاجر سوبارو,خط قطار الضواحي,مصنع السكر,شوجر شاك,مطعم سوكيياكي,مخيم صيفي,الصيف Toboggan Run,مطعم صنداى,متجر النظارات الشمسية,مقاول مشمس,سوبر بابليك باث,مستشار تقاعد,موقع Superfund,سوبر ماركت,نادي إنقاذ الأرواح,مدرسة الأمواج,متجر تصفح,دكتور جراح,المركز الجراحي,تاجر جملة للمنتجات الجراحية,متجر مستلزمات الجراحة,مطعم سورينامي,مخزن الفائض,مساح,مطعم سوشي,تاجر سوزوكي,تاجر دراجات بخارية سوزوكي,مطعم سويدي,نادي السباحة,حوض سباحة,مسابقة سباحة,مرفق السباحة,مدرب سباحة,بحيرة السباحة,حمام السباحة,مقاول حمامات السباحة,خدمة إصلاح حمامات السباحة,متجر مستلزمات حمامات السباحة,مدرسة سباحة,متجر ملابس السباحة,مطعم سويسري,كنيس أو مجمع يهودي,السباحة التوقيعية,مطعم سوري,شركة تي شيرت,متجر تي شيرت,خدمة تأجير الطاولات والكراسي,نادي تنس الطاولة,مرفق تنس الطاولة,متجر مستلزمات تنس الطاولة,متجر تاك,مطعم تاكو,منطقة شركات تاي كوون دو,مدرسة التايكواندو,وكالة الوسم,مدرسة تاي تشي,خياط,مطعم تايواني,مطعم تاكوياكي,وكالة المواهب,متجر تامالي,المدبغة,صالون تسمير,معبد الطاوي,تاباس بار,مطعم تاباس,متجر حصير,محل الوشم والثقب,خدمة إزالة الوشم,محل وشم,مقيم الضرائب,محامي الضرائب,مكتب تحصيل الضرائب,مستشار ضرائب,دائرة الضرائب,إعداد الضرائب,خدمة تحضير الضرائب,خدمة سيارات الأجرة,محطة التاكسي,المحنط,عيادة تي بي,مصدر الشاي,بيت الشاي,مصنع الشاي,سوق الشاي,متجر الشاي,تاجر الشاي بالجملة,كلية المعلمين,مدرسة تقنية,خدمة تقنية,جامعة فنية,متحف التكنولوجيا,حديقة التكنولوجيا,خدمة تبييض الأسنان,مدرسة الاتصالات,مقاول اتصالات,الاتصالات المهندس,مورد معدات اتصالات,مزود خدمة اتصالات,خدمة التسويق عبر الهاتف,خدمة الرد على الهاتف,شركة الهاتف,مقسم هاتفي,متجر التلسكوب,خدمة إصلاح التلفاز,محطة تلفاز,وكالة مؤقتة,مطعم تيمبورا دونبوري,مطعم تمبورا,ملكية المستأجر,اتحاد المستأجرين,نادي التنس,ملعب تنس,شركة إنشاء ملاعب التنس,مدرب تنس,متجر تنس,خدمة تأجير الخيام,مطعم تيبانياكي,مطعم تكس مكس,مهندس نسيج,مصدر منسوجات,مطحنة النسيج,معالج التدليك التايلاندي,مطعم التايلاندية,شركة المسرح,الإنتاج المسرحي,متجر مستلزمات المسرح,مورد أزياء مسرحية,متنزه، مدينة ترفيهية,الحمامات الحرارية,شركة الطاقة الحرارية,مورد الخيط,تاجر جملة للخيوط والغزول,متجر التوفير,مقاول بلاط,مصنع البلاط,متجر البلاط,خدمة إعلان الوقت ودرجة الحرارة,وكالة المشاركة بالوقت,مصنع الاطارات,متجر الاطارات,شركة العنوان,مصدر تبغ,محل تبغ,مورد تبغ,مطعم التوفو,متجر التوفو,متجر أدوات النظافة,توقف بقية الطريق برسوم مرور,عدد كشك,مورد خرطوشة الحبر,مطعم لسان,مطعم تونكاتسو,متجر الأدوات والقوالب,خدمة طحن الأدوات,الشركة المصنعة للأداة,خدمة تأجير الأدوات,محل إصلاح الأدوات,متجر الأدوات,تاجر جملة للأدوات,حجرة الأدوات,شركة طبوغرافيا,مورد التربة السطحية,وكالة جولة,المرشدين السياحيين,جذب سياحى,مركز المعلومات السياحية,خدمة اتصالات البرج,مزود معدات السحب,خدمة السحب,مجمع تاون هاوس,الشركة المصنعة للألعاب والألعاب,مكتبة الألعاب,الشركة المصنعة للألعاب,متحف الألعاب,متجر الالعاب,تاجر تويوتا,تاجر الجرارات,مورد معدات الجرارات,محل إصلاح الجرارات,شركة إنشاء المعارض التجارية,مدرسة مهنية,متجر بطاقات التداول,نادي الأزياء التقليدية,متجر كوستومي التقليدي,سوق تقليدي,مطعم تقليدي,المقهى التقليدي,مطعم أمريكي تقليدي,ضابط مرور,مركز شرطة المرور,تاجر مقطورات,مورد وصلة المقطورة,الشركة المصنعة للمقطورات,خدمة تأجير المقطورات,ورشة إصلاح المقطورات,متجر مستلزمات المقطورات,مركز تصليح القطارات,وكالة تذاكر القطار,عداد تذاكر القطار,ساحة القطار,مركز التدريب,مدرسة تدريب,خدمة النسخ,مترجم,متجر ناقل الحركة,خدمة مرافقة النقل,خدمة النقل,وكالة سفر,عيادة السفر,نزل المسافرين,مزرعة الشجرة,خدمة الشجرة,محامي الادعاء,المقر القبلي,كنيسة الثالوث,تاجر دراجات بخارية Triumph,متجر الكؤوس,متجر الأسماك الاستوائية,متجر ملحقات الشاحنات,تاجر شاحنات,مزارع شاحنة,مورد قطع غيار الشاحنات,وكالة تأجير الشاحنات,ورشة تصليح الشاحنات,توقف شاحنة,مورد شاحنة توبر,غسيل شاحنة,شركة شحن,مدرسة النقل بالشاحنات,مصنع تروس,بنك الثقة,موقف سيارات تسوكيجيمي,ضبط المورد,ضبط السيارة,مطعم تونسي,مورد العشب,مطعم تركي,مطعم تركمان,خراطة,مطعم توسكان,خدمة التدريس,متجر البدلة الرسمية,خدمة إصلاح الآلة الكاتبة,مورد آلة كاتبة,خدمة الطباعة,مطعم شعيرية أودون,مطعم أوكراني,مطعم أوناغي,متجر الملابس الداخلية,مستشار تأمين ضد البطالة,مكتب البطالة,مخزن أثاث غير مكتمل,متجر يونيفورم,حلاق,الكنيسة العالمية الموحدة,كنيسة كندا المتحدة,كنيسة المسيح المتحدة,الكنيسة الميثودية المتحدة,قاعدة القوات المسلحة الأمريكية,كنيسة الوحدة,جامعة,قسم الجامعة,مستشفى الجامعة,مكتبة الجامعة,خدمة تنظيف المفروشات,محل تنجيد,قسم التخطيط العمراني,مركز رعاية عاجلة,طبيب مسالك بولية,عيادة المسالك البولية,مطعم أوروجواي,مطعم شمال غرب المحيط الهادئ (الولايات المتحدة),متجر أجهزة مستعملة,متجر قطع غيار السيارات المستعملة,محل دراجات مستعملة,متجر الكتب المستعملة,تاجر سيارات مستعملة,مخزن الأقراص المضغوطة المستعملة,متجر ملابس مستعملة,متجر أجهزة كمبيوتر مستعملة,متجر أثاث مستعمل,متجر الألعاب المستعملة,تاجر دراجات بخارية مستعملة,متجر الآلات الموسيقية المستعملة,متجر أثاث مكتبي مستعمل,مورد تجهيزات المتجر المستعملة,متجر الإطارات المستعملة,تاجر شاحنات مستعملة,مقاول مرافق,تاجر مقطورة فائدة,مطعم أوزبكي,شقة العطل,وكالة تأجير منازل العطلات,محل تصليح المكانس الكهربائية,محل مكانس كهربائية,مزود نظام تنظيف الفراغ,مطعم بلنسية,خدمة صف السيارات,وكالة تأجير الشاحنات,متجر المبخر,متجر شامل,جراح الأوعية الدموية,استشاري فاستو,خدمة إصلاح VCR,مطعم نباتي,سوق الخضار بالجملة,تاجر خضروات بالجملة,مقهى نباتي وديلي,مطعم نباتي,مكتب فحص المركبات,مصدر السيارة,فحص المركبة,وكيل شحن مركبات,فيلودروم,مورد آلة البيع,طبيب تناسلي,مطعم البندقية,مطعم فنزويلي,مصنع معدات التهوية,شركة فينشر كابيتال,دائرة شؤون المحاربين القدامى,مركز المحاربين القدامى,مستشفى قدامى المحاربين,منظمة المحاربين القدامى,طبيب بيطري,صيدلية بيطرية,ألعاب الفيديو,خدمة إصلاح كاميرا الفيديو,مورد معدات مؤتمرات الفيديو,خدمة مؤتمرات الفيديو,خدمة نسخ الفيديو,خدمة تحرير الفيديو,خدمة إصلاح أجهزة الفيديو,كشك تأجير ألعاب الفيديو,خدمة تأجير ألعاب الفيديو,متجر تأجير ألعاب الفيديو,متجر ألعاب الفيديو,فيديو كاريوكي,خدمة إنتاج الفيديو,متجر فيديو,مطعم فيتنامي,فيلا,قاعة القرية,حقل عنب,كنيسة فينيارد,متجر ملابس عتيقة,متجر الكمان,تأجير المكاتب الافتراضية,مكتب التأشيرات والجوازات,مستشار تأشيرة,مركز الزوار,متجر فيتامينات ومكملات غذائية,مدرس صوتي,كلية المهني,المدرسة المهنية الأولى,مدرسة مهنية,تاجر فولكس فاجن,نادي الكرة الطائرة,ملعب كرة الطائرة,مدرب كرة طائرة,منظمة تطوعية,تاجر فولفو,مكتب تسجيل الناخبين,مرفق التصويت,روضة والدورف,مدرسة والدورف,عيادة الاستقبال,متجر ورق الحائط,متحف الحرب,مستودع,نادي المستودعات,مخزن المستودعات,خدمة إصلاح الغسالات والمجففات,محل غسالات ومجففات,خدمة إدارة النفايات,مشاهدة الصانع,خدمة إصلاح الساعات,متجر الساعات,مورد مبرد مياه,خدمة إصلاح أضرار المياه,مورد فلاتر المياه,خدمة قطع المياه النفاثة,مطحنة المياه,ملاهي مائية,بركة كرة الماء,مورد مضخة مياه,شركة تنقية المياه,متجر التزلج على الماء,نادي التزلج على الماء,مدرب تزلج على الماء,خدمة التزلج على الماء,مورد معدات معالجة عسر الماء,خدمة تأجير معدات الرياضات المائية,خدمة تنظيف خزان المياه,خدمة اختبار المياه,محطة لمعالجة المياه,مورد معالجة المياه,شركة مرافق المياه,أعمال المياه,مورد معدات أعمال المياه,خدمة إصلاح وتربيد,متجر Waterbed,شركة العزل المائي,متحف الشمع,مورد الشمع,خدمة إزالة الشعر بالشمع,خدمة التنبؤات الجوية,مطحنة النسيج,شركة استضافة المواقع,مصمم موقع,مخبز الزفاف,بوفيه الزفاف,مصلى الزفاف، مككان عقد القران,خدمة تأجير فستان الزفاف,مصور الزفاف,منظم حفلات الزفاف,خدمة الزفاف,محل هدايا الزفاف,متجر الزفاف,مكان الزفاف,تزن محطة,خدمة إنقاص الوزن,منطقة رفع الأثقال,وير,لحام,مورد غاز اللحام,متجر مستلزمات اللحام,مقاول حفر الآبار,مركز العافية,فندق العافية,برنامج العافية,مطعم الويلزية,كنيسة ويسليان,مطعم غرب افريقيا,متجر الملابس الغربية,مطعم غربي,وكالة جولات مشاهدة الحيتان,خدمة ضبط العجلات,متجر العجلات,خدمة تأجير الكراسي المتحركة,خدمة إصلاح الكراسي المتحركة,متجر للكراسي المتحركة,مخابز بالجملة,صيدلية بالجملة,بائع زهور بالجملة,متجر المواد الغذائية بالجملة,بقّال بالجملة,صائغ بالجملة,سوق الجملة,مشتل نباتات بالجملة,تاجر الجملة,تاجر جملة للأجهزة المنزلية,بقعة واي فاي,متجر ويكر,متجر شعر مستعار,حديقة الحياة البرية والسفاري,حديقة حيوانات برية,محمية للحياة البرية,خدمة إنقاذ الحياة البرية,مصنع سلة الصفصاف,مزرعة الرياح,منشئ توربينات الرياح,خدمة تنظيف النوافذ,خدمة تركيب النوافذ,مورد النوافذ,خدمة تظليل النوافذ,متجر معالجة النوافذ,متجر ركوب الأمواج,بار النبيذ,مخزون الخمر,نادي النبيذ,مرفق تخزين النبيذ,محل لبيع النبيذ,تاجر جملة ومستورد نبيذ,متجر مستلزمات صناعة النبيذ,مصنع الخمرة,مدرسة وينج تشون,مطعم ووك,متجر ملابس نسائية,كلية المرأة,منظمة نسائية,مدرب شخصي نسائي,خدمة حماية المرأة,ملجأ للنساء,مورد الخشب والأرضيات الخشبية,خدمة تركيب الأرضيات الخشبية,خدمة صقل الأرضيات الخشبية,مورد إطارات خشبية,متجر موقد الحطب,مورد خشب,فئة العمل على الخشب,النجار,متجر توريدات النجارة,متجر الصوف,محل ملابس العمل,نادي العمال,نزل المرأة العاملة,مدرسة المصارعة,مورد معدات الأشعة السينية,معمل الأشعة,مطعم شيانغ كوزين,سمسار اليخوت,نادي اليخوت,ياكاتابوني,مطعم ياكينيكو,مطعم ياكيتوري,تاجر دراجات بخارية ياماها,متجر غزل,مطعم يمني,يشيفا,مدرب اليوغا,مركز يوجا ريتريت,استوديو يوجا,رعاية الشباب,مركز شباب,متجر ملابس الشباب,نادي شباب,مجموعة من الشباب,بيوت الشباب,منظمة الشباب,منظمة الشباب للخدمات الاجتماعية,زاك,مطعم زهي جيانغ,حديقة حيوان,تطوير تطبيقات الجوال"
var arrs=iis.split(","); //split colorsString into array;

import { MaterialCommunityIcons } from '@expo/vector-icons';
const daily = [

  {day:'Saturday',selected:false},
  {day:'Sunday',selected:false},
  {day:'Monday',selected:false},
  {day:'Tuesday',selected:true},
  {day:'Wednesday',selected:false},
  {day:'Thursday',selected:false},
  {day:'Friday',selected:false},


];
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
        Searched:'',
        text:'',
         show: false,
page:1,
dateor:'',
game:'',
 isDateTimePickerVisible: false,
        lovemsg:'',
        hatemsg:'',
        business:'',
        Categories:'null',
Businessname:'',
office:'no',
Do:'',
end:'',
Address:'',
Available:0,
cate:'',
catar:'',
About:'',
selectedText:'',
        lie:'',
        daily:[

          {day:'Saturday',selected:false,ar:'سبت'},
          {day:'Sunday',selected:false,ar:'احد'},
          {day:'Monday',selected:false,ar:'اثنين'},
          {day:'Tuesday',selected:true,ar:'ثلاثاء'},
          {day:'Wednesday',selected:false,ar:'اربعاء'},
          {day:'Thursday',selected:false,ar:'خميس'},
          {day:'Friday',selected:false,ar:'جمعة'},


        ],
        title:'',
postStatus:null,
        color1:'steelblue',
        id:'',
        color:'red',
        num:0,
        commentsRef:'',
        time:'',
        dataSources: [],
        editable:  props.navigation.getParam('editable',false),

data:  props.navigation.getParam('data',[]),
username:  props.navigation.getParam('username',''),
myuid:  props.navigation.getParam('myuid',''),
secret:  props.navigation.getParam('secret',false),
firstlie:'',
secondlie:'',
thirdlie:'',
        commentsRefs:'',
    };
    this.arrayholder=[]



  }
  componentDidMount() {
  let item=[]
let num = 0
    colorsArray.forEach((child,index) => {
      num = num +1
      item.push({
        id:index,
      name:  child,
ar:arrs[index]?arrs[index]:'ستيسيتستي'
    });
   });
this.setState({dataSources:item,num:num})
if (this.state.editable) {

  this.setState({
    Businessname:this.state.data.Businessname,
    business:this.state.data.business,
    selectedText:this.state.data.Categories,
    About:this.state.data.About,
    serdes:this.state.data.About,
    priceav:this.state.data.priceav,
    time:this.state.data.time,
    Do:this.state.data.Do,
daily:this.state.data.daily,
Available:this.state.data.Available,
dateor:this.state.data.dateor
  })
}
  }
  edit = () => {
    this.setState({
      ploading:true,
      postStatus: this.props.appStore.arabic?'تعديل..':'Editing..',
            shows:true,pcolor:'warning'
    })
    const refs = firebaseApp.firestore().collection('Business').doc(this.state.data.postuid)
    const newPostKey = this.state.data.postuid

    let d =this.state.Available
    let end =Moment(this.state.dateor).add(d, 'hours').locale('en').format('hh:mm A')
          const username = firebaseApp.auth().currentUser.displayName
    const {Businessname,business,office,Address,About,daily,Available,Do}=this.state
  if (this.state.Businessname.length >0) {
    if (this.state.business.length>0&&this.state.selectedText.length>0) {

if (this.state.About.length >0) {

          const postData = {
            writerId:firebaseApp.auth().currentUser.uid,
            Businessname,
            user:username,
            business,
            Categories:this.state.cate,
            catar:this.state.catar,
            office,
            Address,
            About,
            dateor:this.state.dateor,
            Available,
            ratingno:this.state.data.ratingno,
            verfied:this.state.data.verfied,
            nofollowers:this.state.data.nofollowers,
            proimg:this.state.data.proimg,
            backimg:this.state.data.backimg,
            daily,
            time:this.state.time,
            end:end,
            Do,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:newPostKey,

          }

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)
    refs.update(postData)

          .then(() => {

            this.setState({
                            postStatus:this.props.appStore.arabic?'تم': 'Done',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',
                            id:newPostKey

                          })
  this.setState({shows:false})
this.props.navigation.goBack()

          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red' })
          })

        .catch(error => {
          console.log(error)
        })


      } else {

        this.setState({ploading:false,  postStatus:this.props.appStore.arabic?'الرجاء ادخال تفاصيل حول المشروع': 'Please enter about',shows:true ,pcolor:'red',page:3})
          setTimeout(() => {
          this.setState({shows:false})
        }, 3000)
      }
    } else {

      this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء اختيار العمل الذي تريده واختيار الصنف':'Please Select business you want to start & select category',shows:true ,pcolor:'red',page:2})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء ادخال اسم المشروع':"Please enter your business name",shows:true ,pcolor:'red',page:1})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }


  }

  handleOpen = () => {
   this.setState({ show: true })
 }

 handleClose = () => {
   this.setState({ show: false })
   this.props.navigation.goBack()
 }
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
  header:null
  });
send=()=>{
  Alert.alert(
  'هل تريد من صديقك معرفة اسمك؟',
  'عند الارسال بسرية لا يستطيع صديقك معرفة هويتك',
  [
    {text: 'الرجوع', onPress: () => console.log('Ask me later pressed')},
    {text: 'ارسل بسرية', onPress:this.createsecret, style: 'cancel'},
    {text: 'ارسال', onPress: this.create},
  ],
  { cancelable: false }
)
}
  onValueChange1(value: string) {
    this.setState({
      title: value,
    });
  }
  onValueChange2(value: string) {
    this.setState({
      lie: value,
    });
  }
  create = () => {
    this.setState({
      ploading:true,
      postStatus: this.props.appStore.arabic?'جاري البدء..':'Starting..',
      shows:true,pcolor:'warning'
    })
    console.log("title===="+this.state.title);
    const refs = firebaseApp.firestore().collection('Business').doc()
    const newPostKey = refs.id

    let d =this.state.Available
    let end =Moment(this.state.dateor).add(d, 'hours').locale('en').format('hh:mm A')
          const username = firebaseApp.auth().currentUser.displayName
    const {Businessname,business,office,Address,About,daily,Available,Do}=this.state
  if (this.state.Businessname.length >0) {
    if (this.state.business.length>0&&this.state.selectedText.length>0) {

if (this.state.About.length >0) {

          const postData = {
            writerId:firebaseApp.auth().currentUser.uid,
            Businessname,
            user:username,
            business,
            Categories:this.state.cate,
            catar:this.state.catar,
            office,
            Address,
            About,
            dateor:this.state.dateor,
            Available,
            ratingno:0,
            verfied:false,
            nofollowers:0,
            proimg:'https://i.ibb.co/1q2XTpb/Untitled-design-15.png',
            backimg:'https://i.ibb.co/dWk3Gj1/Untitled-design-16.png',
            daily,
            time:this.state.time,
            end:end,
            Do,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:newPostKey,

          }

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)
    refs.set(postData)

          .then(() => {

            this.setState({
                            postStatus: this.props.appStore.arabic?'تم شكرا لك':'Done, Thank you',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',
                            id:newPostKey

                          })
  this.setState({shows:false})
  this.handleOpen()


          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red' })
          })

        .catch(error => {
          console.log(error)
        })


      } else {

          this.setState({ploading:false,  postStatus:this.props.appStore.arabic?'الرجاء ادخال تفاصيل حول المشروع': 'Please enter about',shows:true ,pcolor:'red',page:3})
          setTimeout(() => {
          this.setState({shows:false})
        }, 3000)
      }
    } else {

        this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء اختيار العمل الذي تريده واختيار الصنف':'Please Select business you want to start & select category',shows:true ,pcolor:'red',page:2})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء ادخال اسم المشروع':"Please enter your business name",shows:true ,pcolor:'red',page:1})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }


  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({time:Moment(date).locale('en').format('hh:mm A'),dateor:date})
    this.hideDateTimePicker();
  };
   inc=()=>{



          firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/balance`).transaction(function(currentClicks) {
    // If node/clicks has never been set, currentRank will be `null`.
    return (currentClicks || 0) - 2;
  })


  }
  _selectedValue(index, item) {
  this.setState({ selectedText: this.props.appStore.arabic?item.ar:item.name,cate:item.name,
  catar:item.ar });
}
     onSelectColor(color) {
       this.setState({ color });
     }
     onSelectColor1(color1) {
       this.setState({ color1 });
     }
  render() {

    const {navigation}=this.props
    return (
      <ThemeContext.Consumer>
        {theme => (
     <View style={{flex:1}}>
          <Header searchBar rounded style={{width: width,backgroundColor: gStyle.container[theme].backgroundColor}}>
          <Left>
                     <Button transparent onPress={()=>navigation.goBack()}>
                     <FontAwesome name={'close'} size={25} color={'black'} />

                     </Button>
                   </Left>
                   <Body>
                     <Title style={[{color:'#000000'}]}>{this.props.appStore.arabic?'مشروع جديد':'New Business'}</Title>
                   </Body>

      </Header>
      <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize: 13,color: 'red'}]}>{this.state.postStatus}</Text>

      <SCLAlert
               theme="success"
               show={this.state.show}
               title={this.props.appStore.arabic?'تهانينا':"congratulations"}
               subtitle={this.props.appStore.arabic?'لقد بدأت مشروعك الخاص':"You started new business"}
             >
               <SCLAlertButton theme="success" onPress={()=>{navigation.navigate('Completebusiness',{id:this.state.id});
             this.setState({show:false})}}>{this.props.appStore.arabic?'اكمل':'Continue'}</SCLAlertButton>
               <SCLAlertButton theme="default" onPress={this.handleClose}>{this.props.appStore.arabic?'عودة للشاشة الرئيسة':'Back to home'}</SCLAlertButton>

             </SCLAlert>
      {this.state.postStatus==='Starting..'||this.state.postStatus==='جاري البدء..' ? <Loading/> :  <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center',backgroundColor: '#fdfdfd'}]}
        style={gStyle.containersssss[theme]}
      >
      <Spinner
             visible={this.state.spinner}
             textContent={'Loading...'}
             textStyle={{color:'#fff'}}
           />

           {this.state.page==2?this.AddTitle(theme):null}
           {this.state.page==1?this.AddTruth(theme):null}
           {this.state.page==3?this.AddChallenge(theme):null}
           {this.state.page==4?this.Adddare(theme):null}
           {this.state.page==3&&this.state.title=='both'?this.Adddare(theme):null}
           {this.state.page==2&&this.state.title=='love'?this.lovedoor(theme):null}
           {this.state.page==3&&this.state.title=='love'?this.hatedoor(theme):null}
           {this.state.page==2&&this.state.title=='lie'?this.liegame(theme):null}





{!this.state.secret?<View
  style={{
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
width
  }}
>
  <Button

    bordered
    danger
    disabled={this.state.page==1?true:false}
    onPress={()=>this.setState({page:--this.state.page})}

    style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,borderRadius: 9}}
  >
    <Text style={[gStyle.button,{color:'#eb144c'}]}>{this.props.appStore.arabic?'رجوع':'Before'}</Text>
  </Button>
  <Button
    block

onPress={this.state.page==4?this.state.editable?this.edit:this.create:()=>{this.setState({page:++this.state.page})}}
    style={{ justifyContent: 'center', alignItems: 'center',padding: 15,flex:1,marginHorizontal: 5,backgroundColor: "#eb144c",borderRadius: 9}}
  >
    <Text style={[gStyle.button,gStyle.text['dark']]}>{this.state.page==4?this.state.editable?this.props.appStore.arabic?"تعديل":'Edit':this.props.appStore.arabic?'بدأ':'Start':this.props.appStore.arabic?'التالي':'Next'}</Text>
  </Button>
</View>:null}
<Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize: 21,color: 'red'}]}>{this.state.postStatus}</Text>

      </ScrollView>}
      </View>
    )}

  </ThemeContext.Consumer>

    );
  }
  createsecret = () => {
    this.setState({
      ploading:true,
      postStatus: 'جاري الارسال..',
      shows:true,pcolor:'warning'
    })
    const newPostKey = firebaseApp.database().ref('door').push().key

          const uid = this.state.myuid
          const username = this.state.username
const userid =this.state.data.userId

  if (this.state.title.length !=='null') {
    if (this.state.lovemsg.length >0||this.state.hatemsg.length >0||(this.state.title=='lie'&&this.state.firstlie.length>0&&this.state.secondlie.length>0&&this.state.thirdlie.length>0&&this.state.lie.length >0&&this.state.lie.length>0)) {

          const postData = {
            writerId:uid,
            title:this.state.title,
            user:'مجهول',
          firstdoor:this.state.lovemsg,
          seconddoor:this.state.hatemsg,
          firstLock:true,
          secondlock:true,
          accept:false,
          lie:this.state.lie,
          firstlie:this.state.firstlie,
          secondlie:this.state.secondlie,
          thirdlie:this.state.thirdlie,
          onedoor:this.state.title ==='truth'||this.state.title=='challenge'?true:false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:newPostKey,

          }
          let updates = {}
          let updatess = {}

          updates['Doors/' + userid+'/'+newPostKey] = postData

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

          firebaseApp.database().ref().update(updates)
          .then(() => {
            fetch('https://onesignal.com/api/v1/notifications',
             {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': "Basic NmIxNTQ4OWEtMzgzZi00YjI5LWFjM2EtYzdmNjYyYTUxNmZl",
               },
               body: JSON.stringify(
               {
                 app_id: "092f9c3e-c1c4-4952-abdc-4dcd497ceddb",
                 included_segments: ["All"],
                 headings: {"en": "هناك من ارسل لك باب سري"},
                 android_sound: "fishing",
                 data: {"puid": newPostKey, "new_message":true},
                 ios_sound: "fishing.caf",
                 contents: {"en": "شخص ما ارسل لك باب سري افتح الباب لتقرأ ما بداخله" },
        filters: [{"field":"tag","key":"uid","relation":"=","value":userid}],
               })
             })
             .then((response) => response.json())
             .then((responseData) => {
                 console.log("Push POST:" + JSON.stringify(responseData));
                 responseData.json()
             })
            this.setState({
                            postStatus: 'Done, thank you',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',

                          })
  this.setState({shows:false})
  alert('تم ارسال رسالتك')
this.props.navigation.goBack()

          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red' })
          })

        .catch(error => {
          console.log(error)
        })




    } else {

        this.setState({ploading:false,  postStatus: 'الرجاء عدم ترك ايا حقل فارغ',shows:true ,pcolor:'red'})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: 'الرجاء اختيار عنوان',shows:true ,pcolor:'red'})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }

this.inc()

  }

AddTitle = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 10}}>

  <Item picker >
  <Picker

 style={{ height: 50, width: width,marginVertical: 20}}
 selectedValue={this.state.business}
 onValueChange={(business)=>this.setState({business})}

>
<Picker.Item label={this.props.appStore.arabic?'ما العمل الذي تريده(مطلوب)':"What business you want to start?(require)"} value="null" />

<Picker.Item label={this.props.appStore.arabic?'شركة':"Company"} value="Company" />
<Picker.Item label={this.props.appStore.arabic?'مقدم خدمات':"Services Provider"} value="Services Provider" />
<Picker.Item label={this.props.appStore.arabic?'متجر محلي':"Local store"} value="Local store" />
<Picker.Item label={this.props.appStore.arabic?'عمل محلي':"Local business"} value="Local business" />

</Picker>
  </Item>
  <RNPicker
             dataSource={this.state.dataSources}
             dummyDataSource={this.state.dataSources}
arabic={this.props.appStore.arabic}
             defaultValue={false}
             pickerTitle={this.props.appStore.arabic?'اختيار الاصناف':`Categories Picker `}
             showSearchBar={true}
             disablePicker={false}
             arabichold={"اختر قسم او صنف"}
             changeAnimation={"none"}
             searchBarPlaceHolder={this.props.appStore.arabic?'بحث..':"Search....."}
             showPickerTitle={true}
             pickerStyle={Styles.pickerStyle}
             itemSeparatorStyle={Styles.itemSeparatorStyle}
             pickerItemTextStyle={Styles.listTextViewStyle}
             selectedLabel={this.state.selectedText}
             placeHolderLabel={this.state.placeHolderText}
             selectLabelTextStyle={Styles.selectLabelTextStyle}
             placeHolderTextStyle={Styles.placeHolderTextStyle}
             dropDownImageStyle={Styles.dropDownImageStyle}
             selectedValue={(index, item) => this._selectedValue(index, item)}
           />

  </View>
)
}
AddTruth = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 20}}>

  <Form style={{width:width }}>

<Input
  placeholder={this.props.appStore.arabic?'اكتب اسم مشروعك او عملك':'Enter your business name..(required)'}
  value={this.state.Businessname} onChangeText={(Businessname)=>this.setState({Businessname})}
/>
              </Form>

              </View>
)
}
onUpdateItem = (i,d) => {
  this.setState({
    daily: this.state.daily.map(el => (el.day === i ? {...el, selected:!d} : el))
  });
 };

AddChallenge = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',padding:10}}>

  <Form style={{width:width-10 }}>
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'معلومات حول شركتك':'About your business'}
  </Label>
              <Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#fff'}]} value={this.state.About} onChangeText={(About)=>this.setState({About})} bordered placeholder={this.props.appStore.arabic?'الرجاء ادخال تفاصيل حول مشروعك':"Enter details about your business.."} />

<Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
{this.props.appStore.arabic?'الايام المتاحة':'Days available'}
</Label>

<View style={{alignItems: 'center',marginVertical: 10}}>
<ScrollView horizontal={true}>
{this.state.daily.map((item)=>{
  return(
  <TouchableOpacity onPress={()=>this.onUpdateItem(item.day,item.selected)} style={{marginHorizontal: 20,flex:1,paddingHorizontal: 20,paddingVertical: 10,borderRadius: 12,backgroundColor:item.selected?'#eb144c':'#fff',borderColor:'#eb144c',borderWidth: 0.5,alignItems: 'center',justifyContent: 'center'}}>
  <Text style={{color:item.selected?'#fff':'#eb144c'}}>{this.props.appStore.arabic?item.ar:item.day}</Text>
  </TouchableOpacity>)
})}
</ScrollView>
</View>
<Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
{this.props.appStore.arabic?'الوقت المتاح':'Time Opening'}
</Label>
<View style={{padding: 20}}>
<Button



block
  onPress={this.showDateTimePicker}

  style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,width: '100%',backgroundColor:'#eb144c'}}
>
  <Text style={[gStyle.button,{color:'#fff'}]}>{this.state.time.length>0?this.state.time:this.props.appStore.arabic?'اختر الوقت المتاح فيه':'Pick time Available'}</Text>
</Button>
</View>
<DateTimePicker
mode="time"
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <Item picker style={{marginVertical:10}} >
        <Picker

       style={{ height: 50, width: width,marginVertical: 10}}
       selectedValue={this.state.Available}
       onValueChange={(Available)=>this.setState({Available})}

      >
      <Picker.Item label={this.props.appStore.arabic?'متاح 24 ساعة':"24 hours available"} value={0} />

      <Picker.Item label={this.props.appStore.arabic?'تعمل ساعتين باليوم':"Working 2 hours/day"} value={2} />

      <Picker.Item label={this.props.appStore.arabic?'تعمل 3 ساعات باليوم':"Working 3 hours/day"} value={3} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 4 ساعات باليوم':"Working 4 hours/day"} value={4} />

      <Picker.Item label={this.props.appStore.arabic?'تعمل 5 ساعات باليوم':"Working 5 hours/day"} value={5} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 6 ساعات باليوم':"Working 6 hours/day"} value={6} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 7 ساعات باليوم':"Working 7 hours/day"} value={7} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 8 ساعات باليوم':"Working 8 hours/day"} value={8} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 9 ساعات باليوم':"Working 9 hours/day"} value={9} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 10 ساعات باليوم':"Working 10 hours/day"} value={10} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 11 ساعة باليوم':"Working 11 hours/day"} value={11} />

      </Picker>
        </Item>
            </Form>
              </View>
)
}
Adddare = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',padding:10}}>

  <Form style={{width:width-10 }}>
<Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
{this.props.appStore.arabic?'اكتب خدمات شركتك او ماذا تقدم':'Write your business services'}
</Label>
<Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#fff'}]} value={this.state.Do} onChangeText={(Do)=>this.setState({Do})} bordered placeholder={`${this.props.appStore.arabic?'الرجاء ادخال قائمة الخدمات او الاصناف التي تقدمها..':'Enter list of services/offers you do in your business..'}
${this.props.appStore.arabic? `مثال :
بيع اجهزة, مواد تموينية ,ملابس ,وجبات طعام جاهزة
  `:` e.g :
   •${this.state.title=='store'?'selling mobiles':'fixes mobiles'}
  •${this.state.title=='store'?'selling clothes':'Online Marketing'}
  •Others services /offers`}`} />






            </Form>
              </View>
)
}
Addtruthques = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب سؤال تريد من صديقك الاجابة عليه بصراحة</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا تريد من صديقك ان يصارحك به اذا اختار باب الصراحة" />
            </Form>
              </View>
)
}
lovedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب اكثر شئ تحبه في صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا يعجبك اكثر في شخصية صديقك.." />
            </Form>
              </View>
)
}
hatedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>ماذا تكره في شخصية صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea  rowSpan={5} style={gStyle.text[theme]} value={this.state.hatemsg}  onChangeText={(hatemsg)=>this.setState({hatemsg})} bordered placeholder="مالذي تكرهه في شخصية صديقك.." />
            </Form>
              </View>
)
}
liegame = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>باب الكذب</Text>
  <Text style={[gStyle.p,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>طريقة اللعب: يجب كتابة 3 كذبات اثنان منهم حقيقة وواحدة كذب يجب على صديقة معرفة الكذبة</Text>

  <Form style={{width:width-10 }}>
              <Textarea onChangeText={(firstlie)=>this.setState({firstlie})} value={this.state.firstlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الاولى" />
              <Textarea  onChangeText={(secondlie)=>this.setState({secondlie})} value={this.state.secondlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الثانية"/>

              <Textarea  onChangeText={(thirdlie)=>this.setState({thirdlie})} value={this.state.thirdlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الثالثة" />
              <Item picker >
              <Picker

              style={{ height: 50, width: width,color:'white' }}
              selectedValue={this.state.lie}
              onValueChange={this.onValueChange2.bind(this)}

              >
              <Picker.Item label="اختر الكذبة" value="" />

              <Picker.Item label="الاولى" value="first" />
              <Picker.Item label="الثانية" value="second" />
              <Picker.Item label="الثالثة" value="third" />

              </Picker>
              </Item>
            </Form>
              </View>
)
}
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  itemSeparatorStyle:{
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#D3D3D3"
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left"
  },
  pickerStyle: {
    marginLeft: 21,
    elevation:3,
    paddingRight: 25,
    marginRight: 12,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderWidth:1,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row"
  }
});
