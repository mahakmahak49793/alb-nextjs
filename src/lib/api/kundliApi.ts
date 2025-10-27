// lib/api/kundliApi.ts

import { AstrologyAPIResponse } from "@/types/kundliTypes/BirthChartTypes";

const KUNDLI_BASE_URL = process.env.NEXT_PUBLIC_KUNDLI_URL;

// ✅ Generic function to call Astrology APIs
export async function callAstrologyAPI<T>(
  endpoint: string,
  payload: Record<string, any>
): Promise<T | null> {
  try {
    const response = await fetch(`${KUNDLI_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`❌ API Error (${endpoint}):`, response.statusText);
      return null;
    }

    const result: AstrologyAPIResponse<T> = await response.json();

    if (!result.success) {
      console.error(`❌ API Failed (${endpoint}):`, result.message);
      return null;
    }

    // ✅ FIX: Cast the data to T since we know the API structure
    return (result.responseData?.data?.[0] as any) as T | null;
  } catch (error) {
    console.error(`❌ Network Error (${endpoint}):`, error);
    return null;
  }
}

// ✅ Specific API calls with proper return types
export const kundliApis = {
  getBirthData: (payload: Record<string, any>) => 
    callAstrologyAPI<{ birthdata: any }>('api/astro/get_birth_data', payload),
  
  getAstroData: (payload: Record<string, any>) => 
    callAstrologyAPI<{ astrodata: any }>('api/astro/get_astro_data', payload),
  
  getLagnaChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/chart/get_lagna_chart', payload),
  
  getNavamanshaChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/chart/get_navamansha_chart', payload),
  
  getChalitChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/chart/get_chalit_chart', payload),
  
  getMoonChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/chart/get_moon_chart', payload),
  
  getSunChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/chart/get_sun_chart', payload),
  
  getHoraChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/chart/get_hora_chart', payload),
  
  getDreshkanChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/chart/get_dreshkan_chart', payload),
  
  getDashamanshaChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/chart/get_dashamansha_chart', payload),
  
  getDwadasmanshaChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/chart/get_dwadashamansha_chart', payload),
  
  getTrishamanshaChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/chart/get_trishamansha_chart', payload),
  
  getShashtymanshaChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/chart/get_shashtymsha_chart', payload),
  
  getPlanetaryPositions: (payload: Record<string, any>) => 
    callAstrologyAPI<{ planetData: any }>('api/planet/get_all_planet_data', payload),
  
  getUpgraha: (payload: Record<string, any>) => 
    callAstrologyAPI<{ upgrahaData: any }>('api/planet/get_all_upgraha_data', payload),
  
  getDashamBhavMadhya: (payload: Record<string, any>) => 
    callAstrologyAPI<{ dashamBhavData: any }>('api/planet/get_dasham_bhav_madhya', payload),
  
  getAshtakVarga: (payload: Record<string, any>) => 
    callAstrologyAPI<{ prastarakListData: any }>('api/planet/get_ashtak_varga_data', payload),
  
  getSarvashtak: (payload: Record<string, any>) => 
    callAstrologyAPI<{ sarvashtakaListData: any }>('api/planet/get_sarvashtak_data', payload),
  
  // Doshas
  getSadheSati: (payload: Record<string, any>) => 
    callAstrologyAPI<{ planetData: any }>('api/dosha/sadhesati_analysis', payload),
  
  getMangalDosha: (payload: Record<string, any>) => 
    callAstrologyAPI<{ mangalDosha: any }>('api/dosha/mangal_dosh_analysis', payload),
  
  getKaalsarpDosha: (payload: Record<string, any>) => 
    callAstrologyAPI<{ kaalsarpDosha: any }>('api/dosha/kalsharp_dosh_analysis', payload),
  
  getPitriDosha: (payload: Record<string, any>) => 
    callAstrologyAPI<{ rina: any }>('api/dosha/pitra_dosh_analysis', payload),
  
  // Dashas
  getVimshottariMahaDasha: (payload: Record<string, any>) => 
    callAstrologyAPI<{ vimshottaryMahaDashaData: any }>('api/dasha/get_vimshottary_maha_dasha', payload),
  
  getVimshottariCurrentDasha: (payload: Record<string, any>) => 
    callAstrologyAPI<{ vimshottaryCurrentDashaData: any }>('api/dasha/get_vimshottary_current_dasha', payload),
  
  getYoginiMahaDasha: (payload: Record<string, any>) => 
    callAstrologyAPI<{ yoginiMahaDashaData: any }>('api/dasha/get_yogini_maha_dasha', payload),
  
  getYoginiCurrentDasha: (payload: Record<string, any>) => 
    callAstrologyAPI<{ yoginiCurrentDashaData: any }>('api/dasha/get_yogini_current_dasha', payload),
  
  // Jaimini
  getJaiminiDetails: (payload: Record<string, any>) => 
    callAstrologyAPI<{ karakaPlanetData: any }>('api/gemini/get_gemini_data', payload),
  
  getCharDasha: (payload: Record<string, any>) => 
    callAstrologyAPI<{ charDashaData: any }>('api/gemini/get_char_dasha_data', payload),
  
  getCharCurrentDasha: (payload: Record<string, any>) => 
    callAstrologyAPI<{ charCurrentDashaData: any }>('api/gemini/get_current_char_dasha_data', payload),
  
  // KP System
  getKPBirthDetails: (payload: Record<string, any>) => 
    callAstrologyAPI<{ birthdata: any }>('api/kp/kp_birth_data', payload),
  
  getKPPlanetaryPosition: (payload: Record<string, any>) => 
    callAstrologyAPI<{ planetData: any }>('api/kp/get_all_planet_data', payload),
  
  getKPCuspsDetail: (payload: Record<string, any>) => 
    callAstrologyAPI<{ cuspsData: any }>('api/kp/get_cusps_data', payload),
  
  getKPBirthChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/kp/get_birth_chart', payload),
  
  getKPCuspsChart: (payload: Record<string, any>) => 
    callAstrologyAPI<{ chartData: any }>('api/kp/get_cusps_chart', payload),
  
  getKPPlanetSignificators: (payload: Record<string, any>) => 
    callAstrologyAPI<{ planetSignificatorsData: any }>('api/kp/get_planet_significators', payload),
  
  getKPHouseSignificators: (payload: Record<string, any>) => 
    callAstrologyAPI<{ houseSignificatorsData: any }>('api/kp/get_house_significators', payload),
  
  getKPRulingPlanets: (payload: Record<string, any>) => 
    callAstrologyAPI<{ rulingPlanetsData: any }>('api/kp/get_ruling_planets', payload),
  
  // Others
  getFriendshipTable: (payload: Record<string, any>) => 
    callAstrologyAPI<{ friendshipData: any }>('api/astro/get_friendship_data', payload),
  
  getNumerologyDetails: (payload: Record<string, any>) => 
    callAstrologyAPI<{ numerlogy: any }>('api/numerlogy/get_details', payload),
  
  getPrediction: (payload: Record<string, any>) => 
    callAstrologyAPI<{ prediction: any }>('api/prediction/get_prediction', payload),
};
