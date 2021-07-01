import axios from "axios"

export const Timer = () => {

  let terms = [{
    time: 45,
    divide: 60,
    text: '%d seconds'
  }, {
    time: 45 * 60,
    divide: 60,
    text: '%d minutes'
  }, {
    time: 24 * 60 * 60,
    divide: 60 * 60,
    text: '%d heures'
  }, {
    time: 30 * 24 * 60 * 60,
    divide: 24 * 60 * 60,
    text: '%d jours'
  }, {
    time: 365 * 24 * 60 * 60,
    divide: 24 * 60 * 60 * 30,
    text: '%d mois'
  }, {
    time: Infinity,
    divide: 24 * 60 * 60 * 365,
    text: '%d ans'
  }]

  document.querySelectorAll('[data-ago]').forEach(function (node) {
    let date = parseInt((new Date(node.dataset.ago).getTime() / 1000), 10)

    function setText() {
      let secondes = Math.floor((new Date()).getTime() / 1000 - date)
      let term = null
      secondes = Math.abs(secondes)
      for (term of terms) {
        if (secondes < term.time) {
          break
        }
      }
      node.innerHTML = term.text.replace('%d', Math.round(secondes / term.divide))

      let nextTick = secondes % term.divide
      if (nextTick === 0) {
        nextTick = term.divide
      }

      const time = window.setTimeout(function () {
        if (node.parentNode) {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(setText)
          } else {
            setText()
          }
        }
        clearTimeout(time);
      }, nextTick * 1000)

    }

    setText()
  })

}

export const dataJson = async (callback,url = "blockchain/get") => {
  const data = await fetch("http://localhost:5000/" + url);
  const response = await data.json();
  callback && callback(response);
  console.log("called",response);
  return new Promise(res => ("done"));
}