( function( $ ) {
    //custom script for accordion block
    if ($('.codoswpcgb-accordion')[ 0 ]) {
        //https://css-tricks.com/snippets/jquery/simple-jquery-accordion/
        const allPanels = $('.codoswpcgb-accordion-panel');
        const allTabs = $('.codoswpcgb-accordion');
        allPanels.hide();
        allPanels.first().show();
        allTabs.first().addClass('active');
        $('.codoswpcgb-accordion').click(function() {
            allPanels.hide();
            allTabs.removeClass('active');
            $(this).addClass('active');
            $(this).next().show();
            return false;
        });
    }

}( jQuery ) );
