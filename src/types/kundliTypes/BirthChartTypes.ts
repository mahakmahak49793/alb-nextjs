// types/kundliTypes/BirthChartTypes.ts

// ==========================================
// 🔹 COMMON BASE TYPES
// ==========================================

/**
 * Generic API Response Structure for Astrology APIs
 */
export interface AstrologyAPIResponse<T> {
  success: boolean;
  message: string;
  responseData: {
    message: string;
    status: boolean;
    data: Array<{ [key: string]: T }>;
  };
}

/**
 * Base metadata that appears in most Kundli responses
 */
export interface BaseKundliMetadata {
  name: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
  latitude: number;
  longitude: number;
  timezone: number;
  gender: string;
}

/**
 * Time-based entity (used for Yog, Karan, Tithi)
 */
export interface TimeBasedEntity {
  name: string;
  startDateTime: string;
  endDateTime: string;
}

/**
 * Degree representation
 */
export interface Degree {
  deg: number;
  min: number;
  sec: number;
}

// ==========================================
// 🔹 BASIC KUNDLI DATA
// ==========================================

/**
 * Basic Kundli Data from your backend
 */
export interface KundliBasicData {
  _id: string;
  customerId: string;
  name: string;
  gender: string;
  dob: string;
  tob: string;
  place: string;
  lat: number;
  lon: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Kundli Payload for API calls
 */
export interface KundliPayload {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
}

/**
 * API Payload Type for Astrology API requests
 */
export interface ApiPayload {
  name: string;
  day: string;
  month: string;
  year: string;
  hour: string;
  min: string;
  latitude: string;
  longitude: string;
  timezone: string;
  place: string;
  gender: string;
}

// ==========================================
// 🔹 BIRTH & ASTRO DETAILS
// ==========================================

/**
 * Birth Details Data
 */
export interface BirthData extends BaseKundliMetadata {
  place: string;
  sunrise: string;
  sunset: string;
  ayanamsha: {
    fullDegree: string;
    degree: string;
    ayanamsha_name: string;
  };
  yog: TimeBasedEntity;
  karan: TimeBasedEntity;
  tithi: TimeBasedEntity;
  dayname: string;
  masa: string;
  vikramSamvat: string;
  shakSamvat: string;
}

/**
 * Astro Details Data
 */
export interface AstroData extends BaseKundliMetadata {
  place: string;
  ascendant: string;
  varna: string;
  vashya: string;
  yoni: string;
  gana: string;
  nadi: string;
  sign: string;
  signLord: string;
  naksahtra: string;
  nakshatraLord: string;
  charan: string;
  yog: TimeBasedEntity;
  karan: TimeBasedEntity;
  tithi: TimeBasedEntity;
  masa: string;
  sunrise: string;
  sunset: string;
  yunja: string;
  tatva: string;
  nameAlphabetHindi: string;
  nameAlphabetEnglish: string;
  paya: string;
}

/**
 * Friendship Table Data
 */
export interface FriendshipTableData extends BaseKundliMetadata {
  friendshipTable: Array<{
    planet: string;
    friend: string[];
    enemy: string[];
    neutral: string[];
  }>;
}

// ==========================================
// 🔹 CHART DATA
// ==========================================

/**
 * Planet in Chart
 */
export interface Planet {
  name: string;
  degree: Degree;
  retrograde: boolean;
  combust: boolean;
  color: string;
}

/**
 * House in Chart
 */
export interface House {
  house: number;
  ascendant?: boolean;
  rashi?: string;
  rashiIndex: number;
  planets: Planet[];
}

/**
 * Chart Data (Used for all chart types: Lagna, Navamsha, etc.)
 */
export interface ChartData extends BaseKundliMetadata {
  chart: House[];
}

// ==========================================
// 🔹 PLANETARY DATA
// ==========================================

/**
 * Single Planet Position
 */
export interface PlanetPosition {
  name: string;
  degree: string;
  latitude: number;
  longitude: number;
  rashi: string;
  rashiLord: string;
  nakshatra: string;
  nakshatraLord: string;
  charan: string;
  house: number;
  isRetrograde: boolean;
  isCombust: boolean;
  PlanetState: string;
}

/**
 * Planetary Position Data
 */
export interface PlanetaryData extends BaseKundliMetadata {
  planetList: PlanetPosition[];
}

/**
 * Upgraha Data
 */
export interface UpgrahaData extends BaseKundliMetadata {
  upgrahaList: PlanetPosition[];
}

/**
 * Dasham Bhav Madhya Data
 */
export interface DashamBhavMadhyaData extends BaseKundliMetadata {
  dashamBhavList: Array<{
    house: number;
    degree: string;
    rashi: string;
    rashiLord: string;
  }>;
}

// ==========================================
// 🔹 ASHTAKVARGA
// ==========================================

/**
 * Ashtak Varga Data
 */
export interface AshtakVargaData extends BaseKundliMetadata {
  prastarakList: Array<{
    planet: string;
    bindu: number[];
    rekha: number[];
  }>;
}

/**
 * Sarvashtak Data
 */
export interface SarvashtakData extends BaseKundliMetadata {
  sarvashtakList: Array<{
    rashi: string;
    total: number;
  }>;
}

// ==========================================
// 🔹 DOSHA DATA
// ==========================================

/**
 * Sadhe Sati Period
 */
export interface SadheSatiPeriod {
  startDate: string;
  endDate: string;
  rashi: string;
  type: string;
  saturnrashi: string;
  phase: string;
}

/**
 * Sadhe Sati Data
 */
export interface SadheSatiData {
  sadesati: SadheSatiPeriod[];
  info: string;
}

/**
 * Mangal Dosha Data
 */
export interface MangalDoshaData {
  type: string;
  intensity: string;
  reason: string;
  info: string;
}

/**
 * Kaalsarp Dosha Data
 */
export interface KaalsarpDoshaData {
  type: string;
  kalsharpdosh: boolean;
  info: string;
}

/**
 * Rin (for Pitri Dosha)
 */
export interface Rin {
  name: string;
  status: boolean;
  info: string;
}

/**
 * Pitri Dosha Data
 */
export interface PitriDoshaData {
  rina: Rin[];
  info: string;
  pitridosh: boolean;
}

// ==========================================
// 🔹 DASHA SYSTEMS
// ==========================================

// --- Vimshottari Dasha ---

/**
 * Dasha Period (for Maha Dasha)
 */
export interface DashaPeriod {
  planet: string;
  startDate: string;
  endDate: string;
}

/**
 * Current Dasha Period
 */
export interface CurrentDashaPeriod {
  name: string;
  planet: string;
  startDate: string;
  endDate: string;
}

/**
 * Vimshottari Maha Dasha Data
 */
export interface VimshottariMahaDashaData extends BaseKundliMetadata {
  vimshottaryMahaDashaList: DashaPeriod[];
}

/**
 * Vimshottari Current Dasha Data
 */
export interface VimshottariCurrentDashaData extends BaseKundliMetadata {
  vimshottaryCurrentDashaList: CurrentDashaPeriod[];
}

// --- Yogini Dasha ---

/**
 * Yogini Dasha Period
 */
export interface YoginiDashaPeriod {
  yogini: string;
  startDate: string;
  endDate: string;
}

/**
 * Yogini Current Dasha Period
 */
export interface YoginiCurrentDashaPeriod {
  name: string;
  yogini: string;
  startDate: string;
  endDate: string;
}

/**
 * Yogini Maha Dasha Data
 */
export interface YoginiMahaDashaData extends BaseKundliMetadata {
  yoginiMahaDashaList: YoginiDashaPeriod[];
}

/**
 * Yogini Current Dasha Data
 */
export interface YoginiCurrentDashaData extends BaseKundliMetadata {
  yoginiCurrentDashaList: YoginiCurrentDashaPeriod[];
}

// --- Char Dasha (Jaimini) ---

/**
 * Char Antar Dasha
 */
export interface CharAntarDasha {
  rashi: string;
  start: string;
  end: string;
}

/**
 * Char Maha Dasha
 */
export interface CharMahaDasha {
  rashi: string;
  duration: number;
  start: string;
  end: string;
  antarDasha: CharAntarDasha[];
}

/**
 * Char Current Dasha Period
 */
export interface CharCurrentDashaPeriod {
  rashi: string;
  start: string;
  end: string;
  name: string;
}

/**
 * Char Dasha Data
 */
export interface CharDashaData extends BaseKundliMetadata {
  charDashaList: CharMahaDasha[];
}

/**
 * Char Current Dasha Data
 */
export interface CharCurrentDashaData extends BaseKundliMetadata {
  currentDashaList: CharCurrentDashaPeriod[];
}

// ==========================================
// 🔹 JAIMINI SYSTEM
// ==========================================

/**
 * Karaka Planet Details
 */
export interface KarakaPlanet {
  name: string;
  planet: PlanetPosition;
}

/**
 * Karaka Details
 */
export interface KarakDetails {
  ascendant: string;
  pad_lagna: string;
  up_pad_lagna: string;
  karamsha_lagna: string;
  karakaPlanetList: KarakaPlanet[];
}

/**
 * Jaimini (Karaka Planet) Data
 */
export interface KarakaPlanetData extends BaseKundliMetadata {
  karakDetails: KarakDetails;
}

// ==========================================
// 🔹 KP SYSTEM
// ==========================================

/**
 * KP Birth Details
 */
// KP System Types (Add to your existing types file)

export interface KPBirthData extends BaseKundliMetadata {
  place: string;
  sunrise: string;
  sunset: string;
  ayanamsha: {
    fullDegree: string;
    degree: string;
    ayanamsha_name: string;
  };
  kpAyanamsha: string;
  dayname: string;
  shakSamvat: string;
  vikramSamvat: string;
}

export interface KPPlanetPosition {
  name: string;
  degree: string;
  latitude: number;
  longitude: number;
  rashi: string;
  rashiLord: string;
  nakshatra: string;
  nakshatraLord: string;
  starLord: string;
  subLord: string;
  charan: string;
  house: number;
  isRetrograde: boolean;
  isCombust: boolean;
  PlanetState: string;
}

export interface KPPlanetaryData extends BaseKundliMetadata {
  planetList: KPPlanetPosition[];
}

export interface KPCusp {
  house: number;
  degree: string;
  rashi: string;
  rashiLord: string;
  nakshatraLord: string;
  subLord: string;
}

export interface KPCuspsData extends BaseKundliMetadata {
  cuspsList: KPCusp[];
}

/**
 * KP Chart Data (Birth Chart / Cusps Chart)
 */
export interface KPChartData extends BaseKundliMetadata {
  chart: House[];
}

/**
 * KP Planet Significator
 */
export interface KPPlanetSignificator {
  planet: string;
  houses: number[];
}

/**
 * KP Planet Significators Data
 */
export interface KPPlanetSignificatorsData extends BaseKundliMetadata {
  planetSignificatorsList: KPPlanetSignificator[];
}

/**
 * KP House Significator
 */
export interface KPHouseSignificator {
  house: number;
  planets: string[];
}

/**
 * KP House Significators Data
 */
export interface KPHouseSignificatorsData extends BaseKundliMetadata {
  houseSignificatorsList: KPHouseSignificator[];
}

/**
 * KP Ruling Planet
 */
export interface KPRulingPlanet {
  level: string;
  planet: string;
}

/**
 * KP Ruling Planets Data
 */
export interface KPRulingPlanets {
  ascendant_nakshatra_lord: string;
  ascendant_sign_lord: string;
  moon_nakshatra_lord: string;
  moon_sign_lord: string;
  day_lord: string;
  ascendant_sub_lord: string;
  moon_sub_lord: string;
}

export interface KPRulingPlanetsData extends BaseKundliMetadata {
  rulingPlanets: KPRulingPlanets;
}

// ==========================================
// 🔹 NUMEROLOGY
// ==========================================

/**
 * Numerology Details
 */
export interface NumerologyData extends BaseKundliMetadata {
  numeroDetails: {
    psychicNumber: number;
    destinyNumber: number;
    nameNumber: number;
    luckyNumber: number;
    luckyColor: string[];
    luckyDay: string[];
    luckyGem: string[];
  };
}

// ==========================================
// 🔹 PREDICTIONS
// ==========================================

/**
 * Ascendant Prediction
 */
export interface AscendantPrediction {
  ascendant: string;
  prediction: string;
}

/**
 * Sign Prediction
 */
export interface SignPrediction {
  sign: string;
  prediction: string;
}

/**
 * Planet Consideration
 */
export interface PlanetConsideration {
  planet: string;
  consideration: string;
}

/**
 * Bhav Prediction
 */
export interface BhavPrediction {
  house: number;
  prediction: string;
}

/**
 * Nakshatra Prediction
 */
export interface NakshatraPrediction {
  nakshatra: string;
  prediction: string;
}

/**
 * Complete Prediction Data
 */
export interface PredictionData extends BaseKundliMetadata {
  ascendantPrediction: AscendantPrediction;
  signPrediction: SignPrediction[];
  planetConsideration: PlanetConsideration[];
  bhavPrediction: BhavPrediction[];
  nakshatraPrediction: NakshatraPrediction;
  ascendant: string;
  sign : string;
}

// ==========================================
// 🔹 LOADING STATES
// ==========================================

/**
 * Loading States for different sections
 */
export interface LoadingStates {
  'birth-details': boolean;
  'astro-details': boolean;
  'lagna-chart': boolean;
  'navamansha-chart': boolean;
  'planetary-positions': boolean;
  'mangal-dosha': boolean;
  'kaalsarp-dosha': boolean;
  'pitra-dosha': boolean;
  'sadhe-sati': boolean;
  'vimshottari-dasha': boolean;
  'yogini-dasha': boolean;
  'char-dasha': boolean;
  'jaimini-details': boolean;
  [key: string]: boolean;
}

// ==========================================
// 🔹 COMPLETE KUNDLI DATA OBJECT
// ==========================================

/**
 * Complete Kundli Data Object
 * (Used to store all fetched data in one place)
 */
export interface CompleteKundliData {
  // Basic Details
  birthdata?: BirthData;
  astrodata?: AstroData;
  friendshipData?: FriendshipTableData;

