Astrologer Consultation Booking System - Complete Flow Documentation
Based on our implementation, here's the complete flow of what happens when we perform an astrologer consultation booking operation:

🔄 Complete Booking Process Flow
1. User Journey Start
User browses astrologers on the platform

Views astrologer profile with details (experience, skills, ratings, pricing)

Sees available consultation types (Chat, Voice Call, Video Call)

2. Slot Selection Process
text
User → Astrologer Profile → Select Session Type → Choose Duration → Pick Date → Select Time Slot
Frontend Operations:

Fetches astrologer details: GET /api/astrologers/get-astrologer-details

Loads available dates: GET /api/astrologers/get_slots_date/:astrologerId

Gets time slots: GET /api/astrologers/get_slots_customer/:astrologerId/by-date?date=YYYY-MM-DD

Data Structure:

json
{
  "SlotTimeByDuration": {
    "15min": [{"_id": "...", "fromTime": "15:30", "toTime": "15:45", "status": "available"}],
    "30min": [{"_id": "...", "fromTime": "15:30", "toTime": "16:00", "status": "available"}],
    "60min": [{"_id": "...", "fromTime": "15:30", "toTime": "16:30", "status": "available"}]
  }
}
3. Booking Initiation
User clicks "Book Consultation"

Authentication Check: System verifies if user is logged in

If not logged in → Shows login modal (OTP-based verification)

If logged in → Proceeds to checkout

4. Checkout Process
Page: /consultation/checkout?type=videocall

Data Collection:

Pre-filled customer data (name, phone, email)

Birth details (date, time, place)

Consultation topic

Booking summary display

Booking Data Structure:

javascript
bookingData = {
  slotId: "68d66bd94c2b1243e93357a9",
  astrologerId: "689dc7dd892dd394e3ba4d02", 
  price: 199,
  duration: 15,
  consultationType: "videocall",
  start_time: "2025-09-27T15:30:00.000Z"
}
5. Backend Booking Process
API Endpoint: POST /api/customers/book_consultation

Operations Performed:

5.1 Validation Phase
javascript
✅ Validate MongoDB ObjectIDs (customerId, astrologerId, slotId)
✅ Check payment ID exists (currently required)
✅ Verify slot availability and status = 'available'
✅ Confirm astrologer exists and is active
5.2 Payment Processing (Currently Required)
javascript
// Razorpay Integration
const paymentDetails = await razorpayInstance.payments.fetch(paymentId);
if (paymentDetails?.status === 'captured') {
  // Proceed with booking
}
5.3 Price Calculation
javascript
// Find consultation price based on duration
const consultationPriceEntry = astrologer.consultationPrices.find(
  entry => entry.duration.slotDuration.toString() === slot.duration.toString()
);

const consultationPrice = consultationPriceEntry.price;
const commissionPercentage = astrologer.consultation_commission || 50;
const adminCommissionAmount = (consultationPrice * commissionPercentage) / 100;
const astrologerEarnings = consultationPrice - adminCommissionAmount;
5.4 Database Operations
javascript
1. Mark slot as 'booked': slot.status = 'booked'
2. Create Consultation record
3. Create AdminEarning record  
4. Update customer wallet (if applicable)
6. Database Schema Updates
6.1 Consultation Collection
javascript
{
  customerId: ObjectId,
  astrologerId: ObjectId,
  slotId: ObjectId,
  fullName: "Darpan Kumar",
  consultationType: "videocall",
  consultationTopic: "Career guidance",
  consultationPrice: 199,
  duration: 15,
  date: slot.date,
  fromTime: "15:30",
  toTime: "15:45",
  status: "booked",
  paymentDetails: {
    paymentId: "pay_xyz123",
    paymentAmount: 199,
    paymentStatus: "captured"
  }
}
6.2 Slot Status Update
javascript
// AstrologerSlots collection
{
  _id: "68d66bd94c2b1243e93357a9",
  astrologerId: "689dc7dd892dd394e3ba4d02",
  date: "2025-09-27",
  fromTime: "15:30",
  toTime: "15:45",
  duration: 15,
  status: "booked" // Changed from "available"
}
6.3 Admin Earnings Record
javascript
{
  type: 'Consultation',
  astrologerId: "689dc7dd892dd394e3ba4d02",
  customerId: "689473fb8f529ae05ee31c2c",
  totalPrice: "199.00",
  adminPrice: "99.50", // 50% commission
  partnerPrice: "99.50", // Astrologer share
  duration: 15,
  transactionType: 'CREDIT'
}
7. Response and Confirmation
Success Response:

json
{
  "success": true,
  "message": "Consultation booked successfully",
  "data": {
    "bookingId": "673f5a1b2c3d4e5f67890123",
    "consultation": { /* full consultation object */ }
  }
}
Frontend Actions:

Clear booking data from localStorage

Show success message

Redirect to success page or booking history

8. Post-Booking Operations
8.1 Notifications (Potential)
Send confirmation email to customer

Notify astrologer about new booking

Add calendar reminders

8.2 Business Logic
Slot becomes unavailable for other users

Astrologer earnings are recorded

Platform commission is calculated

Customer's consultation history is updated

🔧 Current Implementation Status
✅ Working Components
Astrologer profile display

Slot date and time fetching

Frontend booking form

Data validation

Hardcoded user authentication (for testing)

⚠️ Temporary Solutions
Payment validation bypassed for testing

Mock payment IDs generated

Hardcoded customer data (Darpan Kumar)

🔄 Pending Integration
Real payment gateway (Razorpay)

User authentication system

Email notifications

Video call integration

Booking confirmation system

🎯 Key Success Metrics
When booking is successful:

Database Changes: 3 collections updated (Consultations, Slots, AdminEarnings)

Status Changes: Slot status: available → booked

Financial Records: Commission split calculated and recorded

User Experience: Confirmation shown, redirect to success page

This system provides a complete end-to-end consultation booking experience with proper data validation, financial tracking, and scalable architecture for future enhancements.

