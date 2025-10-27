
Database Changes During Astrologer Consultation Booking Process
📊 Complete Database Operations Flow
1. Initial Data Fetch Operations (READ Operations)
1.1 Get Astrologer Details
API: GET /api/astrologer/get-astrologer-details

Database Queries:

javascript
// READ from Astrologer collection
db.Astrologer.findOne({ _id: "689dc7dd892dd394e3ba4d02" })
Data Retrieved:

Astrologer profile information

Consultation prices with duration mapping

Experience, skills, ratings

Commission percentage

No Database Changes ❌

1.2 Get Available Slot Dates
API: GET /api/astrologer/get_slots_date/:astrologerId

Database Queries:

javascript
// READ from AstrologerSlots collection
db.AstrologerSlots.find({
  astrologerId: ObjectId("689dc7dd892dd394e3ba4d02"),
  date: { $gte: new Date() },
  status: "available"
}).distinct("date")
No Database Changes ❌

1.3 Get Time Slots by Date
API: GET /api/astrologer/get_slots_customer/:astrologerId/by-date?date=2025-09-27

Database Queries:

javascript
// READ from AstrologerSlots collection  
db.AstrologerSlots.find({
  astrologerId: ObjectId("689dc7dd892dd394e3ba4d02"),
  date: new Date("2025-09-27T00:00:00.000Z"),
  status: "available"
}).sort({ fromTime: 1 })
No Database Changes ❌

2. User Authentication Operations
2.1 Customer Login
API: POST /api/customers/customer-login

Database Changes:

javascript
// UPDATE Customers collection
db.Customers.updateOne(
  { phoneNumber: "9319727429" },
  { 
    $set: { 
      otp: 1234,
      updatedAt: new Date()
    }
  }
)
Changes Made: ✅

OTP stored in customer record

Last updated timestamp modified

2.2 Verify Customer
API: POST /api/customers/verify-customer

Database Changes:

javascript
// UPDATE Customers collection
db.Customers.updateOne(
  { phoneNumber: "9319727429" },
  { 
    $set: {
      fcmToken: "web_token_1758886502600",
      device_id: "web_device_1758886502600", 
      updatedAt: new Date()
    }
  }
)
Changes Made: ✅

FCM token updated for notifications

Device ID registered

Timestamp updated

3. Main Booking Operation
3.1 Book Consultation
API: POST /api/customers/book_consultation_test

This operation performs MULTIPLE database changes across 3 collections:

Change #1: Update Slot Status
Collection: AstrologerSlots

Before:

javascript
{
  _id: ObjectId("68d66bd94c2b1243e93357a9"),
  astrologerId: ObjectId("689dc7dd892dd394e3ba4d02"),
  date: ISODate("2025-09-27T00:00:00.000Z"),
  fromTime: "15:30",
  toTime: "15:45", 
  duration: 15,
  status: "available", // ← Current status
  createdAt: ISODate("2025-09-26T..."),
  updatedAt: ISODate("2025-09-26T...")
}
Database Operation:

javascript
// UPDATE AstrologerSlots collection
db.AstrologerSlots.updateOne(
  { _id: ObjectId("68d66bd94c2b1243e93357a9") },
  { 
    $set: { 
      status: "booked",
      updatedAt: new Date()
    }
  }
)
After:

javascript
{
  _id: ObjectId("68d66bd94c2b1243e93357a9"),
  astrologerId: ObjectId("689dc7dd892dd394e3ba4d02"),
  date: ISODate("2025-09-27T00:00:00.000Z"),
  fromTime: "15:30", 
  toTime: "15:45",
  duration: 15,
  status: "booked", // ← Changed from "available"
  createdAt: ISODate("2025-09-26T..."),
  updatedAt: ISODate("2025-09-26T11:35:02.652Z") // ← Updated
}
Impact: ❗ Slot becomes unavailable for other customers

Change #2: Create Consultation Record
Collection: ConsultationBooking (New Document)

Database Operation:

