import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

export default () => ({
  configuration: yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ),
});
