# Lead Time API

It exports an asynchronous function, returning as a parameter a variable with the stipulated time for delivery of the product, the API is used to send the data to the website and make clear the possible delivery date for the buyer. Also returns the avaialble quantity of the particular variant.

---

### API data

> This is a POST method

> https://{your-shopify-store-name}.com/api/store/leadtime

### Input Parameters

This API has only automatic parameters.

### Response Information

The return is given in the form of a variable, it indicates the maximum expectation of time that the bicycle can take to be delivered.

| Additional                 |      |     |     |     |
| -------------------------- | ---- | --- | --- | --- |
| File Format                | JSON |     |     |     |
| Authentication Requirement | No   |     |     |     |
| Usage Limitations          | No   |     |     |     |

### Return Errors

** 502 ** - The call was unable to access the shopify service.
