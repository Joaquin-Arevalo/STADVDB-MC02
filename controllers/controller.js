const controller = {
    getFavicon: function(req, res){
        res.status(204);
    },
    get_index: function(req, res){
        res.render('MainMenu');
    }
}

module.exports = controller;