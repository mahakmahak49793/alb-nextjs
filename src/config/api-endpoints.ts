// config/api-endpoints.ts
export const ENDPOINTS = {
  // Customer
  CUSTOMER: {
    LIST: 'customers/get-all-customers',
    BY_ID: (id: string) => `admin/customer_details_by_id/${id}`,
    UPDATE_WALLET: 'admin/add_deduct_customer_wallet',
    BAN: 'admin/change-banned-status',
  },

  // Astrologer
  ASTROLOGER: {
    LIST: 'admin/get-all-astrologers',
    CREATE: 'admin/add-astrologer',
    UPDATE: (id: string) => `admin/update-astrologer/${id}`,
    DELETE: (id: string) => `admin/delete-astrologer-account/${id}`,
  },

  // Puja
  PUJA: {
    LIST: 'puja/get_puja',
    CATEGORY: 'puja/get_puja_category',
  },

  // Reports
  REPORT: {
    RECHARGE: (month: number, year: number) =>
      `admin/recharge-per-day-history?month=${month}&year=${year}`,
    EARNING: (month: number, year: number) =>
      `admin/get_admin_earning?month=${month}&year=${year}`,
  },
} as const;