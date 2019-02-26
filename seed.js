const { db, User, Product, Order } = require('./server/db/models');

const userData = [
  {
    firstName: 'Tony',
    middleInitial: null,
    lastName: 'Soprano',
    email: 'tonysoprano@email.com',
    password: 'CapoLife!1',
    isAdmin: true,
  },
  {
    firstName: 'Paulie',
    middleInitial: 'M',
    lastName: 'Gualtieri',
    email: 'pauliegualtieri@email.com',
    password: 'PaulieWalnuts!1',
    isAdmin: false,
  },
  {
    firstName: 'Christopher',
    middleInitial: null,
    lastName: 'Moltisanti',
    email: 'christophermoltisanti@email.com',
    password: 'ForgetAboutIt1!',
    isAdmin: false,
  },
  {
    firstName: 'Silvio',
    middleInitial: '',
    lastName: 'Dante',
    email: 'silviodante@email.com',
    password: 'WhackEm!1',
    isAdmin: false,
  },
  {
    firstnName: 'Pussy',
    middleInitial: null,
    lastName: 'Bonpensiero',
    email: 'pussybonpensiero@email.com',
    password: 'ItsBigPussyToYou!1',
    isAdmin: false,
  },
];

const productData = [
  {
    title: 'Genius Pencil With Stylus',
    description: `This example of a bicolor pencil is especially unique. The colors are extra rich, the core is extra soft and it's also water-soluble! If you're familiar with the Caran d'Ache pencils, you'll find this to be the same core as the Supracolor line. Made in Switzerland. Core: Red/blue, soft, water-soluble. Measures 7" long. Sold individually.`,
    imgUrl: 'https://cdn.shopify.com/s/files/1/0644/8811/products/Caran_d_Ache_Genius_pencil_ecaa7578-4169-4632-8acf-9311ea148b9f_1024x1024.jpg?v=1527216128',
    price: 7.00,
    inventory: 99,
  },
  {
    title: 'BiColor 999 Red/Blue Pencil',
    description: `This example of a bicolor pencil is especially unique. The colors are extra rich, the core is extra soft and it's also water-soluble! If you're familiar with the Caran d'Ache pencils, you'll find this to be the same core as the Supracolor line. Made in Switzerland. Core: Red/blue, soft, water-soluble. Measures 7" long. Sold individually. Hexagonal barrel, normal diameter. Pre-sharpened.`,
    imgUrl: 'https://cdn.shopify.com/s/files/1/0644/8811/products/Caran_d_Ache_Bicolor_999_pencil_1024x1024.jpg?v=1527215608',
    price: 2.90,
    inventory: 2047,
  },
  {
    title: 'Majestic Jumbo #2 Pencil',
    description: `Nostalgic, comfortable to hold and just downright cute, these jumbo pencils are a standard HB/#2 graphite and are sure to bring back memories of Kindergarten (good ones, we hope!). Made in the USA. Grade: a true #2/HB. Measures 7 1/2" long, 3/8" in diameter. Hexagonal barrel, jumbo barrel. Sold individually`,
    imgUrl: 'https://cdn.shopify.com/s/files/1/0644/8811/products/hester_and_cook_majestic_jumbo_pencil_1024x1024.jpg?v=1527215571',
    price: 1.70,
    inventory: 1000,
  },
  {
    title: 'Anthracite Perfect Pencil Magnum',
    description: `The Graf von Faber-Castell Perfect Pencil is the most luxurious and complete pencil experience. The fluted California cedar pencil comes with a capped eraser on one end, and a combination point-protector, pocket clip, and sharpener on the other. Both the pencil and the eraser can be replaced (keep in mind that the cap will only fit on Graf von Faber-Castell pencil refills). The high-quality graphite and anthracite PVD coated titanium hardware make this the Perfect tool for those who write, draw, or simply enjoy fine analog tools. This particular version is a jumbo version of F-C's original Perfect Pencil and features an extra thick 2B lead. Made in Germany. Measures 6 inches assembled. Pencil measures 5 1/4 inches. Cap measures 3 inches. Sold individually.`,
    imgUrl: 'https://cdn.shopify.com/s/files/1/0644/8811/products/GVF_Magnum_Pencil_3_1024x1024.jpg?v=1527215592',
    price: 385.00,
    inventory: 5,
  },
  {
    title: 'Badger #2 Pencil',
    description: `This pencil is a nostalgic but currently manufactured version of the classic American yellow #2. Family-owned General Pencil Company has been making pencils in Jersey City, NJ since 1889 and is one of only three pencil companies still left in the United States. All of their pencils are made of high quality California incense cedar and are made to as high a standard as they were 100 years ago. Made in the USA. Grade: a true #2/HB. Measures 7 1/2" long. Sold individually. Hexagonal barrel, normal diameter. Pre-sharpened`,
    imgUrl: 'https://cdn.shopify.com/s/files/1/0644/8811/products/Generals_Badger_pencil_1024x1024.jpg?v=1527215600',
    price: 0.75,
    inventory: 5000,
  },
];



const orderData = [
  {
    quantity: 4,
    price: 42.50,
  },
  {
    quantity: 1,
    price: 2.50,
  },
  {
    quantity: 45,
    price: 78.00,
  },
  {
    quantity: 4,
    price: 14.25,
  },
  {
    quantity: 10,
    price: 12.50,
  },
]
