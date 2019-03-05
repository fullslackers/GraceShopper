/* eslint-disable max-statements */
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
const scrapedProducts = require('./scrapedProducts.json')
console.log()

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

const pencilData = scrapedProducts.pencils
const eraserData = scrapedProducts.erasers
const sharpenerData = scrapedProducts.sharpeners
const caseData = scrapedProducts.cases
const notebookData = scrapedProducts.notebooks
const bookData = scrapedProducts.books
const refillData = scrapedProducts.refills
const accessoryData = scrapedProducts.accessories

const categoryData = [
  {
    title: 'pencils'
  },
  {
    title: 'erasers'
  },
  {
    title: 'sharpeners'
  },
  {
    title: 'cases'
  },
  {
    title: 'notebooks'
  },
  {
    title: 'books'
  },
  {
    title: 'refills'
  },
  {
    title: 'accessories'
  }
]

const seed = async () => {
  try {
    await db.sync({
      force: true
    })

    const createdCategories = await Category.bulkCreate(categoryData, {
      returning: true
    })

    const createdPencils = await Product.bulkCreate(pencilData, {
      returning: true
    })

    for (let i = 0; i < createdPencils.length; i++) {
      await createdPencils[i].setCategories(createdCategories[0])
    }

    const createdErasers = await Product.bulkCreate(eraserData, {
      returning: true
    })

    for (let i = 0; i < createdErasers.length; i++) {
      await createdErasers[i].setCategories(createdCategories[1])
    }

    const createdSharpeners = await Product.bulkCreate(sharpenerData, {
      returning: true
    })

    for (let i = 0; i < createdSharpeners.length; i++) {
      await createdSharpeners[i].setCategories(createdCategories[2])
    }

    const createdCases = await Product.bulkCreate(caseData, {
      returning: true
    })

    for (let i = 0; i < createdCases.length; i++) {
      await createdCases[i].setCategories(createdCategories[3])
    }

    const createdNotebooks = await Product.bulkCreate(notebookData, {
      returning: true
    })

    for (let i = 0; i < createdNotebooks.length; i++) {
      await createdNotebooks[i].setCategories(createdCategories[4])
    }

    const createdBooks = await Product.bulkCreate(bookData, {
      returning: true
    })

    for (let i = 0; i < createdBooks.length; i++) {
      await createdBooks[i].setCategories(createdCategories[5])
    }

    const createdRefills = await Product.bulkCreate(refillData, {
      returning: true
    })

    for (let i = 0; i < createdRefills.length; i++) {
      await createdRefills[i].setCategories(createdCategories[6])
    }

    const createdAccessories = await Product.bulkCreate(accessoryData, {
      returning: true
    })

    for (let i = 0; i < createdAccessories.length; i++) {
      await createdAccessories[i].setCategories(createdCategories[7])
    }

    await User.bulkCreate(userData, {
      returning: true
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = seed

if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!')
      db.close()
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
      db.close()
    })
}
