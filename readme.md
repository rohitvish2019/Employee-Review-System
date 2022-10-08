Prerequisites :
1.  Need to have nodejs installed.
2.  Need to have mongo db server installed.

Installation :

1.  Copy the code in any directory.
2.  Open package.json fils to see the dependencies.
3.  Install all the dependencies.
4.  Use node index.js to start the server and initialize app from code directory.

Features :
1.  Sign up : User can sign up as normal user or admin using otp verification.
2.  Login : Signed up user can login and the associated role will be assigned.

Note: As mail service used here is a free mail service, it may or may not work, hence otp is logged to the server logs and developer/reviewer can directly see the otp in server logs.

Roles: 
    1.  Admin:
        a.  Admin can view all the employees.
        b.  Admin can add a new employee or remove an employee.
        c.  Admin can view all the reviews of any employee.
        d.  Admin can delete a review if needed.
        e.  Admin can assign 1 employee to review other employee.
        f.  Admin can update employee email and name or make him admin.
    2.  Normal user:
        a.  Normal user can login and see if any review is assigned to him.
        b.  Can review on the pendind items / assigned to him items.