/**
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 * @constructor
 */
export default class Resource {
  constructor(init) {
    this.resourceCache = {};
    this.loading = [];
    this.readyCallbacks = [];
    this.load([
      'images/stone-block.png',
      'images/water-block.png',
      'images/grass-block.png',
      'images/enemy-bug.png',
      'images/char-boy.png',
      'images/char-cat-girl.png',
      'images/char-horn-girl.png',
      'images/char-pink-girl.png',
      'images/char-princess-girl.png',
      'images/Heart.png',
    ]);
    this.onReady(init);
  }

  /* This is the publicly accessible image loading function. It accepts
     * an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     */
  load(urlOrArr) {
    if (urlOrArr instanceof Array) {
      /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
      urlOrArr.forEach((url) => {
        this._load(url);
      });
    } else {
      /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
      this._load(urlOrArr);
    }
  }

  /* This is our private image loader function, it is
     * called by the public image loader function.
     */
  _load(url) {
    if (this.resourceCache[url]) {
      /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
      return this.resourceCache[url];
    } else {
      /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
      const img = new Image();
      img.onload = () => {
        /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
        this.resourceCache[url] = img;

        /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
        if (this.isReady()) {
          this.readyCallbacks.forEach((func) => {
            func();
          });
        }
      };

      /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the image's src attribute to the passed in URL.
             */
      this.resourceCache[url] = false;
      img.src = url;
    }
  }

  /* This is used by developers to grab references to images they know
     * have been previously loaded. If an image is cached, this functions
     * the same as calling load() on that URL.
     */
  get(url) {
    return this.resourceCache[url];
  }

  /* This function determines if all of the images that have been requested
     * for loading have in fact been properly loaded.
     */
  isReady() {
    let ready = true;
    for (const k in this.resourceCache) {
      if (this.resourceCache.hasOwnProperty(k) &&
               !this.resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  }

  /* This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     */
  onReady(func) {
    this.readyCallbacks.push(func);
  }
}
