import  { pgTable, text, integer, boolean, timestamp, uuid, jsonb, real } from "drizzle-orm/pg-core";
import  { relations } from "drizzle-orm";

// === AVAILABILITYINSIGHTS (39283 docs) ===
export const availabilityinsights = pgTable("availabilityinsights", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  astrologerId: uuid("astrologerId"), // FK -> astrologer.id
  available_minutes: real("available_minutes"),
  busy_minutes: integer("busy_minutes"),
  customerId: uuid("customerId"), // FK -> customers.id
  date: text("date"),
  idle_minutes: integer("idle_minutes"),
  user_type: text("user_type"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === PRIVACYPOLICY (1 docs) ===
export const privacypolicy = pgTable("privacypolicy", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  description: text("description"),
  updatedAt: jsonb("updatedAt"),
});

// === COUNTERS (2 docs) ===
export const counters = pgTable("counters", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  seq: integer("seq"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === PREDEFINEDMESSAGES (3 docs) ===
export const predefinedmessages = pgTable("predefinedmessages", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  message: text("message"),
  type: text("type"),
  updatedAt: jsonb("updatedAt"),
});

// === PUJA_CART (5 docs) ===
export const puja_cart = pgTable("puja_cart", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  customerId: uuid("customerId"), // FK -> customers.id
  pujas: jsonb("pujas"),
  status: text("status"),
  updatedAt: jsonb("updatedAt"),
});

// === TANDC (2 docs) ===
export const tandc = pgTable("tandc", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  description: text("description"),
  type: text("type"),
  updatedAt: jsonb("updatedAt"),
});

// === PUJA_BOOKING (3 docs) ===
export const puja_booking = pgTable("puja_booking", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  addressId: jsonb("addressId"),
  cartId: jsonb("cartId"),
  createdAt: jsonb("createdAt"),
  customerId: uuid("customerId"), // FK -> customers.id
  paymentDetails: jsonb("paymentDetails"),
  paymentStatus: text("paymentStatus"),
  pujas: jsonb("pujas"),
  updatedAt: jsonb("updatedAt"),
});

// === LIVESESSIONCATEGORIES (1 docs) ===
export const livesessioncategories = pgTable("livesessioncategories", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  categoryName: text("categoryName"),
  createdAt: jsonb("createdAt"),
  updatedAt: jsonb("updatedAt"),
});

// === CONSULTATIONCOMMISSION (1 docs) ===
export const consultationcommission = pgTable("consultationcommission", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  callCommission: integer("callCommission"),
  chatCommission: integer("chatCommission"),
  createdAt: jsonb("createdAt"),
  updatedAt: jsonb("updatedAt"),
  videoCallCommission: integer("videoCallCommission"),
});

// === LANGUAGE (7 docs) ===
export const language = pgTable("language", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  languageName: text("languageName"),
  updatedAt: jsonb("updatedAt"),
});

// === ASTROLOGERLIVES (16 docs) ===
export const astrologerlives = pgTable("astrologerlives", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  astrologerId: uuid("astrologerId"), // FK -> astrologer.id
  createdAt: jsonb("createdAt"),
  endedAt: jsonb("endedAt"),
  isLive: boolean("isLive"),
  startedAt: jsonb("startedAt"),
  streamUrl: text("streamUrl"),
  updatedAt: jsonb("updatedAt"),
  viewersCount: integer("viewersCount"),
});

// === ABOUTUS (1 docs) ===
export const aboutus = pgTable("aboutus", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  description: text("description"),
  updatedAt: jsonb("updatedAt"),
});

// === CALLHISTORY (56 docs) ===
export const callhistory = pgTable("callhistory", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  astrologerId: uuid("astrologerId"), // FK -> astrologer.id
  callId: text("callId"),
  callPrice: integer("callPrice"),
  callType: text("callType"),
  commissionPrice: integer("commissionPrice"),
  createdAt: jsonb("createdAt"),
  customerId: uuid("customerId"), // FK -> customers.id
  durationInSeconds: integer("durationInSeconds"),
  endTime: text("endTime"),
  formId: jsonb("formId"),
  startTime: jsonb("startTime"),
  status: text("status"),
  totalCallPrice: integer("totalCallPrice"),
  transactionId: text("transactionId"),
  updatedAt: jsonb("updatedAt"),
});