javascript
// INSERT into ConsultationBooking collection
db.ConsultationBooking.insertOne({
  _id: ObjectId("673f5a1b2c3d4e5f67890123"), // Auto-generated
  customerId: ObjectId("689473fb8f529ae05ee31c2c"),
  astrologerId: ObjectId("689dc7dd892dd394e3ba4d02"),
  slotId: ObjectId("68d66bd94c2b1243e93357a9"),
  fullName: "Darpan Kumar",
  mobileNumber: "9319727429", 
  dateOfBirth: "1994-05-03",
  timeOfBirth: "20:45",
  placeOfBirth: "Patna, Bihar, India",
  date: ISODate("2025-09-27T00:00:00.000Z"),
  fromTime: "15:30",
  toTime: "15:45", 
  consultationType: "videocall",
  consultationTopic: "Career guidance and future prospects",
  consultationPrice: 199,
  duration: 15,
  commissionAmount: 99.5, // 50% of 199
  latitude: "25.5940947",
  longitude: "85.1375645",
  paymentDetails: {
    paymentId: "test_payment_1758887123456",
    paymentAmount: 199,
    currency: "INR",
    paymentStatus: "captured",
    paymentMethod: "card",
    email: "ksbmdarpankumar@gmail.com",
    contact: "9319727429",
    fee: 0,
    tax: 0,
    createdAt: ISODate("2025-09-26T11:35:02.652Z"),
    transactionId: "test_txn_1758887123456"
  },
  createdAt: ISODate("2025-09-26T11:35:02.652Z"),
  updatedAt: ISODate("2025-09-26T11:35:02.652Z")
})
New Record Created: ✅

Complete consultation booking details

Customer information stored

Payment details (mock for testing)

Appointment time and date locked

Change #3: Create Admin Earnings Record
Collection: AdminEarning (New Document)

Database Operation:

javascript
// INSERT into AdminEarning collection
db.AdminEarning.insertOne({
  _id: ObjectId("673f5a1b2c3d4e5f67890124"), // Auto-generated
  type: 'Consultation',
  astrologerId: ObjectId("689dc7dd892dd394e3ba4d02"),
  customerId: ObjectId("689473fb8f529ae05ee31c2c"),
  transactionId: "673f5a1b2c3d4e5f67890123", // References consultation
  totalPrice: "199.00",
  adminPrice: "99.50", // Platform's 50% commission
  partnerPrice: "99.50", // Astrologer's 50% share
  duration: 15,
  chargePerMinutePrice: 13.27, // 199/15 minutes
  startTime: "15:30",
  endTime: "15:45", 
  transactionType: 'CREDIT',
  createdAt: ISODate("2025-09-26T11:35:02.652Z"),
  updatedAt: ISODate("2025-09-26T11:35:02.652Z")
})
New Record Created: ✅

Financial transaction recorded

Commission split calculated

Revenue tracking for platform

Astrologer earnings tracked

4. Optional Database Changes (May occur based on implementation)
4.1 Customer Wallet Deduction (If wallet payment)
Collection: Customers

javascript
// UPDATE Customers collection (if using wallet)
db.Customers.updateOne(
  { _id: ObjectId("689473fb8f529ae05ee31c2c") },
  { 
    $inc: { wallet_balance: -199 },
    $set: { updatedAt: new Date() }
  }
)
4.2 Astrologer Wallet Credit (If instant payout)
Collection: Astrologer

javascript
// UPDATE Astrologer collection (if instant payout)
db.Astrologer.updateOne(
  { _id: ObjectId("689dc7dd892dd394e3ba4d02") },
  { 
    $inc: { wallet_balance: 99.50 },
    $set: { updatedAt: new Date() }
  }
)
📈 Summary of Database Impact
Total Collections Modified: 3
AstrologerSlots - 1 document UPDATED

ConsultationBooking - 1 document CREATED

AdminEarning - 1 document CREATED

Data Integrity Maintained:
✅ Slot availability properly managed

✅ Financial records accurately created

✅ Customer booking history updated

✅ Commission calculations stored

Critical State Changes:
Slot Status: available → booked

Booking Status: Non-existent → booked

Financial State: Revenue and commission recorded

Rollback Requirements:
If booking fails after slot is marked booked:

javascript
// Rollback slot status
db.AstrologerSlots.updateOne(
  { _id: ObjectId("68d66bd94c2b1243e93357a9") },
  { $set: { status: "available" } }
)

// Delete created records
db.ConsultationBooking.deleteOne({ _id: ObjectId("673f5a1b2c3d4e5f67890123") })
db.AdminEarning.deleteOne({ _id: ObjectId("673f5a1b2c3d4e5f67890124") })
This ensures ACID transaction properties and data consistency throughout the booking process.