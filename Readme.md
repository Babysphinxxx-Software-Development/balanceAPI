Questions
1. (Optional) If you didn’t have time to complete your intended design, what else would you have done?

Just the testing Part, i will need to mock up the api call from bitstamp so that i can test more accuracy result. 

2. Which took the most time? What did you find most difficult?

Quite average, not difficult.

3. If we wanted the balance to update on the frontend more often (10 times per second), how would you improve the current system to handle this?

If that a case, i found out the example bitstamp will only update 24 hours/days so we can cache the convert rate or cache the result, instead of keep calling the back ask for the api.

4. How did you find the test overall? If you have any suggestions on how we can improve the test, we'd love to hear them!

The test overall not real difficult, maybe can add more feature optional like cache the result with redis. 