// === ASTROLOGERSLOTS (1274 docs) ===
export const astrologerslots = pgTable("astrologerslots", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  astrologerId: uuid("astrologerId"), // FK -> astrologer.id
  createdAt: jsonb("createdAt"),
  date: jsonb("date"),
  duration: integer("duration"),
  fromTime: text("fromTime"),
  status: text("status"),
  toTime: text("toTime"),
  updatedAt: jsonb("updatedAt"),
});

// === MAINEXPERTISE (18 docs) ===
export const mainexpertise = pgTable("mainexpertise", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  description: text("description"),
  image: text("image"),
  mainExpertise: text("mainExpertise"),
  updatedAt: jsonb("updatedAt"),
});

// === RECHARGEWALLET (3 docs) ===
export const rechargewallet = pgTable("rechargewallet", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  amount: integer("amount"),
  createdAt: jsonb("createdAt"),
  customer: uuid("customer"), // FK -> customers.id
  discount: text("discount"),
  gst: integer("gst"),
  invoiceId: text("invoiceId"),
  offer: text("offer"),
  paymentMethod: text("paymentMethod"),
  recieptNumber: integer("recieptNumber"),
  referenceId: text("referenceId"),
  referenceModel: text("referenceModel"),
  totalAmount: text("totalAmount"),
  transactionType: text("transactionType"),
  type: text("type"),
  updatedAt: jsonb("updatedAt"),
});

// === REVIEW (43 docs) ===
export const review = pgTable("review", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  astrologer: uuid("astrologer"), // FK -> astrologer.id
  callId: text("callId"),
  comments: text("comments"),
  createdAt: jsonb("createdAt"),
  customer: uuid("customer"), // FK -> customers.id
  is_verified: boolean("is_verified"),
  ratings: integer("ratings"),
  updatedAt: jsonb("updatedAt"),
});

// === CONSULTATIONREVIEW (9 docs) ===
export const consultationreview = pgTable("consultationreview", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  astrologerId: uuid("astrologerId"), // FK -> astrologer.id
  consultationId: uuid("consultationId"), // FK -> consultationsbooking.id
  createdAt: jsonb("createdAt"),
  customerId: uuid("customerId"), // FK -> customers.id
  rating: integer("rating"),
  review: text("review"),
  updatedAt: jsonb("updatedAt"),
});

// === REMEDIES (4 docs) ===
export const remedies = pgTable("remedies", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  description: text("description"),
  title: text("title"),
  updatedAt: jsonb("updatedAt"),
});

// === LINKEDPROFILE (158 docs) ===
export const linkedprofile = pgTable("linkedprofile", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  customerId: uuid("customerId"), // FK -> customers.id
  customerProfile: boolean("customerProfile"),
  dateOfBirth: jsonb("dateOfBirth"),
  description: text("description"),
  firstName: text("firstName"),
  gender: text("gender"),
  lastName: text("lastName"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  maritalStatus: text("maritalStatus"),
  placeOfBirth: text("placeOfBirth"),
  status: integer("status"),
  timeOfBirth: jsonb("timeOfBirth"),
  topic_of_concern: text("topic_of_concern"),
  updatedAt: jsonb("updatedAt"),
});

