# StandardLint 📏

![Build Status](https://github.com/mikaelvesavuori/standardlint/workflows/main/badge.svg) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mikaelvesavuori_standardlint&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=mikaelvesavuori_standardlint) [![CodeScene Code Health](https://codescene.io/projects/34030/status-badges/code-health)](https://codescene.io/projects/34030) [![CodeScene System Mastery](https://codescene.io/projects/34030/status-badges/system-mastery)](https://codescene.io/projects/34030) [![codecov](https://codecov.io/gh/mikaelvesavuori/standardlint/branch/main/graph/badge.svg?token=LDZV8XOA4X)](https://codecov.io/gh/mikaelvesavuori/standardlint) [![Maintainability](https://api.codeclimate.com/v1/badges/2688b07db3c43d9b18b8/maintainability)](https://codeclimate.com/github/mikaelvesavuori/standardlint/maintainability)

## Extensible standards auditing and linting tool. Nags like your mother but is probably a lot more technical.

---

With StandardLint, you use _Checks_ to inform what standards you want to inspect, in effect being your standards _yardstick_:

> A fact or standard by which you can judge the success or value of something.
> — [Cambridge Dictionary](https://dictionary.cambridge.org/dictionary/english/standardlint)

StandardLint makes it convenient and easy to set up guardrails and guidelines for development teams and making sure they follow your house conventions.

The result of a run could look like this:

```
✅ PASS: Diagrams
✅ PASS: Changelog
🛎️ No custom path assigned to check "Diagrams" - Using default path "diagrams"...
⚠️ WARN: Diagrams
✅ PASS: Lock files
✅ PASS: License
❌ FAIL: Code owners
❌ FAIL: Contribution information
🛎️ No custom path assigned to check "IAC configuration" - Using default path "serverless.yml"...
✅ PASS: IAC configuration
🛎️ No custom path assigned to check "SLOs" - Using default path "manifest.json"...
⚠️ WARN: SLOs
🛎️ No custom path assigned to check "Tags" - Using default path "manifest.json"...
✅ PASS: Tags
🛎️ No custom path assigned to check "CI configuration" - Using default path ".github/workflows/main.yml"...
✅ PASS: CI configuration
✅ PASS: Security information
🛎️ No custom path assigned to check "Service metadata" - Using default path "manifest.json"...
✅ PASS: Service metadata
```

## StandardLint GitHub Action

There's a ready-to-use [StandardLint GitHub Action](https://github.com/marketplace/actions/standardlint-action) in the Marketplace if you really want the minimum hassle. Plus, you get a great visual overview of your checks!

## Usage

### Installation

Install StandardLint with `npm install standardlint`.

### Configuration

Before running StandardLint you need a configuration. This is a basic JSON file with the name `standardlint.json`. Place it in the root of your project.

The format is:

```json
{
  "basePath": "",
  "checks": [],
  "defaultSeverity": ""
}
```

| Key               | Required | Default         | Example                       | Description                                                             |
| ----------------- | -------- | --------------- | ----------------------------- | ----------------------------------------------------------------------- |
| `basePath`        | No       | `.`             | `./project_dir/`              | Sets the base path for any file lookups.                                |
| `checks`          | Yes      | -               | `["checkForPresenceLicense"]` | A list of checks to run, either using string or object form.            |
| `defaultSeverity` | No       | `error`         | `warn`                        | Sets the default severity level for any issues.                         |
| `path`            | No       | Multiple values | `api/schema.yml`              | Sets the exact path to a resource. Only used optionally by some checks. |

#### Base path

If you for some reason keep your project files "lower" than in the root where you want to do file lookups, you can add this optional argument.

_It's recommended you do not change this unless you know what you are doing._

#### Checks

Checks can be provided in string form or object form:

- String format: `["checkForDefinedTags"]`
- Object format: `[{ "name": "checkForPresenceContributing", "severity": "warn" }]`

You need to use the object form if you want to override the overall severity level, and use the check's `severity` level.

You can also combine the formats for different checks.

- `["checkForDefinedTags", { "name": "checkForPresenceContributing", "severity": "warn" }]`

Some checks also provide the optional `path` key. Use this when you want to override default values, for example to the location of an API schema.

- `[{ "name": "checkForPresenceApiSchema", "path": "api/schema.yml" }]`

#### Default severity

This can be either `warn` or `error` (the default value). Using it in `error` mode means that any failure will produce an error, while the `warn` mode simply warns for any non-compliance.

### Usage

#### From the command line

It's super easy to use StandardLint from the CLI! Just run `npx standardlint` and it will use the configuration in your project.

##### Outputting results into a JSON file

To output the results into `standardlint.results.json`, run `npx standardlint --output`.

#### Importing StandardLint as a Node package

You can also import and use StandardLint like a conventional Node package.

It exposes a factory function to vend a new `StandardLint` instance with a `check()` method.

If using it as an imported package, you will need to provide either a configuration file (for example loaded with `fs`) or the actual configuration as an object.

```ts
import { createNewStandardLint } from 'standardlint';

const config = {
  checks: [
    { name: 'checkForPresenceContributing', severity: 'warn' },
    { name: 'checkForPresenceLicense', severity: 'error' }
  ]
};

const standardLint = createNewStandardLint(config);
const results = standardLint.check();

console.log(results);
```

##### Outputting results into a JSON file

To output the results into `standardlint.results.json`, run:

```ts
const standardLint = createNewStandardLint(config);
const results = standardLint.check(true); // <--- Adding true here will output the results to disk
```

## Available checks

_Service metadata definition checks assume you are using [Catalogist](https://github.com/mikaelvesavuori/catalogist) or something with the same manifest file structure._

Any check with a `default` value can be overridden using the `path` argument.

### `all`

Runs all checks.

### `checkForConflictingLockfiles`

Checks if there are conflicting Node package lock files (i.e. both a Yarn lock file and an NPM lock file).

### `checkForDefinedRelations`

Checks if the service metadata defines system relations.

**Default**: `manifest.json`

### `checkForDefinedServiceLevelObjectives`

Checks if the service metadata defines Service Level Objectives.

**Default**: `manifest.json`

### `checkForDefinedTags`

Checks if the service metadata defines tags.

**Default**: `manifest.json`

### `checkForPresenceApiSchema`

Checks if there is an API schema.

**Default**: `api/schema.json`

### `checkForPresenceChangelog`

Checks if there is a `CHANGELOG.md` file.

### `checkForPresenceCiConfig`

Checks if there is a CI/CD configuration file.

**Default**: `.github/workflows/main.yml`

### `checkForPresenceCodeowners`

Checks if there is a `CODEOWNERS` file.

### `checkForPresenceContributing`

Checks if there is a `CONTRIBUTING.md` file.

### `checkForPresenceDiagramsFolder`

Checks if there is a diagrams folder with diagram files in it. The check assumes `.drawio` files.

**Default**: `diagrams`

### `checkForPresenceIacConfig`

Checks if there is Infrastructure-as-Code configuration present.

**Default**: `serverless.yml`

### `checkForPresenceLicense`

Checks if there is a `LICENSE.md` file.

### `checkForPresenceReadme`

Checks if there is a `README.md` file.

### `checkForPresenceSecurity`

Checks if there is a `SECURITY.md` file.

### `checkForPresenceServiceMetadata`

Checks if there a service metadata file present.

**Default**: `manifest.json`

### `checkForPresenceTemplateIssues`

Checks if there is a template for GitHub issues.

**Default**: `.github/ISSUE_TEMPLATE/issue.md`

### `checkForPresenceTemplatePullRequests`

Checks if there is a template for GitHub Pull Requests.

**Default**: `.github/ISSUE_TEMPLATE/pull_request.md`

---

## Ideas for improvements

Checks:

- Service metadata: Do you link to observability resources (logs/metrics/traces/dashboards etc.)?
- Did you update docs (Markdown)?
- Did you update API schema (YAML/JSON)?
- More ArchUnit/fitness functions kind of support?
- Ensure console.log() is not used
- Ensure imports following acceptable conventions
- No cyclic methods/dependencies
- Ensure there are tests
- Documentation coverage
- Ensure methods/functions are below a certain threshold in terms of lines of code
- Support for external config

Tech:

- CLI?
