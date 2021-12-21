# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]
- hotfix: ([148](https://github.com/meateam/drive-ui/pull/148)): fix page 503 bug

## [v3.11.0] - 2021-12-7
- minor: ([125](https://github.com/meateam/drive-ui/pull/125)): added fav-service.

## [v3.10.3] - 2021-10-13
- hotfix: ([142](https://github.com/meateam/drive-ui/pull/142)): fix app bar spacing

## [v3.10.2] - 2021-08-26

### Added
- minor: ([138](https://github.com/meateam/drive-ui/pull/138)): add holiday gif 
- hotfix: ([136](https://github.com/meateam/drive-ui/pull/136)): fix deleted file in transfer and change format user

## [v3.10.1] - 2021-08-26

### Added

- hotfix: ([132](https://github.com/meateam/drive-ui/pull/132)): fix transfer and file async handling.

## [v3.10.0] - 2021-08-25

### Fixed

- hotfix: ([127](https://github.com/meateam/drive-ui/pull/127)): add append number to the file name when it exists
- minor: ([107](https://github.com/meateam/drive-ui/pull/107/)) : improve async handling.
- hotfix: ([126](https://github.com/meateam/drive-ui/pull/126)): fix move files in shared folder and breadcrumb in shared-with-me page

## [v3.9.4] - 2021-07-25

### Fixed

- minor: ([124](https://github.com/meateam/drive-ui/pull/124/)) : add restriction to the number of uploaded files and folders.

## [v3.10.0] - 2021-08-09

### Fixed

- hotfix: ([127](https://github.com/meateam/drive-ui/pull/127)): add append number to the file name when it exists
- minor: ([107](https://github.com/meateam/drive-ui/pull/107/)) : improve async handling.
- hotfix: ([126](https://github.com/meateam/drive-ui/pull/126)): fix move files in shared folder and breadcrumb in shared-with-me page

## [v3.9.4] - 2021-07-25

### Fixed

- hotfix: ([115](https://github.com/meateam/drive-ui/pull/115)): fix edit file name extention and special chars in the file name.
- hotfix: ([114](https://github.com/meateam/drive-ui/pull/114)): fix drag and drop non responding page.
- hotfix: ([49](https://github.com/meateam/drive-ui/pull/49/)) : fix fetch shared files bug.

## [v3.9.1] - 2021-06-23

### Feature

- minor: ([56](https://github.com/meateam/drive-ui/pull/56)): add an option to upload a folder.

### Fixed

- hotfix: ([108](https://github.com/meateam/drive-ui/pull/108)): fix drag and drop files mime types.
- hotfix: ([105](https://github.com/meateam/drive-ui/pull/105)): fix breadcrumbs for file when not reloading the page.
- minor: ([73](https://github.com/meateam/drive-ui/pull/73)): add pagination in shared with me

## [v3.8.3] - 2021-05-30

### Fixed

- hotfix: ([101](https://github.com/meateam/drive-ui/pull/101)): fix bug in getUsers and change the color of the steps in status table
- hotfix: ([102](https://github.com/meateam/drive-ui/pull/102)): fix error cannot read property length of undefined in info popup
- hotfix: ([100](https://github.com/meateam/drive-ui/pull/100)): add error message to the user when he cant delete file
- hotfix: ([99](https://github.com/meateam/drive-ui/pull/99)): fix pagination reset on folder change.
- hotfix: ([98](https://github.com/meateam/drive-ui/pull/98)): fix breadcrumbs for file and folders.
- hotfix: ([98](https://github.com/meateam/drive-ui/pull/98)): fix owner name for external files.

## [v3.8.2] - 2021-05-18

### Added:

- minor: ([96](https://github.com/meateam/drive-ui/pull/96)): addded transfer to cts with upn -fix
- hotfix: ([95](https://github.com/meateam/drive-ui/pull/95)): fix drag and drop multiple times

## [v3.7.1] - 2021-05-16

### Added:

- minor: ([93](https://github.com/meateam/drive-ui/pull/93)): addded transfer to cts with upn.

## [v3.6.0] - 2021-05-13

- minor: ([89](https://github.com/meateam/drive-ui/pull/89)): add smart link to file.

## [v3.5.4] - 2021-05-09

- hotfix: ([85](https://github.com/meateam/drive-ui/pull/85)): add validation to search by mail or t.
- hotfix: ([85](https://github.com/meateam/drive-ui/pull/85)): show all external transffers in the sidenav.
- hotfix: ([81](https://github.com/meateam/drive-ui/pull/81)): make approverInfo request async.

## [v3.5.3] - 2021-05-02

- hotfix: ([81](https://github.com/meateam/drive-ui/pull/81)): decrease approverInfo request timeout.
- hotfix: ([80](https://github.com/meateam/drive-ui/pull/80)): fix networkDest.js read property of undefined when approverInfo request fails.

## [v3.5.2] - 2021-04-29

- hotfix: ([79](https://github.com/meateam/drive-ui/pull/79)): add timeout to approverInfo request that stops the Drive on failure.

## [v3.5.1] - 2021-04-27

- hotfix: ([78](https://github.com/meateam/drive-ui/pull/78)): add changes in cts (more env variables)

## [v3.4.0] - 2021-04-11

- minor: ([66](https://github.com/meateam/api-gateway/pull/66)): add advance search by mail/T.

## [v3.3.0] - 2021-03-14

### Added

- minor([67](https://github.com/meateam/drive-ui/pull/67)): added cts
- minor([68](https://github.com/meateam/drive-ui/pull/68)): added button for local office.

## [v3.2.0] - 2021-02-28

### Fixed

- minor([65](https://github.com/meateam/drive-ui/pull/65)): fix all bugs and add approval info.

## [v3.1.1]

### Added

- info about the approvers in the ui.

## Added

- info about the approvers in the ui.

## [v2.0.2] - 2020-10-28

### Removed

- default timoout for the axios request because some big files uploads that took more then 10 sec faild.

## [v2.3.0] - 2020-12-24

### Added

- add popup for convert docs.
- add pagination to shared files and external transferd.
-

## [v2.2.1]

### Fixed

- remove new features popup

- reload location on create doc file

## [v2.2.0]

### Added

- description for support on the 'unavailable' page

### Fixed

- fast tab change kills logic, also continues to load previous tab requests instead of overriding with the last request.

- the ui allows download on folders.

- last updated files owner name.

### Added

- a new button for uploading a docx file in the ui.

## [2.1.1]

### Fixed

- owner name in the last updated files which wasn't shown.

## [v2.1.0]

### Added

- appId query to fetch file by the app that uploaded it.

## [v2.0.2] - 2020-10-28

### Removed

- default timoout for the axios request because some big files uploads that took more then 10 sec faild.

[unreleased]: https://github.com/meateam/api-gateway/compare/master...develop
[v3.10.1]: https://github.com/meateam/api-gateway/compare/v3.10.0...v3.10.1
[v3.10.0]: https://github.com/meateam/api-gateway/compare/v3.9.4...v3.10.0
[v3.9.4]: https://github.com/meateam/api-gateway/compare/v3.9.1...v3.9.4
[v3.9.1]: https://github.com/meateam/api-gateway/compare/v3.8.3...v3.9.1
[v3.8.3]: https://github.com/meateam/api-gateway/compare/v3.8.2...v3.8.3
[v3.8.2]: https://github.com/meateam/api-gateway/compare/v3.7.1...v3.8.2
[v3.7.1]: https://github.com/meateam/api-gateway/compare/v3.6.0...v3.7.1
[v3.6.0]: https://github.com/meateam/api-gateway/compare/v3.5.4...v3.6.0
[v3.5.4]: https://github.com/meateam/api-gateway/compare/v3.5.3...v3.5.4
[v3.5.3]: https://github.com/meateam/api-gateway/compare/v3.5.2...v3.5.3
[v3.5.2]: https://github.com/meateam/api-gateway/compare/v3.5.1...v3.5.2
[v3.5.1]: https://github.com/meateam/api-gateway/compare/v3.4.0...v3.5.1
[v3.4.0]: https://github.com/meateam/api-gateway/compare/v3.3.0...v3.4.0
[v3.3.0]: https://github.com/meateam/api-gateway/compare/v3.2.0...v3.3.0
[v3.2.0]: https://github.com/meateam/api-gateway/compare/v3.1.1...v3.2.0
[v3.1.1]: https://github.com/meateam/api-gateway/compare/v2.3.0...v3.1.1
[v2.3.0]: https://github.com/meateam/api-gateway/compare/v2.2.1...v2.3.0
[v2.2.1]: https://github.com/meateam/api-gateway/compare/v2.2.0...v2.2.1
[v2.2.0]: https://github.com/meateam/api-gateway/compare/v2.1.1...v2.2.0
[v2.1.1]: https://github.com/meateam/api-gateway/compare/v2.1.0...v2.1.1
[v2.1.0]: https://github.com/meateam/api-gateway/compare/v2.0.2...v2.1.0
[v2.0.2]: https://github.com/meateam/api-gateway/compare/develop...v2.0.2
