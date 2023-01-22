# `yardstick-action`

TODO

## Checks

- Do you have a README file?
- Do you have a LICENSE file?
- Do you have a SECURITY file?
- Do you have a CONTRIBUTING file?
- Do you have a CODEOWNERS file?
- Do you have a CHANGELOG file?
- Does an API schema exist?
- Do you have conflicting lock files (NPM/Yarn)?
- Does a folder for diagrams exist? (with more than 0 items)
- Do you have an Infrastructure-as-Code configuration?
- Do you have CI/CD configuration?
- Do you have a template for GitHub Issues?
- Do you have a template for GitHub PRs?
- Service metadata exists?
  - Do you have Service Level Objectives defined?
  - Do you have relations defined?
  - Do you have tags defined?

### Later

- Service metadata
  - Do you link to observability resources (logs/metrics/traces/dashboards etc.)?
- Did you update docs (Markdown)?
- Did you update API schema (YAML/JSON)?

```
{
  "spec": {
    "serviceType": "service",
    "lifecycleStage": "production",
    "version": "1.0.0",
    "description": "My service",
    "serviceName": "my-service",
    "team": "ThatAwesomeTeam",
    "responsible": "Someguy Someguyson",
    "system": "some-system",
    "domain": "some-domain",
    "tags": ["typescript", "backend"],
    "dataSensitivity": "Public"
  },
  "relations": ["my-other-service"],
  "support": {
    "resolverGroup": "ThatAwesomeTeam"
  },
  "slo": [
    {
      "description": "Max latency must be 350ms for the 90th percentile",
      "level": "99.9",
      "percentile": "p90",
      "maxLatency": 350
    }
  ],
  "api": [
    {
      "MyProjectApi": "./api/schema.yml"
    }
  ]
}
```

## Limitations

TODO

## Setup and usage

TODO

## Required input arguments

### `something`

TODO

## Example of how to use this action in a workflow

```yml
on: [push]

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: TODO
        uses: mikaelvesavuori/yardstick-action@v1.0.0
        with:
          something: 'asdf'
```
