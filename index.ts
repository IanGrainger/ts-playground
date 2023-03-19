const welcome = async (): Promise<string> => {
  return 'Hello World!'
}

console.log('acc', await getUtf8StrBodyContent('https://www.accommodation.cam.ac.uk/versionjson.txt'))
console.log('prs', await getUtf8StrBodyContent('https://www.prs.uk.com/versionjson.txt'))

async function getUtf8StrBodyContent(url: string) {
  const bodyContent = await getBodyContent(url)
  const decoder = new TextDecoder(getUtf8Or16FromFirstTwoBytes(bodyContent.value))
  return decoder.decode(bodyContent.value)
}

async function getBodyContent(url: string) {
  const res = await fetch(url)
  const bodyContent = await res.body.getReader().read()
  return bodyContent
}

function getUtf8Or16FromFirstTwoBytes(bodyContent: Uint8Array) {
  if (bodyContent.length >= 2 && bodyContent.slice(0, 2).toString() === '255,254') {
    return 'utf-16'
  } else {
    return 'utf-8'
  }
}

export { welcome }
