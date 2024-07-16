from odoo import http, _
from odoo.http import request
from werkzeug.utils import redirect

class EmployeesTimeoffData(http.Controller):
    @http.route('/employee_timeoff', type='http', auth='user', website=True)
    def employee_timeoff(self, employee_id=None):
        all_leaves = request.env['hr.leave'].sudo().search([])
        current_user = request.env.user

        if employee_id:
            employee_id = int(employee_id)
            employees_timeoff_data = all_leaves.filtered(lambda leave: leave.employee_id.id == employee_id)
        else:
            current_employee = request.env['hr.employee'].sudo().search([('user_id', '=', current_user.id)], limit=1)
            if current_employee:
                employees_timeoff_data = all_leaves.filtered(lambda leave: leave.employee_id.id == current_employee.id)
                employee_id = current_employee.id
            else:
                employees_timeoff_data = request.env['hr.leave'].sudo()

        employee_ids = employees_timeoff_data.mapped('employee_id.id')

        response = request.render('employee_timeoff.employees_timeoff_data', {
            'employee_id': employee_id,
            'employee_ids': employee_ids,
            'employees_timeoff_data': employees_timeoff_data,
        })
        return response

    @http.route('/timeoff/<model("hr.leave"):timeoff>', type='http', auth='user', website=True, methods=['GET', 'POST'])
    def employee_details(self, timeoff, **kw):
        print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> hello ', timeoff, kw)
        if request.httprequest.method == 'POST':
            # try:
                select_date_from_period = kw.get('request_date_from_period_0')
                select_custom_hour_from = kw.get('custom_hour_from')
                select_custom_hour_to = kw.get('custom_hour_to')

                half_day_checked = kw.get('half_day_checkbox')
                custom_hours_checked = kw.get('custom_hours_checkbox')

                data_to_write = {
                    'holiday_status_id': int(kw.get('holiday_status_id')) if kw.get('holiday_status_id') else False,
                    'request_date_to': kw.get('date_to'),
                    'request_unit_half': half_day_checked == 'on',
                    'request_unit_hours': custom_hours_checked == 'on',
                    'name': kw.get('description'),
                    'request_date_from_period': select_date_from_period,
                    'request_hour_from': select_custom_hour_from,
                    'request_hour_to': select_custom_hour_to,
                }

                if half_day_checked == 'on':
                    data_to_write['request_date_from'] = kw.get('half_day_date')
                elif custom_hours_checked == 'on':
                    data_to_write['request_date_from'] = kw.get('custom_hour_date')
                else:
                    data_to_write['request_date_from'] = kw.get('date_from')

                if kw.get('create_new') == 'true':
                    employee_id = kw.get('employee_id') or timeoff.employee_id.id
                    if employee_id:
                        employee = request.env['hr.employee'].sudo().browse(int(employee_id))
                        if employee:
                            data_to_write['employee_id'] = employee.id
                            new_timeoff = request.env['hr.leave'].sudo().create(data_to_write)
                            return redirect('/timeoff/%s' % new_timeoff.id)
                    return request.render('employee_timeoff.error_page', {
                        'error_message': _("Invalid employee selected. Please try again.")
                    })
                else:
                    timeoff.sudo().write(data_to_write)
                    return redirect('/timeoff/%s' % timeoff.id)

            # except Exception as e:
            #     return request.render('employee_timeoff.error_page', {
            #         'error_message': _("An error occurred while processing your request. Please try again.")
            #     })

        stages = [
            {'name': 'To Submit', 'key': 'draft', 'sequence': 1},
            {'name': 'To Approve', 'key': 'confirm', 'sequence': 2},
            {'name': 'Refused', 'key': 'refuse', 'sequence': 3},
            {'name': 'Second Approval', 'key': 'validate1', 'sequence': 4},
            {'name': 'Approved', 'key': 'validate', 'sequence': 5},
            {'name': 'Canceled', 'key': 'cancel', 'sequence': 6},
        ]
        holiday_off = request.env['hr.leave.type'].sudo().search([])

        response = request.render('employee_timeoff.employee_timeoff_data_form', {
            'timeoff': timeoff,
            'holiday_off': holiday_off,
            'stages': stages
        })

        return response