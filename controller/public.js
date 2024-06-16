
const index = (req, res)=>{
    res.render('public/index')
}

const esHome = (req, res)=>{
    res.render('public/future', {title: "ENERGY SOLUTIONS"})
}

const itHome = (req, res)=>{
    res.render('public/future', {title: "IT SOLUTIONS"})
}

module.exports = {
    index,
    esHome,
    itHome
}