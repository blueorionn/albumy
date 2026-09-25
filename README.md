# albumy

A curated music library for copyright-free music. Albumy brings together
freely licensed tracks — from sources like [NCS](https://ncs.io),
[Free Music Archive](https://freemusicarchive.org) and the
YouTube Audio Library — into one place where they can be browsed,
searched and streamed.

## Principles

- **Users listen, they don't upload.** The catalog is curated by
  maintainers; the API is read-oriented for end users.
- **Licensing is first-class.** Every track carries its license and
  attribution requirements (CC0, CC BY 4.0, …) as structured data.

## Status

Early development. The catalog API (browse albums) is live; auth,
watchlists, search and the frontend are still to come.

## Tech stack

| Layer    | Choice                                              |
| -------- | --------------------------------------------------- |
| Backend  | Python 3.12+, Django 6.1, Django REST Framework     |
| Database | PostgreSQL                                          |
| Frontend | React                                               |

## License

The project code is licensed under the [Apache License 2.0](LICENSE).

Music in the catalog is **not** covered by the project license — each
track keeps its own license, and attribution requirements are tracked
per track in the database.
