const fs = require('fs')
const xml = require('xml2json')
const xml2 = require('xml-js')
fs.readdir('.', (err, files) => {
    files.forEach(val => {
        if (val.indexOf('.xml') > -1){
            data = fs.readFileSync(`${__dirname}/${val}`, 'utf8')
            data = JSON.parse(xml.toJson(data))
            path = `${__dirname}/${data['annotation']['path']}`
            if(!fs.existsSync(path)){
                data['annotation']['path'] = data['annotation']['path'].replace('historical statue figure', 'historicalstatuefigure').replace('historical statue figure', 'historicalstatuefigure')
                data['annotation']['path'] = data['annotation']['path'].replace('bronze statue full', 'bronzestatuefull').replace('bronze statue full', 'bronzestatuefull')
                data['annotation']['filename'] = data['annotation']['filename'].replace('historical statue figure', 'historicalstatuefigure').replace('bronze statue full', 'bronzestatuefull').replace('bronze statue full', 'bronzestatuefull')
                data['annotation']['folder'] = data['annotation']['folder'].replace('historical statue figure', 'historicalstatuefigure').replace('bronze statue full', 'bronzestatuefull').replace('bronze statue full', 'bronzestatuefull')
                console.log()
                fs.writeFileSync(val, xml2.json2xml(data, {compact: true, ignoreComment: true, spaces: 4}))
                // console.log(path)
            }
        }
    })
})
