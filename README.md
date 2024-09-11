# LIVWEATHER
![Screenshot 2024-09-11 120728](https://github.com/user-attachments/assets/37ec6ad1-afc6-4f9d-a579-38d4e3d4a9b8)


You can enter Multiple Cities to get Weather data seperated by comma: 

![Screenshot 2024-09-11 120711](https://github.com/user-attachments/assets/d2dfb088-a915-43ca-8f59-52f7f3ac91c5)


You can also enter single city:

![Screenshot 2024-09-11 120655](https://github.com/user-attachments/assets/364b75ad-1dee-4fa1-8cc2-88036803fed5)



Main Optimizations Point:

1. Caching API Responses -->
•	Problem: If you request the same weather data multiple times, it results in redundant API calls.
•	Solution: Cache the responses of the API for cities that have already been requested. This can reduce the load on the server and speed up subsequent requests.

2. Batch API Calls -->
•	Problem: Making individual API calls for each city is inefficient.
•	Solution: So, to reduce the number of network requests and improves performance I implemented Batch API calls.

3. Minimize Data Payload -->
•	Problem: Fetching unnecessary data fields increases response size and load time.
•	Solution: So, Modified the API query to request only essential data and not the entire dataset.

Thanks for Reading this Readme file I hope you will enjoy surfing this website !!
