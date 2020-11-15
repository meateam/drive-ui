# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added 

- description for support on the 'unavailable' page

### Fixed

- fast tab change kills logic, also continues to load previous tab requests instead of overriding with the last request.

- the ui allows download on folders.

## [2.0.2] - 2020-10-28

### Removed

- default timoout for the axios request because some big files uploads that took more then 10 sec faild.

## [2.1.0]

### Added

- appId query to fetch file by the app that uploaded it.

## [2.1.1]

### Fixed

- owner name in the last updated files which wasn't shown.
