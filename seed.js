const {green, red} = require('chalk')
const {
  User,
  Product,
  Order,
  Review,
  Category,
  ProductCategory,
  OrderProduct,
  db
} = require('./server/db/models')

const userData = [
  {
    firstName: 'Tony',
    middleInitial: null,
    lastName: 'Soprano',
    email: 'tonysoprano@email.com',
    password: 'CapoLife!1',
    isAdmin: true
  },
  {
    firstName: 'Paulie',
    middleInitial: 'M',
    lastName: 'Gualtieri',
    email: 'pauliegualtieri@email.com',
    password: 'PaulieWalnuts!1',
    isAdmin: false
  },
  {
    firstName: 'Christopher',
    middleInitial: null,
    lastName: 'Moltisanti',
    email: 'christophermoltisanti@email.com',
    password: 'ForgetAboutIt1!',
    isAdmin: false
  },
  {
    firstName: 'Silvio',
    middleInitial: '',
    lastName: 'Dante',
    email: 'silviodante@email.com',
    password: 'WhackEm!1',
    isAdmin: false
  },
  {
    firstName: 'Pussy',
    middleInitial: null,
    lastName: 'Bonpensiero',
    email: 'pussybonpensiero@email.com',
    password: 'ItsBigPussyToYou!1',
    isAdmin: false
  }
]

const productData = [
  {
    title: 'Genius Pencil With Stylus',
    description: `This example of a bicolor pencil is especially unique. The colors are extra rich, the core is extra soft and it's also water-soluble! If you're familiar with the Caran d'Ache pencils, you'll find this to be the same core as the Supracolor line. Made in Switzerland. Core: Red/blue, soft, water-soluble. Measures 7" long. Sold individually.`,
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0644/8811/products/Caran_d_Ache_Genius_pencil_ecaa7578-4169-4632-8acf-9311ea148b9f_1024x1024.jpg?v=1527216128',
    price: 7.0,
    inventory: 99
  },
  {
    title: 'BiColor 999 Red/Blue Pencil',
    description: `This example of a bicolor pencil is especially unique. The colors are extra rich, the core is extra soft and it's also water-soluble! If you're familiar with the Caran d'Ache pencils, you'll find this to be the same core as the Supracolor line. Made in Switzerland. Core: Red/blue, soft, water-soluble. Measures 7" long. Sold individually. Hexagonal barrel, normal diameter. Pre-sharpened.`,
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0644/8811/products/Caran_d_Ache_Bicolor_999_pencil_1024x1024.jpg?v=1527215608',
    price: 2.9,
    inventory: 2047
  },
  {
    title: 'Majestic Jumbo #2 Pencil',
    description: `Nostalgic, comfortable to hold and just downright cute, these jumbo pencils are a standard HB/#2 graphite and are sure to bring back memories of Kindergarten (good ones, we hope!). Made in the USA. Grade: a true #2/HB. Measures 7 1/2" long, 3/8" in diameter. Hexagonal barrel, jumbo barrel. Sold individually`,
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0644/8811/products/hester_and_cook_majestic_jumbo_pencil_1024x1024.jpg?v=1527215571',
    price: 1.7,
    inventory: 1000
  },
  {
    title: 'Anthracite Perfect Pencil Magnum',
    description: `The Graf von Faber-Castell Perfect Pencil is the most luxurious and complete pencil experience. The fluted California cedar pencil comes with a capped eraser on one end, and a combination point-protector, pocket clip, and sharpener on the other. Both the pencil and the eraser can be replaced (keep in mind that the cap will only fit on Graf von Faber-Castell pencil refills). The high-quality graphite and anthracite PVD coated titanium hardware make this the Perfect tool for those who write, draw, or simply enjoy fine analog tools. This particular version is a jumbo version of F-C's original Perfect Pencil and features an extra thick 2B lead. Made in Germany. Measures 6 inches assembled. Pencil measures 5 1/4 inches. Cap measures 3 inches. Sold individually.`,
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0644/8811/products/GVF_Magnum_Pencil_3_1024x1024.jpg?v=1527215592',
    price: 385.0,
    inventory: 5
  },
  {
    title: 'Badger #2 Pencil',
    description: `This pencil is a nostalgic but currently manufactured version of the classic American yellow #2. Family-owned General Pencil Company has been making pencils in Jersey City, NJ since 1889 and is one of only three pencil companies still left in the United States. All of their pencils are made of high quality California incense cedar and are made to as high a standard as they were 100 years ago. Made in the USA. Grade: a true #2/HB. Measures 7 1/2" long. Sold individually. Hexagonal barrel, normal diameter. Pre-sharpened`,
    imgUrl:
      'https://cdn.shopify.com/s/files/1/0644/8811/products/Generals_Badger_pencil_1024x1024.jpg?v=1527215600',
    price: 0.75,
    inventory: 5000
  }
]

const orderData = [
  {
    quantity: 4,
    price: 42.5
  },
  {
    quantity: 1,
    price: 2.5
  },
  {
    quantity: 45,
    price: 78.0
  },
  {
    quantity: 4,
    price: 14.25
  },
  {
    quantity: 10,
    price: 12.5
  }
]

const reviewData = [
  {
    description: 'Nice. I love it.',
    rating: '5'
  },
  {
    description: 'Super.',
    rating: '5'
  },
  {
    description: 'Feels awesome. Writes awesome.',
    rating: '5'
  },
  {
    description: 'Best pencil ever!!!!!!!1',
    rating: '5'
  },
  {
    description: 'This pencil changed my life.',
    rating: '5'
  }
]

const categoryData = [
  {
    title: 'pencils'
  },
  {
    title: 'erasers'
  },
  {
    title: 'sharpeners'
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    const promiseForUsers = User.bulkCreate(userData, {
      returning: true
    })
    const promiseForProducts = Product.bulkCreate(productData, {
      returning: true
    })
    const promiseForOrders = Order.bulkCreate(orderData, {
      returning: true
    })
    const promiseForReviews = Review.bulkCreate(reviewData, {
      returning: true
    })
    const promiseForCategories = Category.bulkCreate(categoryData, {
      returning: true
    })

    const promiseForInsertedData = Promise.all([
      promiseForUsers,
      promiseForProducts,
      promiseForOrders,
      promiseForReviews,
      promiseForCategories
    ])

    const [
      users,
      products,
      orders,
      reviews,
      categories
    ] = await promiseForInsertedData
    const [tony, paulie, christopher, silvio, pussy] = users
    const [pencil1, pencil2, pencil3, pencil4, pencil5] = products
    const [order1, order2, order3, order4, order5] = orders
    const [review1, review2, review3, review4, review5] = reviews
    const [pencils, erasers, sharpeners] = categories

    // console.log('MAGIC!!', Object.keys(pencil1.__proto__))

    // const promise1 = pencil1.setCategory([project1, project3]);
    // const promise2 = robot2.setProjects([project1, project3]);
    // // const promise3 = robot3.setProjects([project3]);
    // // const promise4 = robot4.setProjects([project1]);

    // // await Promise.all([promise1, promise2, promise3, promise4]);
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
