import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: 'table wooden',
      price: 200,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    },
    {
      id: 2,
      name: 'table glass',
      price: 250,
      image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    },
    {
      id: 3,
      name: 'office chair',
      price: 150,
      image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    },
    {
      id: 4,
      name: 'sofa set',
      price: 500,
      image: 'https://images.pexels.com/photos/1866148/pexels-photo-1866148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    },
    {
      id: 5,
      name: 'study lamp',
      price: 80,
      image: 'https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    }
  ];

  // 🔍 Query search (early return style)
  if (req.query.search) {
    const filterProducts = products.filter(product =>
      product.name.toLowerCase().includes(req.query.search.toLowerCase())
    );

    res.send(filterProducts);
    return;
  }

  // ⏳ Delay normal response
  setTimeout(() => {
    res.send(products);
  }, 3000);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



