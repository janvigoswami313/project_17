from odoo import models, fields

class HrEmployee(models.Model):
    _inherit = 'hr.employee'

    private_email = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    private_phone = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    bank_account_id = fields.Many2one(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    km_home_work = fields.Integer(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    private_car_plate = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    emergency_contact = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    emergency_phone = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    country_id = fields.Many2one(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    identification_id = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    ssnid = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    passport_id = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    birthday = fields.Date(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    place_of_birth = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    country_of_birth = fields.Many2one(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    children = fields.Integer(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    study_field = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    study_school = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    visa_no = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    permit_no = fields.Char(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    visa_expire = fields.Date(string="Private Email", groups="hr.group_hr_user,base.group_portal")
    work_permit_expiration_date = fields.Date(string="Private Email", groups="hr.group_hr_user,base.group_portal")

