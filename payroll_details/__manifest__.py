{
    'name': 'Payroll Details',
    'version': '17.0',
    'summary': '"""""""',
    'description': 'Payroll Details',

    'author': " PYSquad",

    'depends': ['base', 'website'],

    'data': [
        'view/payroll_details.xml',
        'report/payroll_report.xml',
    ],

    'assets': {
        'web.assets_frontend': [
            'payroll_details/static/src/js/payroll_details.js',
            'payroll_details/static/src/css/payroll_style.css',
        ],
    },

    'installable': True,
    'auto-install': False,
    'application': True,
}