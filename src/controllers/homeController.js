const getHomepage = (req, res) => {
    // process data
    // call model
    res.send('Hello Tien Dep Trai Nhat Vu Tru')
}

const getABC = (req, res) => {
    res.render('sample.ejs')
}

module.exports = {
    getHomepage,
    getABC
}