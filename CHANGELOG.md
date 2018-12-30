# CHANGELOG

All notable changes to this project will be documented in this file.

> **Tags**
> - Features
> - Bug Fixes
> - Performance Improvements
> - Dependency Updates
> - Breaking Changes
> - Documentation
> - Internal

## Unreleased

#### Dependency updates

- update husky to 1.1.0 ([c8ce414](https://github.com/sibiraj-s/ngx-notifier/commit/c8ce414))

#### Internal

- add prepublish script to prevent accidental publish to npm registry. ([c8ce414](https://github.com/sibiraj-s/ngx-notifier/commit/c8ce414))

#### Documentation

- use `gh-pages` branch to publish documentation ([f51aca4](https://github.com/sibiraj-s/ngx-notifier/commit/f51aca4))

## v2.0.2 (2018-09-24)

#### Internal

- update github username ([27ef5e8](https://github.com/sibiraj-s/ngx-notifier/commit/27ef5e8))

## v2.0.1 (2018-09-22)

#### Documentation

- recompiled documentation for latest changes which also includes CHANGELOG ([676d35a](https://github.com/sibiraj-s/ngx-notifier/commit/676d35a))

#### Internal

- fix end-to-end tests ([06899a8](https://github.com/sibiraj-s/ngx-notifier/commit/06899a8))
- migrate from travis-ci.org to travis-ci.com
- removed vscode settings in favour of editorconfig ([25e54df](https://github.com/sibiraj-s/ngx-notifier/commit/25e54df))

## v2.0.0 (2018-09-22)

Upgrade to Angular 6

#### Dependency updates

- update angular dependencies ([c7e796f](https://github.com/sibiraj-s/ngx-notifier/commit/c7e796f))
- update ng-packager to support angular v6 ([c7e796f](https://github.com/sibiraj-s/ngx-notifier/commit/c7e796f))
- update compodoc to v1.1.5 ([c7e796f](https://github.com/sibiraj-s/ngx-notifier/commit/c7e796f))

## v1.3.1 (2018-06-28)

#### Dependency Updates

- update devDependencies ([f16b477](https://github.com/sibiraj-s/ngx-notifier/commit/f16b477))

## v1.3.0 (2018-04-09)

#### Features

- option to disable animations ([a07500c](https://github.com/sibiraj-s/ngx-notifier/commit/a07500c))

#### Bug Fixes

- no animation while closing a toast ([a07500c](https://github.com/sibiraj-s/ngx-notifier/commit/a07500c))

#### Internal

- ci: expect files to have angular-whitespace ([1c13ff3](https://github.com/sibiraj-s/ngx-notifier/commit/1c13ff3))

#### Dependency Updates

- update ng-packagr to v2.4.2 ([a74d48b](https://github.com/sibiraj-s/ngx-notifier/commit/a74d48b))

## v1.2.1 (2018-04-05)

#### Performance Improvements

- revert: don't expose internal variables ([48c57e6](https://github.com/sibiraj-s/ngx-notifier/commit/48c57e6))
- add @angular/platform-browser as peerDependency ([13f930e](https://github.com/sibiraj-s/ngx-notifier/commit/13f930e))

#### Dependency Updates

- update tsickle devDependency ([94e816a](https://github.com/sibiraj-s/ngx-notifier/commit/94e816a))

## v1.2.0 (2018-04-04)

#### Features

- allow HTML tags in notifications ([5ea41f3](https://github.com/sibiraj-s/ngx-notifier/commit/5ea41f3))

#### Bug Fixes

- click events not triggered if HTML tags are used ([d34eb10](https://github.com/sibiraj-s/ngx-notifier/commit/d34eb10))
- don't expose internal variables ([56fc4e4](https://github.com/sibiraj-s/ngx-notifier/commit/56fc4e4))

## v1.1.0 (2018-04-04)

#### Features

- clear all notifications at once ([7c9c011](https://github.com/sibiraj-s/ngx-notifier/commit/7c9c011))
- clear last notification ([95c9100](https://github.com/sibiraj-s/ngx-notifier/commit/95c9100))
- insert toast message on top or bottom ([91983ca](https://github.com/sibiraj-s/ngx-notifier/commit/91983ca))

## v1.0.0 (2018-04-03)

Initial Release. A Simple Notification service for Angular application
