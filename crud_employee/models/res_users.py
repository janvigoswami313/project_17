from odoo import models, fields, api


class HrEmployee(models.Model):
    _name = 'hr.employee'
    _inherit = 'hr.employee'

    user_id = fields.Many2one('res.users', 'Related User--')