// === ASTROLOGER (49 docs) ===
export const astrologer = pgTable("astrologer", {
  id: uuid("id").primaryKey().defaultRandom(),
  IFSC_code: text("IFSC_code"),
  __v: integer("__v"),
  aadharNumber: text("aadharNumber"),
  about: text("about"),
  account_holder_name: text("account_holder_name"),
  account_name: text("account_name"),
  account_number: text("account_number"),
  account_type: text("account_type"),
  activeBankAcount: text("activeBankAcount"),
  address: text("address"),
  alternateNumber: text("alternateNumber"),
  astrologerName: text("astrologerName"),
  astrologers_status: text("astrologers_status"),
  avg_rating: integer("avg_rating"),
  bankAcount: jsonb("bankAcount"),
  bank_proof_image: text("bank_proof_image"),
  call_notification: boolean("call_notification"),
  call_price: integer("call_price"),
  call_status: text("call_status"),
  chat_notification: boolean("chat_notification"),
  chat_price: integer("chat_price"),
  chat_status: text("chat_status"),
  city: text("city"),
  commission_call_price: text("commission_call_price"),
  commission_chat_price: text("commission_chat_price"),
  commission_normal_video_call_price: integer("commission_normal_video_call_price"),
  commission_remark: text("commission_remark"),
  commission_video_call_price: integer("commission_video_call_price"),
  confirm_password: text("confirm_password"),
  consultationPrices: jsonb("consultationPrices"),
  consultation_call_price: integer("consultation_call_price"),
  consultation_chat_price: integer("consultation_chat_price"),
  consultation_commission: integer("consultation_commission"),
  consultation_commission_call: integer("consultation_commission_call"),
  consultation_commission_chat: integer("consultation_commission_chat"),
  consultation_commission_videocall: integer("consultation_commission_videocall"),
  consultation_price: text("consultation_price"),
  consultation_videocall_price: integer("consultation_videocall_price"),
  country: text("country"),
  country_phone_code: text("country_phone_code"),
  createdAt: jsonb("createdAt"),
  currency: text("currency"),
  dateOfBirth: jsonb("dateOfBirth"),
  device_id: text("device_id"),
  displayName: text("displayName"),
  email: text("email"),
  endTime: text("endTime"),
  enquiry: boolean("enquiry"),
  experience: text("experience"),
  expertise: jsonb("expertise"), // Array of UUIDs
  fcmToken: text("fcmToken"),
  follower_count: integer("follower_count"),
  free_min: integer("free_min"),
  gender: text("gender"),
  gift_commission: integer("gift_commission"),
  id_proof_image: text("id_proof_image"),
  inquiry_status: boolean("inquiry_status"),
  isDeleted: integer("isDeleted"),
  isLive: boolean("isLive"),
  isOnline: boolean("isOnline"),
  isOtpVerified: integer("isOtpVerified"),
  isSignupCompleted: integer("isSignupCompleted"),
  isVerified: boolean("isVerified"),
  language: jsonb("language"), // Array of UUIDs
  live_notification: boolean("live_notification"),
  loginSessions: jsonb("loginSessions"),
  long_bio: text("long_bio"),
  mainExpertise: jsonb("mainExpertise"), // Array of UUIDs
  multipleImages: jsonb("multipleImages"),
  multipleVideos: jsonb("multipleVideos"),
  nextAvailableSlot: jsonb("nextAvailableSlot"),
  nextOnline: jsonb("nextOnline"),
  normal_video_call_price: integer("normal_video_call_price"),
  onlineStatus: boolean("onlineStatus"),
  otp: text("otp"),
  panCard: text("panCard"),
  pan_proof_image: text("pan_proof_image"),
  password: text("password"),
  phoneNumber: text("phoneNumber"),
  preferredDays: jsonb("preferredDays"),
  profileImage: text("profileImage"),
  rating: real("rating"),
  ratingCount: integer("ratingCount"),
  remedies: jsonb("remedies"), // Array of UUIDs
  short_bio: text("short_bio"),
  skill: jsonb("skill"), // Array of UUIDs
  startTime: text("startTime"),
  state: text("state"),
  status: integer("status"),
  subSkill: jsonb("subSkill"), // Array of UUIDs
  tagLine: text("tagLine"),
  title: text("title"),
  today_earnings: jsonb("today_earnings"),
  totalActiveDuration: integer("totalActiveDuration"),
  totalCallDuration: integer("totalCallDuration"),
  totalChatDuration: integer("totalChatDuration"),
  totalOfflineDuration: integer("totalOfflineDuration"),
  totalVideoCallDuration: integer("totalVideoCallDuration"),
  total_minutes: integer("total_minutes"),
  unique_id: text("unique_id"),
  updatedAt: jsonb("updatedAt"),
  video_call_price: integer("video_call_price"),
  video_call_status: text("video_call_status"),
  wallet_balance: integer("wallet_balance"),
  webFcmToken: text("webFcmToken"),
  welcome_message: text("welcome_message"),
  whatsappNumber: text("whatsappNumber"),
  workingOnOtherApps: text("workingOnOtherApps"),
  youtubeLink: text("youtubeLink"),
  zipCode: text("zipCode"),
});

// === BLOGSCATEGORY (3 docs) ===
export const blogscategory = pgTable("blogscategory", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  blog_category: text("blog_category"),
  createdAt: jsonb("createdAt"),
  updatedAt: jsonb("updatedAt"),
});

// === ASTROLOGERFOLLOWER (14 docs) ===
export const astrologerfollower = pgTable("astrologerfollower", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  astrologerId: uuid("astrologerId"), // FK -> astrologer.id
  createdAt: jsonb("createdAt"),
  followers: jsonb("followers"),
  updatedAt: jsonb("updatedAt"),
});

