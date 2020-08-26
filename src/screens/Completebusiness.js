import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,TouchableHighlight,Image,ActivityIndicator} from "react-native";
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
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';


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
async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebaseApp
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
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
About:'',
selectedText:'',
phone:'',
whats:'',
web:'',
pimage:'https://i.ibb.co/MgMwpsx/company-placeholder.jpg',
mail:'',
facebook:'',
instagram:'',
twitter:'',
linkedin:'',
youtube:'',
        lie:'',
        daily:[

          {day:'Saturday',selected:false},
          {day:'Sunday',selected:false},
          {day:'Monday',selected:false},
          {day:'Tuesday',selected:true},
          {day:'Wednesday',selected:false},
          {day:'Thursday',selected:false},
          {day:'Friday',selected:false},


        ],
        title:'',
postStatus:null,
        color1:'steelblue',
        color:'red',
        commentsRef:'',
        time:'',
        dataSources: [],
data:  props.navigation.getParam('data',[]),
username:  props.navigation.getParam('username',''),
myuid:  props.navigation.getParam('id',''),
editdata:  props.navigation.getParam('editdata',[]),
editactive:  props.navigation.getParam('editactive',false),

secret:  props.navigation.getParam('secret',false),
firstlie:'',
secondlie:'',
image:'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png',
uploading:false,

