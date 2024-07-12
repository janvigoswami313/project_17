/** @odoo-module */

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.websiteProfile = publicWidget.Widget.extend({
    selector: '#employee_data_form',
    events: {
        'click #saveButton': '_onclick_save_btn',
        'click #editButton': '_onclick_edit_btn',
        'change #address_home_id': '_updateAddressDetails',
        'change #address_id': '_updateWorkAddressDetails',
    },

     init: function (parent, options) {
            this._super.apply(this, arguments);
            this.orm = this.bindService("orm");
        },
//    #hide data on initial stage

    start() {
        var self =this;
        return this._super(...arguments).then(() => {
        var $selectElement = $("#address_home_id");
        var $selectedOption = $selectElement.find("option:selected");

        if ($selectedOption.data('street')) {
            $('#home_address_street').show();
        } else {
            $('#home_address_street').hide();
        }

        if ($selectedOption.data('street2')) {
            $('#home_address_street2').show();
        } else {
            $('#home_address_street2').hide();
        }

        if ($selectedOption.data('city')) {
            $('#home_address_city').show();
        } else {
            $('#home_address_city').hide();
        }

        if ($selectedOption.data('state')) {
            $('#home_address_state_id').show();
        } else {
            $('#home_address_state_id').hide();
        }

        if ($selectedOption.data('zip')) {
            $('#home_address_zip').show();
        } else {
            $('#home_address_zip').hide();
        }

        if ($selectedOption.data('country')) {
            $('#home_address_country_id').show();
        } else {
            $('#home_address_country_id').hide();
        }

        var $selectElement = $("#address_id");
        var $selectedOption = $selectElement.find("option:selected");

         if ($selectedOption.data('street')) {
            $('#work_address_street').show();
        } else {
            $('#work_address_street').hide();
        }

        if ($selectedOption.data('street2')) {
            $('#work_address_street2').show();
        } else {
            $('#work_address_street2').hide();
        }

        if ($selectedOption.data('city')) {
            $('#work_address_city').show();
        } else {
            $('#work_address_city').hide();
        }

        if ($selectedOption.data('state')) {
            $('#work_address_state_id').show();
        } else {
            $('#work_address_state_id').hide();
        }

        if ($selectedOption.data('zip')) {
            $('#work_address_zip').show();
        } else {
            $('#work_address_zip').hide();
        }

        if ($selectedOption.data('country')) {
            $('#work_address_country_id').show();
        } else {
            $('#work_address_country_id').hide();
        }

            this._setFormReadonly(true);
            self._setupRowClick();

        });
    },

    _setupRowClick: function () {
        var self = this;
        this.$('#timeoff_data').on('click', function () {
            var dataUrl = $(this).data('url');
            if (dataUrl) {
                window.location.href = dataUrl;
            }
        });
    },

//    #function for hide and show data(for Home Address)

    _updateAddressDetails: function () {
        var $selectElement = $("#address_home_id");
        var $selectedOption = $selectElement.find("option:selected");
        var $streetDiv = $('input[name="home_street"]').closest('div');
        var $street2Div = $('input[name="home_street2"]').closest('div');
        var $cityDiv = $('input[name="home_city"]').closest('div');
        var $stateDiv = $('input[name="home_state_id"]').closest('div');
        var $zipDiv = $('input[name="home_zip"]').closest('div');
        var $countryDiv = $('input[name="home_country_id"]').closest('div');
        var $emailDiv = $('#email-div');
        var $phoneDiv = $('#phone-div');

    if ($selectedOption.data("email")) {
        $emailDiv.show();
        $('input[name="email"]').val($selectedOption.data("email"));
    } else {
        $emailDiv.hide();
    }
    if ( $selectedOption.data("phone")) {
        $phoneDiv.show();
        $('input[name="phone"]').val($selectedOption.data("phone"));
    } else {
        $phoneDiv.hide();
    }
    if ($selectedOption.data('street')) {
        $('input[name="home_street"]').closest('div').show();
        $('input[name="home_street"]').val($selectedOption.data('street'));
    } else {
        $('input[name="home_street"]').val('');
        $streetDiv.hide();
    }
    if ($selectedOption.data('street2')) {
        $('input[name="home_street2"]').closest('div').show();
        $('input[name="home_street2"]').val($selectedOption.data('street2'));

    } else {
        $('input[name="home_street2"]').val('');
        $street2Div.hide();
    }
    if ($selectedOption.data('city')) {
        $('input[name="home_city"]').closest('div').show();
        $('input[name="home_city"]').val($selectedOption.data('city'));
    } else {
        $('input[name="home_city"]').val('');
        $cityDiv.hide();
    }
    if ($selectedOption.data('state')) {
        $('input[name="home_state_id"]').closest('div').show();
        $('input[name="home_state_id"]').val($selectedOption.data('state'));
    } else {
        $('input[name="home_state_id"]').val('');
        $stateDiv.hide();
    }
    if ($selectedOption.data('zip')) {
        $('input[name="home_zip"]').closest('div').show();
        $('input[name="home_zip"]').val($selectedOption.data('zip'));
    } else {
        $('input[name="home_zip"]').val('');
        $zipDiv.hide();
    }
    if ( $selectedOption.data('country')) {
        $('input[name="home_country_id"]').closest('div').show();
        $('input[name="home_country_id"]').val($selectedOption.data('country'));
    } else {
        $('input[name="home_country_id"]').val('');
        $countryDiv.hide();
    }
    },

    //#function for hide and show data(for Work Address)

    _updateWorkAddressDetails() {
        var $selectElement = $("#address_id");
        var $selectedOption = $selectElement.find("option:selected");
        var $streetDiv = $('input[name="work_street"]').closest('div');
        var $street2Div = $('input[name="work_street2"]').closest('div');
        var $cityDiv = $('input[name="work_city"]').closest('div');
        var $stateDiv = $('input[name="work_state_id"]').closest('div');
        var $zipDiv = $('input[name="work_zip"]').closest('div');
        var $countryDiv = $('input[name="work_country_id"]').closest('div');

    if ( $selectedOption.data('street')) {
        $('input[name="work_street"]').closest('div').show();
        $('input[name="work_street"]').val( $selectedOption.data('street'));
    } else {
        $('input[name="work_street"]').val('');
        $streetDiv.hide();
    }
    if ($selectedOption.data('street2')) {
        $('input[name="work_street2"]').closest('div').show();
        $('input[name="work_street2"]').val($selectedOption.data('street2'));
    } else {
        $('input[name="work_street2"]').val('');
        $street2Div.hide();
    }
    if ($selectedOption.data('city')) {
        $('input[name="work_city"]').closest('div').show();
        $('input[name="work_city"]').val($selectedOption.data('city'));
    } else {
        $('input[name="work_city"]').val('');
        $cityDiv.hide();
    }
    if ($selectedOption.data('state')) {
        $('input[name="work_state_id"]').closest('div').show();
        $('input[name="work_state_id"]').val($selectedOption.data('state'));
    } else {
        $('input[name="work_state_id"]').val('');
        $stateDiv.hide();
    }
    if ($selectedOption.data('zip')) {
        $('input[name="work_zip"]').closest('div').show();
        $('input[name="work_zip"]').val($selectedOption.data('zip'));
    } else {
        $('input[name="work_zip"]').val('');
        $zipDiv.hide();
    }
    if ($selectedOption.data('country')) {
        $('input[name="work_country_id"]').closest('div').show();
        $('input[name="work_country_id"]').val($selectedOption.data('country'));
    } else {
        $('input[name="work_country_id"]').val('');
        $countryDiv.hide();
    }
    },

    //#button for edit form

    _onclick_edit_btn() {
        this.$('#editButton').hide();
        this.$('#saveButton').show();
        this._setFormReadonly(false);
    },

    //#button for save form

    _onclick_save_btn() {
    },

    //#make field default readonly
     _setFormReadonly: function (readonly) {
            var $fields = this.$('.inp');
            if (readonly) {
                $fields.prop('disabled', true);
            } else {
                $fields.prop('disabled', false);
            }
        },

});