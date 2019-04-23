const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
  constructor(folder, label) {
    this.folder = folder;
    this.label = label;
  }
  async save(buffer) {
    const filename = this.label;
    const filepath = this.filepath(filename);

    await sharp(buffer)
      // .resize(300, 300, {
      //   fit: sharp.fit.inside,
      //   withoutEnlargement: true
      // })
      .toFile(filepath);

    return filename;
  }
  static filename() {
    return `${uuidv4()}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;