// === ASTROBLOGS (24 docs) ===
export const astroblogs = pgTable("astroblogs", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  blogCategoryId: uuid("blogCategoryId"), // FK -> blogscategory.id (from JSONB)
  createdAt: jsonb("createdAt"),
  created_by: text("created_by"),
  description: text("description"),
  image: text("image"),
  status: integer("status"),
  title: text("title"),
  updatedAt: jsonb("updatedAt"),
  viewsCount: integer("viewsCount"),
});

// === PLATFORMCHARGES (1 docs) ===
export const platformcharges = pgTable("platformcharges", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  platformChargeAmount: integer("platformChargeAmount"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === FILES (39 docs) ===
export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  filePath: text("filePath"),
  fileType: text("fileType"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === ADMINS (1 docs) ===
export const admins = pgTable("admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  password: text("password"),
  username: text("username"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === LIFEJOURNEYREPORTORDERS (548 docs) ===
export const lifejourneyreportorders = pgTable("lifejourneyreportorders", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  amount: text("amount"),
  astroConsultation: boolean("astroConsultation"),
  consultationDate: text("consultationDate"),
  consultationTime: text("consultationTime"),
  createdAt: jsonb("createdAt"),
  dateOfBirth: text("dateOfBirth"),
  deletedAt: text("deletedAt"),
  email: text("email"),
  expressDelivery: boolean("expressDelivery"),
  gender: text("gender"),
  name: text("name"),
  orderID: text("orderID"),
  partnerDateOfBirth: text("partnerDateOfBirth"),
  partnerPlaceOfBirth: text("partnerPlaceOfBirth"),
  partnerPlaceOfBirthPincode: text("partnerPlaceOfBirthPincode"),
  partnerTimeOfBirth: text("partnerTimeOfBirth"),
  paymentAt: jsonb("paymentAt"),
  paymentTxnId: text("paymentTxnId"),
  placeOfBirth: text("placeOfBirth"),
  placeOfBirthPincode: text("placeOfBirthPincode"),
  planName: text("planName"),
  problemType: text("problemType"),
  questionOne: text("questionOne"),
  questionTwo: text("questionTwo"),
  razorpayOrderId: text("razorpayOrderId"),
  reportLanguage: text("reportLanguage"),
  status: text("status"),
  timeOfBirth: text("timeOfBirth"),
  updatedAt: jsonb("updatedAt"),
  utm_campaign: text("utm_campaign"),
  utm_content: text("utm_content"),
  utm_medium: text("utm_medium"),
  utm_source: text("utm_source"),
  utm_term: text("utm_term"),
  whatsapp: text("whatsapp"),
});

// === LIVESESSIONTOPICS (1 docs) ===
export const livesessiontopics = pgTable("livesessiontopics", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  categoryId: uuid("categoryId"), // ObjectId from JSONB → UUID
  createdAt: jsonb("createdAt"),
  topicName: text("topicName"),
  updatedAt: jsonb("updatedAt"),
});

// === PUJA (3 docs) ===
export const puja = pgTable("puja", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  about: jsonb("about"),
  adminCommission: integer("adminCommission"),
  bannerImages: text("bannerImages"),
  categoryId: jsonb("categoryId"),
  createdAt: jsonb("createdAt"),
  image: jsonb("image"),
  price: integer("price"),
  pujaName: text("pujaName"),
  shortDescription: text("shortDescription"),
  updatedAt: jsonb("updatedAt"),
});

// === LIFECHANGINGREPORTORDERS (2 docs) ===
export const lifechangingreportorders = pgTable("lifechangingreportorders", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  amount: text("amount"),
  astroConsultation: boolean("astroConsultation"),
  consultationDate: text("consultationDate"),
  consultationTime: text("consultationTime"),
  createdAt: jsonb("createdAt"),
  dateOfBirth: text("dateOfBirth"),
  deletedAt: text("deletedAt"),
  email: text("email"),
  expressDelivery: boolean("expressDelivery"),
  gender: text("gender"),
  name: text("name"),
  orderID: text("orderID"),
  partnerDateOfBirth: text("partnerDateOfBirth"),
  partnerPlaceOfBirth: text("partnerPlaceOfBirth"),
  partnerPlaceOfBirthPincode: text("partnerPlaceOfBirthPincode"),
  partnerTimeOfBirth: text("partnerTimeOfBirth"),
  paymentAt: jsonb("paymentAt"),
  paymentTxnId: text("paymentTxnId"),
  placeOfBirth: text("placeOfBirth"),
  placeOfBirthPincode: text("placeOfBirthPincode"),
  problemType: text("problemType"),
  questionOne: text("questionOne"),
  questionTwo: text("questionTwo"),
  razorpayOrderId: text("razorpayOrderId"),
  reportLanguage: text("reportLanguage"),
  status: text("status"),
  timeOfBirth: text("timeOfBirth"),
  updatedAt: jsonb("updatedAt"),
  whatsapp: text("whatsapp"),
});

// === SUBSKILLS (2 docs) ===
export const subskills = pgTable("subskills", {
  id: uuid("id").primaryKey().defaultRandom(),
  description: text("description"),
  skill: jsonb("skill"),
  subskill: text("subskill"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === CONSULTATIONSBOOKING (106 docs) ===
export const consultationsbooking = pgTable("consultationsbooking", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  astrologerId: uuid("astrologerId"), // FK -> astrologer.id
  astrologerJoined: boolean("astrologerJoined"),
  consultationPrice: integer("consultationPrice"),
  consultationTopic: text("consultationTopic"),
  consultationType: text("consultationType"),
  couponCode: text("couponCode"),
  createdAt: jsonb("createdAt"),
  customerId: uuid("customerId"), // FK -> customers.id
  date: jsonb("date"),
  dateOfBirth: text("dateOfBirth"),
  endTime: text("endTime"),
  fromTime: text("fromTime"),
  fullName: text("fullName"),
  isBirthDateProvided: boolean("isBirthDateProvided"),
  isBirthTimeProvided: boolean("isBirthTimeProvided"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  meetingId: text("meetingId"),
  meetingPassword: text("meetingPassword"),
  mobileNumber: text("mobileNumber"),
  paymentDetails: jsonb("paymentDetails"),
  placeOfBirth: text("placeOfBirth"),
  reviewed: boolean("reviewed"),
  slotId: uuid("slotId"), // FK -> astrologerslots.id
  startTime: text("startTime"),
  status: text("status"),
  timeOfBirth: text("timeOfBirth"),
  toTime: text("toTime"),
  updatedAt: jsonb("updatedAt"),
});

// === ADMINEARNING (212 docs) ===
export const adminearning = pgTable("adminearning", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  adminPrice: text("adminPrice"),
  astrologerId: uuid("astrologerId"), // FK -> astrologer.id
  chargePerMinutePrice: integer("chargePerMinutePrice"),
  createdAt: jsonb("createdAt"),
  customerId: uuid("customerId"), // FK -> customers.id
  duration: integer("duration"),
  endTime: text("endTime"),
  historyId: text("historyId"),
  partnerPrice: text("partnerPrice"),
  startTime: text("startTime"),
  totalPrice: text("totalPrice"),
  transactionId: text("transactionId"),
  transactionType: text("transactionType"),
  type: text("type"),
  updatedAt: jsonb("updatedAt"),
});

// === KUNDLI (179 docs) ===
export const kundli = pgTable("kundli", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  customerId: uuid("customerId"), // FK -> customers.id
  dob: jsonb("dob"),
  gender: text("gender"),
  lat: real("lat"),
  lon: real("lon"),
  name: text("name"),
  place: text("place"),
  tob: jsonb("tob"),
  updatedAt: jsonb("updatedAt"),
});

// === SUGGESTEDREMEDIES (9 docs) ===
export const suggestedremedies = pgTable("suggestedremedies", {
  id: uuid("id").primaryKey().defaultRandom(),
  Id: jsonb("Id"),
  __v: integer("__v"),
  astrologerId: uuid("astrologerId"), // FK -> astrologer.id
  createdAt: jsonb("createdAt"),
  customerId: uuid("customerId"), // FK -> customers.id
  link: text("link"),
  pujaId: jsonb("pujaId"),
  updatedAt: jsonb("updatedAt"),
});

// === ADMINTRANSACTIONHISTORY (3 docs) ===
export const admintransactionhistory = pgTable("admintransactionhistory", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  transactions: jsonb("transactions"),
  type: text("type"),
  updatedAt: jsonb("updatedAt"),
});

// === ASTROREGISTERPUJA (9 docs) ===
export const astroregisterpuja = pgTable("astroregisterpuja", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  astrologerId: uuid("astrologerId"), // FK -> astrologer.id
  createdAt: jsonb("createdAt"),
  pujaId: jsonb("pujaId"),
  updatedAt: jsonb("updatedAt"),
});

