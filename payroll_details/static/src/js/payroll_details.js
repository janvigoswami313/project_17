/** @odoo-module */

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.timeoff_websitePayrollProfile = publicWidget.Widget.extend({
    selector: '#payroll_data_form,#payroll_details_table',

    init: function (parent, options) {
        this._super.apply(this, arguments);
    },

    // declare events
    events: {
        'click .nav-tabs a': '_onTabClick',
        'click .set-clickable-row': '_onRowClick',
        'click .print-button': '_onPrintButtonClick',
    },

    // start method to run function on initial stage
    start: function () {
        var self = this;
        return this._super.apply(this, arguments).then(function () {
            self._initTabs();
        });
    },

    // make table row clickable to redirect that row form view
     _onRowClick: function (ev) {
        var href = $(ev.currentTarget).data('href');
        if (href && !$(ev.target).hasClass('print-button')) {
            window.location.href = href;
        }
    },

    // handle print button click
    _onPrintButtonClick: function (ev) {
        ev.stopPropagation();
    },

    // initialize tabs
    _initTabs: function () {
        this.$('.nav-tabs a').first().tab('show');
    },

    // handle tab click
    _onTabClick: function (ev) {
        ev.preventDefault();
        $(ev.currentTarget).tab('show');
    },
});

export default publicWidget.registry.timeoff_websitePayrollProfile;