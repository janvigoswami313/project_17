from odoo import http, _
from odoo.http import request

class PayrollData(http.Controller):
    @http.route('/payroll_details', type='http', auth='public', website=True)
    def payroll_list(self, **kwargs):
        employees_payroll_details = request.env['hr.payslip'].sudo().search([])
        response = request.render('payroll_details.employee_payroll_details', {'employees_payroll_details': employees_payroll_details})

        return response

    @http.route('/payroll/<model("hr.payslip"):payroll>', type='http', auth='public', website=True,
                methods=['GET', 'POST'])
    def employee_details(self, payroll, **kw):
        salary_lines = payroll.line_ids.filtered(lambda line: line.appears_on_payslip)
        other_inputs = payroll.input_line_ids

        response = request.render('payroll_details.payroll_details_form', {
            'payroll': payroll,
            'o': payroll,
            'other_inputs': other_inputs,
            'salary_lines': salary_lines,
        })

        return response

