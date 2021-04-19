import boosts, { IBoost } from '@/modules/data/boosts'

export type CityLevel = 1 | 2 | 3 | 4

export type ICity = {
  readonly name: string
  readonly level: CityLevel
  readonly coords: Readonly<[ number, number ]>
  readonly boosts: ReadonlyArray<IBoost>
}

export class City implements ICity {
  constructor(
    readonly name: string,
    readonly level: CityLevel,
    readonly coords: Readonly<[ number, number ]>,
    readonly boosts: ReadonlyArray<IBoost>) {}
}

export const cities: Array<ICity> = [ {
  name: 'Hague',
  level: 1,
  coords: [ 87, 1313 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Texel',
  level: 1,
  coords: [ 157, 1347 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Rotterdam',
  level: 2,
  coords: [ 192, 1278 ],
  boosts: [ boosts.output(0.12) ],
}, {
  name: 'Arnhem',
  level: 1,
  coords: [ 263, 1348 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Breda',
  level: 1,
  coords: [ 263, 1243 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Duisburg',
  level: 1,
  coords: [ 401, 1348 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Cologne',
  level: 1,
  coords: [ 367, 1277 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Eindhoven',
  level: 2,
  coords: [ 332, 1208 ],
  boosts: [ boosts.research(0.07) ],
}, {
  name: 'Duesseldorf',
  level: 1,
  coords: [ 438, 1277 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Dortmund',
  level: 1,
  coords: [ 507, 1314 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Dresden',
  level: 1,
  coords: [ 580, 1347 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Hamburg',
  level: 1,
  coords: [ 683, 1348 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Potsdam',
  level: 1,
  coords: [ 752, 1314 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Prague',
  level: 2,
  coords: [ 752, 1208 ],
  boosts: [ boosts.defense(0.05) ],
}, {
  name: 'Munich',
  level: 2,
  coords: [ 648, 1137 ],
  boosts: [ boosts.attack(0.05) ],
}, {
  name: 'Leipzig',
  level: 1,
  coords: [ 643, 1241 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Stuttgart',
  level: 1,
  coords: [ 578, 1173 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Nuremburg',
  level: 2,
  coords: [ 542, 1241 ],
  boosts: [ boosts.unitProd(0.07) ],
}, {
  name: 'Frankfurt',
  level: 2,
  coords: [ 472, 1173 ],
  boosts: [ boosts.construct(0.07) ],
}, {
  name: 'Bonn',
  level: 1,
  coords: [ 402, 1138 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Hannut',
  level: 2,
  coords: [ 366, 1064 ],
  boosts: [ boosts.defense(0.05) ],
}, {
  name: 'Liege',
  level: 2,
  coords: [ 469, 1029 ],
  boosts: [ boosts.attack(0.05) ],
}, {
  name: 'Brussels',
  level: 3,
  coords: [ 509, 961 ],
  boosts: [
    boosts.rallyAttack(0.07),
    boosts.gather(0.07) ],
}, {
  name: 'Berlin',
  level: 3,
  coords: [ 648, 960 ],
  boosts: [
    boosts.attack(0.05),
    boosts.unitProd(0.12) ],
}, {
  name: 'Salzburg',
  level: 2,
  coords: [ 609, 1031 ],
  boosts: [ boosts.unitProd(0.07) ],
}, {
  name: 'Vienna',
  level: 2,
  coords: [ 716, 1066 ],
  boosts: [ boosts.research(0.07) ],
}, {
  name: 'Warsaw',
  level: 3,
  coords: [ 857, 963 ],
  boosts: [
    boosts.ap(0.25),
    boosts.repair(0.25) ],
}, {
  name: 'Krakow',
  level: 2,
  coords: [ 892, 1068 ],
  boosts: [ boosts.output(0.12) ],
}, {
  name: 'Rzeszow',
  level: 2,
  coords: [ 961, 1029 ],
  boosts: [ boosts.research(0.07) ],
}, {
  name: 'Tarnow',
  level: 2,
  coords: [ 994, 1135 ],
  boosts: [ boosts.defense(0.05) ],
}, {
  name: 'Wroc\u0142aw',
  level: 1,
  coords: [ 962, 1207 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Poznan',
  level: 2,
  coords: [ 930, 1275 ],
  boosts: [ boosts.construct(0.07) ],
}, {
  name: 'Szczecin',
  level: 1,
  coords: [ 929, 1348 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Gdansk',
  level: 1,
  coords: [ 1033, 1347 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Lodz',
  level: 1,
  coords: [ 1034, 1241 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Bydgoszcz',
  level: 1,
  coords: [ 1135, 1312 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Grodno',
  level: 2,
  coords: [ 1209, 1311 ],
  boosts: [ boosts.unitProd(0.07) ],
}, {
  name: 'Wilno',
  level: 1,
  coords: [ 1208, 1241 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Biavestok',
  level: 1,
  coords: [ 1311, 1312 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Lublin',
  level: 2,
  coords: [ 1101, 1206 ],
  boosts: [ boosts.attack(0.05) ],
}, {
  name: 'Brest',
  level: 1,
  coords: [ 1104, 1069 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Murmansk',
  level: 1,
  coords: [ 1243, 1103 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Arkhangelsk',
  level: 1,
  coords: [ 1348, 1068 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Demyansk',
  level: 2,
  coords: [ 1277, 996 ],
  boosts: [ boosts.research(0.07) ],
}, {
  name: 'Rzhev',
  level: 1,
  coords: [ 1347, 959 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Smolensk',
  level: 1,
  coords: [ 1277, 926 ],
  boosts: [ boosts.health(0.07) ],
}, {
  name: 'Vyazma',
  level: 1,
  coords: [ 1312, 891 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Golgi',
  level: 1,
  coords: [ 1347, 823 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Tula',
  level: 2,
  coords: [ 1242, 787 ],
  boosts: [ boosts.construct(0.07) ],
}, {
  name: 'Minsk',
  level: 2,
  coords: [ 1205, 893 ],
  boosts: [ boosts.output(0.12) ],
}, {
  name: 'Leningrad',
  level: 2,
  coords: [ 1031, 927 ],
  boosts: [ boosts.defense(0.05) ],
}, {
  name: 'Bryansk',
  level: 2,
  coords: [ 1100, 824 ],
  boosts: [ boosts.attack(0.05) ],
}, {
  name: 'Moscow',
  level: 3,
  coords: [ 1033, 788 ],
  boosts: [
    boosts.defense(0.05),
    boosts.health(0.05) ],
}, {
  name: 'Kiev',
  level: 2,
  coords: [ 1069, 681 ],
  boosts: [ boosts.unitProd(0.07) ],
}, {
  name: 'Stalingrad',
  level: 3,
  coords: [ 969, 614 ],
  boosts: [
    boosts.rallyAttack(0.07),
    boosts.gather(0.07) ],
}, {
  name: 'Odessa',
  level: 2,
  coords: [ 1066, 578 ],
  boosts: [ boosts.defense(0.05) ],
}, {
  name: 'Kursk',
  level: 1,
  coords: [ 1208, 574 ],
  boosts: [ boosts.health(0.05) ],
}, {
  name: 'Prokhorovka',
  level: 1,
  coords: [ 1280, 611 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Voronezh',
  level: 1,
  coords: [ 1348, 611 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Kharkov',
  level: 1,
  coords: [ 1315, 542 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Dnipropetrovsk',
  level: 2,
  coords: [ 1244, 505 ],
  boosts: [ boosts.output(0.12) ],
}, {
  name: 'Rostov-on-Don',
  level: 1,
  coords: [ 1280, 440 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Nikolayev',
  level: 2,
  coords: [ 1170, 440 ],
  boosts: [ boosts.research(0.07) ],
}, {
  name: 'Sevastopol',
  level: 1,
  coords: [ 1242, 367 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Novorossiysk',
  level: 2,
  coords: [ 1315, 328 ],
  boosts: [ boosts.research(0.07) ],
}, {
  name: 'Baku',
  level: 1,
  coords: [ 1348, 261 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Heraklion',
  level: 1,
  coords: [ 1277, 51 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Piraeus',
  level: 1,
  coords: [ 1241, 122 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Thebes',
  level: 2,
  coords: [ 1171, 158 ],
  boosts: [ boosts.unitProd(0.07) ],
}, {
  name: 'Larisa',
  level: 1,
  coords: [ 1137, 228 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Corinth',
  level: 2,
  coords: [ 1125, 97 ],
  boosts: [ boosts.defense(0.05) ],
}, {
  name: 'Kalamata',
  level: 1,
  coords: [ 1067, 53 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Patras',
  level: 1,
  coords: [ 1029, 157 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Kozani',
  level: 2,
  coords: [ 998, 261 ],
  boosts: [ boosts.output(0.12) ],
}, {
  name: 'Loannina',
  level: 2,
  coords: [ 928, 333 ],
  boosts: [ boosts.attack(0.05) ],
}, {
  name: 'Thessaloniki',
  level: 2,
  coords: [ 998, 401 ],
  boosts: [ boosts.construct(0.07) ],
}, {
  name: 'Athens',
  level: 3,
  coords: [ 896, 427 ],
  boosts: [
    boosts.attack(0.05),
    boosts.unitProd(0.12) ],
}, {
  name: 'Rome',
  level: 3,
  coords: [ 717, 472 ],
  boosts: [
    boosts.defense(0.05),
    boosts.health(0.05) ],
}, {
  name: 'Milan',
  level: 2,
  coords: [ 750, 405 ],
  boosts: [ boosts.attack(0.05) ],
}, {
  name: 'Turin',
  level: 2,
  coords: [ 683, 366 ],
  boosts: [ boosts.construct(0.07) ],
}, {
  name: 'Genoa',
  level: 1,
  coords: [ 647, 263 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Florence',
  level: 2,
  coords: [ 576, 193 ],
  boosts: [ boosts.output(0.12) ],
}, {
  name: 'Bologna',
  level: 1,
  coords: [ 717, 193 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Venice',
  level: 2,
  coords: [ 787, 227 ],
  boosts: [ boosts.unitProd(0.07) ],
}, {
  name: 'Corfu',
  level: 1,
  coords: [ 880, 235 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Foggia',
  level: 1,
  coords: [ 823, 123 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Taranto',
  level: 1,
  coords: [ 859, 50 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Naples',
  level: 2,
  coords: [ 752, 82 ],
  boosts: [ boosts.research(0.07) ],
}, {
  name: 'Salerno',
  level: 1,
  coords: [ 646, 122 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Messina',
  level: 1,
  coords: [ 613, 53 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Anzio',
  level: 1,
  coords: [ 506, 88 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Nice',
  level: 1,
  coords: [ 297, 127 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Marseille',
  level: 1,
  coords: [ 118, 52 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Montpellier',
  level: 1,
  coords: [ 49, 87 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Toulouse',
  level: 2,
  coords: [ 125, 149 ],
  boosts: [ boosts.defense(0.05) ],
}, {
  name: 'Strasbourg',
  level: 1,
  coords: [ 229, 189 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Grenoble',
  level: 1,
  coords: [ 330, 224 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Belfort',
  level: 2,
  coords: [ 371, 298 ],
  boosts: [ boosts.construct(0.07) ],
}, {
  name: 'Colmar',
  level: 2,
  coords: [ 468, 367 ],
  boosts: [ boosts.unitProd(0.07) ],
}, {
  name: 'Bordeaux',
  level: 3,
  coords: [ 542, 437 ],
  boosts: [
    boosts.rallyAttack(0.07),
    boosts.gather(0.07) ],
}, {
  name: 'Lyon',
  level: 2,
  coords: [ 440, 440 ],
  boosts: [ boosts.output(0.12) ],
}, {
  name: 'Arras',
  level: 2,
  coords: [ 329, 508 ],
  boosts: [ boosts.defense(0.05) ],
}, {
  name: 'Sedan',
  level: 2,
  coords: [ 227, 431 ],
  boosts: [ boosts.construct(0.07) ],
}, {
  name: 'Metz',
  level: 1,
  coords: [ 228, 369 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Verdun',
  level: 2,
  coords: [ 191, 298 ],
  boosts: [ boosts.research(0.07) ],
}, {
  name: 'Nantes',
  level: 1,
  coords: [ 86, 264 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Rennes',
  level: 1,
  coords: [ 59, 357 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Caen',
  level: 1,
  coords: [ 52, 440 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Amiens',
  level: 1,
  coords: [ 159, 437 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Abbeville',
  level: 1,
  coords: [ 153, 508 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Boulogne',
  level: 1,
  coords: [ 87, 531 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Calais',
  level: 1,
  coords: [ 161, 573 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Lille',
  level: 2,
  coords: [ 224, 542 ],
  boosts: [ boosts.attack(0.05) ],
}, {
  name: 'Dunkirk',
  level: 2,
  coords: [ 330, 615 ],
  boosts: [ boosts.research(0.07) ],
}, {
  name: 'Paris',
  level: 3,
  coords: [ 475, 588 ],
  boosts: [
    boosts.ap(0.25),
    boosts.repair(0.25) ],
}, {
  name: 'Liverpool',
  level: 2,
  coords: [ 368, 753 ],
  boosts: [ boosts.unitProd(0.07) ],
}, {
  name: 'Portsmouth',
  level: 1,
  coords: [ 227, 717 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Southampton',
  level: 2,
  coords: [ 194, 788 ],
  boosts: [ boosts.output(0.12) ],
}, {
  name: 'Bath',
  level: 2,
  coords: [ 122, 752 ],
  boosts: [ boosts.unitProd(0.07) ],
}, {
  name: 'Plymouth',
  level: 1,
  coords: [ 54, 682 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Bristol',
  level: 1,
  coords: [ 52, 786 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Coventry',
  level: 1,
  coords: [ 161, 857 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Birmingham',
  level: 1,
  coords: [ 88, 894 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Manchester',
  level: 2,
  coords: [ 88, 994 ],
  boosts: [ boosts.attack(0.05) ],
}, {
  name: 'Bradford',
  level: 1,
  coords: [ 53, 1066 ],
  boosts: [ boosts.xp(0.12) ],
}, {
  name: 'Glasgow',
  level: 1,
  coords: [ 50, 1170 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'York',
  level: 1,
  coords: [ 122, 1137 ],
  boosts: [ boosts.health(0.03) ],
}, {
  name: 'Leeds',
  level: 1,
  coords: [ 157, 1065 ],
  boosts: [ boosts.march(0.07) ],
}, {
  name: 'Kingston upon Hull',
  level: 2,
  coords: [ 228, 1103 ],
  boosts: [ boosts.defense(0.05) ],
}, {
  name: 'Sheffield',
  level: 1,
  coords: [ 192, 961 ],
  boosts: [ boosts.gather(0.07) ],
}, {
  name: 'Nottingham',
  level: 2,
  coords: [ 228, 892 ],
  boosts: [ boosts.construct(0.07) ],
}, {
  name: 'Edinburgh',
  level: 2,
  coords: [ 368, 857 ],
  boosts: [ boosts.attack(0.05) ],
}, {
  name: 'London',
  level: 3,
  coords: [ 471, 787 ],
  boosts: [
    boosts.defense(0.05),
    boosts.health(0.05) ],
}, {
  name: 'Government',
  level: 4,
  coords: [ 725, 698 ],
  boosts: [],
} ].map(({ name, level, coords, boosts }) =>
  new City(name, level as CityLevel, coords as [ number, number ], boosts))

export default cities