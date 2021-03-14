import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';

export default () => ({
  configuration: yaml.load(readFileSync('config.yaml', 'utf8')),
});
