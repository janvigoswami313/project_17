{
    'name': 'CRUD Employee',
    'version': '17.0',
    'summary': '"""""""',
    'description': 'Employee Details',

    'author': "janvi",

    'depends': ['base','website','hr'],

    'data': [
        'view/employees_website.xml',
        'view/res_users_changes.xml',
    ],

    'assets': {
        'web.assets_frontend': [
            'crud_employee/static/src/js/employee_detail.js',
            'crud_employee/static/src/css/employee_style.css',
        ],
    },

    'installable': True,
    'auto-install': False,
    'application': True,
}