// === SLOTSTIME (4 docs) ===
export const slotstime = pgTable("slotstime", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  active: boolean("active"),
  createdAt: jsonb("createdAt"),
  slotDuration: integer("slotDuration"),
  updatedAt: jsonb("updatedAt"),
});

// === CUSTOMERS (482 docs) ===
export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  address: jsonb("address"),
  alternateNumber: text("alternateNumber"),
  banned_status: boolean("banned_status"),
  call_status: boolean("call_status"),
  chat_status: boolean("chat_status"),
  createdAt: jsonb("createdAt"),
  customerName: text("customerName"),
  dateOfBirth: text("dateOfBirth"),
  device_id: text("device_id"),
  email: text("email"),
  fcmToken: text("fcmToken"),
  first_wallet_recharged: boolean("first_wallet_recharged"),
  gender: text("gender"),
  image: text("image"),
  isBlock: integer("isBlock"),
  isDeleted: integer("isDeleted"),
  isOnline: boolean("isOnline"),
  isOtpVerified: integer("isOtpVerified"),
  isSignupCompleted: integer("isSignupCompleted"),
  is_registered: boolean("is_registered"),
  new_user: boolean("new_user"),
  otp: integer("otp"),
  phoneNumber: text("phoneNumber"),
  status: integer("status"),
  timeOfBirth: text("timeOfBirth"),
  type: text("type"),
  updatedAt: jsonb("updatedAt"),
  wallet_balance: integer("wallet_balance"),
  webFcmToken: text("webFcmToken"),
});

