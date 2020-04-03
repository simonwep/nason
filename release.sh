#!/usr/bin/env bash
set -o errexit

CURRENT_VERSION="$(grep -o -E 'version": ".*?"' ./package.json | grep -o -E "[0-9]+.[0-9]+.[0-9]+")"
VERSION=$1

if [[ -z $VERSION ]]; then
    echo "Missing version."
    exit 1
fi

echo "Current version is v$CURRENT_VERSION"
echo "New version is     v$VERSION"
echo -n -e '\nProceed? [y/n]: '
read ans

if [[ $ans == 'n' ]]; then
    exit 0
fi

# Replace version in package.json
echo -e '\nWrite new version...'
sed -i -r -e "s/version\": \".*?\"/version\": \"$VERSION\"/g" ./package.json

# Build and test
echo -e '\nTest, lint and build...'
npm run lint
npm run test
npm run build

# Commit file
echo -e '\nCommit...'
git add ./package.json
git commit -m "Release $VERSION"
git push

# Tag commit and push with tag
echo -e '\nTag and push...'
git tag $VERSION
git push --tags

echo -e '\nPublishing to npm...'
echo -n 'Proceed? [y/n]: '
read ans

if [[ $ans == 'n' ]]; then
    exit 0
fi

npm publish
echo -e '\nDone :)'