thirdlie:'',
        commentsRefs:'',
    };
    this.arrayholder=[]



  }
  componentDidMount() {
    if (this.state.editactive&& this.state.editdata.completed) {
      this.setState({
  phone:this.state.editdata.phone,
  web:this.state.editdata.web,
  mail:this.state.editdata.mail,
  whats:this.state.editdata.whats,
  facebook:this.state.editdata.facebook,
  instagram:this.state.editdata.instagram,
  twitter:this.state.editdata.twitter,
  linkedin:this.state.editdata.linkedin,
  youtube:this.state.editdata.youtube,
  pimage:this.state.editdata.proimg,
  image:this.state.editdata.backimg,

      })
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
  _pickImage = async () => {
     let pickerResult = await ImagePicker.launchImageLibraryAsync({
       allowsEditing: true,
       aspect: [4, 3],
     });
     this._handleImagePicked(pickerResult);
   };
  _handleImagePicked = async pickerResult => {
     try {
       this.setState({uploading:true})

     this.setState({postStatus:this.props.appStore.arabic?'تحميل الصورة':'Image loading..',refreshing:true})
       if (!pickerResult.cancelled) {
           this.setState({image:await uploadImageAsync(pickerResult.uri)})
       }
         console.log("state ===="+image);
     } catch (e) {
       console.log(e);
       this.setState({postStatus:'Something went wrong',refreshing:false})

     } finally {
       this.setState({uploading:false,refreshing:false})
       this.setState({postStatus:''})


     }
   };
   profileimgpick = async () => {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      this._handleImagePicked1(pickerResult);
    };
   _handleImagePicked1 = async pickerResult => {
      try {
        this.setState({uploading:true})

      this.setState({postStatus:this.props.appStore.arabic?'تحميل الصورة':'Image loading..',refreshing:true})
        if (!pickerResult.cancelled) {
            this.setState({pimage:await uploadImageAsync(pickerResult.uri)})
        }
          console.log("state ===="+image);
      } catch (e) {
        console.log(e);
        this.setState({postStatus:'Something went wrong',refreshing:false})

      } finally {
        this.setState({uploading:false,refreshing:false})
        this.setState({postStatus:''})


      }
    };

  onValueChange2(value: string) {
    this.setState({
      lie: value,
    });
  }
  create = () => {
    this.setState({
      ploading:true,
      postStatus: 'Starting..',
      shows:true,pcolor:'warning'
    })
    console.log("title===="+this.state.title);
    const refs = firebaseApp.firestore().collection('Business').doc()
    const newPostKey = refs.id
    var backimging = this.state.image.length>0?this.state.image:'https://i.ibb.co/dWk3Gj1/Untitled-design-16.png'
    var proimging = this.state.pimage.length>0?this.state.pimage:'https://i.ibb.co/dWk3Gj1/Untitled-design-16.png'

          const username = firebaseApp.auth().currentUser.displayName
  if (true) {
    if (true) {

if (true) {

          const postData = {
            phone:this.state.phone,
            web:this.state.web,
            mail:this.state.mail,
            whats:this.state.whats,
            facebook:this.state.facebook,
            instagram:this.state.instagram,
            twitter:this.state.twitter,
            linkedin:this.state.linkedin,
            youtube:this.state.youtube,
            proimg:proimging,
            backimg:backimging,
            completed:true

          }
          let updates = {}
          let updatess = {}

firebaseApp.firestore().collection('Business').doc(this.state.myuid).update(postData)

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)


          .then(() => {

            this.setState({
                            postStatus: 'تم شكرا لك.',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',

                          })
  this.setState({shows:false})
this.props.navigation.navigate('Mappickers',{type:'Business',id:this.state.myuid})

          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red' })
          })

        .catch(error => {
          console.log(error)
        })


      } else {

          this.setState({ploading:false,  postStatus: 'Please enter about',shows:true ,pcolor:'red'})
          setTimeout(() => {
          this.setState({shows:false})
        }, 3000)
      }
    } else {

        this.setState({ploading:false,  postStatus: 'Please Select business you want to start & select category',shows:true ,pcolor:'red'})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: "Please enter your business name",shows:true ,pcolor:'red'})
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
    this.setState({time:Moment(date).format('hh:mm A'),dateor:date})
    this.hideDateTimePicker();
  };
   inc=()=>{



          firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/balance`).transaction(function(currentClicks) {
    // If node/clicks has never been set, currentRank will be `null`.
    return (currentClicks || 0) - 2;
  })


  }
  _selectedValue(index, item) {
  this.setState({ selectedText: item.name });
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
                     <Title style={[{color:'#000000'}]}>{this.props.appStore.arabic?'اكمال المعلومات':'Complete business'}</Title>
                   </Body>

      </Header>
      <SCLAlert
               theme="success"
               show={this.state.show}
               title={this.props.appStore.arabic?'تهانينا':"congratulations"}
               subtitle={this.props.appStore.arabic?'لقد بدأت مشروعك':"You started new business"}
             >
               <SCLAlertButton theme="success" onPress={()=>{navigation.navigate('Mappickers');
             this.setState({show:false})}}>{this.props.appStore.arabic?'متابعة':'Continue'}</SCLAlertButton>
               <SCLAlertButton theme="default" onPress={this.handleClose}>{this.props.appStore.arabic?'الرجوع للرئيسية':'Back to home'}</SCLAlertButton>

             </SCLAlert>
      {this.state.postStatus==='Starting..' ? <Loading/> :  <ScrollView
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
    <Text style={[gStyle.button,{color:'#eb144c'}]}>{this.props.appStore.arabic?'الرجوع':'Before'}</Text>
  </Button>
  <Button
    block

onPress={this.state.page==3?this.create:()=>{this.setState({page:++this.state.page})}}
    style={{ justifyContent: 'center', alignItems: 'center',padding: 15,flex:1,marginHorizontal: 5,backgroundColor: "#eb144c",borderRadius: 9}}
  >
    <Text style={[gStyle.button,gStyle.text['dark']]}>{this.state.page==3?this.props.appStore.arabic?'اكمال':'Complete':this.props.appStore.arabic?'التالي':'Next'}</Text>
  </Button>
</View>:null}
<Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize: 21}]}>{this.state.postStatus}</Text>

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
                            postStatus: 'تم شكرا لك.',
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
  <TouchableOpacity onPress={this._pickImage} style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 10}}>
{this.state.uploading?<ActivityIndicator />:
<Image style={{width:width-10,height: 200,resizeMode: 'cover'}} source={{uri:this.state.image.length>0?this.state.image:'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}}/>
}
<Text style={{fontSize: 14,marginVertical: 10,textAlign: 'center',color:'#eb144c'}}>{this.props.appStore.arabic?'تحميل صورة الغلاف':'Upload cover Picture'}</Text>

  </TouchableOpacity>
)
}
AddTruth = (theme) => {
return (
  <TouchableOpacity onPress={this.profileimgpick} style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 20}}>

  <Form style={{width:width,alignItems: 'center',justifyContent: 'center'}}>

  <Thumbnail large source={{uri:this.state.pimage.length>0?this.state.pimage: 'https://i.ibb.co/MgMwpsx/company-placeholder.jpg'}} />
<Text style={{fontSize: 14,marginVertical: 10,textAlign: 'center',color:'#eb144c'}}>{this.props.appStore.arabic?'تحميل صورة الملف الشخصي':'Upload Profile Picture'}</Text>
              </Form>

              </TouchableOpacity>
)
}
onUpdateItem = (i,d) => {
  this.setState({
    daily: this.state.daily.map(el => (el.day === i ? {...el, selected:!d} : el))
  });
 };

AddChallenge = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',paddingVertical: 20}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-start',marginRight: 20}]}>{this.props.appStore.arabic?'معلومات التواصل':'Contact info'}</Text>

  <Form style={{width:width-10 }}>
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رقم الهاتف':'Phone number'}
  </Label>
  <Input value={this.state.phone} onChangeText={(phone)=>this.setState({phone})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"+13235334433"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'واتس اب':'WhatsApp'}
  </Label>
  <Input value={this.state.whats} onChangeText={(whats)=>this.setState({whats})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"+13235334433"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رابط الموقع الالكتروني':'Web url'}
  </Label>
  <Input value={this.state.web} onChangeText={(web)=>this.setState({web})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"www.opentiq.com"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'بريد الكتروني':'Mail Address'}
  </Label>
  <Input value={this.state.mail} onChangeText={(mail)=>this.setState({mail})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"e.g: info@opentiq.com"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رابط الفيسبوك':'Facebook url'}
  </Label>
  <Input value={this.state.facebook} onChangeText={(facebook)=>this.setState({facebook})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://fb.com/opentiq"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'حساب instagram':'Instagram account'}
  </Label>
  <Input value={this.state.instagram} onChangeText={(instagram)=>this.setState({instagram})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"Opentiq"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رابط تويتر':'Twitter url'}
  </Label>
  <Input value={this.state.twitter} onChangeText={(twitter)=>this.setState({twitter})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://.."}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رابط Linkedin':'linkedin url'}
  </Label>
  <Input value={this.state.linkedin} onChangeText={(linkedin)=>this.setState({linkedin})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://.."}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رابط قناة اليوتيوب':'Youtube link url'}
  </Label>
  <Input value={this.state.youtube} onChangeText={(youtube)=>this.setState({youtube})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://.."}
  />
     </Form>


              </View>
)
}
Adddare = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',padding:10}}>

  <Form style={{width:width-10 }}>
<Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
Write your business services
</Label>
<Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#fdfdfd'}]} value={this.state.Do} onChangeText={(Do)=>this.setState({Do})} bordered placeholder={`Enter list of services/offers you do in your business..
  e.g :
   •${this.state.title=='store'?'selling mobiles':'fixes mobiles'}
  •${this.state.title=='store'?'selling clothes':'Online Marketing'}
  •Others services /offers`} />






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
