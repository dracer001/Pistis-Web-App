
const index = (req, res)=>{
    res.render('public/index')
}

const esHome = (req, res)=>{
    res.render('public/future', {title: "ENERGY SOLUTIONS"})
}

const trainingSolutionHome = (req, res)=>{
    res.render('public/trainingSol', {title: "Pistis Training Solutions"})
}

const itSolutionHome = (req, res)=>{
    res.render('public/itSol', {title: "IT SOLUTIONS"})
}

module.exports = {
    index,
    esHome,
    trainingSolutionHome,
    itSolutionHome
}