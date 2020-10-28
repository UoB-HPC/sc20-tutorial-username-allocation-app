Automated deploys are on the way, but for now this is deployed manually through the AWS web console.

Starting from scratch you need to:
Create a DynamoDB table for project counters
Create a DynamoDB table for reservations
Upload the lambda function
Create an API gateway
Create a trigger from the API gateway
Create an API KEY
Enable CORS
Create the resources and methods for /ticketing-system/{project_id}/reservations
Remember to enable lambda proxying
Create a a Stage for Deployment
Permissions and Roles

Deployng the UI:
1. Create an S3 bucket
2. Configure it to serve a static website
3. Build the production React app (substituting correct values for API_URL and API_KEY)
4. Upload the build folder

