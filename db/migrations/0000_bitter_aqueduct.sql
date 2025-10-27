CREATE TABLE "aboutus" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "address_puja" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"name" text,
	"mobile" integer,
	"houseNo" text,
	"landmark" text,
	"city" text,
	"pincode" integer,
	"state" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "addresscarts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"name" text,
	"phone" integer,
	"pincode" integer,
	"state" text,
	"city" text,
	"house" text,
	"area" text,
	"select" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text,
	"password" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "adminearning" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text,
	"astrologerId" uuid,
	"customerId" uuid,
	"giftId" uuid,
	"transactionId" text,
	"totalPrice" text,
	"adminPrice" text,
	"partnerPrice" text,
	"historyId" text,
	"duration" integer,
	"chargePerMinutePrice" integer,
	"startTime" text,
	"endTime" text,
	"transactionType" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "admintransactionhistory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"customerId" uuid,
	"amount" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "aichathistory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"messages" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "annaprashan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"annaprashan_image" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "announcement" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text,
	"astrologerId" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "appreview" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer" uuid,
	"app_ratings" integer,
	"app_comments" text,
	"is_verified" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "apptutorials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image" text,
	"link" text,
	"type" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "appversion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"versionName" text,
	"versionCode" text,
	"status" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "askastrologer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "askquestion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astroblogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"image" text,
	"blogCategoryId" uuid,
	"created_by" text,
	"status" integer,
	"description" text,
	"viewsCount" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrocompanion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"images" text,
	"type" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerName" text,
	"displayName" text,
	"title" text,
	"totalCallDuration" integer,
	"totalChatDuration" integer,
	"totalVideoCallDuration" integer,
	"phoneNumber" text,
	"email" text,
	"gender" text,
	"chat_price" integer,
	"call_price" integer,
	"video_call_price" integer,
	"experience" text,
	"about" text,
	"status" integer,
	"isDeleted" integer,
	"rating" integer,
	"wallet_balance" integer,
	"language" jsonb,
	"skill" jsonb,
	"expertise" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologeravailability" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologer" uuid,
	"day" text,
	"startTime" text,
	"endTime" text,
	"timeZone" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerblockedcustomer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"astrologerId" uuid,
	"isBlocked" boolean,
	"reason" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerfavorite" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"astrologerId" uuid,
	"isFavorite" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerfollower" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"followers" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerhaveanissue" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerinquiry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerleave" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"startDate" timestamp,
	"endDate" timestamp,
	"startTime" text,
	"endTime" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerlive" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"isLive" boolean,
	"startedAt" timestamp,
	"endedAt" timestamp,
	"streamUrl" text,
	"viewersCount" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologermessage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"message" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologernotification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"image" text,
	"astrologerIds" boolean,
	"sentAt" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerqueue" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"customerId" uuid,
	"intakeId" uuid,
	"customerRead" boolean,
	"type" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerrequests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"chat_price" text,
	"call_price" text,
	"startTime" timestamp,
	"endTime" timestamp,
	"preferredDays" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologersdetails" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologer_name" text,
	"email" text,
	"country_code" text,
	"phone_no" text,
	"alternate_no" text,
	"currency" text,
	"gender" text,
	"password" text,
	"dob" text,
	"skill" uuid,
	"language" text,
	"experience" text,
	"address" text,
	"country" text,
	"state" text,
	"city" text,
	"pincode" text,
	"remedies" uuid,
	"offers" text,
	"main_experties" uuid,
	"expertise" uuid,
	"youtube_link" text,
	"followere" text,
	"free_min" text,
	"portal" text,
	"profile_picture" text,
	"id_proof" text,
	"bank_proof" text,
	"account_no" text,
	"account_type" text,
	"ifsc_code" text,
	"account_holder" text,
	"pan_no" text,
	"adhar_no" text,
	"consultation_price" text,
	"call_price" text,
	"call_commision_price" text,
	"chat_price" text,
	"chat_commision_price" text,
	"about" text,
	"status" integer,
	"isDeleted" integer,
	"isSignupCompleted" integer,
	"isOnline" boolean,
	"isLive" boolean,
	"preferredDays" jsonb,
	"startTime" text,
	"endTime" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerslots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerupdate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"astrologerName" text,
	"displayName" text,
	"experience" text,
	"address" text,
	"long_bio" text,
	"language" jsonb,
	"skill" jsonb,
	"mainExpertise" jsonb,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerwallet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"referenceId" text,
	"referenceModel" text,
	"invoiceId" text,
	"gst" integer,
	"recieptNumber" integer,
	"totalAmount" integer,
	"amount" integer,
	"paymentMethod" text,
	"transactionType" text,
	"type" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astrologerwithdrawrequest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"amount" integer,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astromagazine" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astromallorders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"poojaId" uuid,
	"astrologerId" uuid,
	"customerId" uuid,
	"price" integer,
	"poojaDate" timestamp,
	"poojaTime" timestamp,
	"images" text,
	"videos" text,
	"description" text,
	"status" text,
	"mode" text,
	"duration" text,
	"adminCommission" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "astroregisterpuja" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"pujaId" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "auspicioustime" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "availabilityinsights" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"customerId" uuid,
	"user_type" text,
	"date" text,
	"available_minutes" integer,
	"busy_minutes" integer,
	"idle_minutes" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "bankaccount" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologer" uuid,
	"accountNumber" text,
	"accountHolderName" text,
	"IFSCCode" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "banners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"redirectionUrl" text,
	"title" text,
	"bannerFor" text,
	"redirectTo" text,
	"bannerImage" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "birhathoroscope" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "blogscategory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"blog_category" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "blogscount" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"blog_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "bookedpujahistory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cartId" uuid,
	"amount" integer,
	"orderId" text,
	"paymentId" text,
	"payment_status" text,
	"invoice_id" text,
	"description" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "branding" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domain" text,
	"logo_url" text,
	"primary_color" text,
	"secondary_color" text,
	"favicon_url" text,
	"footer_text" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "callhistory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"call_id" text,
	"user" text,
	"astrologer" text,
	"duration" text,
	"charges" text,
	"recording" text,
	"date" text,
	"status" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chathistory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"formId" uuid,
	"customerId" uuid,
	"astrologerId" uuid,
	"startTime" timestamp,
	"endTime" timestamp,
	"durationInSeconds" integer,
	"callPrice" integer,
	"commissionPrice" integer,
	"totalCallPrice" integer,
	"status" text,
	"transactionId" text,
	"callId" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "consultationbooking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"astrologerId" uuid,
	"fullName" text,
	"mobileNumber" text,
	"dateOfBirth" text,
	"timeOfBirth" text,
	"placeOfBirth" text,
	"slotId" uuid,
	"date" timestamp,
	"fromTime" text,
	"toTime" text,
	"startTime" text,
	"endTime" text,
	"status" text,
	"reviewed" boolean,
	"consultationPrice" integer,
	"consultationType" text,
	"consultationTopic" text,
	"couponCode" text,
	"astrologerJoined" boolean,
	"paymentDetails" text,
	"latitude" integer,
	"longitude" integer,
	"meetingId" text,
	"meetingPassword" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "consultationcommission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"callCommission" integer,
	"videoCallCommission" integer,
	"chatCommission" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "consultationreview" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consultationId" uuid,
	"customerId" uuid,
	"astrologerId" uuid,
	"rating" integer,
	"review" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "custoemrcart" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"productId" uuid,
	"customerId" uuid,
	"quantity" integer,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "customernotification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"image" text,
	"customerIds" boolean,
	"sentAt" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"unique_id" text,
	"customerName" text,
	"gender" text,
	"type" text,
	"phoneNumber" text,
	"alternateNumber" text,
	"email" text,
	"image" text,
	"address" text,
	"dateOfBirth" text,
	"timeOfBirth" text,
	"status" integer,
	"isDeleted" integer,
	"isBlock" integer,
	"otp" integer,
	"fcmToken" text,
	"webFcmToken" text,
	"isOtpVerified" integer,
	"isSignupCompleted" integer,
	"referred_by" text,
	"device_type" integer,
	"registration_date" timestamp,
	"login_date" timestamp,
	"isOnline" boolean,
	"chat_status" boolean,
	"call_status" boolean,
	"new_user" boolean,
	"first_wallet_recharged" boolean,
	"device_id" text,
	"is_registered" boolean,
	"banned_status" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "customerstransaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" text,
	"amount" integer,
	"transactionId" text,
	"timestamp" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "customerwallet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer" uuid,
	"astrologer" uuid,
	"walletbalance" integer,
	"starttime" timestamp,
	"endtime" timestamp,
	"totalchatduration" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "dailypanchang" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "day" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"day" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expertise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expertise" text,
	"decription" text,
	"image" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "faq" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "file" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filePath" text,
	"fileType" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "firstrechargeoffer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_recharge_plan_amount" integer,
	"first_recharge_plan_extra_percent" integer,
	"first_recharge_status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "freeminutes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"free_chat_minutes" integer,
	"free_call_minutes" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "gift" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gift" text,
	"giftIcon" text,
	"amount" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "howtousescreenshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "howtousevideo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"videoUrl" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "kundli" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"firstName" text,
	"lastName" text,
	"gender" text,
	"timeOfBirth" timestamp,
	"dateOfBirth" timestamp,
	"placeOfBirth" text,
	"latitude" integer,
	"longitude" integer,
	"timeZone" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "linkedprofile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"firstName" text,
	"lastName" text,
	"gender" text,
	"dateOfBirth" timestamp,
	"timeOfBirth" timestamp,
	"placeOfBirth" text,
	"maritalStatus" text,
	"latitude" integer,
	"longitude" integer,
	"status" integer,
	"topic_of_concern" text,
	"description" text,
	"customerProfile" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "listofquestion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text,
	"title" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "livecalls" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roomId" uuid,
	"streamId" text,
	"customerId" uuid,
	"startTime" timestamp,
	"endTime" timestamp,
	"durationInSeconds" integer,
	"maxDuration" integer,
	"amount" integer,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "livesessioncategory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categoryName" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "livesessiontopic" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categoryId" uuid,
	"topicName" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "livestreaming" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"liveId" text,
	"sessionTopicId" uuid,
	"categoryId" uuid,
	"startDate" timestamp,
	"startTime" timestamp,
	"duration" integer,
	"voiceCallPrice" integer,
	"vedioCallPrice" integer,
	"commissionVedioCallPrice" integer,
	"sessionTime" integer,
	"liveDuration" integer,
	"endTime" timestamp,
	"totalVoiceCall" integer,
	"totalVedioCall" integer,
	"totalGiftShared" integer,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "mainexpertise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mainExpertise" text,
	"description" text,
	"image" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "matching" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"MaleName" text,
	"Malegender" text,
	"MaletimeOfBirth" timestamp,
	"MaledateOfBirth" timestamp,
	"MaleplaceOfBirth" text,
	"Malelatitude" integer,
	"Malelongitude" integer,
	"FemaleName" text,
	"Femalegender" text,
	"FemaletimeOfBirth" timestamp,
	"FemaledateOfBirth" timestamp,
	"FemaleplaceOfBirth" text,
	"Femalelatitude" integer,
	"Femalelongitude" integer,
	"timeZone" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "matchmaking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"male_name" text,
	"male_timeOfBirth" timestamp,
	"male_dateOfBirth" timestamp,
	"male_placeOfBirth" text,
	"female_name" text,
	"female_timeOfBirth" timestamp,
	"female_dateOfBirth" timestamp,
	"female_placeOfBirth" text,
	"latitude" integer,
	"longitude" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologer" uuid,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"image" text,
	"astrologerIds" uuid,
	"customerIds" uuid,
	"sentAt" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "numerology" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"name" text,
	"time" text,
	"date" timestamp,
	"latitude" integer,
	"longitude" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ongoinglist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologer" uuid,
	"customer" uuid,
	"endTime" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "phonepewallet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"orderId" text,
	"invoiceId" text,
	"gst" integer,
	"recieptNumber" integer,
	"discount" integer,
	"offer" text,
	"totalAmount" integer,
	"amount" integer,
	"paymentMethod" text,
	"transactionType" text,
	"type" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "platformcharges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"platformChargeAmount" integer,
	"platformChargeDescription" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "pooja" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pujaName" text,
	"shortDescription" text,
	"price" integer,
	"adminCommission" integer,
	"categoryId" uuid,
	"image" text,
	"bannerImages" text,
	"type" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "predefinedmessages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" text,
	"type" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "privacypolicy" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categoryId" uuid,
	"productName" text,
	"description" text,
	"image" text,
	"bannerImages" text,
	"mrp" integer,
	"price" integer,
	"purchasePrice" integer,
	"quantity" integer,
	"inventory" integer,
	"expiryDate" timestamp,
	"manufactureDate" timestamp,
	"refundRequetDay" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "productcategory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categoryName" text,
	"image" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "productorder" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"products" integer,
	"customerId" uuid,
	"invoiceId" text,
	"amount" integer,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "puja" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pujaName" text,
	"shortDescription" text,
	"price" integer,
	"adminCommission" integer,
	"categoryId" uuid,
	"image" text,
	"bannerImages" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "puja_booking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"cartId" uuid,
	"pujas" text,
	"paymentStatus" text,
	"paymentDetails" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "puja_cart" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"pujas" integer,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "puja_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categoryName" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "pujacart" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"puja" integer,
	"customerId" uuid,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "pujacategory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categoryName" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "qualifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"higherQualification" text,
	"qualificationType" text,
	"instituteName" text,
	"documents" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rechargehistory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer" uuid,
	"invoiceId" text,
	"gst" integer,
	"offer" text,
	"amountGST" integer,
	"amount" integer,
	"orderid" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rechargeplan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"amount" integer,
	"percentage" integer,
	"startDate" timestamp,
	"endDate" timestamp,
	"recharge_status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rechargewallet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer" uuid,
	"referenceId" text,
	"addressId" uuid,
	"referenceModel" text,
	"invoiceId" text,
	"rechargePlanId" uuid,
	"gst" integer,
	"recieptNumber" integer,
	"discount" integer,
	"offer" text,
	"totalAmount" integer,
	"amount" integer,
	"paymentMethod" text,
	"payment_status" text,
	"order_id" text,
	"transactionType" text,
	"type" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "religionspirituality" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "remedies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer" uuid,
	"astrologer" uuid,
	"type" text,
	"callId" text,
	"videoCallId" text,
	"chatId" text,
	"liveVideoCallId" text,
	"ratings" integer,
	"comments" text,
	"app_ratings" integer,
	"app_comments" text,
	"is_verified" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "setting" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"image" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"skill" text,
	"image" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "slotstime" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slotDuration" integer,
	"active" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "subskills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subskill" text,
	"description" text,
	"skill" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "suggestedremedies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologerId" uuid,
	"customerId" uuid,
	"pujaId" uuid,
	"Id" uuid,
	"link" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tandc" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text,
	"type" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "testimonial" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"image" text,
	"astrologer" uuid,
	"description" text,
	"youtubeLink" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tranactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"status" integer,
	"amount" text,
	"bank_account" uuid,
	"tnx_type" text,
	"reason" text,
	"file" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "unknown" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"vivahMuhurat_image" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" text,
	"login_type" text,
	"ip_address" text,
	"username" text,
	"email" text,
	"password" text,
	"phoneNumber" text,
	"created_at" timestamp DEFAULT now(),
	"last_login" timestamp,
	"active_status" boolean,
	"company" text,
	"gender" text,
	"wallet" integer,
	"permissions" text,
	"isBlock" boolean,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "usersrole" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"role_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "videocall" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid,
	"astrologerId" uuid,
	"callId" text,
	"formId" text,
	"videcallPrice" text,
	"videocommissionPrice" text,
	"status" text,
	"totalPrice" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "waitinglist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"astrologer" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "yellowbook" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "chathistory" ADD CONSTRAINT "chathistory_formId_linkedprofile_id_fk" FOREIGN KEY ("formId") REFERENCES "public"."linkedprofile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chathistory" ADD CONSTRAINT "chathistory_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chathistory" ADD CONSTRAINT "chathistory_astrologerId_astrologer_id_fk" FOREIGN KEY ("astrologerId") REFERENCES "public"."astrologer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customerwallet" ADD CONSTRAINT "customerwallet_customer_customers_id_fk" FOREIGN KEY ("customer") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customerwallet" ADD CONSTRAINT "customerwallet_astrologer_astrologer_id_fk" FOREIGN KEY ("astrologer") REFERENCES "public"."astrologer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kundli" ADD CONSTRAINT "kundli_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rechargehistory" ADD CONSTRAINT "rechargehistory_customer_customers_id_fk" FOREIGN KEY ("customer") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;