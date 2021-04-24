export const userUploadedImages = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=300&h=450',
        title: 'Breakfast',
        author: '@bkristastucchio',
        label: 'food'
      },
      {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&h=450',
        title: 'Burger',
        author: '@rollelflex_graphy726',
        label: 'food'
      },
      {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=300&h=450',
        title: 'Camera',
        author: '@helloimnik',
        label: 'lifestyle'
      },
      {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=300&h=450',
        title: 'Coffee',
        author: '@nolanissac',
        label: 'drinks'
      },
      {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=300&h=450',
        title: 'Hats',
        author: '@hjrc33',
        label: 'lifestyle'
      },
      {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=450',
        title: 'Honey',
        author: '@arwinneil',
        label: 'food'
      },
      {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=300&h=450',
        title: 'Basketball',
        author: '@tjdragotta',
        label: 'sports'
      },
      {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&h=450',
        title: 'Fern',
        author: '@katie_wasserman',
        label: 'nature'
      },
]

export const labels = Array.from(new Set(userUploadedImages.map(image => image.label)));

export default {
    userUploadedImages,
    labels
};