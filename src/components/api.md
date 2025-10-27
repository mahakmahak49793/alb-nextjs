# APi for getslots of astrologer

 /api/astrologer/get_slots_date/68b546bad26a07574a62453d 

 return json are like this 
 ```
 {
  "success": true,
  "slotDates": [
    "2025-09-30",
    "2025-10-01",
    "2025-10-02"
  ]
}
```

# API for time slot where we can pass date  astrologerID and interval then then the return this type of slote

http://localhost:3003/api/astrologer/get_slots/68b546bad26a07574a62453d/by-date?date=2025-10-01&duration=30

Responce are like this 

```
{
  "SlotDate": "2025-10-01",
  "SlotTimeByDuration": {
    "30min": [
      {
        "_id": "68dcf4ba6f437dfa85b760b7",
        "fromTime": "09:30",
        "toTime": "10:00",
        "duration": 30,
        "status": "available"
      },
      {
        "_id": "68dcf4ba6f437dfa85b760b8",
        "fromTime": "10:00",
        "toTime": "10:30",
        "duration": 30,
        "status": "available"
      },
      {
        "_id": "68dcf4ba6f437dfa85b760b9",
        "fromTime": "10:30",
        "toTime": "11:00",
        "duration": 30,
        "status": "available"
      },
      {
        "_id": "68dcf4ba6f437dfa85b760ba",
        "fromTime": "11:00",
        "toTime": "11:30",
        "duration": 30,
        "status": "available"
      },
      {
        "_id": "68dcf4ba6f437dfa85b760bb",
        "fromTime": "11:30",
        "toTime": "12:00",
        "duration": 30,
        "status": "available"
      },
      {
        "_id": "68dcf4ba6f437dfa85b760bc",
        "fromTime": "12:00",
        "toTime": "12:30",
        "duration": 30,
        "status": "available"
      }
    ]
  }
}
```