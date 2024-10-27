
const index = (req, res)=>{
    res.render('public/index')
}

const esHome = (req, res)=>{
    res.render('public/future', {title: "ENERGY SOLUTIONS"})
}

const projectsShowcase = (req, res)=>{
    res.render('public/projectShowcase', {title: "Pistis Projects"})
}

const itHome = (req, res)=>{
    res.render('public/future', {title: "IT SOLUTIONS"})
}

module.exports = {
    index,
    esHome,
    itHome,
    projectsShowcase
}