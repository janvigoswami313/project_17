{
    'name': 'Employee Timeoff',
    'version': '17.0',
    'summary': '"""""""',
    'description': 'Employee Timeoff',

    'author': " PYSquad",

    'depends': ['base', 'website'],

    'data': [
        'view/employee_timeoff.xml',
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