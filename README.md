## Serverless
The application shows capabilites of serverless applications. Serverless apps deploy functions in cloud using frameworks like AWS Lambda.

### AWS Deploy
App is accessible [here]()

### Run locally
- Create .env file from .env.example and provide variables
- Invoke the function using serverless framework with appropriate data
- `serverless invoke local -f app -l -p sample-input.json`

### Run tests
- `npm run test`

### Major Dependencies
- *serverless* framework
- *sequelize* ORM for Postgres
