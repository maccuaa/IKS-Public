$(document).ready(function(){
    var lastId;
    
    //
    // Map Top Menu Links
    //
    var topMenu = $(".top-bar");
    var topMenuHeight = topMenu.outerHeight();
    var menuItems = topMenu.find("a");
    var scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });
    
    //
    // Map Service Table Buttons
    //
    var serviceTables = $(".services");
    var serviceItems = serviceTables.find ("button");
    var serviceScrollItems = serviceItems.map (function () {
        var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
    });
    
    //
    // Map Banner Category Links
    //
    var categoryMenu = $("#Category");
    var categoryItems = categoryMenu.find("a");
    var categoryScrollItems = categoryItems.map(function () {
    var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });
    

    //- ------------------------------ -\\
    //- ---- BIND CLICK HANDLERS  ---- -\\
    //- ------------------------------ -\\
    
    //
    // Bind Top Menu Links
    //
    menuItems.click(function (e) {
        var href = $(this).attr("href");
        var offsetTop = (href === "#")? 0 : $(href).offset().top - topMenuHeight;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });
    
    
    //
    // Bind Service Table Buttons
    //
    serviceItems.click(function (e) {
        var href = $(this).attr("href");
        var offsetTop = (href === "#")? 0 : $(href).offset().top - topMenuHeight;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });
    
    //
    // Bind Banner Category Links
    //
    categoryItems.click(function (e) {
        var href = $(this).attr("href");
        var offsetTop = (href === "#")? 0 : $(href).offset().top - topMenuHeight;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });
                            
    
    
    //- --------------------------------- -\\
    //- ---- WINDOW SCROLL HANDLERS  ---- -\\
    //- --------------------------------- -\\
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + 2 * topMenuHeight;
    
        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top <= fromTop) return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = (cur && cur.length) ? cur[0].id : "";
    
        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems.parent().removeClass("active")
                .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    });
    
    //- --------------------------- -\\
    //- ---- GOOGLE ANALYTICS  ---- -\\
    //- --------------------------- -\\

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-47450587-1', 'iknowsomeone.co');
    ga('send', 'pageview');

    //- ------------------------------------ -\\
    //- ---- LOAD REQUEST A QUOTE FORM  ---- -\\
    //- ------------------------------------ -\\

    $("#Quote-Modal").load ("ajax/quote_form", function() {

        var form_pages   = $("#Quote-Modal").find (".pure-form");
        var btn_prev     = $("#Quote-Modal .modal-footer #prev");
        var btn_next     = $("#Quote-Modal .modal-footer #next");
        var btn_submit   = $("#Quote-Modal .modal-footer #submit");
        var current_page = 0;
        var last_page    = form_pages.size () - 1;

        //
        // Set page validators
        //
        $.validator.setDefaults({
            errorClass: "iks-error form-inline",
            errorPlacement: function(error, element) {
                error.appendTo( element.parent() );
            }
        });

        var general_info_validator = $("#Quote-Modal #General-Info").validate ({
            rules: {
                name: {
                    minlength: 2,
                    maxlength: 50,
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    phoneUS: true
                },
                city: {
                    minlength: 2,
                    maxlength: 20,
                    required: true
                }
            } 
        });
        var repair_info_validator = $("#Quote-Modal #Repair-Info").validate ({
            rules: {
                service: "required",
                problem: "required",
            }
        });
        var repair_details_validator = $("#Quote-Modal #Repair-Details").validate ({
            date: {
                date: true
            }
        });

        var fill = function () {
            $("#Confirmation-Page #c_name").val ($("#General-Info #name").val ());
            $("#Confirmation-Page #c_email").val ($("#General-Info #email").val ());
            $("#Confirmation-Page #c_phone").val ($("#General-Info #phone").val ());
            $("#Confirmation-Page #c_city").val ($("#General-Info #city").val ());

            $("#Confirmation-Page #c_problem").val ($("#Repair-Info #problem").val ());
            $("#Confirmation-Page #c_os").val ($("#Repair-Info #osversion").val ());

            $("#Confirmation-Page #c_date").val ($("#Repair-Details #date").val ());
            $("#Confirmation-Page #c_desc").val ($("#Repair-Details #description").val ());
        };

        form_pages.get (0).validator = general_info_validator;
        form_pages.get (1).validator = repair_info_validator;
        form_pages.get (2).validator = repair_details_validator;
        form_pages.get (3).fill      = fill;

        //
        // Suppress link default actions
        //
        $("#Quote-Modal .modal-footer a").click (function (e) {
            e.preventDefault ();
        });

        //
        // Hide all form pages
        //
        form_pages.hide ();

        //
        // Unhide current page, disable previous button and submit button
        //
        $(form_pages.get (current_page)).show ();
        btn_prev.toggle (false);
        btn_submit.toggle (false);

        // Hide service details inputs
        $("#Quote-Modal .problem").hide ();
        $("#Quote-Modal .os").hide ();
        $("#Quote-Modal .osversion").hide ();

        // Disable OS version
        $("#Quote-Modal #osversion").prop("disabled", true);


        //
        // Next button click handler
        //
        btn_next.click (function () {
            var page = form_pages.get (current_page);
            
            page.validator.form ();

            if ( page.validator.valid() ) {
                var n_page = form_pages.get (++current_page);

                // Page animations
                $(page).slideToggle ();
                $(n_page).slideToggle ();

                // Toggle buttons
                btn_prev.toggle (true);
                if (current_page == last_page) {
                    $(this).toggle (false);
                    btn_submit.toggle (true);
                    n_page.fill ();
                }
            }
        });

        //
        // Previous button click handler
        //
        btn_prev.click (function () {
            var page   = form_pages.get (current_page--);
            var p_page = form_pages.get (current_page);

            // Page animations
            $(page).slideToggle ();
            $(p_page).slideToggle();
            
            // Toggle buttons
            btn_next.toggle (true);
            btn_submit.toggle (false);
            if (current_page === 0)
                $(this).toggle (false);
        });

        //
        // Submit button click handler
        //
        btn_submit.click (function () {
            if (general_info_validator.valid () &&repair_info_validator.valid () && repair_details_validator.valid () ) {
                $("#Quote-Modal").modal ("hide");
                $.post ( "/ajax/quote_form", $("#Confirmation-Page").serialize() );
            }
        });

        //
        // Service selector changed
        //
        $("#Repair-Info #service").change (function () {
            var problem   = $("#Repair-Info #problem");
            var os        = $("#Repair-Info #os");
            var osversion = $("#Repair-Info #osversion");

            if ( $(this).val () ) {
                problem.val ("");
                problem.find ("[class=" + $(this).val () + "]").prop ("hidden", false);
                problem.find ("[class!=" + $(this).val () + "]").prop ("hidden", true);
                $("#Repair-Info .problem").slideDown ();
            }
            else {
                $("#Repair-Info .problem").slideUp();
                problem.val ("");
                os.val ("");
                osversion.val ("");
            }

            if ($(this).val () === "computer" ) {
                $("#Repair-Info .os").slideDown ();
                $("#Repair-Info .osversion").slideDown ();    
            }
            else {
                $("#Repair-Info .os").slideUp ();
                $("#Repair-Info .osversion").slideUp ();
            }
        });

        //
        // OS selector changed
        //
        $("#Quote-Modal #os").change (function() {
            $("#Quote-Modal #osversion").prop ("disabled", false);
            $("#Quote-Modal #osversion").val ("");

            var selected_os = $("#os").val ();

            if (selected_os === "") {
                $("#osversion [class='*']").prop ("hidden", true);
                $("#osversion").prop ("disabled", true);
            }
            else {
                $("#osversion [class=" + selected_os + "]").prop ("hidden", false);
                $("#osversion [class!=" + selected_os + "]").prop ("hidden", true);
            }
        }); // end $("#os").change
    }); // end form load
    


    $("#Quote-Modal").addClass("modal fade");
    $("#Quote-Modal").modal ({
       show: false
	});

    // Link to open the dialog
    $(".quote").click (function (e) {
        $( "#Quote-Modal" ).modal ("show");
		e.preventDefault();
    });

});