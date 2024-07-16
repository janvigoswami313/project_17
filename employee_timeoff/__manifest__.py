{
    'name': 'Employee Timeoff',
    'version': '17.0',
    'summary': '"""""""',
    'description': 'Employee Timeoff',

    'author': " PYSquad",

    'depends': ['base', 'website','hr'],

    'data': [
        'view/employee_timeoff.xml',
        'security/ir.rule.xml',
        'security/ir.model.access.csv',

    ],

    'assets': {
        'web.assets_frontend': [
            'employee_timeoff/static/src/js/employee_timeoff.js',
            'employee_timeoff/static/src/css/employee_timeoff_style.css',
        ],
    },

    'installable': True,
    'auto-install': False,
    'application': True,
}