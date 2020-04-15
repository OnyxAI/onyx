from flask_script import Manager, Command, Option
from flask_migrate import Migrate, MigrateCommand
from onyx.app import create_app, AppReloader
from onyx.extensions import db
from onyx.models import *
#import time
#from multiprocessing import Queue, Process

#global reloader_queue

app = create_app()

@app.route('/restart/toto')
def restart():
    try:
        print(reloader_queue)
        reloader.put("something")
        return "Quit"
    except Exception as e:
        print(e)
        return "error"

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
        app.run(host=host, port=int(port), debug=debug, threaded=True, use_reloader=reload, use_evalex=True)


manager.add_command('run', Run())
manager.add_command('db', MigrateCommand)

"""
def start_onyx(q):
   reloader_queue = q
   app.run(host="0.0.0.0", port=5000, debug=True, threaded=True, use_reloader=True, use_evalex=True)
   #manager.run()
"""


if __name__=='__main__':
    manager.run()
    """
    q = Queue()
    p = Process(target=start_onyx, args=[q,])
    p.start()
    while True: #wathing queue, sleep if there is no call, otherwise break
       if q.empty():
            time.sleep(1)
       else:
          break
    p.terminate() #terminate flaskapp and then restart the app on subprocess
    args = [sys.executable] + [sys.argv[0]]
    subprocess.call(args)
    """
