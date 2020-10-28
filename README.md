SC20 Tutorial app
=================

For SC20 we needed a wayy to allocate a 'ticket' number to an unknown number of users in the tutorial in an atomic, distributed
way. This implementation uses Amazon AWS's DynamoDB to atomically increment a ticket number for tutorial, and includes a React UI
for interacting with the REST API backed by serverless lambda functions that do the database modification.


