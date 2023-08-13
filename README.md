```sh
npm run dev
```


## Calling the API

### [Get status `/`](https://vercel-typescript-express-api.vercel.app/)

```bash
curl --location --request GET 'https://vercel-typescript-express-api.vercel.app/'
```

### [Get all product `/product`](https://vercel-typescript-express-api.vercel.app/product)

```bash
curl --location --request GET 'https://vercel-typescript-express-api.vercel.app/product'
```

### [Get a product `/product/:productId`](https://vercel-typescript-express-api.vercel.app/product/a328cbb5-9663-4470-88c2-2ac9cc5c4871)

```bash
curl --location --request GET 'https://vercel-typescript-express-api.vercel.app/product/a328cbb5-9663-4470-88c2-2ac9cc5c4871'
```

### Delete a product`/product/:productId`

```bash
curl --location --request DELETE 'https://vercel-typescript-express-api.vercel.app/product/a328cbb5-9663-4470-88c2-2ac9cc5c4871'
```

### Update a product `/product/:productId`

```bash
curl --location --request PUT 'https://vercel-typescript-express-api.vercel.app/product/a328cbb5-9663-4470-88c2-2ac9cc5c4871' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Apple iPhone 11 (64 GB) (PRODUCT) RED",
    "slug": "Apple-iPhone-11-64-GB-PRODUCT-RED",
    "quantity": 1,
    "image": "https://m.media-amazon.com/images/I/715HCLsOHbL._AC_SX679_.jpg",
    "price": "299845",
    "description": "Repudiandae iure animi esse minus dolorem earum et. Eligendi in fugit. Dolor odio est harum veritatis error.",
    "guarantee": "Sem garantia",
    "brand": "Apple",
    "model": "11"
}'
```

### Create a product `/product`

```bash
curl --location --request POST 'https://vercel-typescript-express-api.vercel.app/product' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Apple iPhone 11 (64 GB) (PRODUCT) RED",
    "slug": "Apple-iPhone-11-64-GB-PRODUCT-RED",
    "quantity": 1,
    "image": "https://m.media-amazon.com/images/I/715HCLsOHbL._AC_SX679_.jpg",
    "price": "299845",
    "description": "Repudiandae iure animi esse minus dolorem earum et. Eligendi in fugit. Dolor odio est harum veritatis error.",
    "guarantee": "Sem garantia",
    "brand": "Apple",
    "model": "11"
}'
```

