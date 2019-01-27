const fs = require('fs')

const xml = require('xml-js')

const data = fs.readFileSync('crop_000010.txt', 'utf8')

const lines = data.split('\n')
let obj = {
    "annotation": {
      "folder": "bronzestatuefull",
      "filename": "",
      "path": "",
      "source": { "database": "Unknown" },
      "size": {
        "width": "",
        "height": "",
        "depth": ""
      },
      "segmented": "0",
      "object": {
            "name": "PASperson",
            "pose": "",
            "truncated": "",
            "difficult": "",
            "bndbox": {
                "xmin": "",
                "ymin": "",
                "xmax": "",
                "ymax": ""
            }
      }
    }
  }
lines.forEach(val => {
    if (val.indexOf(':') > -1){
        line = val.split(':')
        line  = line.map(val => val.trim())
        switch(line[0]){
            case 'Image filename':
                obj['annotation']['path'] = line[1].replace('"', '').replace('"', '')
                obj['annotation']['filename'] = fileName(line[1])
            break;
            case 'Image size (X x Y x C)':
                sizes = line[1].split(' x ')
                obj['annotation']['size']['width'] = sizes[0] 
                obj['annotation']['size']['height'] = sizes[1] 
                obj['annotation']['size']['depth'] = sizes[2]
            break;

            case 'Bounding box for object 1 "PASperson" (Xmin, Ymin) - (Xmax, Ymax)':
                coords = getCoordinates(line[1])
                obj['annotation']['object']['bndbox']['xmin'] = coords[0][0]
                obj['annotation']['object']['bndbox']['ymin'] = coords[0][1]
                obj['annotation']['object']['bndbox']['xmax'] = coords[1][0]
                obj['annotation']['object']['bndbox']['ymax'] = coords[1][1]
            break;

            default:
            console.log('хуй')
            break;
        }
    }
})
// fs.writeFileSync('result.xml', xml(obj))
 fs.writeFileSync('result.xml',xml.json2xml(obj, {compact: true, ignoreComment: true, spaces: 4}))
function fileName(path){
    path = path.split('/')
    return path[path.length-1]
}
function getCoordinates(coords){
    coords = coords.split(' - ')
    real = []
    coords.forEach(val => {
        val = val.split(', ')
        now = []
        val.forEach(val2 => {
            now.push(val2.replace('(', '').replace(')', ''))
        })
        real.push(now)
    })
    return real
}
