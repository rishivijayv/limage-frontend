export const userImages = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=300&h=450',
        title: 'Breakfast',
        author: '@bkristastucchio',
        label: 'food',
        id: 1
      },
      {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&h=450',
        title: 'Burger',
        author: '@rollelflex_graphy726',
        label: 'food',
        id: 2
      },
      {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=300&h=450',
        title: 'Camera',
        author: '@helloimnik',
        label: 'lifestyle',
        id: 3
      },
      {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=300&h=450',
        title: 'Coffee',
        author: '@nolanissac',
        label: 'drinks',
        id: 4
      },
      {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=300&h=450',
        title: 'Hats',
        author: '@hjrc33',
        label: 'lifestyle',
        id: 5
      },
      {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=450',
        title: 'Honey',
        author: '@arwinneil',
        label: 'food',
        id: 6
      },
      {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=300&h=450',
        title: 'Basketball',
        author: '@tjdragotta',
        label: 'sports',
        id: 7
      },
      {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&h=450',
        title: 'Fern',
        author: '@katie_wasserman',
        label: 'nature',
        id: 8
      },
]

export const platformImages =  [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110?w=300&h=450',
    title: 'Bed',
    label: 'home',
    id: 9
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=300&h=450',
    title: 'Kitchen',
    label: 'food',
    id: 10
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=300&h=450',
    title: 'Sink',
    label: 'bathroom',
    id: 11
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31?w=300&h=450',
    title: 'Books',
    label: 'study',
    id: 12
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=300&h=450',
    title: 'Chairs',
    label: 'home',
    id: 13
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62?w=300&h=450',
    title: 'Candle',
    label: 'dark',
    id: 14
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77?w=300&h=450',
    title: 'Laptop',
    label: 'electronics',
    id: 15
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=300&h=450',
    title: 'Doors',
    label: 'home',
    id: 16
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=300&h=450',
    title: 'Coffee',
    label: 'drinks',
    id: 17
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=300&h=450',
    title: 'Storage',
    label: 'home',
    id: 18
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&h=450',
    title: 'Coffee table',
    label: 'home',
    id: 19
  },
];

export const labels = Array.from(new Set(userImages.map(image => image.label)));

export default {
    userImages,
    labels,
    platformImages
};