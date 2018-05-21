### Installing
```
   git clone git@github.com:jculloty/pixabay-demo.git
   cd pixabay-demo
   npm start
```

### Key Features

  + Gird images (on home and user pages) are responsivly resizes; using React and flexbox. The algorithm is in Grid::calculateImageSizes().
  + A similar algorithm in ImagePage::render() ensures that the main image is always fits on the screen.
  + API calls are cached.
  + ApiContext is uses HOC and React contexts to make API calls and data available to any Component that requires it.
  + Can search by user - by clicking on the user image.
  + The only css framework uses is Bootstrap - this is only used in the header

### TODO

  + Implement more tests,
  + Remove bootstrap,
  + Implement advanced search features,
  + Imporve the responsiveness of search,
  + Improve the search UX,
  + Extract the resize logic to a HOC - making it reusable