// === SKILLS (7 docs) ===
export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  skill: text("skill"),
  updatedAt: jsonb("updatedAt"),
});

// === NEWLETTERSUBSCRIBER (45 docs) ===
export const newlettersubscriber = pgTable("newlettersubscriber", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  email: text("email"),
  subscribedAt: jsonb("subscribedAt"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === ADDRESS_PUJA (2 docs) ===
export const address_puja = pgTable("address_puja", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  city: text("city"),
  createdAt: jsonb("createdAt"),
  customerId: uuid("customerId"), // FK -> customers.id
  houseNo: text("houseNo"),
  landmark: text("landmark"),
  mobile: integer("mobile"),
  name: text("name"),
  pincode: integer("pincode"),
  state: text("state"),
  updatedAt: jsonb("updatedAt"),
});

// === PUJA_CATEGORIES (3 docs) ===
export const puja_categories = pgTable("puja_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  __v: integer("__v"),
  categoryName: text("categoryName"),
  createdAt: jsonb("createdAt"),
  updatedAt: jsonb("updatedAt"),
});

// === MATCHING (19 docs) ===
export const matching = pgTable("matching", {
  id: uuid("id").primaryKey().defaultRandom(),
  FemaleName: text("FemaleName"),
  FemaledateOfBirth: jsonb("FemaledateOfBirth"),
  Femalegender: text("Femalegender"),
  Femalelatitude: real("Femalelatitude"),
  Femalelongitude: real("Femalelongitude"),
  FemaleplaceOfBirth: text("FemaleplaceOfBirth"),
  FemaletimeOfBirth: jsonb("FemaletimeOfBirth"),
  MaleName: text("MaleName"),
  MaledateOfBirth: jsonb("MaledateOfBirth"),
  Malegender: text("Malegender"),
  Malelatitude: real("Malelatitude"),
  Malelongitude: real("Malelongitude"),
  MaleplaceOfBirth: text("MaleplaceOfBirth"),
  MaletimeOfBirth: jsonb("MaletimeOfBirth"),
  __v: integer("__v"),
  createdAt: jsonb("createdAt"),
  customerId: uuid("customerId"), // FK -> customers.id
  timeZone: text("timeZone"),
  updatedAt: jsonb("updatedAt"),
});


// === RELATIONS ===

export const availabilityinsightsRelations = relations(availabilityinsights, ({ one, many }) => ({
  astrologer: one(astrologer, {
    fields: [availabilityinsights.astrologerId],
    references: [astrologer.id],
  }),
  customer: one(customers, {
    fields: [availabilityinsights.customerId],
    references: [customers.id],
  }),
}));

export const puja_cartRelations = relations(puja_cart, ({ one, many }) => ({
  customer: one(customers, {
    fields: [puja_cart.customerId],
    references: [customers.id],
  }),
}));

