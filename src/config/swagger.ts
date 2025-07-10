import YAML from 'yamljs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { middleware } from 'express-openapi-validator';

const validator = middleware({
  apiSpec: path.resolve(__dirname, '../../oas3.yaml'),
  validateRequests: true,
  validateResponses: true,
});

const swaggerDocument = YAML.load(path.resolve(__dirname, '../../oas3.yaml'));

export { swaggerUi, swaggerDocument, validator };
