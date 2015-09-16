
exports.index = function (req, res) {
    var js = [  "/js/vendor/jquery-1.11.0.min.js",
                "/js/vendor/bootstrap.min.js",
                "/js/vendor/jquery.validate.min.js",
                "/js/iks.js" ];

    var css = [ "/css/vendor/pure.css",
                "/css/vendor/main-grid.css",
                "/css/vendor/bootstrap.min.css",
                "/css/iks.css" ];

    var logo_hero    = "/img/logo.png";

    var logo_pc      = "/img/white-pc-icon.png";

    var logo_wifi    = "/img/white-wifi-icon.png";

    var logo_phone   = "/img/white-mobile-icon.png";

    var logo_printer = "/img/white-printer-icon.png";

    var logo_tv      = "/img/white-tv-icon.png";

    var logo_help    = "/img/white-help-icon.png";

    var is_phone     = res.locals.is_phone;

    var logo_square  = "/img/square-logo.png";

    res.render('index', {   title:       "I Know Someone",
                            javascript:   js,
                            stylesheets:  css,
                            hero_logo:    logo_hero,
                            pc_logo:      logo_pc,
                            wifi_logo:    logo_wifi,
                            phone_logo:   logo_phone,
                            printer_logo: logo_printer,
                            tv_logo:      logo_tv,
                            help_logo:    logo_help,
                            square_logo:  logo_square,
                            is_phone:     is_phone,
                            is_not_about_page: true,
                            banner: "banner"
                         });
};


exports.renovation = function (req, res) {
    var js = [  "/js/vendor/jquery-1.11.0.min.js",
                "/js/vendor/bootstrap.min.js",
                "/js/vendor/jquery.validate.min.js",
                "/js/iks.js" ];

    var css = [ "/css/vendor/pure.css",
                "/css/vendor/main-grid.css",
                "/css/vendor/bootstrap.min.css",
                "/css/iks.css" ];

    var logo_hero    = "/img/reno-logo.png";

    var logo_hammer = "/img/white-hammer-icon.png";

    var logo_paint    = "/img/white-paint-icon.png";

    var logo_light   = "/img/white-light-icon.png";

    var logo_floor = "/img/white-floor-icon.png";

    var logo_deck      = "/img/white-deck-icon.png";

    var logo_shower    = "/img/white-shower-icon.png";

    var is_phone     = res.locals.is_phone;

    var logo_square  = "/img/square-logo.png";

    res.render('renovation', {  title:       "I Know Someone",
                                javascript:   js,
                                stylesheets:  css,
                                hero_logo:    logo_hero,
                                hammer_logo:  logo_hammer,
                                paint_logo:   logo_paint,
                                light_logo:   logo_light,
                                floor_logo:   logo_floor,
                                deck_logo:    logo_deck,
                                shower_logo:  logo_shower,
                                square_logo:  logo_square,
                                is_phone:     is_phone,
                                is_not_about_page: true,
                                banner: "reno-banner"
                         });
};

exports.about_us = function (req, res) {
    var js = [  "/js/vendor/jquery-1.11.0.min.js",
                "/js/vendor/bootstrap.min.js",
                "/js/iks.js" ];

    var css = [ "/css/vendor/pure.css",
                "/css/vendor/main-grid.css",
                "/css/vendor/bootstrap.min.css",
                "/css/iks.css" ];

    var logo_hero    = "/img/logo.png";

    var logo_pc      = "/img/white-pc-icon.png";

    var logo_wifi    = "/img/white-wifi-icon.png";

    var logo_phone   = "/img/white-mobile-icon.png";

    var logo_printer = "/img/white-printer-icon.png";

    var logo_tv      = "/img/white-tv-icon.png";

    var logo_help    = "/img/white-help-icon.png";

    var is_phone     = res.locals.is_phone;

    var logo_square  = "/img/square-logo.png";

    res.render('about_us', {   title:       "I Know Someone",
                            javascript:   js,
                            stylesheets:  css,
                            hero_logo:    logo_hero,
                            square_logo:  logo_square,
                            is_phone:     is_phone,
                            banner: "banner"
                         });
};

exports.get_quote_form = function (req, res) {
    res.render ('quote');
};

exports.post_quote_form = function (req, res) {
    req.checkBody ('name', 'name is required').notEmpty ();
    req.checkBody ('email', 'email is required').notEmpty ();
    req.checkBody ('email', 'email is invalid').isEmail ();
    req.checkBody ('phone', 'phone is required').notEmpty ();
    req.checkBody ('city', 'city is required').notEmpty ();
    req.checkBody ('problem', 'problem is required').notEmpty ();

    var errors = req.validationErrors();

    if (errors) {
        console.log ("Errors:");
        console.log (errors);
    }
    else {
        var jadeOptions = {
            name:    req.body.name,
            email:   req.body.email,
            phone:   req.body.phone,
            city:    req.body.city,
            problem: req.body.problem,
            os:      req.body.os,
            date:    req.body.date,
            desc:    req.body.desc
        };

        console.log ("EMAIL REQUEST");
        console.log ("- - - - - - -");
        console.log (jadeOptions);
        console.log ("- - - - - - -");

        var from = "IKS Request <requests@iknowsomeone.co>";
        var to   = "\"" + req.body.name + "\" <" + req.body.email + ">";
        var bcc  = "Andrew <andrew@iknowsomeone.co>, Woody <woody@iknowsomeone.co>";
        var subj = "IKS Service Request";

        res.app.render('email-template', jadeOptions, function (err, html) {
            var message = {
                from: from, // sender address
                to: to, // comma separated list of receivers
                bcc: bcc,
                subject: subj,
                html: html,
                generateTextFromHTML: true
            };
            res.app.mailer.sendMail (message, function (error, response) {
                if(error) {
                    console.log ("Error sending email");
                    console.log (error);
                }
                else {
                    console.log ("Email successfully sent: " + response.message);
                }
            });
        });
    }
    res.send ('');
};