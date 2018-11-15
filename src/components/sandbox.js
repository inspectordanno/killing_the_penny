const year = '1910';

const items = [
  {
    name: 'gallon of gas',
    year: 1910,
    price: .12
  },
  {
    name: 'gallon of gas',
    year: 1960,
    price: .30
  },
  {
    name: 'gallon of gas',
    year: 2010,
    price: 2.80
  }
]

items.forEach(d => {
  if (d.year === year) {
    return d.price;
    }
 });