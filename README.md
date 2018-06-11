# Loggl

## About

This system allows users to make and view log entries through a web interface. Log entries include a date, a category, time spent, and a description.

## Notes

* This is a proof-of-concept project. Please don't actually use it.

* Log entry categories cannot be customized by the user, currently.

## Usage

Set the `DB_URL` environment variable to the URL of your MongoDB database.
Set the `SESSION_SECRET` environment variable to a secure value.

Run using: 
- `npm start`

Debug using:
- `set DEBUG=loggl:* & npm start` or `set DEBUG=loggl:* ; npm start` on Windows
- `DEBUG=loggl:* npm start` otherwise