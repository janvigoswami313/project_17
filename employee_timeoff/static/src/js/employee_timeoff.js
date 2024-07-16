/** @odoo-module */

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.timeoff_websiteProfile = publicWidget.Widget.extend({
    selector: '#employees_timeoff_data_table,#employees_timeoff_data_form',

    init: function (parent, options) {
            this._super.apply(this, arguments);
            this.orm = this.bindService("orm");
            this.currentStage = options.currentStage || 'To Submit';
            this.stageOrder = ['To Submit', 'To Approve', 'Second Approval', 'Approved', 'Refused', 'Canceled'];
            this.createNew = false;

        },

//  declare events

    events: {
            'change #holiday_status_id': '_setHideShowField',
            'change #half_day_checkbox': '_setHalfDayCheckbox',
            'change #custom_hours_checkbox': '_setCustomHoursCheckbox',
            'click .stage-change-btn': '_onStageChangeClick',
            'click #new_timeoff_btn': '_onNewTimeOffClick',
            'click #save_btn': '_onclick_save_button',
            'click #edit_btn': '_onclick_edit_button',

    },

//  start method to run function on initial stage

    start: function () {
        var self = this;
        return this._super.apply(this, arguments).then(function () {
            self._setupRowClick();
            self._setupDateInputs();
            self._setInitialVisibility();
            self._setCustomHoursCheckbox();
            self._setHalfDayCheckbox();
            self._updateButtonVisibility();
            self._updateStageStyles();
            self._updateStageVisibility();
            self._setFormviewReadonly(true);
        });
    },

//  make table row clickable to redirect that row form view

    _setupRowClick: function () {
        var self = this;
        this.$('.clickable-row1').on('click', function () {
            var href = $(this).data('href');
            if (href) {
                window.location.href = href;
            }
        });
    },

//  to calculate duration and hours duration of date_from and date_to field and custom_hour_from and custom-hour_to field

    _setupDateInputs: function () {
        var self = this;
        var $dateFrom = this.$('#date_from');
        var $dateTo = this.$('#date_to');
        var $duration = this.$('#duration');
        var $hoursDuration = this.$('#hours_duration');
        var $timeFrom = this.$('#custom_hour_from');
        var $timeTo = this.$('#custom_hour_to');

        var updateDayDuration = function () {
        var date_from = $dateFrom.val();
        var date_to = $dateTo.val();
        if (date_from && date_to) {
            var date_from_obj = new Date(date_from);
            var date_to_obj = new Date(date_to);
            var time_difference = date_to_obj.getTime() - date_from_obj.getTime();
            var day_difference = Math.ceil(time_difference / (1000 * 3600 * 24));
                $duration.val(day_difference + " days");
        }else{
            $duration.val('0.0');
        }
        };

        var updateHourDuration = function () {
        var time_from = $timeFrom.val();
        var time_to = $timeTo.val();
        if (time_from && time_to) {
            var hour_difference = time_to - time_from;
            $hoursDuration.val(hour_difference + " hours");
        } else {
            $hoursDuration.val('');
        }
        };

        $dateFrom.add($dateTo).on('change', updateDayDuration);
        $timeFrom.add($timeTo).on('change', updateHourDuration);

        updateDayDuration();
        updateHourDuration();
    },

//  on initial stage hide and show field according to many2one field selection

    _setInitialVisibility: function () {
        var initialSelectedHolidayId = parseInt(this.$('#holiday_status_id').val());
        this._toggleSupportingDocsContainer(initialSelectedHolidayId);
        this._toggleSupportingDate(initialSelectedHolidayId);
    },

//    hide and show field according to selection of many2one field

    _setHideShowField: function() {
        var self = this;
        var initialSelectedHolidayId = parseInt(this.$('#holiday_status_id').val());
        self._toggleSupportingDocsContainer(initialSelectedHolidayId);
        self._toggleSupportingDate(initialSelectedHolidayId);

        this.$('#holiday_status_id').on('change', function() {
            var selectedHolidayId = parseInt($(this).val());
            self._toggleSupportingDocsContainer(selectedHolidayId);
            self._toggleSupportingDate(selectedHolidayId);
        });

        $('#half_day_checkbox').prop('checked', false);
            self._toggleDateFields(false);

        $('#custom_hours_checkbox').prop('checked', false);
            self._toggleHoursFields(false);
    },


    _toggleSupportingDocsContainer: function(selectedHolidayId) {
        var self = this;

        this.orm.call('hr.leave.type', 'search_read', [
            [['id', '=', selectedHolidayId]],
            ['support_document']
        ]).then(function(result) {
            if (result.length > 0) {
                var supportDocumentAllowed = result[0].support_document;
                $('#supporting-docs-container').toggle(!!supportDocumentAllowed);
            } else {
                $('#supporting-docs-container').hide();
            }
        });
    },

    _toggleSupportingDate: function(selectedHolidayId) {
        var self = this;

        this.orm.call('hr.leave.type', 'search_read', [
            [['id', '=', selectedHolidayId]],
            ['request_unit']
        ]).then(function(result) {
            if (result.length > 0) {
                var requestUnit = result[0].request_unit;
                if (requestUnit === 'day') {
                    $('#request_unit_date').hide();
                } else {
                    $('#request_unit_date').show();
                }
            } else {
                $('#request_unit_date').hide();
            }
        });
    },

//   hide and show field on click Half Day Checkbox

    _setHalfDayCheckbox: function() {
        var self = this;
        this.$('#half_day_checkbox').on('change', function() {
            var isChecked = $(this).is(':checked');

        if (isChecked) {
            self.$('#custom_hours_checkbox').prop('checked', false);
            self._toggleHoursFields(false);
        }
            self._toggleDateFields(isChecked);
        });

        var initialChecked = this.$('#half_day_checkbox').is(':checked');
        var initialHoursChecked = this.$('#custom_hours_checkbox').is(':checked');

        if (initialChecked) {
        this.$('#custom_hours_checkbox').prop('checked', false);
            self._toggleHoursFields(false);
        }
            self._toggleDateFields(initialChecked);

        if (initialChecked) {
            $('#duration').val('4 Hours');
        }
    },

    _toggleDateFields: function(isChecked) {
        if (isChecked) {
            $('#holiday_dates').hide();
            $('#holiday_date').show();

        var today = new Date().toISOString().slice(0, 10);
            $('#request_date_from').val(today);

        } else {
            if (!this.$('#custom_hours_checkbox').is(':checked')) {
                $('#holiday_dates').show();
            }
            $('#holiday_date').hide();
        }
    },

//  hide and show field on click  Custom Hour Checkbox

    _setCustomHoursCheckbox: function() {
        var self = this;
        this.$('#custom_hours_checkbox').on('change', function() {
            var isHoursChecked = $(this).is(':checked');
                console.log("custom hour checkbox changed. isChecked:", isHoursChecked);

        if (isHoursChecked) {
            self.$('#half_day_checkbox').prop('checked', false);
            self._toggleDateFields(false);
        }
           self._toggleHoursFields(isHoursChecked);
        });

        var initialHoursChecked = this.$('#custom_hours_checkbox').is(':checked');
        var initialChecked = this.$('#half_day_checkbox').is(':checked');

        if (initialHoursChecked) {
        this.$('#half_day_checkbox').prop('checked', false);
            self._toggleDateFields(false);
        }
            self._toggleHoursFields(initialHoursChecked);
    },

    _toggleHoursFields: function(isHoursChecked) {
        if (isHoursChecked) {
            $('#holiday_dates').hide();
            $('#custom_hour_date_1').show();
            $('#custom_hours').show();
            $('#hours_duration_1').show();
            $('#date_duration').hide();

        var today = new Date().toISOString().slice(0, 10);
            $('#request_custom_hour').val(today);

        } else {
            $('#holiday_dates').show();
            $('#custom_hour_date_1').hide();
            $('#custom_hours').hide();
            $('#hours_duration_1').hide();
            $('#date_duration').show();
        }
    },

//  for chane stages on click  button

    _onStageChangeClick: function (ev) {
        var $target = $(ev.currentTarget);
        var targetStage = $target.data('stage');

        this.currentStage = targetStage;
        this.$el.attr('data-current-stage', this.currentStage);

        this._updateButtonVisibility();
        this._updateStageStyles();
        this._updateStageVisibility();
    },

//    update visibility of button according to stages

    _updateButtonVisibility: function () {
        var self = this;
        this.$('.stage-change-btn').each(function () {
            var $btn = $(this);
            var btnStage = $btn.data('stage');
            var btnAction = $btn.data('action');

            if (self._isButtonVisible(btnStage, btnAction)) {
                $btn.show();
            } else {
                $btn.hide();
            }
        });
    },

    _updateStageStyles: function () {
        this.$('.stage-box').removeClass('active');
        this.$('.stage-box[data-stage="' + this.currentStage + '"]').addClass('active');

    },

//  button visibility

    _isButtonVisible: function (btnStage, btnAction) {
        let isVisible = false;
        let buttonColor = '';

        switch (this.currentStage) {
            case 'To Submit':
                isVisible = btnAction === 'Confirm';
                buttonColor = '#520052';
                break;
            case 'To Approve':
                isVisible = ['Approve', 'Refuse', 'Mark as read'].includes(btnAction);
                buttonColor = btnAction === 'Approve' ? '#520052' : 'darkgray';
                break;
            case 'Second Approval':
                isVisible = ['Validate', 'Refuse', 'Cancel'].includes(btnAction);
                buttonColor = btnAction === 'Validate' ? '#520052' : 'darkgray';
                break;
            case 'Approved':
                isVisible = ['Refuse', 'Cancel'].includes(btnAction);
                buttonColor = 'darkgray';
                break;
            case 'Refused':
                isVisible = btnAction === 'Mark as read';
                buttonColor = 'darkgray';
                break;
            case 'Canceled':
                isVisible = btnAction === 'Validate';
                buttonColor = 'darkpurple';
                break;
            default:
                isVisible = false;
                buttonColor = 'darkgray';
        }

        if (isVisible) {
            this.$('button[data-action="' + btnAction + '"]').css('background-color', buttonColor);
        }

        return isVisible;
    },

//  update stage visibility

    _updateStageVisibility: function () {
        var self = this;
        this.$('.stage-box').each(function () {
            var $stage = $(this);
            var stageName = $stage.data('stage');

            if (self._isStageVisible(stageName)) {
                $stage.show();
                if (stageName === self.currentStage) {
                    $stage.addClass('active');
                } else {
                $stage.removeClass('active');
                }
            } else {
                $stage.hide().removeClass('active');
            }
        });
    },

//  set stage visibility on click on button

    _isStageVisible: function (stageName) {
        switch (this.currentStage) {
            case 'To Submit':
                return ['To Submit','To Approve','Approved'].includes(stageName);
            case 'To Approve':
                return ['To Approve','Approved'].includes(stageName);
            case 'Second Approval':
                return ['To Approve', 'Second Approval', 'Approved'].includes(stageName);
            case 'Approved':
                return ['To Approve','Approved'].includes(stageName);
            case 'Refused':
                return ['To Approve', 'Refused','Approved'].includes(stageName);
            case 'Canceled':
                return false;
            default:
                return true;
        }
    },

//  for refresh form when click on new button

     _onNewTimeOffClick: function (ev) {
        ev.preventDefault();
        this._resetForm();
        this.createNew = true;

    },

    _resetForm: function () {
        this.$('input:not([type="button"]):not([type="submit"]):not([type="hidden"]), select, textarea').val('');
        this.$('#half_day_checkbox, #custom_hours_checkbox').prop('checked', false);

        var today = new Date().toISOString().split('T')[0];
        this.$('#date_from, #date_to, #half_day_date, #custom_hour_date').val(today);

        this.$('#custom_hour_from').val('10');
        this.$('#custom_hour_to').val('19');

        this.$('#holiday_status_id, #date_from, #date_to, #custom_hour_from, #custom_hour_to').trigger('change');

        this.currentStage = 'To Submit';
        this.$el.attr('data-current-stage', this.currentStage);

        this._setInitialVisibility();
        this._updateButtonVisibility();
        this._updateStageStyles();
        this._updateStageVisibility();

        this._setDefaultPaidTimeOff();

        this.$('#duration, #hours_duration').val('0.0');

        this.$('#description').val('');

        this.$('#supporting_docs').val('');
    },

    _setDefaultPaidTimeOff: function () {
        var self = this;
        this.orm.call('hr.leave.type', 'search_read', [
            [['name', '=', 'Paid Time Off']],
            ['id']
        ]).then(function(result) {
            if (result.length > 0) {
                var paidTimeOffId = result[0].id;
                self.$('#holiday_status_id').val(paidTimeOffId).trigger('change');
            }
        });
    },

     _onclick_edit_button() {
        this.$('#edit_btn').hide();
        this.$('#save_btn').show();
        this._setFormviewReadonly(false);
    },
//  save form on click save button

    _onclick_save_button: function (ev) {
        ev.preventDefault();
        var $form = this.$el;

        if (this.createNew) {
            $form.append($('<input>').attr({
                type: 'hidden',
                name: 'create_new',
                value: 'true'
            }));
        }
        $form.submit();
    },

     _setFormviewReadonly: function (readonly) {
            var $fields = this.$('.inp1, .readonlycheckbox');
            if (readonly) {
                $fields.prop('disabled', true);
            } else {
                $fields.prop('disabled', false);
            }
     },

});

return publicWidget.registry.websiteProfile;
