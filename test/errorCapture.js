const { errorCapture } = require('../lib')

const test = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.random() * 10
      if (num > 5) {
        resolve(num)
      } else {
        reject()
      }
    }, 1000)
  })

  const [err, res] = await errorCapture(promise)

  console.log(err, res)
}


test()