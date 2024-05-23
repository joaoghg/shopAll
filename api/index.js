const app = require('./server')
const db = require("./config/db");

let categories

db.migrate
  .latest()
  .then(() => {
    insertCategories()
      .then(insertProducts)
  })

const insertCategories = async () => {
  const categoriesQtd = await db('categories').count('id as quantity')
  if(parseInt(categoriesQtd[0].quantity) === 0){
    const items = [
      { name: "Roupas masculinas" },
      { name: "Jóias" },
      { name: "Eletrônicos" },
      { name: "Roupas femininas" },
    ]

    await db('categories')
      .insert(items)
  }

  categories = await db.select().table('categories')
  return Promise.resolve()
}
const insertProducts = async () => {
  const productsQtd = await db('products').count('id as quantity')
  if(parseInt(productsQtd[0].quantity) === 0){

    const products = [
      {
        name: "OnePlus Nord CE 3 Lite 5G (Limão, 8GB RAM, 128GB Armazenamento)",
        price: 19000,
        images: [
          { path: "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg", default: 0 },
          { path: "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg", default: 1 },
        ],
        color: "Limão",
        size: "8 GB RAM 128GB Armazenamento",
        categorieId: categories.find(item => item.name === "Eletrônicos").id
      },
      {
        name: "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Armazenamento)",
        price: 26000,
        images: [
          { path: "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg", default: 0 },
          { path: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg", default: 1 },
        ],
        color: "Cloud Navy",
        size: "8 GB RAM 128GB Armazenamento",
        categorieId: categories.find(item => item.name === "Eletrônicos").id
      },
      {
        name: "Samsung Galaxy M14 5G (Prata, 4GB, 128GB Armazenamento) | 50MP Camera tripla | 6000 mAh Bateria | 5nm Octa-Core Processador | Android 13",
        price: 14000,
        images: [
          { path: "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg", default: 0 },
          { path: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg", default: 1 },
        ],
        color: "Prata",
        size: "4 GB RAM 128GB Armazenamento",
        categorieId: categories.find(item => item.name === "Eletrônicos").id
      },
      {
        name: "Realme narzo N55 (Azul, 4GB+64GB)",
        price: 10999,
        images: [
          { path: "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg", default: 0 },
          { path: "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg", default: 1 },
        ],
        color: "Azul",
        size: "4GB RAM 64GB Armazenamento",
        categorieId: categories.find(item => item.name === "Eletrônicos").id
      },
      {
        name: "Oppo Enco Air3 Pro",
        price: 7500,
        offerPrice: 4500,
        images: [
          { path: "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg", default: 1 },
        ],
        color: "Verde",
        size: "Normal",
        categorieId: categories.find(item => item.name === "Eletrônicos").id,
      },
      {
        name: "Fastrack Limitless FS1 Pro Smart Watch",
        price: 7955,
        offerPrice: 3495,
        images: [
          { path: "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg", default: 1 },
        ],
        color: "Preto",
        size: "Normal",
        categorieId: categories.find(item => item.name === "Eletrônicos").id
      },
      {
        name: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
        price: 7955,
        offerPrice: 3495,
        images: [
          { path: "https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg", default: 1 },
        ],
        color: "Preto",
        size: "Normal",
        categorieId: categories.find(item => item.name === "Eletrônicos").id
      },
      {
        name: "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
        price: 24999,
        offerPrice: 19999,
        images: [
          { path: "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg", default: 0 },
          { path: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg", default: 1 },
        ],
        color: "Azul",
        size: "8GB RAM, 128GB Armazenamento",
        categorieId: categories.find(item => item.name === "Eletrônicos").id
      },
      {
        name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        images: [
          { path: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", default: 1 },
        ],
        color: "Preto",
        size: "Normal",
        categorieId: categories.find(item => item.name === "Roupas masculinas").id
      },
      {
        name: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.3,
        images: [
          { path: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", default: 1 },
        ],
        color: "Preto e branco",
        size: "M",
        categorieId: categories.find(item => item.name === "Roupas masculinas").id
      },
      {
        name: "Mens Cotton Jacket",
        price: 55.99,
        images: [
          { path: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", default: 1 },
        ],
        color: "Marrom",
        size: "G",
        categorieId: categories.find(item => item.name === "Roupas masculinas").id
      },
      {
        name: "Mens Casual Slim Fit",
        price: 15.99,
        images: [
          { path: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", default: 1 },
        ],
        color: "Azul",
        size: "G",
        categorieId: categories.find(item => item.name === "Roupas masculinas").id
      },
      {
        name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        price: 699,
        images: [
          { path: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg", default: 1 },
        ],
        color: "Prata",
        size: "23cm",
        categorieId: categories.find(item => item.name === "Jóias").id
      },
      {
        name: "Solid Gold Petite Micropave",
        price: 168,
        images: [
          { path: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg", default: 1 },
        ],
        color: "Prata",
        size: "14",
        categorieId: categories.find(item => item.name === "Jóias").id
      },
      {
        name: "White Gold Plated Princess",
        price: 25,
        images: [
          { path: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", default: 1 },
        ],
        color: "Prata",
        size: "13",
        categorieId: categories.find(item => item.name === "Jóias").id
      },
      {
        name: "Pierced Owl Rose Gold Plated Stainless Steel Double",
        price: 11,
        images: [
          { path: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg", default: 1 },
        ],
        color: "Rosa",
        size: "13",
        categorieId: categories.find(item => item.name === "Jóias").id
      },
      {
        name: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
        price: 64,
        images: [
          { path: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg", default: 1 },
        ],
        color: "Preto",
        size: "2TB",
        categorieId: categories.find(item => item.name === "Eletrônicos").id
      },
      {
        name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        price: 109,
        images: [
          { path: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg", default: 1 },
        ],
        color: "Preto",
        size: "1TB",
        categorieId: categories.find(item => item.name === "Eletrônicos").id
      },
      {
        name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
        price: 59.99,
        images: [
          { path: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg", default: 1 },
        ],
        color: "Roxo",
        size: "P",
        categorieId: categories.find(item => item.name === "Roupas femininas").id
      },
      {
        name: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
        price: 40,
        images: [
          { path: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg", default: 1 },
        ],
        color: "Azul",
        size: "P",
        categorieId: categories.find(item => item.name === "Roupas femininas").id
      },
    ]

    products.map(async (item) => {

      const product = {
        name: item.name,
        price: item.price,
        offerPrice: item.offerPrice ? item.offerPrice : null,
        color: item.color,
        size: item.size,
        categorieId: item.categorieId
      }

      const prd = await db('products')
        .returning('id')
        .insert(product)

      const id = prd[0].id

      for(const img of item.images){
        const image = {
          productId: id,
          path: img.path,
          default: img.default
        }

        await db('product_images')
          .insert(image)
      }

    })
  }
}

const port = 8000
app.listen(port, () => {
  console.log(`Api rodando na porta ${port}`)
})
