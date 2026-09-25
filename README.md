# Albumy

A curated music library for copyright-free music. Albumy brings together
freely licensed tracks — from sources like [NCS](https://ncs.io),
[Free Music Archive](https://freemusicarchive.org) and the
YouTube Audio Library — into one place where they can be browsed,
searched and streamed.

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%203.svg)](https://www.digitalocean.com/?refcode=17c6d332681e&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)

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

## Support the project

If you like albumy, consider supporting it:

- **[Sponsor on GitHub](https://github.com/sponsors/blueorionn)** —
  contributions help keep the project alive and growing.
- **[Sign up with DigitalOcean](https://m.do.co/c/17c6d332681e)** —
  albumy is hosted on DigitalOcean. New users get starter credit, and the
  referral bonus goes toward keeping the website running for free.

## License

The project code is licensed under the [Apache License 2.0](LICENSE).

Music in the catalog is **not** covered by the project license — each
track keeps its own license, and attribution requirements are tracked
per track in the database.
