# template-typescript-package

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kamranayub/template-typescript-package.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/kamranayub/template-typescript-package.svg)
![npm](https://img.shields.io/npm/dw/template-typescript-package.svg)
![npm](https://img.shields.io/npm/dm/template-typescript-package.svg)
![npm](https://img.shields.io/npm/dy/template-typescript-package.svg)
![npm](https://img.shields.io/npm/dt/template-typescript-package.svg)
![NPM](https://img.shields.io/npm/l/template-typescript-package.svg)
![npm](https://img.shields.io/npm/v/template-typescript-package.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/kamranayub/template-typescript-package.svg)
![npm collaborators](https://img.shields.io/npm/collaborators/template-typescript-package.svg)

A boilerplate repo for publishing typescript packages to npm

## Usage

Some notes on how to use this repo. Some day I'll hopefully automate the biggest part of this.

### Clone the repo or [generate](https://github.com/kamranayub/template-typescript-package/generate) your repo:

```shell script
npx degit https://github.com/kamranayub/template-typescript-package my-new-package
```

### Initialize the new project


```shell script
cd my-new-package
yarn # to install the deps
git init # to initialize a new Git repo
# Manually create a remote repo and follow the instructions OR:
hub create # Use this amazing tool called 'hub': https://github.com/github/hub
```

#### Update meta data:

Update the following fields in `package.json`:

- name
- description
- repository
- keywords
- author
- license
- bugs
- homepage

Make sure to don't change the `version` property, versioning this package is handled by `semantic-release`!

#### Update README

Basically you want to search/replace the repo and package name to match your repo/package name and add any new info.

### Getting the GitHub and NPM tokens

#### GitHub

- Log in to GitHub.
- Navigate to [https://github.com/settings/tokens](https://github.com/settings/tokens).
- Click `Generate new token`.
- Fill in the `note` field so you remember what the token is for.
- Select the `write:packages` scope. This will also enable the `repo` and `read:packages` scopes.
- Click `Generate token`.
- Copy the code and store it to use in the next step.

#### NPM

- Log in to NPM.
- Click the Tokens link from the top-right menu.
- Click Create New Token
- Select `Read and Publish` then click `Create Token`.
- Copy the code and store it to use in the next step.

### Setting the GitHub and NPM tokens

- Open your new repo on GitHub.
- Navigate to `Settings` then `Secrets`.
- Click `Add a new secret`.
- Add the `GH_TOKEN` secret with the GitHub token.
- Click `Add a new secret` again.
- Add the `NPM_TOKEN` secret with the NPM token.

Your repo is now set up to publish packages to NPM and the GitHub Package Registry.

### Write your code

Write your amazing new code and make sure to update the tests!

You can run `yarn lint` and `yarn test` to check if your project will pass CI.

### Publish it

With a `git push` you will create a new version and publish it to `npm`.

```shell script
git commit -m "feat: initial commit"
git push origin master 
```

## Credits

Forked from [template-typescript-package](https://github.com/beeman/template-typescript-package) with a few changes.

## MIT License
