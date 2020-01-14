from flask_script import Manager, Command, Option
from flask_migrate import Migrate, MigrateCommand
from onyx.app import create_app
from onyx.extensions import db
from onyx.models import *

app = create_app()

migrate = Migrate(app, db)
manager = Manager(app, with_default_commands=False)

class Run(Command):

    option_list = (
        Option('--host', '-h', dest='host', default="0.0.0.0"),
        Option('--port', '-p', dest='port', default=5000),
        Option('--debug', '-d', dest='debug', default=False, action="store_true"),
        Option('--reload', '-r', dest='reload', default=True, action="store_true")
    )

    def run(self, host='0.0.0.0', port=5000, debug=False, reload=True):
        self.runserver(host, port, debug, reload)

    def runserver(self, host, port, debug, reload):
        app.run(host=host, port=int(port), debug=debug, threaded=True, use_reloader=reload)


manager.add_command('run', Run())
manager.add_command('db', MigrateCommand)


if __name__=='__main__':
    manager.run()
