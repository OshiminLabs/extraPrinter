const fs = require('fs'),
    Printer = require('ipp-printer'),
    path = require('path');

var printer = new Printer({
    name : "Sadathe's Fun Printer"
})

printer.on('job', function (job) {
  console.log('[job %d] Printing document: %s', job.id, job.name)

  let filename = path.join(__dirname,'job-' + job.id + '.ps') // .ps = PostScript

  job.on('end', function () {
    console.log('[job %d] Document saved as %s', job.id, filename)
  })

  job.pipe(fs.createWriteStream(filename))
})