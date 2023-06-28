# Management System for Chronic Patient Data

This project was completed as part of a cloud computing course during my undergraduate studies in Digital Medical Technologies.
The objective of this initiative is to create a web-based solution that effectively manages data for chronic patients. By utilizing web technologies and integrating with cloud services, this system aims to streamline the process of inputting and retrieving patient information, as well as providing initial diagnoses based on symptoms.

## Key Features:

**Patient Data Input:** Users can easily enter patient details, including first name, last name, date of birth, a patient image, and up to five potential medical conditions. Additionally, patients have the option to add their own custom condition if they cannot find a suitable one from the provided options.

**Patient Card Retrieval:** The system enables quick access to patient information, by allowing users to retrieve patient cards based on their ID.

**Image Verification:** The system employs an image validation process using the "Imagga" service, to ensure data accuracy. By leveraging the image recognition service, the system confirms that the uploaded image contains a valid face.

**Medical Condition Summary:** After saving patient details, the system automatically generates a concise summary, using Chat GPT. This summary provides essential information about the medical conditions the patient is experiencing, facilitating a better understanding of their overall condition. Users also have the option to submit follow-up questions based on their history, regarding their medical condition.

**Free text-based diagnostics:** Allows users to input open-ended questions and receive answers. This service is facilitated through the chatGPT server.


## Cloud Service Integration: 

To enhance system functionality, integration with various cloud services is implemented, including:
Cloud **Computing Service:** The system utilizes the image recognition service or Computer Vision AI provided by Imagga to verify uploaded images for facial content.

**ChatGPT:** This service leverages GPT technology to obtain initial diagnoses of patients' conditions and acquire summaries of the medical conditions they are experiencing.

Patient data is securely stored using MongoDB **Storage Service**, a flexible and scalable NoSQL database.


## Technologies Used:

The project is developed using Express.js and Node.js, taking advantage of their capabilities for web application development and server-side scripting. The integration with cloud services enhances the system's overall capabilities.