  // Charts
  lagnaChart?: ChartData;
  navamanshaChart?: ChartData;
  chalitChart?: ChartData;
  moonChart?: ChartData;
  sunChart?: ChartData;
  horaChart?: ChartData;
  dreshkanChart?: ChartData;
  dashamanshaChart?: ChartData;
  dwadasmanshaChart?: ChartData;
  trishamanshaChart?: ChartData;
  shashtymanshaChart?: ChartData;

  // Planetary
  planetData?: PlanetaryData;
  upgrahaData?: UpgrahaData;
  dashamBhavData?: DashamBhavMadhyaData;

  // Ashtakvarga
  prastarakListData?: AshtakVargaData;
  sarvashtakaListData?: SarvashtakData;

  // Doshas
  sadheSatiData?: SadheSatiData;
  mangalDosha?: MangalDoshaData;
  kaalsarpDosha?: KaalsarpDoshaData;
  pitriDosha?: PitriDoshaData;

  // Dashas
  vimshottaryMahaDashaData?: VimshottariMahaDashaData;
  vimshottaryCurrentDashaData?: VimshottariCurrentDashaData;
  yoginiMahaDashaData?: YoginiMahaDashaData;
  yoginiCurrentDashaData?: YoginiCurrentDashaData;
  charDashaData?: CharDashaData;
  charCurrentDashaData?: CharCurrentDashaData;

  // Jaimini
  karakaPlanetData?: KarakaPlanetData;

  // KP System
  kpBirthdata?: KPBirthData;
  kpPlanetData?: KPPlanetaryData;
  cuspsData?: KPCuspsData;
  kpBirthChart?: KPChartData;
  kpCuspsChart?: KPChartData;
  planetSignificatorsData?: KPPlanetSignificatorsData;
  houseSignificatorsData?: KPHouseSignificatorsData;
  rulingPlanetsData?: KPRulingPlanetsData;

  // Others
  numerlogy?: NumerologyData;
  prediction?: PredictionData;
}