export const puja_bookingRelations = relations(puja_booking, ({ one, many }) => ({
  customer: one(customers, {
    fields: [puja_booking.customerId],
    references: [customers.id],
  }),
}));

export const astrologerlivesRelations = relations(astrologerlives, ({ one, many }) => ({
  astrologer: one(astrologer, {
    fields: [astrologerlives.astrologerId],
    references: [astrologer.id],
  }),
}));

export const callhistoryRelations = relations(callhistory, ({ one, many }) => ({
  astrologer: one(astrologer, {
    fields: [callhistory.astrologerId],
    references: [astrologer.id],
  }),
  customer: one(customers, {
    fields: [callhistory.customerId],
    references: [customers.id],
  }),
}));

export const astrologerslotsRelations = relations(astrologerslots, ({ one, many }) => ({
  astrologer: one(astrologer, {
    fields: [astrologerslots.astrologerId],
    references: [astrologer.id],
  }),
}));

export const rechargewalletRelations = relations(rechargewallet, ({ one, many }) => ({
  customer: one(customers, {
    fields: [rechargewallet.customer],
    references: [customers.id],
  }),
}));

export const reviewRelations = relations(review, ({ one, many }) => ({
  astrologer: one(astrologer, {
    fields: [review.astrologer],
    references: [astrologer.id],
  }),
  customer: one(customers, {
    fields: [review.customer],
    references: [customers.id],
  }),
}));

export const consultationreviewRelations = relations(consultationreview, ({ one, many }) => ({
  astrologer: one(astrologer, {
    fields: [consultationreview.astrologerId],
    references: [astrologer.id],
  }),
  consultation: one(consultationsbooking, {
    fields: [consultationreview.consultationId],
    references: [consultationsbooking.id],
  }),
  customer: one(customers, {
    fields: [consultationreview.customerId],
    references: [customers.id],
  }),
}));

export const linkedprofileRelations = relations(linkedprofile, ({ one, many }) => ({
  customer: one(customers, {
    fields: [linkedprofile.customerId],
    references: [customers.id],
  }),
}));

export const astrologerfollowerRelations = relations(astrologerfollower, ({ one, many }) => ({
  astrologer: one(astrologer, {
    fields: [astrologerfollower.astrologerId],
    references: [astrologer.id],
  }),
}));

export const astroblogsRelations = relations(astroblogs, ({ one, many }) => ({
  blogcategory: one(blogscategory, {
    fields: [astroblogs.blogCategoryId],
    references: [blogscategory.id],
  }),
}));

export const consultationsbookingRelations = relations(consultationsbooking, ({ one, many }) => ({
  astrologer: one(astrologer, {
    fields: [consultationsbooking.astrologerId],
    references: [astrologer.id],
  }),
  customer: one(customers, {
    fields: [consultationsbooking.customerId],
    references: [customers.id],
  }),
  slot: one(astrologerslots, {
    fields: [consultationsbooking.slotId],
    references: [astrologerslots.id],
  }),
}));

export const adminearningRelations = relations(adminearning, ({ one, many }) => ({
  astrologer: one(astrologer, {
    fields: [adminearning.astrologerId],
    references: [astrologer.id],
  }),
  customer: one(customers, {
    fields: [adminearning.customerId],
    references: [customers.id],
  }),
}));

export const kundliRelations = relations(kundli, ({ one, many }) => ({
  customer: one(customers, {
    fields: [kundli.customerId],
    references: [customers.id],
  }),
}));

export const suggestedremediesRelations = relations(suggestedremedies, ({ one, many }) => ({
  astrologer: one(astrologer, {
    fields: [suggestedremedies.astrologerId],
    references: [astrologer.id],
  }),
  customer: one(customers, {
    fields: [suggestedremedies.customerId],
    references: [customers.id],
  }),
}));

export const astroregisterpujaRelations = relations(astroregisterpuja, ({ one, many }) => ({
  astrologer: one(astrologer, {
    fields: [astroregisterpuja.astrologerId],
    references: [astrologer.id],
  }),
}));

export const address_pujaRelations = relations(address_puja, ({ one, many }) => ({
  customer: one(customers, {
    fields: [address_puja.customerId],
    references: [customers.id],
  }),
}));

export const matchingRelations = relations(matching, ({ one, many }) => ({
  customer: one(customers, {
    fields: [matching.customerId],
    references: [customers.id],
  }),
}));