# Releasing

This repo uses the `release-please-action` from Google to manage releases. In practice:

1. Merge a PR with a [conventional commit message](https://www.conventionalcommits.org/en/v1.0.0/). This **shoud not** do any version bumping or anything like that; this PR should just change code (adding a feature, fixing a bug, etc)
2. The [GitHub workflow](https://github.com/damonbauer/react-native-get-item-layout-section-list/blob/master/.github/workflows/release-please.yml) running the `release-please-action` will execute when a commit is merged to `master`. If this workflow deems a new release necessary, it will create another PR that bumps the versions & does that sort of housekeeping.
3. A new [GitHub release](https://github.com/damonbauer/react-native-get-item-layout-section-list/releases) will be created
4. A second [GitHub workflow](https://github.com/damonbauer/react-native-get-item-layout-section-list/blob/master/.github/workflows/build-publish.yml) will execute as a result of the new release being created. This workflow is responsible for building the new version of the package & publishing it to `npm`.
