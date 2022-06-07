# Signaturit test

Antonio 06.06.2022

# How to install and test it

## Install

```sh
npm i
```

## Init database and fill it with some random documents

```sh
npm run setup
```

You can see values with `Prisma Studio`

```sh
npx prisma studio
```

## Run it

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Ideas implemented

- I wanted to test [remix](https://remix.run/). I had never tried it before and this exercise seemed like a good candidate.
- I tried to avoid to store the updates, but at the end, it's easier to manage states if the information is store in a database. [prisma](https://www.prisma.io/) is the chosen.
- Only sqlite, storing the information in a file.
- Images: Only needs define the url, it's not a file uploader.
- Unit tested. At least a bit

```
provider = "sqlite"
url      = "file:./db/signaturit.db"
```

## Ideas not implemented

- Create some kind of login or session system
- Refactor the styling system. Remix does not recommend any system. I implemented [remix route styling](hhttps://remix.run/docs/en/v1/guides/styling#route-styles) but the experience has not been good. I think postcss could be easier and powerful
- Ofc, translations, but out of scope :/
- If the image defines an incorrect url, it should have some fallback to check it, and maybe show a default image
- I would like to implement more tests and maybe cypress, but I should spend some time to see how to configure it with remix
